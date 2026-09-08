const { site } = require('../../shared/test-data');

beforeEach(() => {
  cy.intercept('POST', '**/script.google.com/**', { statusCode: 200, body: 'OK' }).as('rsvpApi');
});

Cypress.on('window:before:load', (win) => {
  win.__openedUrls = [];
  cy.stub(win, 'open').callsFake((url) => win.__openedUrls.push(String(url)));
  Object.defineProperty(win.navigator, 'clipboard', {
    configurable: true,
    value: { writeText: () => Promise.resolve() },
  });
});

Cypress.Commands.add('fillRsvp', ({ responsible, phone, guests = '1', companions = [], message = '' }) => {
  cy.get('[name="responsavel"]').type(responsible);
  cy.get('[name="telefone"]').type(phone.replace(/\D/g, ''));
  cy.get('[data-guests-select]').select(guests);
  companions.forEach((name, index) => cy.get('[data-guest-list] input').eq(index).type(name));
  if (message) cy.get('[data-message-input]').type(message);
  cy.get('[name="conviteConfirmado"]').check();
});

Cypress.Commands.add('assertWhatsAppOpened', () => {
  cy.window().its('__openedUrls.0').should('match', new RegExp(`^https:\\/\\/wa\\.me\\/${site.whatsapp}\\?`));
});
