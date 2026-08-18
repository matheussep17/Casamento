if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.addEventListener("load", () => { if (!location.hash) scrollTo(0, 0); });

const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const countdown = document.querySelector(".countdown");
const form = document.querySelector(".rsvp-form");
const guestsSelect = form?.querySelector("[data-guests-select]");
const guestList = form?.querySelector("[data-guest-list]");
const carousel = document.querySelector("[data-carousel]");

const updateCountdown = () => {
  if (!countdown) return;
  const left = Math.max(new Date(countdown.dataset.weddingDate).getTime() - Date.now(), 0);
  const values = { days: Math.floor(left / 86400000), hours: Math.floor(left / 3600000) % 24, minutes: Math.floor(left / 60000) % 60, seconds: Math.floor(left / 1000) % 60 };
  Object.entries(values).forEach(([key, value]) => {
    const node = countdown.querySelector(`[data-countdown="${key}"]`);
    if (node) node.textContent = String(value).padStart(key === "days" ? 3 : 2, "0");
  });
};

const renderGuestFields = () => {
  if (!guestList || !guestsSelect) return;
  guestList.replaceChildren();
  const attending = form?.elements.presenca?.value !== "nao";
  const labels = ["Primeiro", "Segundo", "Terceiro", "Quarto", "Quinto"];
  for (let index = 2; index <= Number(guestsSelect.value || 0); index += 1) {
    const label = document.createElement("label");
    label.textContent = attending ? `${labels[index - 2]} acompanhante` : `Nome da ${index}ª pessoa que está cancelando`;
    const input = document.createElement("input");
    Object.assign(input, { type: "text", name: "nomesAcompanhantes", placeholder: "Nome completo", required: true });
    label.append(input);
    guestList.append(label);
  }
};

const updateAttendanceFields = () => {
  if (!form || !guestsSelect) return;
  const attending = form.elements.presenca?.value !== "nao";
  form.querySelectorAll("[data-attending-field]").forEach((node) => { node.hidden = !attending; });
  form.querySelectorAll("[data-attending-action]").forEach((node) => { node.hidden = !attending; });
  const responsibleLabel = form.querySelector("[data-responsible-label]");
  const phoneLabel = form.querySelector("[data-phone-label]");
  const phoneInput = form.querySelector('[name="telefone"]');
  const partyLabel = form.querySelector("[data-party-label]");
  const messageLabel = form.querySelector("[data-message-label]");
  const messageInput = form.querySelector("[data-message-input]");
  if (phoneInput) phoneInput.required = attending;
  if (responsibleLabel) responsibleLabel.textContent = attending ? "Nome de quem está confirmando" : "Nome de quem está cancelando";
  if (phoneLabel) phoneLabel.textContent = attending ? "WhatsApp de quem está confirmando" : "WhatsApp de quem está cancelando (opcional)";
  if (partyLabel) partyLabel.textContent = attending ? "Quem você deseja confirmar?" : "Quantas pessoas você deseja cancelar?";
  [...guestsSelect.options].slice(1).forEach((option, index) => {
    const count = index + 1;
    option.textContent = attending
      ? (count === 1 ? "Somente eu" : `Eu e mais ${count - 1} pessoa${count > 2 ? "s" : ""}`)
      : (count === 1 ? "Somente eu" : `${count} pessoas`);
  });
  if (messageLabel) messageLabel.textContent = attending ? "Mensagem para os noivos" : "Se quiser, conte o motivo de não poder ir";
  if (messageInput) messageInput.placeholder = attending ? "Deixe uma mensagem carinhosa" : "Conte brevemente o motivo (opcional)";
  guestsSelect.required = true;
  renderGuestFields();
};

const sendRsvp = ({ people, responsible, phone, message, attendance }) => {
  if (!body.dataset.rsvpEndpoint) return Promise.resolve();
  return fetch(body.dataset.rsvpEndpoint, {
    method: "POST", mode: "no-cors", keepalive: true,
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      token: body.dataset.rsvpToken, responsavel: responsible, telefone: phone, mensagem: message,
      presenca: attendance,
      convidados: people.map((name, index) => ({ numero: index + 1, nome: name, confirmado: attendance === "sim" ? "Sim" : "Não", whatsapp: index ? "" : phone })),
    }),
  });
};

