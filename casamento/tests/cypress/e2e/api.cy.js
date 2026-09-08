describe('API RSVP - contrato no Cypress', () => {
  it('envia JSON serializado em POST para o endpoint configurado', () => {
    cy.intercept('POST', '**/script.google.com/**', (request) => {
      const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
      expect(body).to.include({ token: 'casamento-2027', presenca: 'sim' });
      expect(body.convidados[0]).to.include({ numero: 1, confirmado: 'Sim' });
      request.reply({ statusCode: 200, body: 'OK' });
    }).as('apiContract');
    cy.visit('/');
    cy.get('input[placeholder="Seu nome completo"]').type('API Cypress');
    cy.get('input[placeholder="(62) 99999-9999"]').type('(62) 99999-9999');
    cy.get('[data-guests-select]').select('1');
    cy.get('[name="conviteConfirmado"]').check();
    cy.contains('button', 'Enviar confirmação').click();
    cy.wait('@apiContract').its('request.method').should('eq', 'POST');
  });

  it('exibe fallback e preserva o formulário quando a API retorna erro', () => {
    cy.intercept('POST', '**/script.google.com/**', { forceNetworkError: true }).as('apiError');
    cy.visit('/');
    cy.get('input[placeholder="Seu nome completo"]').type('Offline Cypress');
    cy.get('input[placeholder="(62) 99999-9999"]').type('(62) 99999-9999');
    cy.get('[data-guests-select]').select('1');
    cy.get('[name="conviteConfirmado"]').check();
    cy.contains('button', 'Enviar confirmação').click();
    cy.wait('@apiError');
    cy.contains('[role="status"]', 'não conseguimos registrar').should('be.visible');
    cy.get('input[placeholder="Seu nome completo"]').should('have.value', 'Offline Cypress');
  });
});
