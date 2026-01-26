# TODO

## Future Improvements

- [ ] **npm ライブラリ化の検討**
  - 対象: `textlint-filters/footnote` と `textlint-rules/footnote-dearu-desumasu`
  - 目的: 注釈（脚注）のみ「ですます」調を適用する設定を、他プロジェクトでも再利用可能にするため
  - 手順: 
    1. 各ディレクトリの `package.json` にメタデータ（`keywords`, `repository` 等）を追加
    2. `npm publish` を実行
