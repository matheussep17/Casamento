const weddingConfig = {
  whatsappNumber: "5562992304054",
};

const header = document.querySelector(".site-header");
const countdown = document.querySelector(".countdown");
const form = document.querySelector(".rsvp-form");
const carousel = document.querySelector("[data-carousel]");
const pixCopyButton = document.querySelector("[data-copy-pix]");
const guestsSelect = form?.querySelector("[data-guests-select]");
const guestList = form?.querySelector("[data-guest-list]");

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

const renderGuestFields = () => {
  if (!guestsSelect || !guestList) return;

  const guestCount = Number(guestsSelect.value || 0);
  guestList.innerHTML = "";

  for (let index = 1; index <= guestCount; index += 1) {
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.textContent = `Nome do convidado ${index}`;
    input.type = "text";
    input.name = "nomesConvidados";
    input.placeholder = index === 1 ? "Nome completo" : "Nome de quem vai junto";
    input.required = true;

    label.append(input);
    guestList.append(label);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const responsible = data.get("responsavel")?.toString().trim() || "Convidado";
  const guestNames = data
    .getAll("nomesConvidados")
    .map((guest) => guest.toString().trim())
    .filter(Boolean);
  const message = data.get("mensagem")?.toString().trim();
  const status = form.querySelector(".form-status");
  const guestListText = guestNames
    .map((guest, index) => `${index + 1}. ${guest}`)
    .join("\n");

  const text = [
    `Oi! Aqui é ${responsible}.`,
    `Confirmo presença no casamento para ${guestNames.length} pessoa(s):`,
    guestListText,
    message ? `Mensagem: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  status.textContent = "Abrindo WhatsApp para concluir a confirmação...";
  window.open(
    `https://wa.me/${weddingConfig.whatsappNumber}?text=${encodeURIComponent(text)}`,
    "_blank",
  );
};

const setupCarousel = () => {
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
  const controls = [...carousel.querySelectorAll("[data-carousel-control]")];
  let activeIndex = 0;
  let autoplayId;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  };

  const startAutoplay = () => {
    window.clearInterval(autoplayId);
    autoplayId = window.setInterval(() => showSlide(activeIndex + 1), 5200);
  };

  controls.forEach((control) => {
    control.addEventListener("click", () => {
      showSlide(activeIndex + (control.dataset.carouselControl === "next" ? 1 : -1));
      startAutoplay();
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.carouselDot));
      startAutoplay();
    });
  });

  showSlide(0);
  startAutoplay();
};

const copyPixKey = async () => {
  if (!pixCopyButton) return;

  const pixKey = pixCopyButton.dataset.copyPix;
  const status = document.querySelector(".pix-copy-status");

  try {
    await navigator.clipboard.writeText(pixKey);
    status.textContent = "Chave Pix copiada.";
  } catch {
    status.textContent = `Chave Pix: ${pixKey}`;
  }
};

window.addEventListener("scroll", updateHeader, { passive: true });
form?.addEventListener("submit", handleSubmit);
guestsSelect?.addEventListener("change", renderGuestFields);
pixCopyButton?.addEventListener("click", copyPixKey);

updateHeader();
updateCountdown();
renderGuestFields();
setupCarousel();
setInterval(updateCountdown, 1000);
