describe('site do casamento - responsividade com Cypress', () => {
  beforeEach(() => {
    cy.viewport(390, 844);
    cy.visit('/');
  });

  it('abre o menu mobile e fecha após navegar', () => {
    cy.get('.menu-toggle').click().should('have.attr', 'aria-expanded', 'true');
    cy.get('.site-header').should('have.class', 'menu-open');
    cy.get('#site-navigation').contains('Presentes').click();
    cy.get('.menu-toggle').should('have.attr', 'aria-expanded', 'false');
  });

  it('mantém os elementos secundários do hero ocultos no mobile', () => {
    cy.get('[data-mobile-secondary]').should('not.be.visible');
    cy.get('.hero-details-button').should('be.visible');
  });
});
