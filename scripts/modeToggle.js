// modeToggle.js

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

  function toggleMode() {
    const isEditMode = editModeSection.style.display === 'block';

    if (isEditMode) {
      // switching from edit to view
      editModeSection.style.display = 'none';
      viewModeSection.style.display = 'block';

      // update view preview with current markdown
      preview.innerHTML = marked.parse(appState.currentMarkdown);
    } else {
      // switching from view to edit
      editModeSection.style.display = 'block';
      viewModeSection.style.display = 'none';
    }

    updateToggleButtonText(!isEditMode);
  }

  modeToggleBtn.addEventListener('click', toggleMode);

  window.addEventListener('DOMContentLoaded', () => {
    // Default mode is view mode on page load
    editModeSection.style.display = 'none';
    viewModeSection.style.display = 'block';
    updateToggleButtonText(false);

    // Auto-toggle to edit mode on mobile screen sizes
    if (window.innerWidth <= 768) {
      toggleMode();
    }
  });
})();
