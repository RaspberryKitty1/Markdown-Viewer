# 📘 Markdown Viewer

A lightweight, **100% client-side** Markdown viewer and live editor with dark mode, drag-and-drop upload, theme toggle, and styled admonitions.

---

## 🚀 Features

* **Upload Mode:** Instantly upload and preview `.md`, `.markdown`, or `.txt` files.
* **Live Edit Mode:** Edit Markdown in a split-pane interface with live preview.
* **Drag & Drop Upload:** Drop files anywhere on the page with a floating drag indicator.
* **Dark/Light Theme Toggle:** Switch between themes; preference is saved automatically.
* **Download Markdown:** Save current content as a `.md` file with one click or shortcut.
* **Admonition Support:** Styled blockquotes (e.g. TIP, NOTE, WARNING) with icons and colors.
* **Keyboard Shortcut:** Press `Ctrl+S` or `Cmd+S` to trigger a markdown download.
* **Scroll Sync:** Editor and preview scroll in sync for seamless editing.
* **Privacy-Friendly:** All functionality runs in the browser — **your files never leave your device**.

---

## 🌐 Demo

This project is not currently hosted live.

To try it out:

1. Clone or download the repository.
2. Open `index.html` in a modern web browser.

> [!NOTE]  
> You can also host it locally or via GitHub Pages or NGINX — it's a static site.

---

## 🛠️ Usage

### 📂 Upload a Markdown File

* Click the 📂 **Upload** button or drag a file anywhere onto the page.
* Supported extensions: `.md`, `.markdown`, `.txt`
* Preview renders instantly below — all in your browser.

### ✍️ Live Edit Mode

* Click the **Live Edit** button in the top bar to toggle edit mode.
* Markdown entered in the left textarea is previewed live on the right.
* Click the same button again to switch back to Upload Mode.

### 💾 Download Markdown

* Click the 💾 **Download** button to save your Markdown.
* If editing live and no file is loaded, the default filename is `live-edit.md`.
* Shortcut: `Ctrl+S` / `Cmd+S` also triggers download.

### 🌓 Theme Toggle

* Click the 🌙 / ☀️ **theme button** to switch between light and dark mode.
* Your preference is saved and restored on reload.

---

## 📦 Installation & Setup

1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Optional: Host on any static file server or GitHub Pages.

> [!TIP]  
> Works completely offline once loaded — great for secure or air-gapped environments.

---

## 🧩 Customization

* 🎨 **Theme/Styling:** Edit `styles.css` to tweak layout, colors, or appearance.
* 🧠 **Features:** Extend individual scripts in `/scripts/` to add functionality.
* 🔧 **Parser:** You can replace `marked.min.js` with another Markdown library if desired.

---

## 📌 Supported Admonitions

You can use blockquote-style markdown to create special callout boxes:

```markdown
> [!TIP]
> This is a tip.
````

Supported types:

| Type      | Syntax Example | Icon |
| --------- | -------------- | ---- |
| Tip       | `[!TIP]`       | 💡   |
| Note      | `[!NOTE]`      | ℹ️   |
| Warning   | `[!WARNING]`   | ⚠️   |
| Caution   | `[!CAUTION]`   | ❗    |
| Important | `[!IMPORTANT]` | ❗❗   |

Each block renders with distinct styles in both light and dark modes.

---

## 📋 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed list of updates and versions.

---

## 🙋 Feedback & Contributions

Suggestions, bug reports, and pull requests are welcome!
Open an issue or fork the project to contribute.

---

## 📄 License

Licensed under the [MIT License](./LICENCE).
You are free to use, modify, and share this project.

---

## 📦 Third-Party Attributions

This project uses the following libraries and assets:

* [`marked`](https://github.com/markedjs/marked) — MIT License
* [`github-markdown-css`](https://github.com/sindresorhus/github-markdown-css) — MIT License
* Favicon icon created by Muhammad Andy, sourced from [Flaticon](https://www.flaticon.com/free-icons/markdown)

See [NOTICE.md](./NOTICE.md) for full third-party license information.
