# Changelog

## \[v1.6.3] - 2025-06-30

**Changed:**

* **Styles (`admonitions.css`):**

  * Separated styles for normal blockquotes from admonitions, with distinct light and dark mode colors.
  * Introduced CSS variables (`--admonition-color`) to unify border and label colors for admonitions.
  * Simplified and reorganized admonition base styles for clarity and consistency.
  * Enhanced dark mode support by moving color overrides into CSS variables rather than fixed label colors.
  * Applied consistent label styling using the new color variable for better maintainability.

* **Scripts directory restructuring:**

  * Reorganized the `scripts` folder into modular subfolders to improve maintainability and clarity.
  * Grouped files by functionality: core app logic, features, UI components, and utility functions.

---

## \[v1.6.2] - 2025-06-29

**Changed:**

* Refactored and streamlined `admonitions.css` for clarity and maintainability.

  * Removed redundant comments and simplified class structure.
  * Consolidated border color definitions for each admonition type.
  * Introduced distinct dark mode color overrides for all admonition types.
  * Applied consistent label coloring across light and dark themes.

---

## \[v1.6.1] - 2025-06-29

**Added:**

* A **version string (`v1.6.0`)** is now displayed in the footer of the settings menu next to the "Close" button.
* Added `#settingsFooter` layout to cleanly organize the button and version label.

**Changed:**

* Cleaned up the `index.html` formatting for better readability and consistent style.
* Moved previously inline styles for layout (`settingsFooter`) into `settings.css` for maintainability.

---

## \[v1.6.0] - 2025-06-29

**Added:**

* Introduced a settings menu accessible via ⚙️ button, allowing users to:

  * Toggle dark/light mode
  * Show or hide word/char counters
  * Adjust font size dynamically
* Added `settings.css` and `settings.js` to handle layout and logic for the settings menu.

**Changed:**

* Theme toggle functionality (`theme.js`) now reads from a checkbox in the settings menu instead of a standalone button.
* `theme.js` now respects system dark mode preference (`prefers-color-scheme`) on first load if no theme is saved.
* Restructured CSS imports in `master.css` for clarity and modularity; `variables.css` now defines shared theme variables like `--font-size` and `--text-color`.
* Moved all font sizing to use the `--font-size` CSS variable for consistent scaling across layout, editor, and admonitions.
* Updated `admonitions.css` to inherit global theme colors and font sizes instead of hardcoded values.

**Fixed:**

* Font size selector now properly affects text inside markdown preview, live editor, and admonition blocks.
* Ensured consistent theming and sizing for markdown content and editor across light and dark modes.

---

## \[v1.5.9] - 2025-06-29

**Added:**

* Added a new `responsive.css` stylesheet to improve mobile responsiveness and usability.
* Responsive improvements include flexible top bar layout, stacked editing sections, and larger buttons for easier touch targets on small screens.

**Changed:**

* Removed the `<link>` reference to `fontSizeSelector.css` as the font size selector feature was planned but not implemented.
* Removed direct `<link>` to `topbar.css` since its styles are imported via `master.css`.
* Adjusted word and character counter font size for better mobile readability.

**Fixed:**

* Corrected CSS selector mismatches in mobile styles to properly target existing HTML elements, enabling effective responsive behavior.

---

## \[v1.5.8] - 2025-06-29

**Added:**

* Word and character counters now appear in the top bar next to the **Switch to Edit Mode** button.
* Introduced `wordCharCounter.js` as a dedicated module for live tracking and updating of word/char counts.
* Counters update dynamically on text input and after file uploads.

**Fixed:**

* Word and character counts now update correctly after loading a markdown file.

**Changed:**

* Moved word/char count logic out of the main editor script for better modularity and maintainability.

---

## \[v1.5.7] - 2025-06-23

**Fixed:**

* Persist markdown content and view/edit mode across page reloads.
* Clear stored markdown and filename on new file upload to prevent stale content.
* Corrected view mode preview rendering on page load.
* Improved mode toggle button functionality to reflect current state accurately.

---

## \[v1.5.6] - 2025-06-23

**Improved:**

* Enhanced live editor scroll synchronization:
  * Scroll syncing now works smoothly in both directions between the textarea and preview pane.
  * Reduced jitter by preventing circular scroll event triggering.
  
---

## \[v1.5.5] - 2025-06-24

**Fixed:**

* Restored full admonitions support after modularizing scripts  
  * Corrected `Admonitions.js` tokenizer and renderer integration for proper labels, emojis, and GitHub-style CSS

**Refactored:**

* Split monolithic `styles.css` into modular files for better maintainability:  
  * `admonitions.css`, `base.css`, `dragdrop.css`, `fileNameInput.css`, `github-markdown.css`, `layout.css`, `master.css`, `mobile.css`, and `topbar.css`

