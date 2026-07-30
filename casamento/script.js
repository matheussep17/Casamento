const weddingPages = {
  casamento: {
    meta: {
      title: "Camila & Matheus | Casamento",
      description:
        "Site de casamento com informa\u00e7\u00f5es da cerim\u00f4nia, recep\u00e7\u00e3o, confirma\u00e7\u00e3o de presen\u00e7a e lista de presentes.",
    },
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85",
    brand: "C & M",
    nav: ["Hist\u00f3ria", "Evento", "Traje", "Programa\u00e7\u00e3o", "Presen\u00e7a", "Presentes"],
    hero: {
      eyebrow: "Casamento",
      coupleName: "Camila & Matheus",
      dateLabel: "14 de agosto de 2027",
      weddingDate: "2027-08-14T16:30:00-03:00",
      text:
        "Estamos preparando cada detalhe com muito carinho para celebrar o amor que Deus cultivou entre n\u00f3s, unindo nossos cora\u00e7\u00f5es e dando in\u00edcio aos sonhos que florescem em nossa nova jornada.",
    },
    story: {
      eyebrow: "Nossa hist\u00f3ria",
      title: "Dois caminhos unidos pelo amor e uma hist\u00f3ria que seguir\u00e1 para sempre.",
      cards: [
        {
          step: "01",
          title: "O come\u00e7o",
          text:
            "Uma conversa virou companhia, a companhia virou escolha, e aos poucos entendemos que Deus estava escrevendo uma hist\u00f3ria bonita em n\u00f3s.",
        },
        {
          step: "02",
          title: "O pedido",
          text:
            "O sim veio com a certeza tranquila de quem j\u00e1 sonhava junto: come\u00e7ar uma nova fam\u00edlia cercados de amor, f\u00e9 e gratid\u00e3o.",
        },
        {
          step: "03",
          title: "O grande dia",
          text:
            "Agora queremos celebrar esse passo com pessoas especiais, pedindo a b\u00ean\u00e7\u00e3o de Deus para a vida que vamos construir lado a lado.",
        },
      ],
    },
    photos: [
      { src: "fotos/foto-1.webp", alt: "Camila e Matheus juntos na foto 1" },
      { src: "fotos/foto-2.webp", alt: "Camila e Matheus juntos na foto 2" },
      { src: "fotos/foto-3.webp", alt: "Camila e Matheus juntos na foto 3" },
      { src: "fotos/foto-4.webp", alt: "Camila e Matheus juntos na foto 4" },
      { src: "fotos/foto-5.webp", alt: "Camila e Matheus juntos na foto 5" },
    ],
    event: {
      eyebrow: "Evento",
      title: "Todos os detalhes para compartilhar esse dia t\u00e3o especial conosco.",
      main: {
        time: "16:30 at\u00e9 21:00",
        title: "Cerim\u00f4nia & Recep\u00e7\u00e3o",
        location: "Ch\u00e1cara do italiano",
        address: "BR-414 - Jardim Promiss\u00e3o, An\u00e1polis - GO, 75073-815",
      },
      attire: {
        time: "Traje",
        title: "Social elegante",
        arrival: "A cerimônia começa às 16h30. Sugerimos chegar a partir das 16h.",
        parking: "Estacionamento disponível no local.",
        groups: [
          {
            title: "Madrinhas",
            lines: [
              "Para tornar esse dia ainda mais especial, escolhemos uma paleta de tons de rosa que traduz a ess\u00eancia do nosso casamento.",
              "Como a cerim\u00f4nia acontecer\u00e1 em um espa\u00e7o ao ar livre, sobre a grama, sugerimos o uso de saltos blocados (quadrados) ou adaptadores de salto, garantindo mais conforto e seguran\u00e7a durante toda a celebra\u00e7\u00e3o.",
              "Cada madrinha poder\u00e1 escolher o vestido no tom que mais gostar, dentro da nossa paleta:",
            ],
            colors: [
              { name: "Rosa Beb\u00ea", color: "#F3B2D4" },
              { name: "Rosa Ballet", color: "#F68FC0" },
              { name: "Rosa Chiclete", color: "#F163A8" },
              { name: "Rosa Flamingo", color: "#ED4D9A" },
            ],
          },
          {
            title: "Padrinhos",
            lines: [
              "Para harmonizar com a paleta das madrinhas, sugerimos o uso de terno em cinza claro, camisa branca e gravata prata tradicional.",
            ],
            palettes: [
              {
                label: "Gravata",
                colors: [{ name: "Prata Tradicional", color: "#C0C0C0" }],
              },
              {
                label: "Terno",
                colors: [
                  { name: "Cinza Gelo / Claro", color: "#D3D3D3" },
                  { name: "Cinza Médio / Prata", color: "#C0C0C0" },
                ],
              },
            ],
          },
        ],
      },
      mapLink: "https://maps.app.goo.gl/Md8mdx3pKJH91gai7",
    },
    rsvp: {
      eyebrow: "Confirme sua presença",
      title: "Sua resposta nos ajuda a cuidar de cada detalhe.",
      note:
        "Para recebermos todos com conforto, pedimos que confirme somente as pessoas que já foram convidadas. Apenas os nomes incluídos nesta confirmação farão parte da lista oficial do evento e, no dia, a entrada será liberada pela equipe de cerimonial somente às pessoas confirmadas. Agradecemos pela compreensão e pelo carinho em nos ajudar a organizar este momento especial.",
      status: "Abrindo WhatsApp para concluir a confirma\u00e7\u00e3o...",
      selectOptions: [
        "Somente eu",
        "Eu e mais 1 pessoa",
        "Eu e mais 2 pessoas",
        "Eu e mais 3 pessoas",
        "Eu e mais 4 pessoas",
        "Eu e mais 5 pessoas",
      ],
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
    // URL da automacao que grava as confirmacoes na planilha online.
    // Ex.: endpoint de um fluxo do Power Automate ou Google Apps Script.
    rsvpSpreadsheetEndpoint:
      "https://script.google.com/macros/s/AKfycbyOgcnHOYuJGL6jx2D_N_pG5YNd5eJrKLxCy0VlycSnPztWZy5Q43rd2-fXH8NvBF_PLg/exec",
    rsvpSpreadsheetToken: "casamento-2027",
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
const menuToggle = document.querySelector(".menu-toggle");
const countdown = document.querySelector(".countdown");
const form = document.querySelector(".rsvp-form");
const carousel = document.querySelector("[data-carousel]");
const guestsSelect = form?.querySelector("[data-guests-select]");
const guestList = form?.querySelector("[data-guest-list]");
const phoneInput = form?.querySelector("[data-phone-input]");

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
  guestsSelect.setCustomValidity(
    guestCount ? "" : "Escolha pelo menos 1 pessoa para confirmar a presença.",
  );
  const guestOrdinals = ["Primeiro", "Segundo", "Terceiro", "Quarto", "Quinto"];
  guestList.replaceChildren();

  for (let index = 2; index <= guestCount; index += 1) {
    const guest = document.createElement("div");
    const title = document.createElement("p");
    const nameLabel = document.createElement("label");
    const nameInput = document.createElement("input");

    guest.className = "guest-fields";
    title.className = "guest-fields__title";
    title.textContent = `${guestOrdinals[index - 2]} convidado`;
    nameLabel.textContent = "Nome completo";
    nameInput.type = "text";
    nameInput.name = "nomesAcompanhantes";
    nameInput.placeholder = "Nome de quem vai junto";
    nameInput.autocomplete = "name";
    nameInput.required = true;
    nameLabel.append(nameInput);

    guest.append(title, nameLabel);
    guestList.append(guest);
  }
};

const formatPhone = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const handlePhoneInput = (event) => {
  event.target.value = formatPhone(event.target.value);
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
    slide.decoding = "async";
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
  const eventFacts = mainCard.querySelector(".event-facts");
  if (eventFacts) {
    eventFacts.innerHTML = "";
    [currentWedding.event.attire.arrival, currentWedding.event.attire.parking].forEach((fact) => {
      const item = document.createElement("span");
      item.textContent = fact;
      eventFacts.append(item);
    });
  }

  setText(".time", currentWedding.event.attire.time, attireCard);
  setText("h3", currentWedding.event.attire.title, attireCard);
  const attireGroups = attireCard.querySelector(".attire-groups");
  if (attireGroups) {
    attireGroups.innerHTML = "";

    currentWedding.event.attire.groups.forEach((group, groupIndex) => {
      const panel = document.createElement("section");
      panel.className = `attire-panel attire-panel--${groupIndex === 0 ? "madrinhas" : "padrinhos"}`;

      const panelTitle = document.createElement("h4");
      panelTitle.textContent = group.title;

      const linesWrap = document.createElement("div");
      linesWrap.className = "attire-lines";

      group.lines.forEach((line) => {
        const paragraph = document.createElement("p");
        paragraph.className = "attire-line";
        paragraph.textContent = line;
        linesWrap.append(paragraph);
      });

      panel.append(panelTitle, linesWrap);

      if (group.colors) {
        const colorList = document.createElement("ul");
        colorList.className = "color-list color-list--compact color-list--cards";
        colorList.setAttribute("aria-label", `${group.title} - cores`);

        group.colors.forEach((item) => {
          const li = document.createElement("li");
          li.className = "color-item color-item--card";

          const swatch = document.createElement("span");
          swatch.className = "color-swatch";
          swatch.style.backgroundColor = item.color;
          swatch.setAttribute("aria-hidden", "true");

          const label = document.createElement("span");
          label.className = "color-name";
          label.textContent = item.name;

          li.append(swatch, label);
          colorList.append(li);
        });

        panel.append(colorList);
      }

      if (group.palettes) {
        group.palettes.forEach((palette) => {
          const paletteBlock = document.createElement("div");
          paletteBlock.className = "attire-palette";

          const paletteLabel = document.createElement("p");
          paletteLabel.className = "attire-palette-label";
          paletteLabel.textContent = palette.label;

          const colorList = document.createElement("ul");
          colorList.className = "color-list color-list--compact color-list--cards";
          colorList.setAttribute("aria-label", `${group.title} - ${palette.label}`);

          palette.colors.forEach((item) => {
            const li = document.createElement("li");
            li.className = "color-item color-item--card";

            const swatch = document.createElement("span");
            swatch.className = "color-swatch";
            swatch.style.backgroundColor = item.color;
            swatch.setAttribute("aria-hidden", "true");

            const label = document.createElement("span");
            label.className = "color-name";
            label.textContent = item.name;

            li.append(swatch, label);
            colorList.append(li);
          });

          paletteBlock.append(paletteLabel, colorList);
          panel.append(paletteBlock);
        });
      }

      attireGroups.append(panel);
    });
  }

  const mapLink = eventSection.querySelector(".map-link");
  if (mapLink) mapLink.href = currentWedding.event.mapLink;
};

const renderRsvp = () => {
  const rsvpSection = document.querySelector("#presenca");
  if (!rsvpSection) return;

  setText("#presenca .eyebrow", currentWedding.rsvp.eyebrow);
  setText("#presenca h2", currentWedding.rsvp.title);
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

const sendRsvpToSpreadsheet = async ({ confirmedPeople, responsible, phone, message }) => {
  const endpoint = currentWedding.rsvpSpreadsheetEndpoint?.trim();
  if (!endpoint) return false;

  const rows = confirmedPeople.map((name, index) => ({
    numero: index + 1,
    nome: name,
    confirmado: "Sim",
    whatsapp: index === 0 ? phone : "",
  }));

  await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      token: currentWedding.rsvpSpreadsheetToken,
      responsavel: responsible,
      telefone: phone,
      mensagem: message || "",
      convidados: rows,
    }),
    keepalive: true,
  });

  return true;
};

