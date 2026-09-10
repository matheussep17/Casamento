/**
 * Contagem regressiva até a data do casamento.
 * Atualiza os elementos [data-countdown="days|hours|minutes|seconds"]
 * dentro do elemento .countdown a cada segundo.
 */
export function setupCountdown() {
  const countdown = document.querySelector(".countdown");
  if (!countdown) return;

  const weddingDate = new Date(countdown.dataset.weddingDate).getTime();

  const update = () => {
    const left = Math.max(weddingDate - Date.now(), 0);
    const values = {
      days: Math.floor(left / 86400000),
      hours: Math.floor(left / 3600000) % 24,
      minutes: Math.floor(left / 60000) % 60,
      seconds: Math.floor(left / 1000) % 60,
    };
    Object.entries(values).forEach(([key, value]) => {
      const node = countdown.querySelector(`[data-countdown="${key}"]`);
      if (node) node.textContent = String(value).padStart(key === "days" ? 3 : 2, "0");
    });
  };

  update();
  setInterval(update, 1000);
}
