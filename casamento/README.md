# Camila & Matheus — Site de Casamento

Site estático de página única com informações do casamento: contagem
regressiva, história do casal, local e programação, informações úteis,
confirmação de presença (RSVP), lista de presentes e chave Pix.

## 🧱 Stack

- HTML5 + CSS3 (sem framework)
- JavaScript puro, organizado em módulos ES (`js/`)
- [Playwright](https://playwright.dev/) para testes end-to-end
- ESLint + Prettier + Stylelint para qualidade de código
- GitHub Actions para CI

## 📂 Estrutura do projeto

```
├── index.html              # marcação principal da página
├── styles.css               # estilos globais
├── js/
│   ├── main.js               # ponto de entrada, importa e inicializa os módulos
│   ├── countdown.js          # contagem regressiva até a data do casamento
│   ├── rsvp.js                # formulário de confirmação de presença
│   ├── carousel.js           # carrossel de fotos (autoplay, swipe, teclado)
│   ├── lightbox.js           # foto ampliada em modal, com tela cheia
│   ├── navigation.js         # menu mobile, scroll suave e link ativo
│   └── ui.js                  # header/scroll, botão voltar ao topo, copiar Pix
├── fotos/                    # imagens usadas no site
├── tests/
│   ├── playwright/           # specs de teste E2E
│   └── shared/                # dados compartilhados entre specs
└── .github/workflows/ci.yml  # pipeline de CI
```

## 🚀 Como rodar localmente

```bash
npm install
npm start
```

O comando `npm start` inicia um servidor estático em
`http://127.0.0.1:4173` (via `http-server`).

## ✅ Testes

Os testes end-to-end usam [Playwright](https://playwright.dev/) e cobrem:
navegação, carrossel, lightbox, formulário de RSVP (confirmar/cancelar),
cópia da chave Pix, integração com Google Agenda e o contrato da API
(Google Apps Script).

```bash
npm test          # roda todos os testes (chromium + mobile-chrome)
npm run test:ui    # abre a UI interativa do Playwright
```

O relatório HTML é gerado em `playwright-report/` após a execução.

## 🎨 Qualidade de código

```bash
npm run lint          # ESLint nos arquivos .js
npm run lint:css      # Stylelint no styles.css
npm run format        # formata o projeto com Prettier
npm run format:check  # verifica formatação sem alterar arquivos
```

## 🔄 CI

Todo push/PR para `main`/`master` roda automaticamente lint, verificação
de formatação e os testes Playwright via GitHub Actions
(`.github/workflows/ci.yml`).

## 📝 Notas de implementação

- O envio do RSVP para a planilha usa `fetch` com `mode: "no-cors"` contra
  um Google Apps Script — a resposta é sempre opaca, então falhas no
  backend não são detectadas pelo `catch`, apenas falhas de rede.
- O WhatsApp é sempre aberto como confirmação visual complementar ao envio
  para a planilha.
