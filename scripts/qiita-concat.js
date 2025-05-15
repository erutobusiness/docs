import fs from 'node:fs';
import path from 'node:path';

// qiitaConfig を引数で受け取るように変更
function createHeader(qiitaConfig) {
  return `---
title: ${qiitaConfig.title}
tags: \n  - ${qiitaConfig.tags.join('\n  - ')}
private: ${qiitaConfig.private}
updated_at: ${qiitaConfig.updated_at}
id: ${qiitaConfig.id}
organization_url_name: ${qiitaConfig.organization_url_name}
slide: ${qiitaConfig.slide}
ignorePublish: ${qiitaConfig.ignorePublish}
---
`;
}

// export default を export に変更、または呼び出し側を修正
// ここでは export function に変更
export function concatMd(declarativeMdDir, excludeFiles, outputFile, config) {
  // config を引数に追加
  let combinedContent = createHeader(config);

  const filesToConcat = fs
    .readdirSync(declarativeMdDir)
    .filter((file) => file.endsWith('.md') && !excludeFiles.includes(file))
    .sort((a, b) => {
      const numA = Number.parseInt(a.split('-')[0], 10);
      const numB = Number.parseInt(b.split('-')[0], 10);
      return numA - numB;
    });

  filesToConcat.forEach((file, index) => {
    const filePath = path.join(declarativeMdDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    combinedContent += content;
    if (index < filesToConcat.length - 1) {
      combinedContent += '\r\n---\r\n\r\n'; // ファイル間に区切り文字を挿入
    }
  });
  fs.writeFileSync(outputFile, combinedContent, 'utf-8');
  // biome-ignore lint/suspicious/noConsoleLog: for debugging
  console.log(`Successfully created ${outputFile}`);
}
