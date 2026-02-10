# docs

個人のドキュメント・メモ・発表資料を管理するリポジトリです。

## 記法ルール

Markdownの記法ルールです。
詳細は `.ai/instructions.md` を参照してください。

|ルール|例|
|-|-|
|1行1文|文の途中で改行しない|
|箇条書きに句点なし|`- 項目` (`- 項目。` はNG)|
|情報源のURL明記|脚注 `[^1]: https://...` で出典を示す|
|WikiLink|`[[filename]]` や `[[filename\|表示名]]` で他ファイルを参照|

## 開発コマンド

|コマンド|説明|
|-|-|
|`npm run lint`|format + textlint を全ファイルに実行|
|`npm run format`|Prettier + Remark でフォーマット|
|`node scripts/textlint-file.js <path>`|個別ファイルのlint|

## AI設定

|ファイル|対象|
|-|-|
|`.ai/instructions.md`|全AIアシスタント共通ルール|
|`CLAUDE.md`|Claude Code|
|`GEMINI.md`|Gemini Code Assist|
|`.github/copilot-instructions.md`|GitHub Copilot|
