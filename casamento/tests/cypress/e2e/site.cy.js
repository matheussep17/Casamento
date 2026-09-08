describe('site do casamento - E2E com Cypress', () => {
  beforeEach(() => cy.visit('/'));

  it('valida a página inicial, navegação e FAQ', () => {
    cy.title().should('eq', 'Camila & Matheus | Casamento');
    cy.get('h1').should('contain.text', 'Camila & Matheus');
    cy.get('.countdown').should('be.visible');
    cy.contains('a', 'Informações úteis').click();
    cy.get('#informacoes').should('be.visible');
    cy.contains('summary', 'Que horas devo chegar?').click();
    cy.contains('details', 'Que horas devo chegar?').should('have.attr', 'open');
  });

  it('testa carrossel, lightbox e navegação da foto ampliada', () => {
    cy.get('[data-carousel-control="next"]').click();
    cy.get('.carousel-slide.is-active').should('have.attr', 'src').and('include', 'foto-2.webp');
    cy.get('.carousel-slide.is-active').click();
    cy.get('.photo-lightbox').should('be.visible');
    cy.get('.photo-lightbox').trigger('keydown', { key: 'ArrowRight' });
    cy.get('.photo-lightbox img').should('have.attr', 'src').and('include', 'foto-3.webp');
    cy.get('.lightbox-close').click();
    cy.get('.photo-lightbox').should('not.be.visible');
  });

  it('confirma presença e valida o payload da API', () => {
    cy.get('input[placeholder="Seu nome completo"]').type('Camila Cypress');
    cy.get('input[placeholder="(62) 99999-9999"]').type('62999998888');
    cy.get('[data-guests-select]').select('3');
    cy.get('[data-guest-list] input').eq(0).type('Matheus Cypress');
    cy.get('[data-guest-list] input').eq(1).type('Ana Cypress');
    cy.get('[data-message-input]').type('Mensagem Cypress');
    cy.contains('button', 'Enviar confirmação').click();
    cy.wait('@rsvpApi').its('request.body').then((body) => {
      const payload = typeof body === 'string' ? JSON.parse(body) : body;
      expect(payload).to.include({ token: 'casamento-2027', presenca: 'sim', responsavel: 'Camila Cypress' });
      expect(payload.telefone).to.eq('(62) 99999-8888');
      expect(payload.convidados).to.have.length(3);
      expect(payload.convidados[1].nome).to.eq('Matheus Cypress');
    });
    cy.contains('[role="status"]', 'Presença confirmada com sucesso.').should('be.visible');
  });

  it('permite cancelar presença e abre WhatsApp', () => {
    cy.contains('label', 'Não poderei comparecer').find('input').check();
    cy.get('[data-attending-field]').should('not.be.visible');
    cy.contains('Nome de quem está cancelando').should('be.visible');
    cy.get('input[placeholder="Seu nome completo"]').type('Cypress Ausente');
    cy.get('[data-guests-select]').select('2');
    cy.get('[data-guest-list] input').type('Acompanhante Ausente');
    cy.contains('button', 'Enviar confirmação').click();
    cy.contains('[role="status"]', 'Cancelamento enviado').should('be.visible');
    cy.window().its('__openedUrls.0').should('match', /^https:\/\/wa\.me\/5562992304054\?/);
  });

  it('copia Pix, cria agenda e valida links externos', () => {
    cy.contains('button', 'Copiar chave Pix').click();
    cy.contains('[role="status"]', 'Chave Pix copiada.').should('be.visible');
    cy.contains('button', 'Adicionar ao Google Agenda').click();
    cy.window().its('__openedUrls').should((urls) => {
      expect(urls.some((url) => String(url).startsWith('https://calendar.google.com/calendar/render?'))).to.eq(true);
    });
    cy.get('a[href*="querodecasamento.com.br"]').should('have.attr', 'target', '_blank');
    cy.get('a[href*="maps.app.goo.gl"]').should('have.attr', 'target', '_blank');
  });
});