**Other:**

* Maintained all core features: upload, live editing with synchronized scroll, theme toggle, and downloading functionality

---

## \[v1.5.4] - 2025-06-23

**Refactored:**

* Project structure overhaul
  All JavaScript files modularized and moved into a `/scripts/` directory

  * `script.js` split into `appState.js`, `elements.js`, `fileHandling.js`, `editor.js`, `download.js`, `modeToggle.js`, `theme.js`, `utils.js`
  * `marked.min.js` moved to `/scripts/`
* CSS files moved from root into a dedicated `/styles/` directory

  * `styles.css` and `github-markdown.css` relocated under `/styles/`

**Fixed:**

* Ensured `marked.min.js` loads properly before dependent scripts to prevent `marked is not defined` errors
* Resolved variable redeclaration errors by scoping constants appropriately across modules
* Updated all `<script>` and `<link>` references in `index.html` to reflect new file paths

**Added:**

* Auto-toggle to **Edit Mode** on mobile devices (screen width ≤ 768px) for a better UI experience on small screens

**Other:**

* Preserved all existing functionality: upload, live edit, theme toggle, download, and admonitions continue to work as before
* Improved maintainability and modularity for future development

---

## \[v1.5.3] - 2025-06-23

**Added:**

* Filename display is now an editable `<input>` field allowing users to rename the file before download
* Input width dynamically adjusts to fit the content using a hidden span for sizing

**Improved:**

* More intuitive UX for renaming downloaded markdown files directly in the top bar

---

## \[v1.5.2] - 2025-06-22

**Enhancements:**

* Improved UI mode toggling between "View Mode" and "Edit Mode":

  * Renamed variables for clarity (`uploadModeSection` → `viewModeSection`, `liveEditModeSection` → `editModeSection`).
  * Updated toggle button text to explicitly indicate switching between modes ("Switch to Edit Mode" / "Switch to View Mode").
  * Ensured Markdown preview updates correctly when switching modes.
  * Added initialization of toggle button text on page load.

* Renamed browser tab title from **"Markdown Viewer (Dark Mode)"** to **"Markdown Viewer"** for a cleaner, simpler appearance.

---

## \[v1.5.1] - 2025-06-22

**Fixes:**

* Corrected Nginx configuration file path:

  * Updated `root` directive from `/var/www/MarkdownViewer` to `/var/www/Markdown-Viewer` to match actual deployment directory name.

No other changes in this release.

---

## \[v1.5.0] - 2025-06-22

**Added:**

* New script `Create_Certs.sh` for automated SSL certificate generation:

  * Generates a Root CA, server private key, CSR, and signs the server certificate with SAN support.
  * Outputs certificates to a dedicated `certs` directory.
  * Includes instructions to import the root CA certificate into browsers.

* New deployment script `nginx-deploy.sh` to automate Nginx setup and deployment:

  * Checks for existing SSL certificates, runs `Create_Certs.sh` if missing.
  * Copies project files, assets, and certificates to deployment directories.
  * Sets correct permissions on certificates and assets.
  * Enables the site by creating a symlink in Nginx's sites-enabled.
  * Validates Nginx configuration and reloads the service.
  * Performs an HTTPS request test to verify successful deployment.

No changes to existing project code.

--

## \[v1.4.1] - 2025-06-22

**Documentation:**

* Cleaned up trailing blank lines in documentation files:

  * Removed extra newline at end of `NOTICE.md`.
  * Removed extra newline at end of `README.md`.

No code changes in this release.

## [v1.4.0] - 2025-06-22

**Documentation:**

* Added key project documentation files:
  * `LICENSE` — MIT License text.
  * `NOTICE.md` — Third-party attributions and license info.
  * `README.md` — Project overview, usage, and setup instructions.
  * `CHANGELOG.md` — Project version history and update log.

No code changes in this release.

---

## \[v1.3.2] - 2025-06-22

**Enhancements:**

* **Drag & Drop UX Improvements:**

  * Removed the old dropzone area and replaced it with a floating **drag indicator** at the top of the viewport that appears when a file is dragged over the window.
  * Drag indicator fades in after a short delay and fades out smoothly when drag ends or file is dropped, improving visual feedback and user experience.

* **Drag & Drop Logic:**

  * Improved drag event handling to track nested dragenter/dragleave events correctly via a counter, preventing flickering of the drag indicator.
  * Files dropped anywhere on the page will trigger file loading, no longer confined to a specific dropzone area.

* **Theming and Styles:**

  * Added CSS styles for the drag indicator consistent with light/dark themes.
  * Updated admonition block styling with separate color schemes for light and dark modes, inspired by GitHub’s style for better readability and visual distinction.

---

