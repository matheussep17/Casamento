class WeddingPage {
  constructor(page) {
    this.page = page;
    this.form = page.getByRole("form", { name: "Formulário de confirmação" });
    this.countdown = page.locator("[data-wedding-date]");
    this.carousel = page.locator("[data-carousel]");
    this.slides = this.carousel.locator(".carousel-slide");
    this.activeSlide = this.carousel.locator(".carousel-slide.is-active");
    this.lightbox = page.locator('dialog[aria-label="Foto ampliada"]');
    this.menu = page.getByRole("button", { name: "Menu" });
    this.navigation = page.getByRole("navigation", { name: "Seções do site" });
    this.responsible = this.form.locator('[name="responsavel"]');
    this.phone = this.form.locator('[name="telefone"]');
    this.guests = this.form.locator("[data-guests-select]");
    this.guestInputs = this.form.locator("[data-guest-list] input");
    this.message = this.form.locator('[name="mensagem"]');
    this.invitationConfirmation = this.form.locator('[name="conviteConfirmado"]');
    this.submit = this.form.getByRole("button", { name: "Enviar confirmação" });
    this.status = this.form.getByRole("status");
  }

  async goto() {
    await this.page.goto("/");
  }

  async openSection(name) {
    if (await this.menu.isVisible()) await this.menu.click();
    await this.navigation.getByRole("link", { name, exact: true }).click();
  }

  async openFaq(question) {
    const faq = this.page.locator("details").filter({ hasText: question });
    await faq.locator("summary").click();
    return faq;
  }

  async selectPhoto(index) {
    await this.carousel.getByRole("button", { name: `Mostrar foto ${index}` }).click();
  }

  async openActivePhotoByKeyboard() {
    await this.activeSlide.focus();
    await this.activeSlide.press("Enter");
  }

  async copyPix() {
    await this.page.getByRole("button", { name: "Copiar chave Pix" }).click();
  }

  async addToCalendar() {
    await this.form.getByRole("button", { name: "Adicionar ao Google Agenda" }).click();
  }

  async confirmAttendance({ responsible, phone, guests = "1", companions = [], message } = {}) {
    if (responsible) await this.responsible.fill(responsible);
    if (phone) await this.phone.fill(phone);
    await this.guests.selectOption(guests);
    for (const [index, companion] of companions.entries()) {
      await this.guestInputs.nth(index).fill(companion);
    }
    if (message) await this.message.fill(message);
    await this.invitationConfirmation.check();
  }

  async cancelAttendance({ responsible, guests = "1", companions = [] } = {}) {
    await this.page.getByLabel("Não poderei comparecer").check();
    await this.responsible.fill(responsible);
    await this.guests.selectOption(guests);
    for (const [index, companion] of companions.entries()) {
      await this.guestInputs.nth(index).fill(companion);
    }
    await this.invitationConfirmation.check();
  }

  async submitForm() {
    await this.submit.click();
  }
}

module.exports = { WeddingPage };
