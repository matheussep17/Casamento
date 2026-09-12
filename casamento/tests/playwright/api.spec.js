const { test, expect, RSVP_URL } = require("./fixtures");

test.describe("API RSVP - contrato de integração", () => {
  test("envia POST em texto com token, presença e convidados", async ({ page, weddingPage }) => {
    const requestPromise = page.waitForRequest(RSVP_URL);
    await page.goto("/");
    await weddingPage.confirmAttendance({ responsible: "Pessoa API", phone: "(62) 99999-9999" });
    await weddingPage.submitForm();
    const request = await requestPromise;
    expect(request.method()).toBe("POST");
    expect(request.headers()["content-type"]).toContain("text/plain");
    expect(JSON.parse(request.postData())).toMatchObject({
      token: "casamento-2027",
      presenca: "sim",
    });
  });

  test("mantém dados e mostra fallback quando a API falha", async ({ page, weddingPage }) => {
    await page.route("**/script.google.com/**", (route) => route.abort());
    await page.goto("/");
    await weddingPage.confirmAttendance({
      responsible: "Pessoa Offline",
      phone: "(62) 99999-9999",
    });
    await weddingPage.submitForm();
    await expect(
      page.getByRole("status").filter({ hasText: "não conseguimos registrar" }),
    ).toBeVisible();
    await expect(page.locator('[name="responsavel"]')).toHaveValue("Pessoa Offline");
  });
});
