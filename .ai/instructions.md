# AI コーディングアシスタント共通設定

このファイルは Claude Code、Google Antigravity（Gemini Code Assist）、GitHub Copilot など、
複数の AI コーディングアシスタントで共有するインストラクションです。

## Markdown 編集ルール

- Web 検索して記載する場合、必ず注釈としてその情報源を URL 付きで記載すること
- **1行1文ルール**: 1つの文として記述するテキストは、改行で区切らずに1行に収めること（`one-sentence-per-line`）
- **箇条書きの句点禁止**: 箇条書きの末尾に句点「。」を付けないこと（`period-in-list-item` で自動修正可能）
- **AI過剰表現の抑制**: 「画期的な」「革命的な」といった過剰な宣伝文句（Hype）を使用しないこと（`no-ai-hype-expressions`）

## TypeScript / JavaScript 開発ルール (Biome)

- コードのフォーマットとリントには **Biome** を使用している
- コミットの提案をする際は、可能な限り事前に `npm run format` または `npm run check` を実行し、エラーがない状態にすること

## Next.js 開発ルール

- ドキュメントコンテンツは `md/` ディレクトリに配置されている
- `npm run build` でエラーが出ないこと
- 開発サーバーの起動: `npm run dev`（`--turbopack` が有効）

## textlint

- コミット前に `npm run lint:text` を実行して lint エラーがないことを確認すること
- 各 md ディレクトリ配下には独自の `.textlintrc.js` がある場合があるので注意
- **ルール変更時は事前相談必須**: `.textlintrc.js` のルールを追加・変更・削除する場合は、必ず事前にユーザーに相談し、承認を得てから実施すること
  - lint エラーを解消するためであっても、勝手にルールを変更しない
- **新規 `.textlintrc.js` を追加する場合**: 新しいディレクトリに `.textlintrc.js` を作成した場合、`package.json` の `lint-staged` にも対応するエントリを追加すること
  - より具体的なパス（サブディレクトリ）のエントリは、親ディレクトリのエントリより前に配置する（lint-staged はより具体的なパターンを優先するため）
