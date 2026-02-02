# textlint 知見メモ

## textlint に overrides 機能がない

textlint は ESLint の `overrides` に相当する機能を持たない。
`@textlint/config-loader` が受け付けるキーは `plugins`, `filters`, `rules` のみで、ファイルパターン別にルールを切り替える仕組みが存在しない。

### 代替策

ファイルごとに異なるルールを適用したい場合は、専用の設定ファイルを作成して `--config` オプションで切り替える。

例: である調とですます調を混在させるプロジェクトでは、`.textlintrc.js`（である調）と `.textlintrc.readme.js`（ですます調）を用意し、lint スクリプトや lint-staged で使い分ける。

## lint-staged のパターン重複に注意

lint-staged は、ファイルが複数のパターンにマッチした場合、**マッチした全てのコマンドを実行する**。

例: `trpg/scenarios/Okami/README.md` が以下の両方にマッチする場合：

- `trpg/scenarios/Okami/**/*.md` → `.textlintrc.js`（である調）
- `trpg/scenarios/*/README.md` → `.textlintrc.readme.js`（ですます調）

→ である調チェックが失敗し、コミットが通らなくなる。

### 対策

`**/*.md` のような広いパターンを使わず、README.md を含まないようにサブディレクトリを明示的に列挙する。

```json
"trpg/scenarios/{Okami,SIREN,Toaru}/README.md": ["...config .textlintrc.readme.js"],
"trpg/scenarios/Okami/{chapters,mechanics,npcs,references,setting}/**/*.md": ["...config .textlintrc.js"]
```
