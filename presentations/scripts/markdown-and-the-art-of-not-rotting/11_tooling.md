# textlint/remarkプラグイン開発

## 原則をコードにする

1行1文、過剰表現の排除、明示的な構造化――可読性の原則はシンプルです。
しかし原則を知っていることと、原則を守り続けることは別の話です。

人間は忘れます。
人間は怠けます。
だからこそ、原則をコードにして自動で守らせる仕組みが必要です。

本章では、このプロジェクトを支えるツールチェーンの全体像を紹介します。

## textlint -- 文章の品質を守る

textlint[^1]は、テキストファイル用のLinterです。
Lintという名前は1978年にBell LabsのStephen C. Johnsonが開発したC言語用の静的解析ツールに由来します[^21]。
ESLint[^23]がJavaScriptの品質を守るように、textlintは文章の品質を守ります。
textlintのアーキテクチャはESLintと同じプラガブル設計で、テキストをAST[^22]に変換し、ルールがASTノードを走査する仕組みです。

[^21]: Lint(ソフトウェア)は1978年、Bell LabsのStephen C. Johnsonが開発したC言語向け静的解析ツールに由来する [https://en.wikipedia.org/wiki/Lint_(software)](https://en.wikipedia.org/wiki/Lint_\(software\))

[^22]: 抽象構文木(Abstract Syntax Tree)とは、ソースコードの構文構造を木構造で表現したデータ構造である [https://en.wikipedia.org/wiki/Abstract_syntax_tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)

[^23]: ESLintはJavaScript/TypeScript向けのプラガブルなLintツールである <https://eslint.org/>

[^1]: <https://textlint.github.io/>

```bash
npx textlint --config .textlintrc.js "**/*.md"
```

設定ファイルにルールを定義し、Markdownファイルに対してチェックを実行します。
違反があればエラーとして報告されます。

## textlintプリセット

プリセットは、関連するルールをまとめたパッケージです。
個別にルールを選定する手間を省き、ベースラインの品質を確保できます。

### textlint-rule-preset-ja-technical-writing

日本語の技術文書向けプリセットです[^2]。
文長制限、二重否定の検出、助詞の重複チェックなど、技術文書でありがちなミスを幅広く検出します。

[^2]: <https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing>

### textlint-rule-preset-ja-spacing

日本語の空白ルールプリセットです[^3]。
全角文字と半角文字の間のスペースや、カタカナ語間のスペースなど、表記揺れを防止します。

[^3]: <https://github.com/textlint-ja/textlint-rule-preset-ja-spacing>

### @textlint-ja/textlint-rule-preset-ai-writing

AI生成文を検出するプリセットです[^4]。
「画期的」「シームレス」といった誇大表現や、AI特有の画一的パターンを検出します。
第5章で指摘した「masterpiece顔」問題に対する自動防御です。

[^4]: <https://github.com/textlint-ja/textlint-rule-preset-ai-writing>

## textlint個別ルール

プリセットでカバーしきれない原則は、個別ルールで補います。

### textlint-rule-one-sentence-per-line

1行1文の原則を強制するルールです[^5]。
1つの行に複数の文が含まれている場合、エラーを報告します。
第7章の可読性原則を、コードとして実装しています。

[^5]: <https://github.com/nicolo-ribaudo/textlint-rule-one-sentence-per-line>

### textlint-rule-period-in-list-item

リスト項目の末尾に句点を付けないルールです[^6]。
箇条書きの体裁を統一します。

[^6]: <https://github.com/textlint-rule/textlint-rule-period-in-list-item>

### textlint-rule-footnote-dearu-desumasu (自作)

脚注内の「である/ですます」体を制御するルールです[^7]。
本文がですます体でも、脚注内だけ異なる文体になる問題を検出します。

[^7]: <https://www.npmjs.com/package/textlint-rule-footnote-dearu-desumasu>

### textlint-rule-terminology

用語の統一ルールです[^8]。
表記揺れ（例: 「JavaScript」と「Javascript」）を検出し、正しい表記に統一します。

[^8]: <https://github.com/sapegin/textlint-rule-terminology>

## textlintフィルタルール

フィルタルールは、特定のパターンをチェック対象から除外するためのルールです。
誤検出を抑え、ルールの精度を高めます。

### textlint-filter-rule-allowlist

特定のパターンをチェック対象外にするフィルタです[^9]。
正規表現で除外パターンを指定できます。

[^9]: <https://github.com/textlint/textlint-filter-rule-allowlist>

### textlint-filter-rule-node-types

特定のASTノード種別をチェック対象外にするフィルタです[^10]。
コードブロックやリンクなど、構造的に除外すべき箇所を指定できます。

[^10]: <https://github.com/textlint/textlint-filter-rule-node-types>

### textlint-filter-rule-footnote (自作)

脚注内の特定ルールを抑制するフィルタです[^11]。
脚注にはURLや英語の固有名詞が含まれることが多く、通常のルールがそのまま適用されると誤検出が頻発します。
このフィルタで脚注の内容を保護します。

[^11]: <https://www.npmjs.com/package/textlint-filter-rule-footnote>

## remark -- Markdownの構造を操作する

textlintが「文章の内容」をチェックするのに対し、remarkはMarkdownの構造を操作するツールチェーンです。
remarkはunified[^24]エコシステムの一部で、Markdownの構文木(mdast)を操作します。
同じ基盤上にHTMLを扱うrehype、自然言語を扱うretextがあります。

[^24]: unifiedはテキスト処理のための統一的なインターフェースを提供するエコシステムである <https://unifiedjs.com/>

### remark-cli

remarkのCLIツールです[^12]。
コマンドラインからMarkdownの変換・整形ができます。

[^12]: <https://github.com/remarkjs/remark/tree/main/packages/remark-cli>

### remark-frontmatter

YAML/TOMLフロントマターに対応するプラグインです[^13]。
MarpスライドやHugoコンテンツなど、メタデータ付きMarkdownを正しく処理できます。

[^13]: <https://github.com/remarkjs/remark-frontmatter>

### remark-gfm

GitHub Flavored Markdown拡張に対応するプラグインです[^14]。
テーブル、タスクリスト、取り消し線、脚注などのGFM記法を認識します。

[^14]: <https://github.com/remarkjs/remark-gfm>

### remark-validate-links

Markdown内のリンク先を検証するプラグインです[^15]。
存在しないファイルや壊れたアンカーリンクを検出し、リンク切れを防止します。

[^15]: <https://github.com/remarkjs/remark-validate-links>

### remark-wiki-link

Obsidian互換のウィキリンク記法に対応するプラグインです[^16]。
`[[ページ名]]`形式のリンクをremarkで処理できるようにします。

[^16]: <https://github.com/datopian/remark-wiki-link>

### remark-disable-text-escape (自作)

日本語文書で不要なエスケープを防止するプラグインです[^17]。
remarkでMarkdownを処理すると、角括弧`[`やアスタリスク`*`が自動的にエスケープされる問題があります。
日本語の文書ではこのエスケープが不要な場合が多いため、カスタムノードパターンを使ってバイパスします。

[^17]: <https://www.npmjs.com/package/remark-disable-text-escape>

## 自動化基盤

ルールを書いても、実行しなければ意味がありません。
ここでは、ルールを自動的に適用する仕組みを紹介します。

### husky

Gitフック管理ツールです[^18]。
`pre-commit`フックでlint-stagedを起動し、コミット時に自動でLintを実行します。

[^18]: <https://typicode.github.io/husky/>

### lint-staged

ステージ済みファイルに対してのみLintを実行するツールです[^19]。
変更したファイルだけをチェックするので、大規模リポジトリでも高速に動作します。

[^19]: <https://github.com/lint-staged/lint-staged>

### prettier

コードフォーマッタです[^20]。
JavaScript、JSON、TypeScriptファイルの整形に使用しています。
remarkと組み合わせて、Markdownの書式も統一します。

[^20]: <https://prettier.io/>

### lint-targets.js (自作)

複数エリアのtextlint設定を一元管理する構成ファイルです。
プレゼンテーション、技術記事、TRPGシナリオなど、ディレクトリごとに異なるtextlint設定を持つプロジェクトで、どのファイルにどの設定を適用するかを定義します。
lint-staged、手動Lint、CIのすべてがこのファイルを参照する、Single Source of Truth[^25]です。

[^25]: Single Source of Truthとは、情報の正規の情報源を一箇所にまとめるソフトウェア工学の原則である [https://en.wikipedia.org/wiki/Single_source_of_truth](https://en.wikipedia.org/wiki/Single_source_of_truth)

## 「原則がコードになる」瞬間

ここまでの流れを振り返りましょう。

1. メモの腐敗パターンを分析しました（第2章）
2. AI生成テキストの品質問題を特定しました（第4章、第5章）
3. 可読性の原則を言語化しました（第7章）
4. その原則をtextlintルールとして実装しました（本章）

原則が自然言語のままでは、守られるかどうかは人間の意志に依存します。
原則がコードになれば、自動で守られます。
これが「原則がコードになる」瞬間です。
