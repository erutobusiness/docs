# Interaction

## Mouse Hover (Material-UI)

<https://dev.classmethod.jp/articles/make-a-style-that-changes-color-with-mouse-operation-trigger-in-makestyle-of-material-ui/>

### 学び・要点

- **makeStylesでのホバー/アクティブ実装**:
  - CSS-in-JS (`makeStyles`) において、`&:hover` や `&:active` プロパティを使って擬似クラスを定義できる
- **他要素への影響**:
  - ホバーされた要素以外のスタイルを変更したい場合、Reactの `state` (`onMouseEnter`, `onMouseLeave` 等) を使ってスタイルを動的に書き換える手法がある
  - (補足) CSSの隣接セレクタ等でも可能な場合があるが、JS側で制御することにより柔軟な表現が可能

## Mouse Stalker (マウスストーカー)

<https://www.weblab.co.jp/blog/creator/9087.html>

### 学び・要点

- **概要**:
  - マウスカーソルに追従してくる装飾要素の実装パターン集
- **バリエーション**:
  1. **カーソル変更**: カーソル自体を画像などに置き換える（CSS `cursor: none` + 追従要素）
  2. **遅延追従**: カーソルより少し遅れてついてくる要素（慣性のような演出）
  3. **速度反応**: マウスを速く動かすと要素が大きくなるなどのインタラクション
  4. **パーティクル**: キラキラしたエフェクトなどが降り注ぐ演出
- **実装**:
  - 基本的にはJSでマウス座標 (`mousemove` イベント) を取得し、要素の `transform` や `top/left` を更新することで実現する
