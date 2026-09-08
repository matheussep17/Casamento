const { site, rsvp } = require('../../shared/test-data');

describe('site do casamento - E2E com Cypress', () => {
  beforeEach(() => cy.visit('/'));

  it('valida a página inicial, navegação e FAQ', () => {
    cy.title().should('eq', site.title);
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
    cy.fillRsvp({ responsible: rsvp.responsible, phone: rsvp.phone, guests: '3', companions: rsvp.companions, message: rsvp.message });
    cy.contains('button', 'Enviar confirmação').click();
    cy.wait('@rsvpApi').its('request.body').then((body) => {
      const payload = typeof body === 'string' ? JSON.parse(body) : body;
      expect(payload).to.include({ token: site.rsvpToken, presenca: 'sim', responsavel: rsvp.responsible });
      expect(payload.telefone).to.eq(rsvp.phone);
      expect(payload.convidados).to.have.length(3);
      expect(payload.convidados[1].nome).to.eq(rsvp.companions[0]);
    });
    cy.contains('[role="status"]', site.rsvpPreparedStatus).should('be.visible');
  });

  it('permite cancelar presença e abre WhatsApp', () => {
    cy.contains('label', 'Não poderei comparecer').find('input').check();
    cy.get('[data-attending-field]').should('not.be.visible');
    cy.contains('Nome de quem está cancelando').should('be.visible');
    cy.get('input[placeholder="Seu nome completo"]').type('Cypress Ausente');
    cy.get('[data-guests-select]').select('2');
    cy.get('[data-guest-list] input').type('Acompanhante Ausente');
    cy.get('[name="conviteConfirmado"]').check();
    cy.contains('button', 'Enviar confirmação').click();
    cy.contains('[role="status"]', site.rsvpPreparedStatus).should('be.visible');
    cy.assertWhatsAppOpened();
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