## \[v1.3.1] - 2025-06-22

**Fixes & Improvements:**

* **Theme Toggle Button Icon:**

  * Updated the theme toggle button to show the icon of the *next* theme to switch to (sun icon for light mode, moon icon for dark mode) for better user clarity.

* **Download Button Visibility:**

  * Added dynamic download button visibility depending on the current mode and markdown content:

    * In **Live Edit mode**, the download button shows only if the textarea is not empty and auto-sets filename to `live-edit.md` if no file is selected.
    * In **Upload mode**, the download button shows only if there is loaded markdown content.
  * Download button visibility updates live on text input, file load, and mode toggle.

* **Initialization:**

  * Ensures download button visibility is properly initialized on page load.

---

## \[v1.3.0] - 2025-06-22

**Added:**

* **Admonition Support in Markdown Preview:**

  * Custom tokenizer detects blockquotes starting with `[!(TIP|NOTE|WARNING|CAUTION|IMPORTANT)]` syntax.
  * Rendered as styled admonition blocks with distinct colors, icons, and titles.
  * Supported admonition types: Tip, Note, Warning, Caution, Important.
  * Each admonition type has unique background color, border color, and icon for clear visual distinction.

**Changed:**

* Refactored markdown renderer’s `blockquote` method to support both regular and admonition blockquotes.
* Removed redundant comments and cleaned up event listener comments in `script.js`.

**CSS:**

* Added styles for `.admonition` blocks with color-coded borders, backgrounds, and text colors for each admonition type.
* Admonitions have subtle background tints and left borders to visually differentiate from regular blockquotes.

---

## \[v1.2.0] - 2025-06-22

**Added:**

* **Theme Toggle Button:**

  * New button in the topbar to switch between Light and Dark themes.
  * Theme preference saved to `localStorage` and applied on page load.
* **CSS Custom Properties:**

  * Introduced CSS variables for colors, borders, backgrounds, and accents for easier theming.
  * Light and Dark mode color schemes defined using CSS custom properties.
* **Dynamic Styling:**

  * Updated inline styles in HTML to use CSS variables for colors and borders.
  * All buttons, dropzone, markdown preview, and live editor now respond to theme changes.

**Changed:**

* Refactored CSS to leverage CSS variables for theming consistency and maintainability.
* Updated the markdown preview placeholder and dropzone text color styling to use theme-aware variables.
* Refined button styling to use accent colors from theme variables.
* Minor markup cleanup with better semantic sectioning.

---

## \[v1.1.1] - 2025-06-22

**Improved:**

* Wrapped live preview content in `#livePreviewInner` div for better layout control.
* Adjusted script to target `#livePreviewInner` for markdown rendering while keeping scroll container (`#livePreview`) separate.
* Added one-way scroll synchronization from live edit textarea to live preview pane for smoother navigation.
* Enabled Ctrl/Cmd+S keyboard shortcut to trigger markdown download.
* Minor code cleanup for event listeners and formatting.
* CSS improvements:

  * Set full height and overflow-y scroll on live edit textarea and live preview for consistent scroll behavior.
  * Removed some redundant comments in CSS.

---

## \[v1.1.0] - 2025-06-22

**Added:**

* **Live Edit Mode:**

  * New toggle button to switch between Upload Mode and Live Edit Mode.
  * Live Edit Mode offers a split view with a markdown textarea on the left and a live preview on the right.
  * Placeholder text for the live edit textarea and live preview area.
* **Download Button:**

  * Added a download button to save the current markdown content as a file.
  * Button appears only after a file is loaded or markdown is entered.
* **UI Improvements:**

  * Rearranged top navigation bar to include mode toggle, upload button, filename display, and download button.
  * Added accessible labels and tooltips for new and existing buttons.
* **Styling:**

  * Added styles for mode toggle button, download button, live edit textarea, and live preview area.
  * Improved dropzone styling on dragover state.

**Changed:**

* Refactored `loadFile()` to update both upload mode preview and live edit textarea and preview.
* Updated alerts for file validation to a simpler message.
* Improved mode toggle logic in `script.js` to switch UI sections and update button text dynamically.
* Removed the `<!-- index.html -->` comment from the HTML.

---

## \[v1.0.0] - 2025-06-22

**Added:**

* Initial support for markdown file preview with placeholder text in the preview area.
* Drag-and-drop upload zone with accessible label, styled with dashed border and instructions.
* File upload validation to accept only `.md`, `.markdown`, and `.txt` files.
* Drag-and-drop event handling for markdown file upload.
* Refactored file reading logic into reusable `loadFile()` function.
* Click-to-upload button triggering file selector.

**Changed:**

* Added comment header to `index.html` for clarity.
* Updated markdown preview `<article>` to include placeholder instructions.

---
