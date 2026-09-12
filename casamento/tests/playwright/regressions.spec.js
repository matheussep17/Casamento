const { test, expect, RSVP_URL, site } = require("./fixtures");

test.describe("site do casamento - regressões e acessibilidade", () => {
  test.beforeEach(async ({ weddingPage }) => {
    await weddingPage.goto();
  });

  test("renderiza a contagem regressiva com valores numéricos e data configurada", async ({
    weddingPage,
  }) => {
    const countdown = weddingPage.countdown;

    await expect(countdown).toHaveAttribute("data-wedding-date", "2027-08-07T16:30:00-03:00");
    await expect(countdown.locator('[data-countdown="days"]')).toHaveText(/^\d{3}$/);
    await expect(countdown.locator('[data-countdown="hours"]')).toHaveText(/^\d{2}$/);
    await expect(countdown.locator('[data-countdown="minutes"]')).toHaveText(/^\d{2}$/);
    await expect(countdown.locator('[data-countdown="seconds"]')).toHaveText(/^\d{2}$/);
  });

  test("abre a foto ativa pelo teclado e navega no lightbox", async ({ weddingPage }) => {
    const activeSlide = weddingPage.activeSlide;
    await activeSlide.focus();
    await activeSlide.press("Enter");

    const dialog = weddingPage.lightbox;
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("img")).toHaveAttribute("src", /foto-1\.webp/);

    await dialog.getByRole("button", { name: "Próxima foto" }).click();
    await expect(dialog.locator("img")).toHaveAttribute("src", /foto-2\.webp/);
    await weddingPage.page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("usa o fallback quando a API de clipboard falha", async ({ page, weddingPage }) => {
    await page.evaluate(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: async () => Promise.reject(new Error("clipboard indisponível")) },
      });
    });

    await weddingPage.copyPix();
    await expect(page.getByRole("status").filter({ hasText: site.pixKey })).toBeVisible();
  });

  test("não envia nem abre o WhatsApp quando o honeypot é preenchido", async ({ page }) => {
    let requestCount = 0;
    await page.route(RSVP_URL, async (route) => {
      requestCount += 1;
      await route.fulfill({ status: 200, body: "OK" });
    });

    await page.locator('[name="website"]').fill("bot");
    await page.locator('[name="responsavel"]').fill("Robô de teste");
    await page.locator('[name="telefone"]').fill("62999999999");
    await page.locator("[data-guests-select]").selectOption("1");
    await page.locator('[name="conviteConfirmado"]').check();
    await page.getByRole("button", { name: "Enviar confirmação" }).click();

    expect(requestCount).toBe(0);
    expect(await page.evaluate(() => window.__openedUrls)).toEqual([]);
  });

  test("envia o contrato correto ao cancelar presença", async ({ page }) => {
    let requestBody;
    await page.route(RSVP_URL, async (route) => {
      requestBody = JSON.parse(route.request().postData());
      await route.fulfill({ status: 200, body: "OK" });
    });

    await page.getByLabel("Não poderei comparecer").check();
    await page.locator('[name="responsavel"]').fill("Pessoa Offline");
    await page.locator("[data-guests-select]").selectOption("2");
    await page.locator("[data-guest-list] input").fill("Acompanhante Offline");
    await page.locator('[name="conviteConfirmado"]').check();
    await page.getByRole("button", { name: "Enviar confirmação" }).click();

    await expect(
      page.getByRole("status").filter({ hasText: site.rsvpPreparedStatus }),
    ).toBeVisible();
    expect(requestBody).toMatchObject({
      token: site.rsvpToken,
      responsavel: "Pessoa Offline",
      telefone: "",
      presenca: "nao",
      convidados: [
        { numero: 1, nome: "Pessoa Offline", confirmado: "Não", whatsapp: "" },
        { numero: 2, nome: "Acompanhante Offline", confirmado: "Não", whatsapp: "" },
      ],
    });
  });
});
