const { test, expect, site } = require("./fixtures");

test.describe("site do casamento - fluxos E2E", () => {
  test.beforeEach(async ({ weddingPage }) => {
    await weddingPage.goto();
  });

  test("carrega conteúdo principal, metadados e recursos locais", async ({ page, weddingPage }) => {
    await expect(page).toHaveTitle(site.title);
    await expect(page.locator("h1")).toHaveText("Camila & Matheus");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Site de casamento/,
    );
    await expect(weddingPage.countdown).toBeVisible();
    await expect(weddingPage.slides).toHaveCount(5);
    await weddingPage.carousel.scrollIntoViewIfNeeded();
    await expect(weddingPage.carousel.locator('img[src*="foto-1.webp"]')).toHaveJSProperty(
      "complete",
      true,
    );
  });

  test("navega pelos atalhos, abre FAQ e atualiza o carrossel", async ({ page }) => {
    const menu = page.getByRole("button", { name: "Menu" });
    if (await menu.isVisible()) await menu.click();
    await page
      .getByRole("navigation", { name: "Seções do site" })
      .getByRole("link", { name: "Informações úteis", exact: true })
      .click();
    await expect(page.locator('[id="informacoes"]')).toBeVisible();
    const faq = page.locator("details").filter({ hasText: "Que horas devo chegar?" });
    await faq.locator("summary").click();
    await expect(faq).toHaveAttribute("open", "");
    await page.getByRole("button", { name: "Próxima foto" }).click();
    await expect(page.locator("[data-carousel] .carousel-slide.is-active")).toHaveAttribute(
      "src",
      /foto-2\.webp/,
    );
    await page.getByRole("button", { name: "Mostrar foto 4" }).click();
    await expect(page.locator("[data-carousel] .carousel-slide.is-active")).toHaveAttribute(
      "src",
      /foto-4\.webp/,
    );
  });

  test("abre e fecha a foto ampliada com navegação por teclado", async ({ page }) => {
    await page.locator("[data-carousel] .carousel-slide").first().click();
    const dialog = page.locator('dialog[aria-label="Foto ampliada"]');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("img")).toHaveAttribute("src", /foto-1\.webp/);
    await page.keyboard.press("ArrowRight");
    await expect(dialog.locator("img")).toHaveAttribute("src", /foto-2\.webp/);
    await page.getByRole("button", { name: "Fechar foto" }).click();
    await expect(dialog).not.toBeVisible();
  });

  test("confirma presença com acompanhantes e envia o contrato esperado para a API", async ({
    page,
  }) => {
    let requestBody;
    await page.route("**/script.google.com/**", async (route) => {
      requestBody = JSON.parse(route.request().postData());
      await route.fulfill({ status: 200, body: "OK" });
    });
    await page.getByRole("link", { name: "Confirmar Presença" }).click();
    await page.locator('[name="responsavel"]').fill("Camila Souza");
    await page.locator('[name="telefone"]').fill("62999998888");
    await expect(page.locator('[name="telefone"]')).toHaveValue("(62) 99999-8888");
    await page.locator("[data-guests-select]").selectOption("3");
    await expect(page.locator("[data-guest-list] input")).toHaveCount(2);
    await page.locator("[data-guest-list] input").nth(0).fill("Matheus Torres");
    await page.locator("[data-guest-list] input").nth(1).fill("Ana Souza");
    await page.locator('[name="mensagem"]').fill("Estamos muito felizes!");
    await page.locator('[name="conviteConfirmado"]').check();
    await page.getByRole("button", { name: "Enviar confirmação" }).click();
    await expect(
      page.getByRole("status").filter({ hasText: site.rsvpPreparedStatus }),
    ).toBeVisible();
    expect(requestBody).toMatchObject({
      token: "casamento-2027",
      responsavel: "Camila Souza",
      telefone: "(62) 99999-8888",
      presenca: "sim",
      convidados: [
        { numero: 1, nome: "Camila Souza", confirmado: "Sim", whatsapp: "(62) 99999-8888" },
        { numero: 2, nome: "Matheus Torres", confirmado: "Sim", whatsapp: "" },
        { numero: 3, nome: "Ana Souza", confirmado: "Sim", whatsapp: "" },
      ],
    });
    expect(requestBody.mensagem).toBe("Estamos muito felizes!");
    await expect(page.locator("[data-guests-select]")).toHaveValue("");
  });

  test("permite cancelar presença, torna telefone opcional e abre o WhatsApp", async ({ page }) => {
    await page.getByLabel("Não poderei comparecer").check();
    await expect(page.locator("[data-attending-field]")).toBeHidden();
    await expect(page.locator("[data-responsible-label]")).toHaveText(
      "Nome de quem está cancelando",
    );
    await expect(page.locator("[data-message-input]")).toHaveAttribute(
      "placeholder",
      "Conte brevemente o motivo (opcional)",
    );
    await page.locator('[name="responsavel"]').fill("Convidado Teste");
    await page.locator("[data-guests-select]").selectOption("2");
    await page.locator("[data-guest-list] input").fill("Acompanhante Teste");
    await page.locator('[name="conviteConfirmado"]').check();
    await page.getByRole("button", { name: "Enviar confirmação" }).click();
    await expect(
      page.getByRole("status").filter({ hasText: site.rsvpPreparedStatus }),
    ).toBeVisible();
    expect(await page.evaluate(() => window.__openedUrls[0])).toMatch(
      new RegExp(`^https:\\/\\/wa\\.me\\/${site.whatsapp}\\?`),
    );
  });

  test("copia a chave Pix e gera o link do Google Agenda", async ({ page }) => {
    await page.getByRole("button", { name: "Copiar chave Pix" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Chave Pix copiada" })).toBeVisible();
    await page.getByRole("button", { name: "Adicionar ao Google Agenda" }).click();
    const opened = await page.evaluate(() => window.__openedUrls);
    expect(
      opened.some((url) => url.startsWith("https://calendar.google.com/calendar/render?")),
    ).toBeTruthy();
  });

  test("valida o RSVP antes de abrir o WhatsApp e preserva acompanhantes", async ({ page }) => {
    const name = page.locator('[name="responsavel"]');
    const guests = page.locator("[data-guests-select]");

    await guests.selectOption("3");
    const guestInputs = page.locator("[data-guest-list] input");
    await expect(guestInputs).toHaveCount(2);
    await guestInputs.nth(0).fill("Matheus Torres");
    await guestInputs.nth(1).fill("Ana Souza");
    await guests.selectOption("2");
    await guests.selectOption("3");
    await expect(guestInputs.nth(0)).toHaveValue("Matheus Torres");
    await expect(guestInputs.nth(1)).toHaveValue("Ana Souza");

    await page.getByRole("button", { name: "Enviar confirmação" }).click();
    await expect(name).toBeFocused();
    expect(await page.evaluate(() => window.__openedUrls)).toEqual([]);
  });
});

test.describe("site do casamento - responsividade", () => {
  test("exibe menu recolhido no mobile e fecha após navegar", async ({ page }) => {
    await page.goto("/");
    const menu = page.getByRole("button", { name: "Menu" });
    test.skip(!(await menu.isVisible()), "cenário exclusivo para viewport mobile");
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(".site-header")).toHaveClass(/menu-open/);
    await page
      .getByRole("navigation", { name: "Seções do site" })
      .getByRole("link", { name: "Presentes", exact: true })
      .click();
    await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  test("fecha o menu mobile com Escape e ao clicar fora", async ({ page }) => {
    await page.goto("/");
    const menu = page.getByRole("button", { name: "Menu" });
    test.skip(!(await menu.isVisible()), "cenário exclusivo para viewport mobile");

    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("aria-expanded", "false");

    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.locator("main").click({ position: { x: 10, y: 300 }, force: true });
    await expect(menu).toHaveAttribute("aria-expanded", "false");
  });
});
