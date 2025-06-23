const textarea = document.getElementById("liveEditTextarea");
const previewContainer = document.getElementById("livePreview");
const previewInner = document.getElementById("livePreviewInner");
const uploadPreview = document.getElementById("preview");

let isSyncingScroll = false;
let lastScrolledElement = null;
let scheduledAnimationFrame = false;

function syncScroll(from, to) {
  if (isSyncingScroll) return;
  isSyncingScroll = true;

  if (scheduledAnimationFrame) return;
  scheduledAnimationFrame = true;

  window.requestAnimationFrame(() => {
    const fromScrollTop = from.scrollTop;
    const fromScrollHeight = from.scrollHeight - from.clientHeight;
    const ratio = fromScrollTop / (fromScrollHeight || 1);

    const toScrollHeight = to.scrollHeight - to.clientHeight;
    to.scrollTop = ratio * toScrollHeight;

    scheduledAnimationFrame = false;

    // Unlock syncing after next frame
    setTimeout(() => {
      isSyncingScroll = false;
      lastScrolledElement = null;
    }, 50);
  });
}

// Scroll handlers
textarea.addEventListener("scroll", () => {
  if (lastScrolledElement === previewContainer) return;
  lastScrolledElement = textarea;
  syncScroll(textarea, previewContainer);
});

previewContainer.addEventListener("scroll", () => {
  if (lastScrolledElement === textarea) return;
  lastScrolledElement = previewContainer;
  syncScroll(previewContainer, textarea);
});

// Live Markdown Preview
textarea.addEventListener("input", () => {
  const markdown = textarea.value;
  const html = marked.parse(markdown);
  previewInner.innerHTML = html;
});

// Render uploaded markdown
window.renderMarkdownToUploadPreview = function (markdown) {
  const html = marked.parse(markdown);
  uploadPreview.innerHTML = html;
};

// Initial render if textarea has content
if (textarea.value.trim()) {
  previewInner.innerHTML = marked.parse(textarea.value);
}
