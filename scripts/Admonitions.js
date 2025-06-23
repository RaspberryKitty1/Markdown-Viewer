// scripts/Admonitions.js

(() => {
  // Emoji and label mapping for admonitions
  const iconMap = {
    tip: "💡",
    note: "ℹ️",
    warning: "⚠️",
    caution: "❗",
    important: "❗❗",
  };

  const labelMap = {
    tip: "Tip",
    note: "Note",
    warning: "Warning",
    caution: "Caution",
    important: "Important",
  };

  // Extend marked's tokenizer
  const tokenizer = {
    blockquote(src) {
      const regex = /^(> \[!(TIP|NOTE|WARNING|CAUTION|IMPORTANT)\][^\n]*(\n>.*)*)/i;
      const match = regex.exec(src);
      if (match) {
        const raw = match[0];
        const type = match[2].toLowerCase();

        // Remove leading "> " from each line, skip first line (label line)
        const contentLines = raw
          .split("\n")
          .map((line) => line.replace(/^> ?/, ""))
          .slice(1);

        const content = contentLines.join("\n");

        // Use marked's lexer to parse the content inside admonition
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

  // Extend marked's renderer
  const renderer = {
    blockquote(token) {
      if (token.isAdmonition) {
        const icon = iconMap[token.admonitionType] || "";
        const label = labelMap[token.admonitionType] || "";
        return `
          <blockquote class="admonition admonition-${token.admonitionType}">
            <p class="admonition-label">${icon} <strong>${label}</strong></p>
            ${this.parser.parse(token.tokens)}
          </blockquote>
        `;
      }
      // Default fallback
      return `<blockquote>${this.parser.parse(token.tokens)}</blockquote>`;
    },
  };

  // Register the tokenizer and renderer with marked
  marked.use({ tokenizer, renderer });

  // Expose if needed for debugging
  window.customMarkedAdmonitions = { tokenizer, renderer };
})();