const submitRsvp = async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const attendance = String(data.get("presenca") || "sim");
  const responsible = String(data.get("responsavel") || "Convidado").trim();
  const phone = String(data.get("telefone") || "").trim();
  const companions = data.getAll("nomesAcompanhantes").map(String).map((name) => name.trim()).filter(Boolean);
  const people = [responsible, ...companions];
  const message = String(data.get("mensagem") || "").trim();
  const lines = attendance === "sim"
    ? [`Oi! Aqui é ${responsible}.`, `WhatsApp para contato: ${phone}.`, `Confirmo presença no casamento para ${people.length} pessoa(s):`, ...people.map((name, index) => `${index + 1}. ${name}`)]
    : [`Oi! Aqui é ${responsible}.`, `WhatsApp para contato: ${phone}.`, `Gostaria de cancelar a presença de ${people.length} pessoa(s):`, ...people.map((name, index) => `${index + 1}. ${name}`)];
  if (message) lines.push(`${attendance === "sim" ? "Mensagem" : "Motivo"}: ${message}`);
  const status = form.querySelector(".form-status");
  const submitButton = form.querySelector('button[type="submit"]');
  if (status) status.textContent = attendance === "sim" ? "Enviando sua confirmação…" : "Abrindo o WhatsApp para o cancelamento…";
  if (submitButton) submitButton.disabled = true;
  window.open(`https://wa.me/${body.dataset.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");

  if (attendance === "nao") {
    try {
      await sendRsvp({ people, responsible, phone, message, attendance });
      form.reset();
      updateAttendanceFields();
      if (status) status.textContent = "Cancelamento registrado e WhatsApp aberto para você concluir.";
      window.setTimeout(() => { if (status) status.textContent = ""; }, 6000);
    } catch (error) {
      console.error("Não foi possível registrar o cancelamento na planilha.", error);
      if (status) status.textContent = "O WhatsApp foi aberto, mas não conseguimos atualizar a planilha.";
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
    return;
  }

  try {
    await sendRsvp({ people, responsible, phone, message, attendance });
    form.reset();
    updateAttendanceFields();
    if (status) status.textContent = "Presença confirmada com sucesso.";
    window.setTimeout(() => { if (status) status.textContent = ""; }, 6000);
  } catch (error) {
    console.error("Não foi possível enviar o RSVP para a planilha.", error);
    if (status) status.textContent = "O WhatsApp foi aberto, mas não conseguimos registrar na planilha. Seus dados foram mantidos para tentar novamente.";
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
};

const setupCarousel = () => {
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let active = 0, timer, startX;
  const show = (index) => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.classList.toggle("is-active", i === active); slide.setAttribute("aria-hidden", String(i !== active)); });
    dots.forEach((dot, i) => { dot.classList.toggle("is-active", i === active); i === active ? dot.setAttribute("aria-current", "true") : dot.removeAttribute("aria-current"); });
  };
  const stop = () => { clearInterval(timer); timer = null; };
  const start = () => { stop(); if (!reduceMotion.matches && !document.hidden && !carousel.matches(":hover") && !carousel.contains(document.activeElement)) timer = setInterval(() => show(active + 1), 5200); };
  const interact = (direction) => { show(active + direction); stop(); };
  carousel.querySelectorAll("[data-carousel-control]").forEach((button) => button.addEventListener("click", () => interact(button.dataset.carouselControl === "next" ? 1 : -1)));
  dots.forEach((dot) => dot.addEventListener("click", () => { show(Number(dot.dataset.carouselDot)); stop(); }));
  carousel.addEventListener("mouseenter", stop); carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", stop); carousel.addEventListener("focusout", start);
  carousel.addEventListener("pointerdown", (event) => { startX = event.clientX; });
  carousel.addEventListener("pointerup", (event) => { const distance = event.clientX - startX; if (Math.abs(distance) >= 50) interact(distance < 0 ? 1 : -1); startX = undefined; });
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  reduceMotion.addEventListener?.("change", start);
  show(0); start();
};

const setupLightbox = () => {
  const dialog = document.querySelector(".photo-lightbox"), image = dialog?.querySelector("img");
  if (!dialog || !image || !carousel) return;
  const slides = [...carousel.querySelectorAll(".carousel-slide")]; let active = 0;
  const show = (index) => { active = (index + slides.length) % slides.length; image.src = slides[active].src; image.alt = slides[active].alt; };
  carousel.addEventListener("click", (event) => { const slide = event.target.closest(".carousel-slide"); if (slide) { show(slides.indexOf(slide)); dialog.showModal(); } });
  dialog.querySelector(".lightbox-close")?.addEventListener("click", () => dialog.close());
  dialog.querySelectorAll("[data-lightbox-control]").forEach((button) => button.addEventListener("click", () => show(active + (button.dataset.lightboxControl === "next" ? 1 : -1))));
  dialog.querySelector(".lightbox-fullscreen")?.addEventListener("click", () => document.fullscreenElement ? document.exitFullscreen() : dialog.requestFullscreen?.());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", (event) => { if (event.key === "ArrowLeft") show(active - 1); if (event.key === "ArrowRight") show(active + 1); });
};

const closeMenu = () => { header?.classList.remove("menu-open"); menuToggle?.setAttribute("aria-expanded", "false"); };
const setupNavigation = () => {
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const items = links
    .map((link) => ({ link, section: document.querySelector(link.hash) }))
    .filter((item) => item.section)
    .sort((a, b) => a.section.offsetTop - b.section.offsetTop);
  const update = () => {
    const line = (header?.offsetHeight || 0) + 32;
    const current = [...items].reverse().find((item) => item.section.getBoundingClientRect().top <= line);
    links.forEach((link) => link.classList.toggle("is-active", link === current?.link));
  };
  addEventListener("scroll", update, { passive: true }); update();
};

document.addEventListener("click", async (event) => {
  const anchor = event.target.closest('a[href^="#"]');
  if (anchor) { const target = document.querySelector(anchor.hash); if (target) { event.preventDefault(); scrollTo({ top: Math.max(target.offsetTop - (header?.offsetHeight || 0) - 16, 0), behavior: "smooth" }); closeMenu(); } }
  const copy = event.target.closest("[data-copy-pix]");
  if (copy) { const status = copy.closest(".pix-card")?.querySelector(".pix-copy-status"); try { await navigator.clipboard.writeText(copy.dataset.copyPix); if (status) status.textContent = "Chave Pix copiada."; } catch { if (status) status.textContent = `Chave Pix: ${copy.dataset.copyPix}`; } }
});

form?.addEventListener("submit", submitRsvp);
form?.addEventListener("change", (event) => { if (event.target.name === "presenca") updateAttendanceFields(); });
guestsSelect?.addEventListener("change", renderGuestFields);
form?.querySelector("[data-phone-input]")?.addEventListener("input", (event) => { const d = event.target.value.replace(/\D/g, "").slice(0, 11); event.target.value = d.length <= 2 ? (d ? `(${d}` : "") : d.length <= 7 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`; });
document.querySelector(".calendar-button")?.addEventListener("click", () => { const params = new URLSearchParams({ action: "TEMPLATE", text: "Casamento Camila e Matheus", dates: "20270807T193000Z/20270808T000000Z", details: "Chegada a partir das 16h. Estacionamento disponível no local.", location: "Chácara do Italiano, BR-414, Jardim Promissão, Anápolis - GO" }); window.open(`https://calendar.google.com/calendar/render?${params}`, "_blank", "noopener,noreferrer"); });
menuToggle?.addEventListener("click", () => { const open = header?.classList.toggle("menu-open"); menuToggle.setAttribute("aria-expanded", String(Boolean(open))); });
document.querySelector(".back-to-top")?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
const updateFloatingUi = () => {
  const footer = document.querySelector(".footer");
  const backToTop = document.querySelector(".back-to-top");
  const footerIsVisible = footer && footer.getBoundingClientRect().top < innerHeight;
  header?.classList.toggle("is-scrolled", scrollY > 24);
  backToTop?.classList.toggle("is-visible", scrollY > innerHeight && !footerIsVisible);
};
addEventListener("scroll", updateFloatingUi, { passive: true });
addEventListener("resize", updateFloatingUi, { passive: true });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });

updateCountdown(); setInterval(updateCountdown, 1000); renderGuestFields(); updateAttendanceFields(); setupCarousel(); setupLightbox(); setupNavigation(); updateFloatingUi();
