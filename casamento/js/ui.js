/**
 * Elementos flutuantes de UI: header com fundo ao rolar, botão "voltar ao
 * topo" e cópia da chave Pix para a área de transferência.
 */

function throttleWithRaf(callback) {
  let scheduled = false;
  return () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      callback();
    });
  };
}

export function setupFloatingUi() {
  const header = document.querySelector(".site-header");
  const footer = document.querySelector(".footer");
  const backToTop = document.querySelector(".back-to-top");

  const update = () => {
    const footerIsVisible = footer && footer.getBoundingClientRect().top < innerHeight;
    header?.classList.toggle("is-scrolled", scrollY > 24);
    backToTop?.classList.toggle("is-visible", scrollY > innerHeight && !footerIsVisible);
  };

  const throttledUpdate = throttleWithRaf(update);
  addEventListener("scroll", throttledUpdate, { passive: true });
  addEventListener("resize", throttledUpdate, { passive: true });

  backToTop?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  update();
}

export function setupPixCopy() {
  document.addEventListener("click", async (event) => {
    const copyButton = event.target.closest("[data-copy-pix]");
    if (!copyButton) return;

    const status = copyButton.closest(".pix-card")?.querySelector(".pix-copy-status");
    const pixKey = copyButton.dataset.copyPix;

    try {
      await navigator.clipboard.writeText(pixKey);
      if (status) status.textContent = "Chave Pix copiada.";
    } catch {
      if (status) status.textContent = `Chave Pix: ${pixKey}`;
    }
  });
}

/**
 * Evita que o navegador restaure a posição de rolagem ao recarregar a
 * página (exceto quando há uma âncora na URL).
 */
export function setupScrollRestoration() {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.addEventListener("load", () => {
    if (!location.hash) scrollTo(0, 0);
  });
}
