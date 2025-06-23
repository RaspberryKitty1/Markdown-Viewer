// script.js
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const downloadBtn = document.getElementById("downloadBtn");
const fileNameSpan = document.getElementById("fileName");
const preview = document.getElementById("preview");

const modeToggleBtn = document.getElementById("modeToggleBtn");
const uploadModeSection = document.getElementById("uploadModeSection");
const liveEditModeSection = document.getElementById("liveEditModeSection");
const liveEditTextarea = document.getElementById("liveEditTextarea");
const livePreviewOuter = document.getElementById("livePreview");
const livePreview = document.getElementById("livePreviewInner");

const themeToggleBtn = document.getElementById("themeToggleBtn");

const dragIndicator = document.getElementById("dragIndicator");

let currentMarkdown = "";

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
});

const tokenizer = {
  blockquote(src) {
    const regex =
      /^(> \[!(TIP|NOTE|WARNING|CAUTION|IMPORTANT)\][^\n]*(\n>.*)*)/i;
    const match = regex.exec(src);
    if (match) {
      const raw = match[0];
      const type = match[2].toLowerCase();

      // Split lines, remove leading '> ' and skip the first line ([!WARNING] line)
      const contentLines = raw
        .split("\n")
        .map((line) => line.replace(/^> ?/, ""))
        .slice(1); // <-- remove first line that has the [!WARNING] tag

      const content = contentLines.join("\n");

      const tokens = this.lexer.blockTokens(content);

      return {
        type: "blockquote",
        raw,
        tokens,
        isAdmonition: true,
        admonitionType: type,
      };
    }
    return false;
  },
};

const renderer = new marked.Renderer();

renderer.blockquote = function (token) {
  if (token.isAdmonition) {
    const icons = {
      tip: "💡",
      note: "ℹ️",
      warning: "⚠️",
      caution: "❗",
      important: "❗❗",
    };
    const type = token.admonitionType.toLowerCase();
    const icon = icons[type] || "";
    const displayType = type.charAt(0).toUpperCase() + type.slice(1);

    const inner = this.parser.parse(token.tokens);

    return `
      <blockquote class="admonition ${type}">
        <p><strong>${icon} ${displayType}</strong></p>
        ${inner}
      </blockquote>
    `;
  }
  const inner = this.parser.parse(token.tokens);
  return `<blockquote>${inner}</blockquote>`;
};

marked.use({ tokenizer, renderer });

function applyTheme(theme) {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(theme);
  themeToggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

themeToggleBtn.addEventListener("click", () => {
  const current = document.body.classList.contains("dark") ? "dark" : "light";
  applyTheme(current === "dark" ? "light" : "dark");
});

function loadFile(file) {
  if (!file) return;
  if (!/\.(md|markdown|txt)$/i.test(file.name)) {
    alert("Please select a valid markdown file.");
    return;
  }

  fileNameSpan.textContent = file.name;

  const reader = new FileReader();
  reader.onload = () => {
    currentMarkdown = reader.result;
    preview.innerHTML = marked.parse(currentMarkdown);
    liveEditTextarea.value = currentMarkdown;
    livePreview.innerHTML = marked.parse(currentMarkdown);
    downloadBtn.style.display = "inline";
    updateDownloadButtonVisibility();
  };
  reader.readAsText(file);
}

uploadBtn.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (e) => loadFile(e.target.files[0]));

// Drag and Drop Indicator Logic
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
      dragIndicator.style.opacity = "0.9"; // reset opacity for next time
    }, 300);
  }
});

document.addEventListener("dragover", (e) => {
  e.preventDefault();
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
  dragCounter = 0;
  clearTimeout(dragoverTimeout);
  dragIndicator.style.display = "none";

  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    loadFile(e.dataTransfer.files[0]);
    e.dataTransfer.clearData();
  }
});

liveEditTextarea.addEventListener("input", (e) => {
  currentMarkdown = e.target.value;
  livePreview.innerHTML = marked.parse(currentMarkdown);
  updateDownloadButtonVisibility();
});

liveEditTextarea.addEventListener("scroll", () => {
  const ratio =
    liveEditTextarea.scrollTop /
    (liveEditTextarea.scrollHeight - liveEditTextarea.clientHeight);
  livePreviewOuter.scrollTop =
    ratio * (livePreviewOuter.scrollHeight - livePreviewOuter.clientHeight);
});

downloadBtn.addEventListener("click", () => {
  const blob = new Blob([currentMarkdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileNameSpan.textContent || "markdown.md";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
    e.preventDefault();
    downloadBtn.click();
  }
});

modeToggleBtn.addEventListener("click", () => {
  const inLiveEdit = liveEditModeSection.style.display === "block";
  if (inLiveEdit) {
    liveEditModeSection.style.display = "none";
    uploadModeSection.style.display = "block";
    modeToggleBtn.textContent = "Live Edit";
  } else {
    liveEditTextarea.value = currentMarkdown;
    livePreview.innerHTML = marked.parse(currentMarkdown);
    liveEditModeSection.style.display = "block";
    uploadModeSection.style.display = "none";
    modeToggleBtn.textContent = "Upload Mode";
  }
  updateDownloadButtonVisibility();
});

function updateDownloadButtonVisibility() {
  const inLiveEdit = liveEditModeSection.style.display === "block";

  if (inLiveEdit) {
    if (liveEditTextarea.value.trim() !== "") {
      downloadBtn.style.display = "inline";
      if (
        !fileNameSpan.textContent ||
        fileNameSpan.textContent === "No file selected"
      ) {
        fileNameSpan.textContent = "live-edit.md";
      }
    } else {
      downloadBtn.style.display = "none";
    }
  } else {
    if (currentMarkdown.trim() !== "") {
      downloadBtn.style.display = "inline";
    } else {
      downloadBtn.style.display = "none";
    }
  }
}

updateDownloadButtonVisibility();
