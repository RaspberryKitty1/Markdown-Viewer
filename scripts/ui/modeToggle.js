(() => {
  const {
    viewModeSection,
    editModeSection,
    modeToggleBtn,
    preview,
  } = window.elements;

  const appState = window.appState;

  function updateToggleButtonText(isEditMode) {
    modeToggleBtn.textContent = isEditMode
      ? 'Switch to View Mode'
      : 'Switch to Edit Mode';
  }

  function setMode(isEditMode) {
    if (isEditMode) {
      editModeSection.style.display = 'block';
      viewModeSection.style.display = 'none';
    } else {
      editModeSection.style.display = 'none';
      viewModeSection.style.display = 'block';
      preview.innerHTML = marked.parse(appState.currentMarkdown || '');
      hljs.highlightAll();
    }
    updateToggleButtonText(isEditMode);
    localStorage.setItem('viewMode', isEditMode ? 'edit' : 'view');
  }

  function toggleMode() {
    const isCurrentlyEdit = editModeSection.style.display === 'block';
    setMode(!isCurrentlyEdit);
  }

  modeToggleBtn.addEventListener('click', toggleMode);

  window.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('viewMode');
    const isEditMode = savedMode === 'edit';
    setMode(isEditMode);
  });
})();
