const slidesConfig = require("../.textlintrc.js");

module.exports = {
  ...slidesConfig,
  rules: {
    ...slidesConfig.rules,
    "preset-ja-technical-writing": {
      ...slidesConfig.rules["preset-ja-technical-writing"],
      "no-mix-dearu-desumasu": false, // である/ですます混在を許可
    },
  },
};
