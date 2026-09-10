/**
 * Lightbox de fotos: abre a foto ampliada ao clicar/teclar em um slide do
 * carrossel, com navegação, fechamento e suporte a tela cheia (com fallback
 * via classe CSS quando a Fullscreen API não está disponível).
 */
export function setupLightbox(carouselState) {
  const dialog = document.querySelector(".photo-lightbox");
  const image = dialog?.querySelector("img");
  if (!dialog || !image || !carouselState) return;

  const { carousel, slides } = carouselState;
  const fullscreenButton = dialog.querySelector(".lightbox-fullscreen");
  let active = 0;

  const show = (index) => {
    active = (index + slides.length) % slides.length;
    image.src = slides[active].src;
    image.alt = slides[active].alt;
  };

  const open = (index) => {
    show(index);
    dialog.showModal();
    dialog.focus({ preventScroll: true });
  };

  const setFullscreenLabel = (isFullscreen) => {
    fullscreenButton?.setAttribute(
      "aria-label",
      isFullscreen ? "Sair da tela cheia" : "Entrar em tela cheia",
    );
  };

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    if (dialog.classList.contains("is-fullscreen-fallback")) {
      dialog.classList.remove("is-fullscreen-fallback");
      setFullscreenLabel(false);
      return;
    }
    try {
      if (!dialog.requestFullscreen) throw new Error("Fullscreen API indisponível");
      await dialog.requestFullscreen();
    } catch {
      dialog.classList.add("is-fullscreen-fallback");
      setFullscreenLabel(true);
    }
  };

  carousel.addEventListener("click", (event) => {
    const slide = event.target.closest(".carousel-slide");
    if (slide) open(slides.indexOf(slide));
  });

  carousel.addEventListener("keydown", (event) => {
    const slide = event.target.closest(".carousel-slide");
    if (slide && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      open(slides.indexOf(slide));
    }
  });

  dialog.querySelector(".lightbox-close")?.addEventListener("click", () => dialog.close());

  dialog.querySelectorAll("[data-lightbox-control]").forEach((button) => {
    button.addEventListener("click", () =>
      show(active + (button.dataset.lightboxControl === "next" ? 1 : -1)),
    );
  });

  fullscreenButton?.addEventListener("click", toggleFullscreen);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  window.addEventListener(
    "keydown",
    (event) => {
      if (!dialog.open) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        event.stopPropagation();
        show(active + (event.key === "ArrowLeft" ? -1 : 1));
      }
    },
    true,
  );

  document.addEventListener("fullscreenchange", () =>
    setFullscreenLabel(Boolean(document.fullscreenElement)),
  );

  dialog.addEventListener("close", () => {
    dialog.classList.remove("is-fullscreen-fallback");
    setFullscreenLabel(false);
    if (document.fullscreenElement === dialog) void document.exitFullscreen();
  });
}
