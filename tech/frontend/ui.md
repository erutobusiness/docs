# UI Design

## チェックボックスの indeterminate 状態

https://feb19.jp/blog/20240314_indeterminate_checkbox_could_possibly_be_terminate

### 学び・要点

- **indeterminate（未決定状態）とは**:
  - ネストされたチェックボックスなどで「子の一部のみが選択されている」状態を表す第3の状態
  - HTMLの属性ではなく、JavaScriptプロパティ (`checkbox.indeterminate = true`) で設定する
  - アクセシビリティ上は `aria-checked="mixed"` となる
- **デザイン・UXの観点**:
  - 「興味のあるものを選んでください」のような、広くオプトインさせたい場面で使われがち（「闇のWebマーケティング」の匂い）
  - 近年のフォームではあまり見かけず、代替手段（Switchなど）への移行が進む可能性がある
- **代替手段**:
  - `<input type="checkbox" switch>` (Safari TP) や `<switch>` 要素の議論が進んでいる
  - iOS (UIKit/SwiftUI) ではチェックボックス自体がなく、Switchやチェックマーク（リスト選択）が主流

## デジタル庁デザインシステム

https://design.digital.go.jp/dads/
https://www.figma.com/community/file/1255349027535859598

### 学び・要点

- **概要**:
  - デジタル庁が策定・公開している、行政サービスのためのデザインシステム
  - 「誰一人取り残されない」ためのアクセシビリティやユーザビリティが重視されている
- **リソース**:
  - Figma Communityでデザインデータ（UIキット）が公開されており、誰でも利用・参照が可能
  - スタイリング、コンポーネント、実践ガイドラインなどが体系化されている

## Studio (No-Code Web Design Tool)

https://studio.design/ja/

### 学び・要点

- **特徴**:
  - コードを書かずに自由度の高いWebサイトを作成・公開できるノーコードプラットフォーム
  - サーバー設定不要で、CMSやフォーム機能も標準搭載されている
- **AI活用**:
  - 「Studio AI」により、テキストからのセクション生成や画像編集、ライティング支援などが可能になっている
