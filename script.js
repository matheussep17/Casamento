const weddingConfig = {
  whatsappNumber: "5500000000000",
};

const header = document.querySelector(".site-header");
const countdown = document.querySelector(".countdown");
const form = document.querySelector(".rsvp-form");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const updateCountdown = () => {
  if (!countdown) return;

  const target = new Date(countdown.dataset.weddingDate).getTime();
  const now = Date.now();
  const distance = Math.max(target - now, 0);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  const values = { days, hours, minutes, seconds };

  Object.entries(values).forEach(([key, value]) => {
    const item = countdown.querySelector(`[data-countdown="${key}"]`);
    if (item) item.textContent = String(value).padStart(key === "days" ? 3 : 2, "0");
  });
};

const handleSubmit = (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = data.get("nome")?.toString().trim() || "Convidado";
  const guests = data.get("convidados") || "1";
  const message = data.get("mensagem")?.toString().trim();
  const status = form.querySelector(".form-status");

  const text = [
    `Oi! Aqui e ${name}.`,
    `Confirmo presenca no casamento para ${guests} pessoa(s).`,
    message ? `Mensagem: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  status.textContent = "Abrindo WhatsApp para concluir a confirmacao...";
  window.open(
    `https://wa.me/${weddingConfig.whatsappNumber}?text=${encodeURIComponent(text)}`,
    "_blank",
  );
};

window.addEventListener("scroll", updateHeader, { passive: true });
form?.addEventListener("submit", handleSubmit);

updateHeader();
updateCountdown();
setInterval(updateCountdown, 1000);
