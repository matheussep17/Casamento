/**
 * Navegação do cabeçalho: menu mobile, scroll suave para âncoras e
 * destaque do link ativo conforme a rolagem da página.
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

export function setupNavigation() {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");

  const scrollToTarget = (target, behavior = "smooth") => {
    if (!target) return;
    scrollTo({
      top: target.id === "inicio"
        ? 0
        : Math.max(target.offsetTop - (header?.offsetHeight || 0) - 16, 0),
      behavior,
    });
  };

  const closeMenu = () => {
    header?.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = header?.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  document.addEventListener("click", (event) => {
    if (header?.classList.contains("menu-open") && !event.target.closest(".site-header")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    const target = document.querySelector(anchor.hash);
    if (!target) return;
    event.preventDefault();
    if (location.hash !== anchor.hash) {
      history.pushState(null, "", anchor.hash);
    }
    scrollToTarget(target);
    closeMenu();
  });

  const scrollToLocationHash = () => {
    if (!location.hash) {
      scrollToTarget(document.querySelector("#inicio"), "auto");
      return;
    }
    const target = document.querySelector(location.hash);
    if (target) scrollToTarget(target, "auto");
  };

  window.addEventListener("load", scrollToLocationHash);
  window.addEventListener("hashchange", scrollToLocationHash);
  window.addEventListener("popstate", scrollToLocationHash);

  if (document.readyState === "complete") {
    requestAnimationFrame(scrollToLocationHash);
  } else if (location.hash) {
    requestAnimationFrame(scrollToLocationHash);
  }

  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const items = links
    .map((link) => ({ link, section: document.querySelector(link.hash) }))
    .filter((item) => item.section)
    .sort((a, b) => a.section.offsetTop - b.section.offsetTop);

  const updateActiveLink = () => {
    const line = (header?.offsetHeight || 0) + 32;
    const current = [...items]
      .reverse()
      .find((item) => item.section.getBoundingClientRect().top <= line);
    links.forEach((link) => link.classList.toggle("is-active", link === current?.link));
  };

  addEventListener("scroll", throttleWithRaf(updateActiveLink), { passive: true });
  updateActiveLink();

  return { closeMenu };
}
