const baseConfig = require('../.textlintrc.js');

module.exports = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    'preset-ja-technical-writing': {
      ...baseConfig.rules['preset-ja-technical-writing'],
      'ja-no-mixed-period': false,
    },
  },
};
