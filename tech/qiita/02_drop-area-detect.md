---
title: ドロップ対象を識別する基準のアイデア[TypeScript+React]
tags: ドラッグ＆ドロップ フロントエンド TypeScript React JavaScript
author: nyarlathotep
created_at: "2023-12-24"
updated_at: "2023-12-24"
id: 451181c4f2e53a8e4298
organization_url_name: visionary-jp
slide: false
ignorePublish: false
---

# 0. 目次

- 1 前提
  - 記事を読むにあたっての説明
  - 読み飛ばしてOK
  - 実装してGitHubに公開したので紹介
- 2 基準
  - 各種基準について、特徴と実装例を画像とともに説明
  - 社内勉強会で計算幾何学との関連をご教示いただいたので調査中
- 3 Tips
  - 実装して得た知見を紹介
  - ポインターイベント以外による実装方法について調査中

# 1. 前提

## 1.1. 導入

### 本記事の目的

ドラッグ・アンド・ドロップ（以降：DnD）におけるドロップ対象の識別では、単純なマウスカーソルの重なり検知と異なり、多くの基準が考えられます。

本記事では、React+TypeScript環境にて、ポインターイベントを使用してドロップ対象を識別する複数の基準について、そのメリットや実装方法について詳しく探ることで、より洗練されたインタラクションの実現を目指します。

### 想定読者

- この令和でDnDを一から実装する人
- ユーザーのことを考えたDnDの実装方法を考えている人

## 1.2. 単語解説

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/8a51dc0f-6d7a-b526-3e13-31fc130be440.png" alt="DnD 図解" width="75%" /> |
| :---------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                     図2 DnD 図解                                                                      |

### マウスカーソル

> コンピューターの操作画面で入力位置を示すカーソルのひとつで、マウス操作に対応する、矢印の形をしたアイコンのことである。

https://www.weblio.jp/content/%E3%83%9E%E3%82%A6%E3%82%B9%E3%82%AB%E3%83%BC%E3%82%BD%E3%83%AB

タッチデバイスにおいては、マウスカーソルが存在しないことがあります。

ちなみに、マウスカーソルは左右対称ではありません。

https://twitter.com/YNCT_SNY/status/436134599945498624

:::note warn
この画像の出典がこのツイートで合っているか、ご存じの方がいらっしゃいましたら、ご教示ください。
:::

### ホットスポット

> マウスカーソルの絵柄の中で、クリックの対象位置となる部分。
> マウスカーソルの形状によって、ホットスポットの位置は異なる。
> たとえば、矢印の形をしているマウスカーソルでは、矢印の先端がホットスポットとなる。

https://kotobank.jp/word/%E3%83%9B%E3%83%83%E3%83%88%E3%82%B9%E3%83%9D%E3%83%83%E3%83%88%20%28UI%29-13997

タッチデバイスにおいては、圧力などによって計算された、力の中心地がホットスポットの扱いになります[要出典]。

### ドラッグ要素

ドラッグ要素とは、ユーザーがマウスやタッチでドラッグし、移動させている要素のことを指します。

### ドロップエリア

ドロップエリアとは、ドラッグ要素をドロップできる領域のことを指します。

## 1.3. 実装例について

今回の実装では、複数のドロップ対象を一意には識別していません。
ただし、優先順位を設けることで、一意に識別することができます。
優先順位のアイデアとしては以下が考えられます：

- それぞれのドロップ対象の中心点のうち、最もドラッグ要素の中心点との距離が短い
- それぞれのドロップ対象の左上の点のうち、最も座標が左上

また、いずれも pointermove のハンドラ内に実装しています。
しかし、 requestAnimationFrame を使用したほうが、より動作が軽量になるかもしれません。

https://listener.noplan.cc/coding/

コードは弊社の GitHub に配置しており、 GitHub Pages から確認できます。

https://github.com/visionary-japan/react_ui_comparison

https://visionary-japan.github.io/react_ui_comparison/

# 2. 基準

## 2.1. ポインターの座標

### 特徴

