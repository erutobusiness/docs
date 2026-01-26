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
      // <details>タグ内の箇条書きがListItemとして認識されないため、句点チェックを無効化
      'ja-no-mixed-period': false,
    },
    // 引用を多く含むドキュメントがあるため、AI品質チェックを無効化
    '@textlint-ja/preset-ai-writing': {
      'ai-tech-writing-guideline': false,
      'no-ai-hype-expressions': {
        severity: 'warning',
      },
      'no-ai-colon-continuation': false,
      'no-ai-list-formatting': false,
    },
  },
};
