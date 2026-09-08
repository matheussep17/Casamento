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
