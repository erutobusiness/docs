const baseConfig = require("../.textlintrc.js");

module.exports = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    // Disable Japanese-specific rules
    "preset-ja-technical-writing": false,
    "@textlint-ja/preset-ai-writing": false,
    "one-sentence-per-line": false,
    "period-in-list-item": false,
    "footnote-dearu-desumasu": false,

    // Enable English rules
    terminology: {
      defaultTerms: true,
      skip: ["BlockQuote", "CodeBlock"], // Don't check inside code or quotes
      exclude: ["readme(s)?", "regexp?(s)?"],
    },
  },
};
