const weddingPages = {
  casamento: {
    meta: {
      title: "Camila & Matheus | Casamento",
      description:
        "Site de casamento com informações da cerimônia, recepção, confirmação de presença e lista de presentes.",
    },
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85",
    brand: "C & M",
    nav: ["História", "Evento", "Traje", "Presença", "Presentes"],
    hero: {
      eyebrow: "Casamento",
      coupleName: "Camila & Matheus",
      dateLabel: "14 de agosto de 2027",
      weddingDate: "2027-08-14T16:30:00-03:00",
      text:
        "Estamos preparando cada detalhe com muito carinho para celebrar o amor que Deus cultivou entre nós, unindo nossos corações e dando início aos sonhos que florescem em nossa nova jornada.",
    },
    story: {
      eyebrow: "Nossa história",
      title: "Dois caminhos unidos pelo amor e uma história que seguirá para sempre.",
      cards: [
        {
          step: "01",
          title: "O começo",
          text:
            "Uma conversa virou companhia, a companhia virou escolha, e aos poucos entendemos que Deus estava escrevendo uma história bonita em nós.",
        },
        {
          step: "02",
          title: "O pedido",
          text:
            "O sim veio com a certeza tranquila de quem já sonhava junto: começar uma nova família cercados de amor, fé e gratidão.",
        },
        {
          step: "03",
          title: "O grande dia",
          text:
            "Agora queremos celebrar esse passo com pessoas especiais, pedindo a bênção de Deus para a vida que vamos construir lado a lado.",
        },
      ],
    },
    photos: [
      { src: "fotos/foto-1.jpeg?v=photo-2", alt: "Camila e Matheus juntos na foto 1" },
      { src: "fotos/foto-2.jpeg", alt: "Camila e Matheus juntos na foto 2" },
      { src: "fotos/foto-3.jpeg", alt: "Camila e Matheus juntos na foto 3" },
      { src: "fotos/foto-4.jpeg", alt: "Camila e Matheus juntos na foto 4" },
      { src: "fotos/foto-5.jpeg", alt: "Camila e Matheus juntos na foto 5" },
    ],
    event: {
      eyebrow: "Programação",
      title: "Todos os detalhes para compartilhar esse dia tão especial conosco.",
      main: {
        time: "16:30 até 21:00",
        title: "Cerimônia & Recepção",
        location: "Chácara do italiano",
        address: "BR-414 - Jardim Promissão, Anápolis - GO, 75073-815",
      },
      attire: {
        time: "Traje",
        title: "Social elegante",
        text: "Para as madrinhas, sugerimos estas cores:",
        colors: [
          { name: "Rosa bebê", color: "#FF8DC4" },
          { name: "Rosa blush", color: "#F67BB6" },
          { name: "Rosa chiclete", color: "#F163A8" },
          { name: "Rosa pink", color: "#ED4D9A" },
        ],
        note: "Evite branco, off-white e tons de noiva.",
      },
      mapLink: "https://maps.app.goo.gl/Md8mdx3pKJH91gai7",
    },
    rsvp: {
      eyebrow: "Confirme sua presença",
      title: "Sua resposta nos ajuda a cuidar de cada detalhe.",
      note:
        "Para recebermos todos com carinho, confirme apenas as pessoas que já estão na lista de convidados. Assim conseguimos organizar os lugares e evitar qualquer imprevisto no dia.",
      status: "Abrindo WhatsApp para concluir a confirmação...",
      selectOptions: ["1 pessoa", "2 pessoas", "3 pessoas", "4 pessoas"],
    },
    gifts: {
      eyebrow: "Lista de presentes",
      title: "Aos que desejarem nos presentear deixando um link abaixo.",
      listCard: {
        label: "Casa nova",
        title: "Lista digital",
        text: "Itens para montar nosso lar com carinho.",
        href: "#",
      },
      pixCard: {
        label: "Pix",
        title: "Cota livre",
        text: "Obrigado por fazer parte da nossa história!",
        qrSrc: "fotos/pix-qrcode.jpeg",
        qrAlt: "QR Code Pix de Matheus Torres Ribeiro",
        keyLabel: "Chave Pix",
        keyValue: "62992304054",
        nameLabel: "Nome",
        nameValue: "Matheus Torres Ribeiro",
        bankLabel: "Banco",
        bankValue: "Nubank",
        buttonText: "Copiar chave Pix",
        copiedText: "Chave Pix copiada.",
      },
    },
    footer: {
      text: "Com amor, Camila & Matheus",
    },
    whatsappNumber: "5562992304054",
  },
};

