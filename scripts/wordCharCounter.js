document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("liveEditTextarea");
  const wordCountDisplay = document.getElementById("wordCount");
  const charCountDisplay = document.getElementById("charCount");

  if (!textarea || !wordCountDisplay || !charCountDisplay) return;

  function updateCounts(text) {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const chars = text.length;
    wordCountDisplay.textContent = `Words: ${words}`;
    charCountDisplay.textContent = `Chars: ${chars}`;
  }

  // Initial count on load
  updateCounts(textarea.value);

  textarea.addEventListener("input", () => {
    updateCounts(textarea.value);
  });

  // Expose globally to update counts from other modules
  window.updateWordCharCounts = updateCounts;
});
