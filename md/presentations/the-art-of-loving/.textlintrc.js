const baseConfig = require('../../.textlintrc.js');

module.exports = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    'preset-ja-technical-writing': {
      ...baseConfig.rules['preset-ja-technical-writing'],
      'no-mix-dearu-desumasu': {
        ...baseConfig.rules['preset-ja-technical-writing']['no-mix-dearu-desumasu'],
        preferInBody: 'ですます',
        // 見出しに「〜である」という引用タイトルを含むことがあるため許容
        preferInHeader: 'である',
        preferInList: 'ですます',
        strict: false,
      },
      // 箇条書きが句点で終わらないことを許容
      'ja-no-mixed-period': false,
      // 発表スクリプトのため、読点の制限を緩和
      'max-ten': false,
      // 発表スクリプトのため、文長の制限を緩和
      'sentence-length': {
        max: 200,
        skipUrlString: true,
      },
    },
  },
};
