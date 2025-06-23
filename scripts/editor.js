// editor.js

const textarea = document.getElementById("liveEditTextarea");
const previewContainer = document.getElementById("livePreview");
const previewInner = document.getElementById("livePreviewInner");
const uploadPreview = document.getElementById("preview");

// === Live Markdown Preview ===
textarea.addEventListener("input", () => {
  const markdown = textarea.value;
  const html = marked.parse(markdown);
  previewInner.innerHTML = html;
});

// === Sync Scroll ===
textarea.addEventListener("scroll", () => {
  const ratio = textarea.scrollTop / (textarea.scrollHeight - textarea.clientHeight);
  previewContainer.scrollTop = ratio * (previewContainer.scrollHeight - previewContainer.clientHeight);
});

// === Render Uploaded Markdown File ===
// This should be called by fileHandling.js after reading a file
window.renderMarkdownToUploadPreview = function (markdown) {
  const html = marked.parse(markdown);
  uploadPreview.innerHTML = html;
};

// Optional: call immediately if there's preloaded content
if (textarea.value.trim()) {
  previewInner.innerHTML = marked.parse(textarea.value);
}
