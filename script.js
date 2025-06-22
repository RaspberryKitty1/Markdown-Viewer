const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const fileNameSpan = document.getElementById('fileName');
const preview = document.getElementById('preview');

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
});

uploadBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  fileNameSpan.textContent = file.name;

  const reader = new FileReader();
  reader.onload = () => {
    const markdown = reader.result;
    const html = marked.parse(markdown);
    preview.innerHTML = html;
  };
  reader.readAsText(file);
});
