(() => {
  const {
    liveEditTextarea,
    livePreviewInner,
    fileNameInput,
  } = window.elements;

  const appState = window.appState;
  const { updateFileNameWidth, updateDownloadButtonVisibility } = window.utils;

  function restoreState() {
    const savedText = localStorage.getItem("markdownText");
    const savedFileName = localStorage.getItem("fileName");

    if (savedText !== null) {
      liveEditTextarea.value = savedText;
      livePreviewInner.innerHTML = marked.parse(savedText);
      hljs.highlightAll(); // Highlight code blocks
      appState.currentMarkdown = savedText;
    }

    if (savedFileName) {
      fileNameInput.value = savedFileName;
      updateFileNameWidth();
    }

    updateDownloadButtonVisibility();
  }

  liveEditTextarea.addEventListener("input", (e) => {
    const text = e.target.value;
    appState.currentMarkdown = text;
    localStorage.setItem("markdownText", text);
  });

  fileNameInput.addEventListener("input", () => {
    localStorage.setItem("fileName", fileNameInput.value);
  });

  window.addEventListener("DOMContentLoaded", restoreState);
})();