const handleSubmit = (event) => {
  event.preventDefault();

  if (!guestsSelect?.value) {
    guestsSelect?.setCustomValidity("Escolha pelo menos 1 pessoa para confirmar a presença.");
    guestsSelect?.reportValidity();
    guestsSelect?.focus();
    const status = form.querySelector(".form-status");
    if (status) status.textContent = "Escolha pelo menos 1 pessoa para confirmar a presença.";
    return;
  }

  guestsSelect.setCustomValidity("");

  const data = new FormData(form);
  const responsible = data.get("responsavel")?.toString().trim() || "Convidado";
  const phone = data.get("telefone")?.toString().trim() || "";
  const companionNames = data
    .getAll("nomesAcompanhantes")
    .map((guest) => guest.toString().trim())
    .filter(Boolean);
  const confirmedPeople = [responsible, ...companionNames];
  const message = data.get("mensagem")?.toString().trim();
  const status = form.querySelector(".form-status");
  const guestListText = confirmedPeople.map((guest, index) => `${index + 1}. ${guest}`).join("\n");

  const text = [
    `Oi! Aqui \u00e9 ${responsible}.`,
    `WhatsApp para contato: ${phone}.`,
    `Confirmo presen\u00e7a no casamento para ${confirmedPeople.length} pessoa(s):`,
    guestListText,
    message ? `Mensagem: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappUrl = `https://wa.me/${currentWedding.whatsappNumber}?text=${encodeURIComponent(text)}`;
  sendRsvpToSpreadsheet({
    confirmedPeople,
    responsible,
    phone,
    message,
  }).catch((error) => {
    console.error("Nao foi possivel enviar a confirmacao para a planilha.", error);
  });

  if (status) {
    status.textContent = "Confirmação registrada. Abrindo o WhatsApp...";
  }

  form.reset();
  renderGuestFields();
  window.location.assign(whatsappUrl);
};

const openGoogleCalendar = () => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Casamento Camila e Matheus",
    dates: "20270814T193000Z/20270815T000000Z",
    details: "Chegada a partir das 16h. Estacionamento disponível no local.",
    location: "Chácara do Italiano, BR-414, Jardim Promissão, Anápolis - GO",
  });
  window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank", "noopener,noreferrer");
};

