(() => {
  const { fileNameInput, fileNameSizer, downloadBtn, liveEditTextarea, editModeSection } = window.elements;
  const appState = window.appState;

  function updateFileNameWidth() {
    fileNameSizer.textContent = fileNameInput.value || " ";
    fileNameInput.style.width = `${fileNameSizer.offsetWidth + 8}px`;
  }

  function updateDownloadButtonVisibility() {
    const inEditMode = editModeSection.style.display === "block";

    if (inEditMode) {
      if (liveEditTextarea.value.trim() !== "") {
        downloadBtn.style.display = "inline";
        if (!fileNameInput.value || fileNameInput.value === "No file selected") {
          fileNameInput.value = "live-edit.md";
          updateFileNameWidth();
        }
      } else {
        downloadBtn.style.display = "none";
      }
    } else {
      if (appState.currentMarkdown.trim() !== "") {
        downloadBtn.style.display = "inline";
      } else {
        downloadBtn.style.display = "none";
      }
    }
  }

  window.utils = {
    updateFileNameWidth,
    updateDownloadButtonVisibility,
  };
})();
