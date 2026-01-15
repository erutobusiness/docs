const baseConfig = require('../../.textlintrc.js');

module.exports = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    'preset-ja-technical-writing': {
      ...baseConfig.rules['preset-ja-technical-writing'],
      // Root config defaults to 'dearu', so we just inherit it.
      // Explicitly keeping it here for clarity or if we want to change it later.
      'no-mix-dearu-desumasu': {
        ...baseConfig.rules['preset-ja-technical-writing']['no-mix-dearu-desumasu'],
        preferInBody: 'である',
        preferInHeader: 'である',
        preferInList: 'である',
      },
    },
  },
};