const getWeddingSlug = () => {
  const segments = window.location.pathname.split("/").filter(Boolean);

  if (!segments.length) return "casamento";

  const lastSegment = segments[segments.length - 1]?.toLowerCase();
  const candidate =
    lastSegment === "index.html" && segments.length > 1
      ? segments[segments.length - 2]?.toLowerCase()
      : lastSegment;

  return candidate && weddingPages[candidate] ? candidate : "casamento";
};

const currentWedding = weddingPages[getWeddingSlug()] ?? weddingPages.casamento;
const assetBase = document.documentElement.dataset.assetBase || "./";

const header = document.querySelector(".site-header");
const countdown = document.querySelector(".countdown");
const form = document.querySelector(".rsvp-form");
const carousel = document.querySelector("[data-carousel]");
const guestsSelect = form?.querySelector("[data-guests-select]");
const guestList = form?.querySelector("[data-guest-list]");

const resolveAssetPath = (path) => new URL(path, new URL(assetBase, document.baseURI)).href;

const setText = (selector, value, root = document) => {
  const element = root.querySelector(selector);
  if (element) element.textContent = value;
};

const setMetaContent = (name, content) => {
  let element = document.head.querySelector(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.append(element);
  }

  element.setAttribute("content", content);
};

const updateHeader = () => {
  if (!header) return;
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
  guestList.replaceChildren();

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

const renderNavigation = () => {
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  navLinks.forEach((link, index) => {
    if (currentWedding.nav[index]) link.textContent = currentWedding.nav[index];
  });
};

const renderHero = () => {
  setText(".brand", currentWedding.brand);
  setText(".hero .eyebrow", currentWedding.hero.eyebrow);
  setText(".hero h1", currentWedding.hero.coupleName);
  setText(".hero-date", currentWedding.hero.dateLabel);
  setText(".hero-text", currentWedding.hero.text);

  if (currentWedding.heroImage) {
    document.documentElement.style.setProperty(
      "--hero-image",
      `url("${resolveAssetPath(currentWedding.heroImage)}")`,
    );
  }

  if (countdown) {
    countdown.dataset.weddingDate = currentWedding.hero.weddingDate;
  }
};

const renderStory = () => {
  const storySection = document.querySelector("#historia");
  const storyGrid = storySection?.querySelector(".story-grid");

  if (!storySection || !storyGrid) return;

  setText("#historia .eyebrow", currentWedding.story.eyebrow);
  setText("#historia h2", currentWedding.story.title);

  storyGrid.replaceChildren();

  currentWedding.story.cards.forEach((card) => {
    const article = document.createElement("article");
    const step = document.createElement("span");
    const title = document.createElement("h3");
    const text = document.createElement("p");

    step.textContent = card.step;
    title.textContent = card.title;
    text.textContent = card.text;

    article.append(step, title, text);
    storyGrid.append(article);
  });
};

const renderCarousel = () => {
  if (!carousel) return;

  const track = carousel.querySelector(".carousel-track");
  const dots = carousel.querySelector(".carousel-dots");

  if (!track || !dots) return;

  track.replaceChildren();
  dots.replaceChildren();

  currentWedding.photos.forEach((photo, index) => {
    const slide = document.createElement("img");
    const dot = document.createElement("button");

    slide.className = `carousel-slide${index === 0 ? " is-active" : ""}`;
    slide.src = resolveAssetPath(photo.src);
    slide.alt = photo.alt;
    if (index !== 0) slide.loading = "lazy";

    dot.type = "button";
    dot.dataset.carouselDot = String(index);
    dot.ariaLabel = `Mostrar foto ${index + 1}`;
    if (index === 0) dot.classList.add("is-active");

    track.append(slide);
    dots.append(dot);
  });
};

const renderEvent = () => {
  const eventSection = document.querySelector("#evento");
  const eventCards = [...document.querySelectorAll("#evento .event-card")];

  if (!eventSection || eventCards.length < 2) return;

  setText("#evento .eyebrow", currentWedding.event.eyebrow);
  setText("#evento h2", currentWedding.event.title);

  const [mainCard, attireCard] = eventCards;
  setText(".time", currentWedding.event.main.time, mainCard);
  setText("h3", currentWedding.event.main.title, mainCard);
  setText(".event-location", currentWedding.event.main.location, mainCard);
  setText(".event-address", currentWedding.event.main.address, mainCard);

  setText(".time", currentWedding.event.attire.time, attireCard);
  setText("h3", currentWedding.event.attire.title, attireCard);
  const attireParagraph = attireCard.querySelector(".attire-text");
  if (attireParagraph) attireParagraph.textContent = currentWedding.event.attire.text;

  const colorsList = attireCard.querySelector(".color-list");
  if (colorsList) {
    colorsList.innerHTML = "";
    currentWedding.event.attire.colors.forEach((item) => {
      const li = document.createElement("li");
      li.className = "color-item";

      const swatch = document.createElement("span");
      swatch.className = "color-swatch";
      swatch.style.backgroundColor = item.color;
      swatch.setAttribute("aria-hidden", "true");

      const label = document.createElement("span");
      label.className = "color-name";
      label.textContent = item.name;

      li.append(swatch, label);
      colorsList.append(li);
    });
  }

  const attireNote = attireCard.querySelector(".attire-note");
  if (attireNote) attireNote.textContent = currentWedding.event.attire.note;

  const mapLink = eventSection.querySelector(".map-link");
  if (mapLink) mapLink.href = currentWedding.event.mapLink;
};

const renderRsvp = () => {
  const rsvpSection = document.querySelector("#rsvp");
  if (!rsvpSection) return;

  setText("#rsvp .eyebrow", currentWedding.rsvp.eyebrow);
  setText("#rsvp h2", currentWedding.rsvp.title);
  setText(".rsvp-note", currentWedding.rsvp.note);

  if (guestsSelect) {
    guestsSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecione";
    guestsSelect.append(defaultOption);

    currentWedding.rsvp.selectOptions.forEach((label, index) => {
      const option = document.createElement("option");
      option.value = String(index + 1);
      option.textContent = label;
      guestsSelect.append(option);
    });
  }
};

const renderGifts = () => {
  const giftsSection = document.querySelector("#presentes");
  const giftGrid = giftsSection?.querySelector(".gift-grid");

  if (!giftsSection || !giftGrid) return;

  setText("#presentes .eyebrow", currentWedding.gifts.eyebrow);
  setText("#presentes h2", currentWedding.gifts.title);

  giftGrid.replaceChildren();

  const linkCard = document.createElement("a");
  linkCard.className = "gift-card";
  linkCard.href = currentWedding.gifts.listCard.href;
  linkCard.setAttribute("aria-label", "Abrir lista de presentes");

  const linkSpan = document.createElement("span");
  const linkStrong = document.createElement("strong");
  const linkParagraph = document.createElement("p");
  linkSpan.textContent = currentWedding.gifts.listCard.label;
  linkStrong.textContent = currentWedding.gifts.listCard.title;
  linkParagraph.textContent = currentWedding.gifts.listCard.text;
  linkCard.append(linkSpan, linkStrong, linkParagraph);

  const pixCard = document.createElement("article");
  pixCard.className = "gift-card pix-card";
  pixCard.setAttribute("aria-label", "Dados para presente via Pix");

  const pixSpan = document.createElement("span");
  const pixStrong = document.createElement("strong");
  const pixParagraph = document.createElement("p");
  const pixImage = document.createElement("img");
  const pixDetails = document.createElement("dl");
  const pixButton = document.createElement("button");
  const pixStatus = document.createElement("p");

  pixSpan.textContent = currentWedding.gifts.pixCard.label;
  pixStrong.textContent = currentWedding.gifts.pixCard.title;
  pixParagraph.textContent = currentWedding.gifts.pixCard.text;
  pixImage.className = "pix-qr-code";
  pixImage.src = resolveAssetPath(currentWedding.gifts.pixCard.qrSrc);
  pixImage.alt = currentWedding.gifts.pixCard.qrAlt;

  const detailRows = [
    [currentWedding.gifts.pixCard.keyLabel, currentWedding.gifts.pixCard.keyValue],
    [currentWedding.gifts.pixCard.nameLabel, currentWedding.gifts.pixCard.nameValue],
    [currentWedding.gifts.pixCard.bankLabel, currentWedding.gifts.pixCard.bankValue],
  ];

  detailRows.forEach(([term, definition], index) => {
    const row = document.createElement("div");
    const termNode = document.createElement("dt");
    const termStrong = document.createElement("strong");
    const definitionNode = document.createElement("dd");

    row.className = "pix-row";
    if (index === 0) row.classList.add("pix-row--key");

    termStrong.textContent = term;
    termNode.append(termStrong);
    definitionNode.textContent = definition;
    row.append(termNode, definitionNode);
    pixDetails.append(row);
  });

  pixButton.className = "button primary presence-button pix-copy-button";
  pixButton.type = "button";
  pixButton.dataset.copyPix = currentWedding.gifts.pixCard.keyValue;
  pixButton.textContent = currentWedding.gifts.pixCard.buttonText;

  pixStatus.className = "pix-copy-status";
  pixStatus.setAttribute("role", "status");
  pixStatus.setAttribute("aria-live", "polite");

  pixCard.append(pixSpan, pixStrong, pixParagraph, pixImage, pixDetails, pixButton, pixStatus);
  giftGrid.append(linkCard, pixCard);
};

const renderFooter = () => {
  setText(".footer p", currentWedding.footer.text);
};

const renderDocument = () => {
  document.title = currentWedding.meta.title;
  setMetaContent("description", currentWedding.meta.description);

  renderNavigation();
  renderHero();
  renderStory();
  renderCarousel();
  renderEvent();
  renderRsvp();
  renderGifts();
  renderFooter();
  renderGuestFields();
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
  const guestListText = guestNames.map((guest, index) => `${index + 1}. ${guest}`).join("\n");

  const text = [
    `Oi! Aqui é ${responsible}.`,
    `Confirmo presença no casamento para ${guestNames.length} pessoa(s):`,
    guestListText,
    message ? `Mensagem: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (status) status.textContent = currentWedding.rsvp.status;

  window.open(
    `https://wa.me/${currentWedding.whatsappNumber}?text=${encodeURIComponent(text)}`,
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

  if (!slides.length || !dots.length) return;

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

const copyPixKey = async (button) => {
  const pixKey = button?.dataset.copyPix;
  const status = button?.closest(".pix-card")?.querySelector(".pix-copy-status");

  if (!pixKey) return;

  try {
    await navigator.clipboard.writeText(pixKey);
    if (status) status.textContent = currentWedding.gifts.pixCard.copiedText;
  } catch {
    if (status) status.textContent = `Chave Pix: ${pixKey}`;
  }
};

window.addEventListener("scroll", updateHeader, { passive: true });
form?.addEventListener("submit", handleSubmit);
guestsSelect?.addEventListener("change", renderGuestFields);
document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-copy-pix]");
  if (button) copyPixKey(button);
});

renderDocument();
updateHeader();
updateCountdown();
setupCarousel();
window.setInterval(updateCountdown, 1000);
