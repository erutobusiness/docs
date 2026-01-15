const fs = require('node:fs');
const path = require('node:path');

try {
  const sources = [
    { file: 'lint_declarative.json', prefix: '' },
    { file: 'lint_theArtOfLoving.json', prefix: 'md/theArtOfLoving/' },
    { file: 'lint_babycup.json', prefix: 'md/baby-cup/' },
  ];

  const allErrors = [];

  for (const src of sources) {
    if (!fs.existsSync(src.file)) {
      console.warn(`File not found: ${src.file}`);
      continue;
    }
    let rawContent = fs.readFileSync(src.file, 'utf8');
    // Strip BOM
    rawContent = rawContent.replace(/^\uFEFF/, '');

    try {
      const errors = JSON.parse(rawContent);
      if (Array.isArray(errors)) {
        for (const fileErr of errors) {
          const relative = fileErr.filePath;
          let finalPath = relative;
          if (src.prefix && !relative.includes(src.prefix.replace(/[\\/]$/, ''))) {
            if (!fs.existsSync(relative)) {
              const candidate = path.join(src.prefix, relative);
              if (fs.existsSync(candidate)) {
                finalPath = candidate;
              }
            }
          }
          fileErr.filePath = finalPath;
          allErrors.push(fileErr);
        }
      }
    } catch (e) {
      console.error(`Failed to parse JSON in ${src.file}: ${e.message}`);
    }
  }

  // Flatten errors
  const flatErrors = allErrors.flatMap((file) =>
    file.messages.map((msg) => ({
      filePath: file.filePath,
      line: msg.line,
      column: msg.column,
      ruleId: msg.ruleId,
      severity: msg.severity,
      message: msg.message,
    }))
  );

  // Output report
  let output = '# 詳細エラーレポート\n\n';

  // Proposed solutions map
  const solutions = {
    'ja-technical-writing/no-mix-dearu-desumasu':
      '文体が混在しています。ディレクトリごとの統一ルール（baby-cup/theArtOfLovingは『ですます』、declarativeは『である』）に合わせて、文末を修正してください。',
    'ja-technical-writing/no-doubled-joshi':
      '一文の中に同じ助詞（が、は、に等）が複数回使われています。文を分割するか、言い回しを変えて助詞の重複を避けてください。（警告設定中）',
    'ja-technical-writing/sentence-length':
      '文が長すぎます（150文字以内の制限を超過）。読点を打つだけでなく、接続詞を減らして複数の文に分割することで可読性を上げてください。',
    'ja-technical-writing/max-ten':
      '一つの文に読点（、）が多すぎます（目安3〜4個）。文構造が複雑になっている可能性があるため、文の分割を検討してください。',
    'ja-technical-writing/ja-no-mixed-period':
      '文末が『。』で終わっていません。箇条書きや体言止め箇所を除き、句点を追加して文を完結させてください。',
    'ja-technical-writing/ja-no-redundant-expression':
      '冗長な表現です（例：『〜を実行する』→『〜する』）。よりシンプルで直接的な表現への書き換えを検討してください。',
    'ja-technical-writing/max-kanji-continuous-len':
      '漢字が長く連続しており（6〜7文字以上）、読みづらくなっています。読点を挟むか、一部をひらがなに開く（例：『問題定義方法』→『問題を定義する方法』）などの対策を行ってください。（警告設定中）',
    'ja-technical-writing/ja-no-successive-word':
      '同じ単語が連続しています（例：『長い長い』『がが』）。入力ミスの可能性が高いですが、強調表現の場合は許容範囲か検討してください。',
    'ja-technical-writing/no-doubled-conjunctive-particle-ga':
      '逆接の接続助詞『が』が一文に複数回使われています（例：『〜ですが、〜ですが』）。論理構造が分かりにくくなるため、文を分けるか『しかし』などの接続詞を使って整理してください。',
    'ja-technical-writing/no-doubled-conjunction':
      '同じ接続詞が連続して使われています。表現が単調になるのを防ぐため、別の接続詞を使うか文構造を変えてください。',
    'ja-technical-writing/arabic-kanji-numbers':
      '漢数字と算用数字の使い分けルールに違反しています。数を数えられるもの（回数、個数など）は算用数字（1, 2...）、慣用句や固有名詞は漢数字を使用してください。',
    'ja-technical-writing/ja-no-weak-phrase':
      '『〜だと思います』『〜かもしれません』などの弱い表現（あいまいな表現）が含まれています。著者の主張を弱めるため、できるだけ断定的な表現への書き換えを検討してください（警告設定中）。',
    '@textlint-ja/ai-writing/ai-tech-writing-guideline':
      'AIによる品質改善提案です。具体性、明確性、簡潔さなどの観点からの指摘ですが、文脈上問題なければ無視しても構いません（警告設定中）。明らかに分かりにくい場合のみ修正してください。',
    '@textlint-ja/ai-writing/no-ai-hype-expressions':
      '『大幅に』『完全に』『画期的な』などの強い表現（誇張表現）が検出されました。客観的な数値を示すか、『多くのケースで』『著しく』など、文脈に合わせて表現を和らげてください。',
    '@textlint-ja/ai-writing/no-ai-emphasis-patterns':
      '強調表現（太字と絵文字の併用など）が過剰または機械的である可能性があります。強調は本当に重要な箇所に絞ってください。',
  };

  // Group by ruleId for better readability
  const grouped = flatErrors.reduce((acc, curr) => {
    if (!acc[curr.ruleId]) acc[curr.ruleId] = [];
    acc[curr.ruleId].push(curr);
    return acc;
  }, {});

  for (const ruleId in grouped) {
    output += `## ${ruleId} (${grouped[ruleId].length}件)\n\n`;

    // Add solution advice if available
    if (solutions[ruleId]) {
      output += `> **【解説・対応策】**\n> ${solutions[ruleId]}\n\n`;
    } else if (ruleId.startsWith('preset-ja-technical-writing/')) {
      // Try fallback to base rule ID
      const baseId = ruleId.replace('preset-ja-technical-writing/', 'ja-technical-writing/');
      if (solutions[baseId]) {
        output += `> **【解説・対応策】**\n> ${solutions[baseId]}\n\n`;
      }
    }

    for (const error of grouped[ruleId]) {
      try {
        const fileContent = fs.readFileSync(error.filePath, 'utf8');
        const lines = fileContent.split('\n');
        // line is 1-based
        const targetLine = lines[error.line - 1] || '';
        const relativePath = path.relative(process.cwd(), error.filePath);

        output += `- **${relativePath}:${error.line}**\n`;
        let label = error.severity === 1 ? '警告' : 'エラー';
        // Force specific rules to be treated as warnings if requested by user
        if (
          error.ruleId.includes('ai-tech-writing-guideline') ||
          error.ruleId.includes('max-kanji-continuous-len') ||
          error.ruleId.includes('no-doubled-joshi') ||
          error.ruleId.includes('no-ai-hype-expressions')
        ) {
          label = '警告';
        }
        output += `  - ${label}: ${error.message}\n`;
        output += `  - 対象行: \`${targetLine.trim()}\`\n\n`;
      } catch (_e) {
        output += `- **${error.filePath}:${error.line}** (読み込み失敗)\n\n`;
      }
    }
  }

  // Write to file instead of console log to be safer with encoding
  fs.writeFileSync('detailed_error_report_final.md', output, 'utf8');
  console.info('Report generated: detailed_error_report_final.md');
} catch (e) {
  console.error('Error processing textlint json:', e);
}
