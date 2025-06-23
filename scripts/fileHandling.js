(() => {
  const {
    fileInput,
    uploadBtn,
    fileNameInput,
    fileNameSizer,
    preview,
    dragIndicator,
    liveEditTextarea,
    livePreviewInner: livePreview,
    downloadBtn,
  } = window.elements;

  const appState = window.appState;
  const { updateFileNameWidth, updateDownloadButtonVisibility } = window.utils;

  fileNameInput.addEventListener("input", updateFileNameWidth);

  fileNameInput.addEventListener("blur", () => {
    fileNameInput.value = fileNameInput.value
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
      .trim() || "markdown.md";
    updateFileNameWidth();
  });

  function loadFile(file) {
    if (!file) return;
    if (!/\.(md|markdown|txt)$/i.test(file.name)) {
      alert("Please select a valid markdown file.");
      return;
    }

    fileNameInput.value = file.name;
    updateFileNameWidth();

    const reader = new FileReader();
    reader.onload = () => {
      appState.currentMarkdown = reader.result;
      preview.innerHTML = marked.parse(appState.currentMarkdown);
      liveEditTextarea.value = appState.currentMarkdown;
      livePreview.innerHTML = marked.parse(appState.currentMarkdown);
      downloadBtn.style.display = "inline";
      updateDownloadButtonVisibility();

      // Persist new markdown text and filename in localStorage
      localStorage.setItem("markdownText", appState.currentMarkdown);
      localStorage.setItem("fileName", file.name);
    };
    reader.readAsText(file);
  }

  uploadBtn.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => loadFile(e.target.files[0]));

  let dragCounter = 0;
  let dragoverTimeout;

  document.addEventListener("dragenter", (e) => {
    e.preventDefault();
    dragCounter++;

    if (dragCounter === 1) {
      dragoverTimeout = setTimeout(() => {
        dragIndicator.style.display = "block";
        dragIndicator.style.opacity = "0.9";
      }, 100);
    }
  });

  document.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dragCounter--;
    if (dragCounter === 0) {
      clearTimeout(dragoverTimeout);
      dragIndicator.style.opacity = "0";
      setTimeout(() => {
        dragIndicator.style.display = "none";
        dragIndicator.style.opacity = "0.9";
      }, 300);
    }
  });

  document.addEventListener("dragover", (e) => e.preventDefault());

  document.addEventListener("drop", (e) => {
    e.preventDefault();
    dragCounter = 0;
    clearTimeout(dragoverTimeout);
    dragIndicator.style.display = "none";

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      loadFile(e.dataTransfer.files[0]);
      try {
        e.dataTransfer.clearData();
      } catch {
        // Ignore DOMException if it happens (usually from external files)
      }
    }
  });
})();
