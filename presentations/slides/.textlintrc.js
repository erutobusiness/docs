const baseConfig = require("../../.textlintrc.js");

module.exports = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    "preset-ja-technical-writing": {
      ...baseConfig.rules["preset-ja-technical-writing"],
      "ja-no-mixed-period": false, // MarpのYAMLフロントマターの誤検出防止
      "no-mix-dearu-desumasu": false, // スライドはである/ですます混在が自然
    },
  },
};
