# Marp Slides

Marpを使ったプレゼンテーション資料の共通ガイド

## 起動方法

### サーバーモード (`-s`) -- 推奨

ディレクトリ全体をホストし、ブラウザでファイル一覧から選択する

```bash
npx @marp-team/marp-cli -s .
```

`http://localhost:8080/` からファイルを選択

`.marpignore` により `README.md` はスライド一覧から除外される

### ウォッチモード (`-w`)

特定のファイルを直接プレビューする

```bash
npx @marp-team/marp-cli -w <file>.md
```

どちらのモードでも、保存時に自動更新される

### カスタムテーマの指定 (`--theme`)

スライドがカスタムテーマを使用している場合、`--theme` オプションでCSSファイルを指定する

```bash
# サーバーモード
npx @marp-team/marp-cli -s . --theme ./spanish-cuisine-siesta/themes/spanish-siesta.css

# ウォッチモード
npx @marp-team/marp-cli -w <file>.md --theme ./spanish-cuisine-siesta/themes/spanish-siesta.css
```

## PDF / HTML 出力

```bash
# PDF に変換（ローカル画像を含めるために --allow-local-files が必要）
npx @marp-team/marp-cli <file>.md --pdf --allow-local-files -o pdfs/<file>.pdf

# HTML に変換
npx @marp-team/marp-cli <file>.md --html
```
