const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const downloadBtn = document.getElementById('downloadBtn');
const fileNameSpan = document.getElementById('fileName');
const preview = document.getElementById('preview');
const dropzone = document.getElementById('dropzone');

const modeToggleBtn = document.getElementById('modeToggleBtn');
const uploadModeSection = document.getElementById('uploadModeSection');
const liveEditModeSection = document.getElementById('liveEditModeSection');
const liveEditTextarea = document.getElementById('liveEditTextarea');
const livePreviewOuter = document.getElementById('livePreview');
const livePreview = document.getElementById('livePreviewInner');

const themeToggleBtn = document.getElementById('themeToggleBtn');

let currentMarkdown = "";

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
});

// Theme toggle
function applyTheme(theme) {
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(theme);
  themeToggleBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggleBtn.addEventListener('click', () => {
  const current = document.body.classList.contains('dark') ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// File loading
function loadFile(file) {
  if (!file) return;
  if (!/\.(md|markdown|txt)$/i.test(file.name)) {
    alert('Please select a valid markdown file.');
    return;
  }

  fileNameSpan.textContent = file.name;

  const reader = new FileReader();
  reader.onload = () => {
    currentMarkdown = reader.result;
    preview.innerHTML = marked.parse(currentMarkdown);
    liveEditTextarea.value = currentMarkdown;
    livePreview.innerHTML = marked.parse(currentMarkdown);
    downloadBtn.style.display = 'inline';
  };
  reader.readAsText(file);
}

uploadBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => loadFile(e.target.files[0]));

// Drag & drop
dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('dragover');
});
dropzone.addEventListener('dragleave', (e) => {
  e.preventDefault();
  dropzone.classList.remove('dragover');
});
dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) loadFile(file);
});

// Live preview update
liveEditTextarea.addEventListener('input', (e) => {
  currentMarkdown = e.target.value;
  livePreview.innerHTML = marked.parse(currentMarkdown);
});

// One-way scroll sync (textarea → preview)
liveEditTextarea.addEventListener('scroll', () => {
  const ratio = liveEditTextarea.scrollTop / (liveEditTextarea.scrollHeight - liveEditTextarea.clientHeight);
  livePreviewOuter.scrollTop = ratio * (livePreviewOuter.scrollHeight - livePreviewOuter.clientHeight);
});

// Download button
downloadBtn.addEventListener('click', () => {
  const blob = new Blob([currentMarkdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileNameSpan.textContent || 'markdown.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// Ctrl+S triggers download
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    downloadBtn.click();
  }
});

// Toggle view mode
modeToggleBtn.addEventListener('click', () => {
  const inLiveEdit = liveEditModeSection.style.display === 'block';
  if (inLiveEdit) {
    liveEditModeSection.style.display = 'none';
    uploadModeSection.style.display = 'block';
    modeToggleBtn.textContent = 'Live Edit';
  } else {
    liveEditTextarea.value = currentMarkdown;
    livePreview.innerHTML = marked.parse(currentMarkdown);
    liveEditModeSection.style.display = 'block';
    uploadModeSection.style.display = 'none';
    modeToggleBtn.textContent = 'Upload Mode';
  }
});
