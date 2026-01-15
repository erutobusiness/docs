const baseConfig = require('../../.textlintrc.js');

module.exports = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    'preset-ja-technical-writing': {
      ...baseConfig.rules['preset-ja-technical-writing'],
      'no-mix-dearu-desumasu': {
        ...baseConfig.rules['preset-ja-technical-writing']['no-mix-dearu-desumasu'],
        preferInBody: 'である',
        preferInHeader: 'である',
        preferInList: 'である',
      },
    },
  },
};
