const { test, expect } = require('./fixtures');

test.describe('API RSVP - contrato de integração', () => {
  test('envia POST em texto com token, presença e convidados', async ({ page }) => {
    const requestPromise = page.waitForRequest('**/script.google.com/**');
    await page.goto('/');
    await page.getByPlaceholder('Seu nome completo').fill('Pessoa API');
    await page.getByPlaceholder('(62) 99999-9999').fill('(62) 99999-9999');
    await page.locator('[data-guests-select]').selectOption('1');
    await page.getByRole('button', { name: 'Enviar confirmação' }).click();
    const request = await requestPromise;
    expect(request.method()).toBe('POST');
    expect(request.headers()['content-type']).toContain('text/plain');
    expect(JSON.parse(request.postData())).toMatchObject({ token: 'casamento-2027', presenca: 'sim' });
  });

  test('mantém dados e mostra fallback quando a API falha', async ({ page }) => {
    await page.route('**/script.google.com/**', (route) => route.abort());
    await page.goto('/');
    await page.getByPlaceholder('Seu nome completo').fill('Pessoa Offline');
    await page.getByPlaceholder('(62) 99999-9999').fill('(62) 99999-9999');
    await page.locator('[data-guests-select]').selectOption('1');
    await page.getByRole('button', { name: 'Enviar confirmação' }).click();
    await expect(page.getByRole('status').filter({ hasText: 'não conseguimos registrar' })).toBeVisible();
    await expect(page.getByPlaceholder('Seu nome completo')).toHaveValue('Pessoa Offline');
  });
});
