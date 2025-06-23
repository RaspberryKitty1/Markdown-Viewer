(() => {
  const {
    liveEditTextarea,
    livePreviewInner,
    fileNameInput,
    editModeSection,
    viewModeSection,
    modeToggleBtn,
  } = window.elements;

  const appState = window.appState;
  const { updateFileNameWidth, updateDownloadButtonVisibility } = window.utils;

  // Restore state from localStorage on load
  function restoreState() {
    const savedText = localStorage.getItem("markdownText");
    const savedMode = localStorage.getItem("viewMode");
    const savedFileName = localStorage.getItem("fileName");

    if (savedText !== null) {
      liveEditTextarea.value = savedText;
      livePreviewInner.innerHTML = marked.parse(savedText);
      appState.currentMarkdown = savedText;
    }

    if (savedFileName) {
      fileNameInput.value = savedFileName;
      updateFileNameWidth();
    }

    if (savedMode === "edit") {
      editModeSection.style.display = "block";
      viewModeSection.style.display = "none";
      modeToggleBtn.textContent = "Switch to View Mode";
    } else {
      editModeSection.style.display = "none";
      viewModeSection.style.display = "block";
      modeToggleBtn.textContent = "Switch to Edit Mode";
    }

    updateDownloadButtonVisibility();
  }

  // Save markdown text on input
  liveEditTextarea.addEventListener("input", (e) => {
    const text = e.target.value;
    appState.currentMarkdown = text;
    localStorage.setItem("markdownText", text);
  });

  // Save filename on input
  fileNameInput.addEventListener("input", () => {
    localStorage.setItem("fileName", fileNameInput.value);
  });

  // Save view mode on toggle
  modeToggleBtn.addEventListener("click", () => {
    const isEditMode = editModeSection.style.display === "block";
    // After toggle, mode is flipped
    const newMode = isEditMode ? "view" : "edit";
    localStorage.setItem("viewMode", newMode);
  });

  window.addEventListener("DOMContentLoaded", restoreState);
})();
