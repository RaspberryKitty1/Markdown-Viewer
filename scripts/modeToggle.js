// modeToggle.js

const viewModeSection = document.getElementById('viewModeSection');
const editModeSection = document.getElementById('editModeSection');
const modeToggleBtn = document.getElementById('modeToggleBtn');

function updateToggleButtonText(isEditMode) {
  modeToggleBtn.textContent = isEditMode
    ? 'Switch to View Mode'
    : 'Switch to Edit Mode';
}

function toggleMode() {
  const isEditMode = editModeSection.style.display === 'block';
  
  if (isEditMode) {
    editModeSection.style.display = 'none';
    viewModeSection.style.display = 'block';
  } else {
    editModeSection.style.display = 'block';
    viewModeSection.style.display = 'none';
  }
  
  updateToggleButtonText(!isEditMode);
  
  if (!isEditMode && typeof updatePreview === 'function') {
    updatePreview();
  }
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
