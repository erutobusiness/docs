---
marp: true
theme: spanish-siesta
paginate: true
---

<!-- _class: lead -->

# 付録: このスライドの技術メモ

### エンジニア向け -- スライド制作テクニック集

***

<!-- _class: compact -->

## Marp -- Markdown でスライドを作る

Markdown で書いて、そのままスライドとしてプレビュー・PDF出力できるツール

### カスタムテーマ

CSSファイルの冒頭に `/* @theme spanish-siesta */` を書き、
フロントマターで `theme: spanish-siesta` と指定

全スライドのデザインを1つのCSSで管理できる

### 背景画像

```markdown
![bg right:40%](https://...)      <!-- 右40%を画像、左にテキスト -->
![bg brightness:.4](https://...)  <!-- 暗くして文字を読みやすく -->
```

***

<!-- _class: compact -->

## Wikimedia Commons SVG の改良

### なぜSVGか

- **ベクター形式**なのでプロジェクター投影やPDFエクスポートでも劣化しない
- テキスト要素を直接編集でき、Git管理にも向いている

### 実例: `spain_food_regions.svg`

Wikimedia Commons の [スペイン自治州地図（SVG）](https://commons.wikimedia.org/wiki/Category:SVG_locator_maps_of_autonomous_communities_of_Spain) をベースに、以下を改良：

- 4つの注目地域を塗り分け、地域名のラベルを追加
- スライドの配色テーマに合わせて背景色・線色を調整

### ライセンス

多くが **CC BY-SA** 提供のため、出典を明記すれば改変・再配布が可能
