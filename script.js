// script.js
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const fileNameSpan = document.getElementById('fileName');
const preview = document.getElementById('preview');
const dropzone = document.getElementById('dropzone');

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
});

function loadFile(file) {
  if (!file) return;

  if (!/\.(md|markdown|txt)$/i.test(file.name)) {
    alert('Please select a valid markdown (.md, .markdown, .txt) file.');
    return;
  }

  fileNameSpan.textContent = file.name;

  const reader = new FileReader();
  reader.onload = () => {
    const markdown = reader.result;
    const html = marked.parse(markdown);
    preview.innerHTML = html;
  };
  reader.readAsText(file);
}

// Upload button click opens file dialog
uploadBtn.addEventListener('click', () => fileInput.click());

// File input change loads file
fileInput.addEventListener('change', (e) => loadFile(e.target.files[0]));

// Drag and drop handlers
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
  if (file) {
    loadFile(file);
  }
});
