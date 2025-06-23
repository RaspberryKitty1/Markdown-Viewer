(() => {
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  function applyTheme(theme) {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    themeToggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", theme);
  }

  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const current = document.body.classList.contains("dark") ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });
})();
