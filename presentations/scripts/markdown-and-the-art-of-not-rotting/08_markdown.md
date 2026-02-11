# マークダウンという腐りにくい基盤

## フォーマットの選択は重要

スライドもドキュメントも、土台にあるのはMarkdownでした。
メモを書くとき、どのフォーマットを選ぶかは品質管理の第一歩です。
Word、Notion、Google Docs、Markdown。
選択肢はたくさんありますが、「腐りにくさ」を基準にすると答えは絞られます。

## Markdownの設計思想

Markdownの設計思想は、作者のJohn Gruberの言葉に集約されています[^1]。

[^1]: <https://daringfireball.net/projects/markdown/>

> A Markdown-formatted document should be publishable as-is, as plain text, without looking like it's been marked up with tags or formatting instructions.

つまり、**装飾前の状態でも人間が読める**ことが最優先です。

HTMLを書くとき、`<h1>見出し</h1>`は構造を表現していますが、読みやすいとは言えません。
Markdownの`# 見出し`は、構造を表現しつつ、そのまま読んでも意味が通ります。

Gruberのオリジナル仕様には曖昧な点があり、CommonMark[^3]はその標準化を目指しています。

[^3]: CommonMarkはMarkdownの厳密な仕様策定プロジェクトである <https://commonmark.org/>

## なぜMarkdownは腐りにくいのか

### プレーンテキスト

Markdownファイルの実体はただのテキストファイルです。
専用ソフトがなくても開けます。
10年後でも、メモ帳で読めます。

それどころか、2025年7月にWindows 11のメモ帳がMarkdownの書式表示に対応しました[^2]。
見出し・太字・斜体・リスト・リンクなどの書式がメモ帳上でレンダリングされます。
OSに標準搭載されたテキストエディタがMarkdownを認識する時代になったのです。
これはMarkdownの普及と耐久性を裏付ける出来事といえます。

[^2]: <https://blogs.windows.com/windows-insider/2025/05/30/text-formatting-in-notepad-begin-rolling-out-to-windows-insiders/>

WordやNotionのファイルは、そのツールが存在しなくなれば読めなくなるリスクがあります。
プレーンテキストにはそのリスクがありません。

### 構造化できる

プレーンテキストの弱点は、構造を表現しにくいことです。
Markdownは見出し、リスト、コードブロックといった最小限の構造を提供します。
この構造があるおかげで、ツールによる処理が可能になります。

### ツールチェーンが豊富

Markdownの周辺には、豊富なツールチェーンがあります。

- **textlint**[^4]: 文章の品質チェック
- **remark**[^5]: Markdownの構文解析・変換
- **Marp**: スライド生成
- **Pandoc**[^6]: 他形式への変換

[^4]: textlintはテキストファイル向けのプラガブルなLintツールである <https://textlint.github.io/>

[^5]: remarkはunifiedエコシステム上のMarkdown処理ツールチェーンである <https://remark.js.org/>

[^6]: Pandocは万能のドキュメント変換ツールで、Markdownを含む多数の形式間を相互変換できる <https://pandoc.org/>

- **GitHub/GitLab**: そのままプレビュー表示

これらのツールが使えるのは、Markdownが構造化されたプレーンテキストだからです。

## ポータビリティ

Markdownで書かれたメモは、どこにでも持っていけます。

- GitHubに置けばWebで読めます
- Marpに通せばスライドになります
- textlintに通せば品質チェックができます
- Pandocに通せばPDFやWordに変換できます

フォーマットに縛られないことが、長期的な品質を守る基盤になります。
