const storageKey = "theme";
const root = document.documentElement;
const toggle = document.querySelector("[data-theme-toggle]");
const actionButton = document.querySelector("[data-action]");

const prefersDark = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const setToggleLabel = (theme) => {
  if (!toggle) return;
  const nextLabel = theme === "dark" ? "Light mode" : "Dark mode";
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

if (toggle) {
  toggle.addEventListener("click", () => {
    const current = root.dataset.theme || "light";
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  });
}

if (actionButton) {
  actionButton.addEventListener("click", () => {
    console.log("Hello from the action button.");
  });
}

initTheme();
