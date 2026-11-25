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

  const getCleanUrl = (sectionId) => {
    const base = location.pathname.includes("/casamento/")
      ? "/casamento"
      : location.pathname === "/casamento"
        ? "/casamento"
        : "";
    return sectionId === "inicio" ? `${base}/` : `${base}/${sectionId}`;
  };

  const getSectionIdFromLocation = () => {
    if (location.hash) return decodeURIComponent(location.hash.slice(1));
    const segments = location.pathname.split("/").filter(Boolean);
    return segments.at(-1) || "inicio";
  };

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
    history.pushState(null, "", getCleanUrl(target.id));
    scrollToTarget(target);
    closeMenu();
  });

  const scrollToLocation = () => {
    const sectionId = getSectionIdFromLocation();
    if (sectionId === "inicio") {
      scrollToTarget(document.querySelector("#inicio"), "auto");
      return;
    }
    const target = document.querySelector(`#${CSS.escape(sectionId)}`);
    if (target) scrollToTarget(target, "auto");
  };

  window.addEventListener("load", scrollToLocation);
  window.addEventListener("hashchange", scrollToLocation);
  window.addEventListener("popstate", scrollToLocation);

  if (document.readyState === "complete") {
    requestAnimationFrame(scrollToLocation);
  } else if (location.hash || getSectionIdFromLocation() !== "inicio") {
    requestAnimationFrame(scrollToLocation);
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
