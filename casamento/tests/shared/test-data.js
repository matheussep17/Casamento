module.exports = {
  site: {
    title: 'Camila & Matheus | Casamento',
    whatsapp: '5562992304054',
    rsvpToken: 'casamento-2027',
    pixKey: '62992304054',
    rsvpPreparedStatus: 'Dados preparados. Conclua o envio na conversa do WhatsApp que foi aberta.',
  },
  rsvp: {
    responsible: 'Camila Souza',
    phone: '(62) 99999-8888',
    companions: ['Matheus Torres', 'Ana Souza'],
    message: 'Estamos muito felizes!',
  },
  selectors: {
    name: '[name="responsavel"]',
    phone: '[name="telefone"]',
    guests: '[data-guests-select]',
    guestList: '[data-guest-list]',
    status: '[role="status"]',
  },
};
