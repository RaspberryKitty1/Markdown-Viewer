# 📘 Markdown Viewer

A lightweight, **100% client-side** Markdown viewer and live editor with dark mode, drag-and-drop upload, theme toggle, styled admonitions, persistent state, and scroll sync.

---

## 🚀 Features

* **Upload Mode:** Instantly upload and preview `.md`, `.markdown`, or `.txt` files.
* **Live Edit Mode:** Edit Markdown in a split-pane interface with live preview.
* **Drag & Drop Upload:** Drop files anywhere on the page with a floating drag indicator.
* **Dark/Light Theme Toggle:** Switch between themes using a checkbox in the Settings panel; preference is saved automatically.
* **Download Markdown:** Save current content as a `.md` file with one click or shortcut (`Ctrl+S` / `Cmd+S`).
* **Admonition Support:** Styled blockquotes (TIP, NOTE, WARNING, CAUTION, IMPORTANT) with icons and colors.
* **Keyboard Shortcut:** Press `Ctrl+S` or `Cmd+S` to trigger a markdown download.
* **Scroll Sync:** Editor and preview scroll in sync for seamless editing experience.
* **Word & Character Counter:** Optional live counts displayed for the editor content.
* **Privacy-Friendly:** All functionality runs fully in-browser — **your files never leave your device**.
* **Persistence:** Automatically saves the last loaded/uploaded Markdown content, filename, theme, view mode, font size, and word/char counter visibility to `localStorage` for seamless continuity across sessions.

## 🛠️ Usage

### 📂 Upload a Markdown File

* Click the 📂 **Upload** button or drag a file anywhere onto the page.
* Supported extensions: `.md`, `.markdown`, `.txt`
* Preview renders instantly below — all in your browser.

### ✍️ Live Edit Mode

* Click the **Live Edit** button in the top bar to toggle edit mode.
* Markdown entered in the left textarea is previewed live on the right.
* Scrolls are synchronized between editor and preview.
* Click the same button again to switch back to Upload Mode.

### 💾 Download Markdown

* Click the 💾 **Download** button to save your Markdown.
* If editing live and no file is loaded, the default filename is `live-edit.md`.
* Shortcut: `Ctrl+S` / `Cmd+S` also triggers download.

### ⚙️ Settings Panel

* Toggle display of word/character count.
* Adjust font size with a slider; font size persists across sessions.
* Switch between light and dark themes using the **Dark Mode** checkbox.
* Settings menu opens and closes via buttons in the UI.

---

## 🧩 Customization

* 🎨 **Theme/Styling:** Edit CSS in the `/styles/` directory to tweak layout, colors, or appearance, including light/dark themes and admonition styles.
* 🧠 **Features:** Extend or modify scripts in `/scripts/` organized into core, features, UI, and utils subfolders.
* 🔧 **Markdown Parser:** Uses `marked.min.js` by default, but you can swap it for another Markdown library if preferred.

---

## 📌 Supported Admonitions

Create callouts in your Markdown using blockquote syntax:

```markdown
> [!TIP]
> This is a tip.
```

Supported types:

| Type      | Syntax Example | Icon |
| --------- | -------------- | ---- |
| Tip       | `[!TIP]`       | 💡   |
| Note      | `[!NOTE]`      | ℹ️   |
| Warning   | `[!WARNING]`   | ⚠️   |
| Caution   | `[!CAUTION]`   | ❗    |
| Important | `[!IMPORTANT]` | ❗❗   |

Each admonition renders with distinct styles and colors in both light and dark modes.

---

## 📋 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed updates and version history.

---

## 🙋 Feedback & Contributions

Suggestions, bug reports, and pull requests are welcome!
Open an issue or fork the project to contribute.

---

## 📄 License

Licensed under the [MIT License](./LICENSE).
Free to use, modify, and share.

---

## 📦 Third-Party Attributions

* [`marked`](https://github.com/markedjs/marked) — MIT License
* [`github-markdown-css`](https://github.com/sindresorhus/github-markdown-css) — MIT License
* Favicon icon by Muhammad Andy, from [Flaticon](https://www.flaticon.com/free-icons/markdown)

See [NOTICE.md](./NOTICE.md) for full third-party license information.
