(() => {
  const { fileNameInput, downloadBtn } = window.elements;
  const appState = window.appState;

  downloadBtn.addEventListener("click", () => {
    const filename =
      (fileNameInput.value || "markdown.md").replace(/\s+/g, "_").trim();
    const blob = new Blob([appState.currentMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      downloadBtn.click();
    }
  });
})();
