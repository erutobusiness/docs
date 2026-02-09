module.exports = {
  filters: {
    "node-types": {
      nodeTypes: ["BlockQuote"],
    },
    // Filter out specific rules in footnotes
    footnote: {
      ruleId: [
        "ja-technical-writing/no-mix-dearu-desumasu",
        "ja-technical-writing/max-comma",
      ],
    },
    allowlist: {
      allow: ["/「[^」]+」/", "/『[^』]+』/"],
    },
  },
  rules: {
    // 1行1文ルール
    "one-sentence-per-line": true,

    // 箇条書きの末尾に句点「。」を禁止する
    "period-in-list-item": {
      periodMark: "",
      periodMarks: ["。", "．"],
      forceAppendPeriod: true,
    },

    // Custom rule to enforce 'desumasu' in footnotes
    "footnote-dearu-desumasu": true,

    "preset-ja-technical-writing": {
      "sentence-length": {
        max: 150,
        skipUrlString: true,
      },
      "no-doubled-joshi": {
        allow: ["も", "や", "か", "が"],
        severity: "warning",
      },
      "no-mix-dearu-desumasu": {
        preferInBody: "である",
        preferInHeader: "である",
        preferInList: "である",
      },
      "no-doubled-conjunctive-particle-ga": false,
      "no-doubled-conjunction": false,
      "no-exclamation-question-mark": false,
      "ja-no-weak-phrase": {
        severity: "warning",
      },
      "max-kanji-continuous-len": {
        severity: "warning",
      },
      "ja-no-mixed-period": {
        allowPeriodMarks: [":", "："],
        allowEmojiAtEnd: true,
        forceAppendPeriod: false,
      },
      "ja-no-successive-word": {
        allow: ["…"],
      },
      "ja-no-redundant-expression": {
        severity: "warning",
      },
      "max-comma": {
        severity: "warning",
      },
    },
    "@textlint-ja/preset-ai-writing": {
      "ai-tech-writing-guideline": false,
      "no-ai-hype-expressions": {
        severity: "warning",
      },
      "no-ai-emphasis-patterns": {
        severity: "warning",
      },
      "no-ai-colon-continuation": false,
      "no-ai-list-formatting": false,
    },
  },
};