- 最も簡単
- PCではマウスカーソルがあるため直感的に思える
- SPなどマウスカーソルのないタッチデバイスでは、指でタッチ箇所が隠れて見づらい

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/1eb8de67-9a9e-ba09-0a89-1a27fa969740.png" alt="基準：ポインターの座標" width="50%" /> |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                     図3 基準：ポインターの座標                                                                      |

### 実装例

```typescript
// locClient(ホットスポット座標) が dropRect(ドロップ対象) の内側にあるか判定
return (
  locClient.x >= dropRect.left &&
  locClient.x <= dropRect.right &&
  locClient.y >= dropRect.top &&
  locClient.y <= dropRect.bottom
);
```

## 2.2. ドラッグ要素の中心座標

### 特徴

- 主体がマウスや指ではなくドラッグ要素になる
- ホットスポットがドロップ対象の中に入ってなくても良い

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/3030b55c-38ef-9f3e-1a3f-f19fdb8b11c7.png" alt="基準：ドラッグ要素の中心座標" width="50%" /> |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                     図4 基準：ドラッグ要素の中心座標                                                                      |

### 実装例

```typescript
// centerX,Y(ドラッグ要素の中心座標) が dropRect(ドロップ対象) の内側にあるか判定
const centerX = locRect.x + sizRect.width / 2;
const centerY = locRect.y + sizRect.height / 2;
return (
  locScroll.x + dropRect.left <= centerX &&
  locScroll.x + dropRect.right >= centerX &&
  locScroll.y + dropRect.top <= centerY &&
  locScroll.y + dropRect.bottom >= centerY
);
```

## 2.3. 重なっている面積の割合

### 特徴

- 複数の識別に向く
- 包含判定の算出が困難
  - 単純な四角形でない場合は処理が面倒
    - 交差オブザーバーを使用することになる？

https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/9b7d9e0c-be33-af86-dd76-ab2093497dd9.png" alt="基準：重なっている面積の割合 (25%)" width="50%" /> |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                     図5 基準：重なっている面積の割合 (25%)                                                                      |

### 実装例 (25%)

```typescript
// dropArea(ドロップ対象の面積) を算出
const dropArea = dropRect.width * dropRect.height;
// overlapWidth(包含する横幅) を算出
const overlapWidth =
  Math.min(locRect.x + sizRect.width, locScroll.x + dropRect.right) -
  Math.max(locRect.x, locScroll.x + dropRect.left);
// 包含しない場合は終了
if (overlapWidth <= 0) return false;
// overlapHeight(包含する縦幅) を算出
const overlapHeight =
  Math.min(locRect.y + sizRect.height, locScroll.y + dropRect.bottom) -
  Math.max(locRect.y, locScroll.y + dropRect.top);
// 包含しない場合は終了
if (overlapHeight <= 0) return false;
// 包含面積がドロップ対象の面積の25%以上なら包含判定
return overlapWidth * overlapHeight >= dropArea * 0.25;
```

## 2.4. ドラッグ要素内のいずれかの点

### 特徴

- 実装方法はドラッグ要素の中心座標と概ね同じ
- ドラッグ要素の形状によっては直感的になる

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/b0a5f3a1-3796-2c8f-8493-cc9cce4ab4fb.png" alt="基準：ドラッグ要素内のいずれかの点 (中上)" width="50%" /> |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                     図6 基準：ドラッグ要素内のいずれかの点 (中上)                                                                      |

### 実装例 (中上)

```typescript
// 中上の点がドロップ対象に含まれるか判定
const centerX = locRect.x + sizRect.width / 2;
const topY = locRect.y;
return (
  locScroll.x + dropRect.left <= centerX &&
  locScroll.x + dropRect.right >= centerX &&
  locScroll.y + dropRect.top <= topY &&
  locScroll.y + dropRect.bottom >= topY
);
```

## 2.5. ドロップ対象の中心とドラッグ要素の中心の距離

### 特徴

- 小さい要素でも広い範囲を見ることができる
- 光っているドラッグ要素などで出番有？
- 割りと実装が面倒

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/36953bd1-bfa9-3933-9afa-74116c94d1f0.png" alt="基準：ドロップ対象の中心とドラッグ要素の中心の距離" width="50%" /> |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                     図7 基準：ドロップ対象の中心とドラッグ要素の中心の距離                                                                      |