const setupLightbox = () => {
  const lightbox = document.querySelector(".photo-lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const closeButton = lightbox?.querySelector(".lightbox-close");
  if (!lightbox || !lightboxImage) return;

  carousel?.addEventListener("click", (event) => {
    const slide = event.target.closest(".carousel-slide");
    if (!slide) return;
    lightboxImage.src = slide.currentSrc || slide.src;
    lightboxImage.alt = slide.alt;
    lightbox.showModal();
  });

  closeButton?.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
};

const setupBackToTop = () => {
  const button = document.querySelector(".back-to-top");
  if (!button) return;
  const updateVisibility = () => button.classList.toggle("is-visible", window.scrollY > 500);
  window.addEventListener("scroll", updateVisibility, { passive: true });
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  updateVisibility();
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

const navigateWithoutHash = (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute("href")?.slice(1);
  const target = targetId ? document.getElementById(targetId) : null;
  if (!target) return;

  event.preventDefault();
  const headerOffset = header?.offsetHeight ?? 0;
  const targetTop = Math.max(target.getBoundingClientRect().top + window.scrollY - headerOffset - 16, 0);

  window.scrollTo({ top: targetTop, behavior: "smooth" });
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
};

const closeMenu = () => {
  header?.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
};

const setupActiveNavigation = () => {
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = links
    .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
    .filter(Boolean);

  const updateActiveNavigation = () => {
    const activationLine = (header?.offsetHeight ?? 0) + 32;
    const currentSection = sections
      .filter((section) => section.getBoundingClientRect().top <= activationLine)
      .slice(-1)[0];

    links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${currentSection?.id}`);
    });
  };

  window.addEventListener("scroll", updateActiveNavigation, { passive: true });
  updateActiveNavigation();
};

window.addEventListener("scroll", updateHeader, { passive: true });
menuToggle?.addEventListener("click", () => {
  const isOpen = header?.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
form?.addEventListener("submit", handleSubmit);
guestsSelect?.addEventListener("change", renderGuestFields);
phoneInput?.addEventListener("input", handlePhoneInput);
document.addEventListener("click", (event) => {
  navigateWithoutHash(event);
  const button = event.target.closest("[data-copy-pix]");
  if (button) copyPixKey(button);
  if (event.target.closest(".calendar-button")) openGoogleCalendar();
  if (event.target.closest(".nav-links a")) {
    closeMenu();
  }
  if (header?.classList.contains("menu-open") && !event.target.closest(".site-header")) {
    closeMenu();
  }
});

renderDocument();
updateHeader();
updateCountdown();
setupCarousel();
setupLightbox();
setupBackToTop();
setupActiveNavigation();
window.setInterval(updateCountdown, 1000);
