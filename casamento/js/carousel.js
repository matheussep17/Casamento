/**
 * Carrossel de fotos do casal: autoplay, navegação por botões/dots/teclado/swipe,
 * pausando quando o usuário interage ou a aba não está visível.
 */

const AUTOPLAY_INTERVAL_MS = 5200;
const SWIPE_THRESHOLD_PX = 50;

export function setupCarousel() {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return null;

  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  let active = 0;
  let timer = null;
  let startX;

  const show = (index) => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const isActive = i === active;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.tabIndex = isActive ? 0 : -1;
      slide.setAttribute("role", "button");
      slide.setAttribute("aria-label", `${slide.alt}. Abrir foto ampliada`);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === active);
      if (i === active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  };

  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  const canAutoplay = () =>
    !reduceMotion.matches &&
    !document.hidden &&
    !carousel.matches(":hover") &&
    !carousel.contains(document.activeElement);

  const start = () => {
    stop();
    if (canAutoplay()) timer = setInterval(() => show(active + 1), AUTOPLAY_INTERVAL_MS);
  };

  const interact = (direction) => {
    show(active + direction);
    stop();
  };

  carousel.querySelectorAll("[data-carousel-control]").forEach((button) => {
    button.addEventListener("click", () =>
      interact(button.dataset.carouselControl === "next" ? 1 : -1),
    );
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      show(Number(dot.dataset.carouselDot));
      stop();
    });
  });

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", start);

  carousel.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
  });
  carousel.addEventListener("pointerup", (event) => {
    const distance = event.clientX - startX;
    if (Math.abs(distance) >= SWIPE_THRESHOLD_PX) interact(distance < 0 ? 1 : -1);
    startX = undefined;
  });

  window.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    if (document.querySelector(".photo-lightbox")?.open) return;
    if (event.target.closest?.("input, select, textarea, [contenteditable='true']")) return;

    const bounds = carousel.getBoundingClientRect();
    const isVisible = bounds.bottom > 0 && bounds.top < innerHeight;
    if (!isVisible) return;

    event.preventDefault();
    interact(event.key === "ArrowLeft" ? -1 : 1);
  });

  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  reduceMotion.addEventListener?.("change", start);

  show(0);
  start();

  return {
    carousel,
    slides,
    show,
    get active() {
      return active;
    },
  };
}
