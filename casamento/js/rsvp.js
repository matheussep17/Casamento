/**
 * Formulário de confirmação de presença (RSVP).
 * Responsável por:
 * - Alternar textos/campos entre "confirmar" e "cancelar" presença.
 * - Renderizar dinamicamente os campos de acompanhantes.
 * - Formatar o telefone enquanto o usuário digita.
 * - Montar a mensagem do WhatsApp e enviar uma cópia para a planilha (Google Apps Script).
 */

const GUEST_LABELS = ["Primeiro", "Segundo", "Terceiro", "Quarto", "Quinto"];
const STATUS_RESET_DELAY_MS = 6000;

function isAttending(form) {
  return form.elements.presenca?.value !== "nao";
}

/**
 * Reconstrói os campos de nome dos acompanhantes de acordo com a quantidade
 * selecionada, preservando os valores já digitados quando possível.
 */
function renderGuestFields(form, guestsSelect, guestList) {
  if (!guestList || !guestsSelect) return;

  const previousValues = [...guestList.querySelectorAll("input")].map((input) => input.value);
  guestList.replaceChildren();

  const attending = isAttending(form);
  const total = Number(guestsSelect.value || 0);

  for (let index = 2; index <= total; index += 1) {
    const label = document.createElement("label");
    label.textContent = attending
      ? `${GUEST_LABELS[index - 2]} acompanhante`
      : `Nome da ${index}ª pessoa que está cancelando`;

    const input = document.createElement("input");
    Object.assign(input, {
      type: "text",
      name: "nomesAcompanhantes",
      placeholder: "Nome completo",
      required: true,
      value: previousValues[index - 2] || "",
    });

    label.append(input);
    guestList.append(label);
  }
}

/**
 * Atualiza rótulos, obrigatoriedade de campos e textos das opções do select
 * conforme o usuário está confirmando ou cancelando a presença.
 */
function updateAttendanceFields(form, guestsSelect, guestList) {
  if (!form || !guestsSelect) return;

  const attending = isAttending(form);

  form.querySelectorAll("[data-attending-field]").forEach((node) => {
    node.hidden = !attending;
  });
  form.querySelectorAll("[data-attending-action]").forEach((node) => {
    node.hidden = !attending;
  });

  const responsibleLabel = form.querySelector("[data-responsible-label]");
  const phoneLabel = form.querySelector("[data-phone-label]");
  const phoneInput = form.querySelector('[name="telefone"]');
  const partyLabel = form.querySelector("[data-party-label]");
  const messageLabel = form.querySelector("[data-message-label]");
  const messageInput = form.querySelector("[data-message-input]");

  if (phoneInput) phoneInput.required = attending;
  if (responsibleLabel) {
    responsibleLabel.textContent = attending
      ? "Nome de quem está confirmando"
      : "Nome de quem está cancelando";
  }
  if (phoneLabel) {
    phoneLabel.textContent = attending
      ? "WhatsApp de quem está confirmando"
      : "WhatsApp de quem está cancelando (opcional)";
  }
  if (partyLabel) {
    partyLabel.textContent = attending
      ? "Quem você deseja confirmar?"
      : "Quantas pessoas você deseja cancelar?";
  }

  [...guestsSelect.options].slice(1).forEach((option, index) => {
    const count = index + 1;
    option.textContent = attending
      ? count === 1
        ? "Somente eu"
        : `Eu e mais ${count - 1} pessoa${count > 2 ? "s" : ""}`
      : count === 1
        ? "Somente eu"
        : `${count} pessoas`;
  });

  if (messageLabel) {
    messageLabel.textContent = attending
      ? "Mensagem para os noivos"
      : "Se quiser, conte o motivo de não poder ir";
  }
  if (messageInput) {
    messageInput.placeholder = attending
      ? "Deixe uma mensagem carinhosa"
      : "Conte brevemente o motivo (opcional)";
  }

  guestsSelect.required = true;
  renderGuestFields(form, guestsSelect, guestList);
}

/**
 * Envia uma cópia dos dados do RSVP para a planilha via Google Apps Script.
 * Usa mode "no-cors": a resposta é opaca e sempre "resolve" com sucesso,
 * mesmo que o script no backend falhe silenciosamente. O catch aqui só
 * cobre falhas de rede (ex.: sem internet), não erros de lógica no backend.
 */
function sendRsvp(body, { people, responsible, phone, message, attendance }) {
  if (!body.dataset.rsvpEndpoint) return Promise.resolve();

  return fetch(body.dataset.rsvpEndpoint, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      token: body.dataset.rsvpToken,
      responsavel: responsible,
      telefone: phone,
      mensagem: message,
      presenca: attendance,
      convidados: people.map((name, index) => ({
        numero: index + 1,
        nome: name,
        confirmado: attendance === "sim" ? "Sim" : "Não",
        whatsapp: index ? "" : phone,
      })),
    }),
  });
}

