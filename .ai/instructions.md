# AI コーディングアシスタント共通設定

このファイルは Claude Code、Google Antigravity（Gemini Code Assist）、GitHub Copilot など、
複数の AI コーディングアシスタントで共有するインストラクションです。

## リポジトリ情報

GitHub 操作を行う際に必要な情報：

- オーナー名（owner）: `erutobusiness`
- リポジトリ名（repo）: `docs`
- デフォルトブランチ名: `main`

## Markdown 編集ルール

- Web 検索して記載する場合、必ず注釈としてその情報源を URL 付きで記載すること
- １文ごとに改行すること
- Qiita の記事を投稿する場合は、`qiita` ディレクトリで実施すること

## Next.js 開発ルール

- `npm run build` でエラーが出ないこと

## textlint

- コミット前に `npm run lint:text` を実行して lint エラーがないことを確認すること
- 各 md ディレクトリ配下には独自の `.textlintrc.js` がある場合があるので注意
- **ルール変更時は事前相談必須**: `.textlintrc.js` のルールを追加・変更・削除する場合は、必ず事前にユーザーに相談し、承認を得てから実施すること
  - lint エラーを解消するためであっても、勝手にルールを変更しない
