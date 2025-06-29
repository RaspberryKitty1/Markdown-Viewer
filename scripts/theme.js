(() => {
  const themeToggleCheckbox = document.getElementById("toggleTheme");

  function applyTheme(theme) {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    if (themeToggleCheckbox) {
      themeToggleCheckbox.checked = theme === "dark";
    }
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }

  if (themeToggleCheckbox) {
    themeToggleCheckbox.addEventListener("change", (e) => {
      const newTheme = e.target.checked ? "dark" : "light";
      applyTheme(newTheme);
    });
  }
})();