function buildWhatsAppMessage({ attendance, responsible, phone, people, message }) {
  const intro = [`Oi! Aqui é ${responsible}.`, `WhatsApp para contato: ${phone}.`];
  const summary =
    attendance === "sim"
      ? `Confirmo presença no casamento para ${people.length} pessoa(s):`
      : `Gostaria de cancelar a presença de ${people.length} pessoa(s):`;
  const lines = [...intro, summary, ...people.map((name, index) => `${index + 1}. ${name}`)];
  if (message) lines.push(`${attendance === "sim" ? "Mensagem" : "Motivo"}: ${message}`);
  return lines.join("\n");
}

function showTemporaryStatus(status, text, delay = STATUS_RESET_DELAY_MS) {
  if (!status) return;
  status.textContent = text;
  window.setTimeout(() => {
    status.textContent = "";
  }, delay);
}

export function setupRsvp() {
  const form = document.querySelector(".rsvp-form");
  if (!form) return;

  const body = document.body;
  const guestsSelect = form.querySelector("[data-guests-select]");
  const guestList = form.querySelector("[data-guest-list]");

  const refreshAttendanceFields = () => updateAttendanceFields(form, guestsSelect, guestList);
  const refreshGuestFields = () => renderGuestFields(form, guestsSelect, guestList);

  const submitRsvp = async (event) => {
    event.preventDefault();

    // honeypot anti-spam: se o campo invisível foi preenchido, ignora o envio
    if (form.elements.website?.value) return;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const attendance = String(data.get("presenca") || "sim");
    const responsible = String(data.get("responsavel") || "Convidado").trim();
    const phone = String(data.get("telefone") || "").trim();
    const companions = data
      .getAll("nomesAcompanhantes")
      .map(String)
      .map((name) => name.trim())
      .filter(Boolean);
    const people = [responsible, ...companions];
    const message = String(data.get("mensagem") || "").trim();

    const whatsappText = buildWhatsAppMessage({ attendance, responsible, phone, people, message });
    const status = form.querySelector(".form-status");
    const submitButton = form.querySelector('button[type="submit"]');

    if (status) {
      status.textContent =
        attendance === "sim"
          ? "Enviando sua confirmação…"
          : "Abrindo o WhatsApp para o cancelamento…";
    }
    if (submitButton) submitButton.disabled = true;

    window.open(
      `https://wa.me/${body.dataset.whatsapp}?text=${encodeURIComponent(whatsappText)}`,
      "_blank",
      "noopener,noreferrer",
    );

    const finish = () => {
      form.reset();
      refreshAttendanceFields();
      showTemporaryStatus(
        status,
        "Dados preparados. Conclua o envio na conversa do WhatsApp que foi aberta.",
      );
      if (submitButton) submitButton.disabled = false;
    };

    if (attendance === "nao") {
      void sendRsvp(body, { people, responsible, phone, message, attendance }).catch((error) =>
        console.error("Não foi possível registrar o cancelamento na planilha.", error),
      );
      finish();
      return;
    }

    try {
      await sendRsvp(body, { people, responsible, phone, message, attendance });
      finish();
    } catch (error) {
      console.error("Não foi possível enviar o RSVP para a planilha.", error);
      if (status) {
        status.textContent =
          "O WhatsApp foi aberto, mas não conseguimos registrar na planilha. Seus dados foram mantidos para tentar novamente.";
      }
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  };

  const formatPhoneInput = (event) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 11);
    event.target.value =
      digits.length <= 2
        ? digits
          ? `(${digits}`
          : ""
        : digits.length <= 7
          ? `(${digits.slice(0, 2)}) ${digits.slice(2)}`
          : `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  form.addEventListener("submit", submitRsvp);
  form.addEventListener("change", (event) => {
    if (event.target.name === "presenca") refreshAttendanceFields();
  });
  guestsSelect?.addEventListener("change", refreshGuestFields);
  form.querySelector("[data-phone-input]")?.addEventListener("input", formatPhoneInput);

  document.querySelector(".calendar-button")?.addEventListener("click", () => {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: "Casamento Camila e Matheus",
      dates: "20270807T193000Z/20270808T000000Z",
      details: "Chegada a partir das 16h. Estacionamento disponível no local.",
      location: "Chácara do Italiano, BR-414, Jardim Promissão, Anápolis - GO",
    });
    window.open(
      `https://calendar.google.com/calendar/render?${params}`,
      "_blank",
      "noopener,noreferrer",
    );
  });

  refreshGuestFields();
  refreshAttendanceFields();
}
