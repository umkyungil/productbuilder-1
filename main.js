const storageKey = "theme";
const root = document.documentElement;
const toggle = document.querySelector("[data-theme-toggle]");
const actionButton = document.querySelector("[data-action]");
const numbersEl = document.querySelector("[data-numbers]");

const prefersDark = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const setToggleLabel = (theme) => {
  if (!toggle) return;
  const nextLabel = theme === "dark" ? "라이트 모드" : "다크 모드";
  toggle.textContent = nextLabel;
  toggle.setAttribute("aria-pressed", theme === "dark");
};

const setTheme = (theme, persist = true) => {
  root.dataset.theme = theme;
  setToggleLabel(theme);
  if (persist) {
    localStorage.setItem(storageKey, theme);
  }
};

const initTheme = () => {
  const saved = localStorage.getItem(storageKey);
  const theme = saved || (prefersDark() ? "dark" : "light");
  setTheme(theme, false);
};

const drawNumbers = (count = 6, max = 45) => {
  const set = new Set();
  while (set.size < count) {
    const pick = Math.floor(Math.random() * max) + 1;
    set.add(pick);
  }
  return Array.from(set).sort((a, b) => a - b);
};

const renderNumbers = (numbers) => {
  if (!numbersEl) return;
  numbersEl.innerHTML = "";
  numbers.forEach((num) => {
    const ball = document.createElement("div");
    ball.className = "lotto-ball";
    ball.textContent = String(num);
    numbersEl.appendChild(ball);
  });
};

if (toggle) {
  toggle.addEventListener("click", () => {
    const current = root.dataset.theme || "light";
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  });
}

if (actionButton) {
  actionButton.addEventListener("click", () => {
    renderNumbers(drawNumbers());
  });
}

initTheme();
renderNumbers(drawNumbers());
