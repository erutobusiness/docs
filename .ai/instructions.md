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

- **設定ファイルの事前確認**: 文章を作成・修正する前に、必ずカレントディレクトリまたは親ディレクトリの `.textlintrc.js` を確認し、適用されているルール（特に「だ・である」「です・ます」の指定）を把握してから作業を行うこと

- コミット前に `npm run lint:text` を実行して lint エラーがないことを確認すること

- 各 md ディレクトリ配下には独自の `.textlintrc.js` がある場合があるので注意

- **ルール変更時は事前相談必須**: `.textlintrc.js` のルールを追加・変更・削除する場合は、必ず事前にユーザーに相談し、承認を得てから実施すること
  - lint エラーを解消するためであっても、勝手にルールを変更しない

- **新規 `.textlintrc.js` を追加する場合**: 新しいディレクトリに `.textlintrc.js` を作成した場合、`package.json` の `lint-staged` にも対応するエントリを追加すること
  - より具体的なパス（サブディレクトリ）のエントリは、親ディレクトリのエントリより前に配置する（lint-staged はより具体的なパターンを優先するため）

- **自動チェック（Claude Code hooks）**: Claude Code では PostToolUse hook により、MD ファイルの Write/Edit 後に textlint が自動実行される
  - 違反が検出された場合は即座にフィードバックが返されるため、指摘内容に従って修正すること
  - 手動で単一ファイルをチェックする場合: `node scripts/textlint-file.js <path>`

- **よくある違反パターン**:
  - 1行1文ルール違反: 1つの文を途中で改行してしまう（`one-sentence-per-line`）
  - 箇条書き句点: リストアイテムの末尾に「。」を付けてしまう（`period-in-list-item`）
  - である/ですます混在: `.textlintrc.js` で指定された文体と異なる文末表現を使う
