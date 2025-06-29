document.getElementById('settingsBtn').addEventListener('click', () => {
  const menu = document.getElementById('settingsMenu');
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('closeSettingsBtn').addEventListener('click', () => {
  document.getElementById('settingsMenu').style.display = 'none';
});

document.getElementById('toggleWordChar').addEventListener('change', (e) => {
  const show = e.target.checked;
  document.getElementById('word-char-container').style.display = show ? 'flex' : 'none';
  localStorage.setItem('showWordChar', show ? 'yes' : 'no');
});

document.getElementById('fontSizeInput').addEventListener('input', (e) => {
  const size = `${e.target.value}px`;
  document.getElementById('contentWrapper').style.setProperty('--font-size', size);
  localStorage.setItem('fontSize', size);
});

// Restore settings on load
window.addEventListener('DOMContentLoaded', () => {
  const showWordChar = localStorage.getItem('showWordChar');
  const fontSize = localStorage.getItem('fontSize');

  if (showWordChar === 'no') {
    document.getElementById('word-char-container').style.display = 'none';
    document.getElementById('toggleWordChar').checked = false;
  }

  if (fontSize) {
    document.getElementById('contentWrapper').style.setProperty('--font-size', fontSize);
    document.getElementById('fontSizeInput').value = parseInt(fontSize);
  }
});
