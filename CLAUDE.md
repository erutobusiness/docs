# Claude Code 設定

このプロジェクトで作業する際は、必ず `.ai/instructions.md` の共通インストラクションに従ってください。

## 共通設定

[共通インストラクション](./.ai/instructions.md) を参照してください。

## Claude Code 固有の設定

### 許可済みコマンド

`.claude/settings.local.json` で以下のコマンドが許可されています：

- `npm install`
- `npx textlint`
- `npm run lint:text`
- `git checkout`
- `git commit`
- `npx lint-staged`
