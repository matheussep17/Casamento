import { setupScrollRestoration, setupFloatingUi, setupPixCopy } from "./ui.js";
import { setupCountdown } from "./countdown.js";
import { setupRsvp } from "./rsvp.js";
import { setupCarousel } from "./carousel.js";
import { setupLightbox } from "./lightbox.js";
import { setupNavigation } from "./navigation.js";

setupScrollRestoration();

const carouselState = setupCarousel();

setupCountdown();
setupRsvp();
setupLightbox(carouselState);
setupNavigation();
setupFloatingUi();
setupPixCopy();