### 実装例

```typescript
// ドラッグ要素の中心座標を算出
const dragCenterX = locRect.x + sizRect.width / 2;
const dragCenterY = locRect.y + sizRect.height / 2;
// ドロップ対象の中心座標を算出
const dropCenterX = locScroll.x + dropRect.x + dropRect.width / 2;
const dropCenterY = locScroll.y + dropRect.y + dropRect.height / 2;
// 2点の距離を算出
const distance =
  (dragCenterX - dropCenterX) ** 2 + (dragCenterY - dropCenterY) ** 2;
// 2点の距離が 2^7 px なら包含判定
return distance <= 16384; // 2^14
```

## 2.6. 速度から移動先を予測

### 特徴

- ドラッグの動きそのものに反応させたい時に使う
- ゲームとかインタラクティブなコンテンツで使えるかも

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/293ac7d3-805d-be09-e279-3bd946d0ea4d.png" alt="基準：速度から移動先を予測" width="50%" /> |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                   図8 基準：速度から移動先を予測 （赤矢印線はドラッグ要素の移動方向）                                                   |

### 実装例

```typescript
// 次に予測する座標がドロップ対象に含まれるか判定
const nextDragCenterX = locNext.x + sizRect.width / 2;
const nextDragCenterY = locNext.y + sizRect.height / 2;
return (
  locScroll.x + dropRect.left <= nextDragCenterX &&
  locScroll.x + dropRect.right >= nextDragCenterX &&
  locScroll.y + dropRect.top <= nextDragCenterY &&
  locScroll.y + dropRect.bottom >= nextDragCenterY
);
```

## 2.7. [調査中] 計算幾何学の活用

計算幾何学における交差判定や包含判定について調査中
React-Three-Fiber を使用すると良さそう？

# 3. Tips

## 3.1. 他ドラッグ実装方式の検討

### 先行研究

https://tech-blog.talentio.co.jp/entry/2023/03/28/143944

### HTML5 Drag and Drop API

タッチデバイスでうまくいきませんでした。

https://visionary-japan.github.io/react_ui_comparison/dnd/dnd

### SortableJS

タッチデバイスでも同様の操作感で使用できました。
※ react-sortablejs を使用

https://visionary-japan.github.io/react_ui_comparison/dnd/sortablejs

### [調査中] dnd-kit

調査中

https://zenn.dev/castingone_dev/articles/dndkit20231031

https://zenn.dev/hamo/articles/725e4189bfc54d

### [調査中] react-draggable

調査中

https://zenn.dev/xbit/articles/aa923b3c9000e5

### [調査中] react-rnd

調査中

https://zenn.dev/xbit/articles/aa923b3c9000e5

### [調査中] react-beautiful-dnd

調査中

https://zenn.dev/makotoishida/articles/868e195fc42f5e

## 3.2. タッチデバイス用の対応まとめ

### ドラッグ操作とスクロール操作の競合回避

以下を設定するとスクロール操作やピンチ操作などを無効化できます。

```css
.draggable {
  touch-action: none;
}
```

### iOS のメニューを無効化

以下を設定すると iOS デバイスで対象を長押しした時にコールアウトを無効化できます。

```css
body {
  -webkit-touch-callout: none;
}
```

### 長押し時の ハイライトカラーを無効化

以下を設定すると iOS および Android で長押し時のハイライトカラーを無効化できます。

```css
body {
  -webkit-tap-highlight-color: rgba(0 0 0 / 0%);
}
```

https://www.webantena.net/css/webkit-tap-highlight-color/

## 3.3. パッシブモード

touchmove イベントのリスナーは、デフォルトでパッシブモードになっています。
これをオーバーライドするには、イベントリスナーを以下のように追加します。

```javascript
element.addEventListener("touchmove", handleTouchMove, { passive: false });
```

# 3.4. 再レンダリングを抑えた実装

https://qiita.com/konbu310/items/46911ed52ab6819b0337
