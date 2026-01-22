module.exports = {
  filters: {
    'node-types': {
      nodeTypes: ['BlockQuote', 'ListItem'],
    },
    // Filter out specific rules in footnotes
    footnote: {
      ruleId: ['ja-technical-writing/no-mix-dearu-desumasu', 'ja-technical-writing/max-comma'],
    },
  },
  rules: {
    // 1行1文ルール
    'one-sentence-per-line': true,

    // Custom rule to enforce 'desumasu' in footnotes
    'footnote-dearu-desumasu': true,

    'preset-ja-technical-writing': {
      'sentence-length': {
        max: 150,
        skipUrlString: true,
      },
      'no-doubled-joshi': {
        allow: ['も', 'や', 'か', 'が'],
        severity: 'warning',
      },
      'no-mix-dearu-desumasu': {
        preferInBody: 'ですます',
        preferInHeader: 'ですます',
        preferInList: 'ですます',
      },
      'no-doubled-conjunctive-particle-ga': false,
      'no-doubled-conjunction': false,
      'no-exclamation-question-mark': false,
      'ja-no-weak-phrase': {
        severity: 'warning',
      },
      'max-kanji-continuous-len': {
        severity: 'warning',
      },
      'ja-no-mixed-period': {
        allowPeriodMarks: [':', '：'],
        allowEmojiAtEnd: true,
        forceAppendPeriod: false,
      },
      'ja-no-successive-word': {
        allow: ['…'],
      },
    },
    '@textlint-ja/preset-ai-writing': {
      'ai-tech-writing-guideline': {
        severity: 'warning',
      },
      'no-ai-hype-expressions': {
        severity: 'warning',
      },
      'no-ai-colon-continuation': false,
      'no-ai-list-formatting': false,
    },
  },
};
