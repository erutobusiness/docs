# 宣言的 UI とはなにか？かんたんに

UI の構造や見た目を、
どう作るのかの手順を記述する（命令的）のではなく、
状態に基づいて定義する（宣言的）スタイルである[^宣言的とは]。

このスタイルでは、
状態が変化すると UI が自動的に再描画されるため、
開発者は「どう見せたいか」だけを記述する。

[^宣言的とは]:
    これは、React のみにおける定義ではなく、通念的に捉えた表記にしています。
    以下に、公式ドキュメントにおける宣言的（Declarative, Declaratively）についての言及があるページをまとめます：
    [React – A JavaScript library for building user interfaces](https://legacy.reactjs.org/)
    [Introduction | Vue.js](https://vuejs.org/guide/introduction)
    [SwiftUI | Apple Developer Documentation](https://developer.apple.com/documentation/swiftui/)
    [Start thinking declaratively | Flutter](https://docs.flutter.dev/data-and-backend/state-mgmt/declarative)

## たとえば、JavaScript と React で比較してみる

画面に表示している数値を、２種のボタンで増減できる実装を考えてみる：

```html:index.html
<button id="inc">+1</button>
<button id="dec">-1</button>
<p id="count">Count: 0</p>
```

この HTML 要素を操作するために JavaScript で命令的に記述する場合は、
イベントごとに状態更新と画面更新の処理を記述することになる：

```javascript:imperative.js
let count = 0;

const incBtn = document.getElementById("inc");
const decBtn = document.getElementById("dec");
const countDisplay = document.getElementById("count");

incBtn.addEventListener("click", () => {
  count++;                                      // 状態更新
  countDisplay.textContent = `Count: ${count}`; // 画面更新
});

decBtn.addEventListener("click", () => {
  count--;                                      // 状態更新
  countDisplay.textContent = `Count: ${count}`; // 画面更新
});
```

一方で、React を使い宣言的に書くと、状態 `count` をもとに実装できる：

```jsx:Declarative.jsx
import { useState } from "react";

export default function Declarative() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      {/* 状態 count に基づいて表示内容が決まる */}
      <p>Count: {count}</p>
    </>
  );
}
```

React の例では、`setCount` で状態 `count` を更新するだけで、
関連する `<p>` タグの表示が自動的に更新される。
開発者は画面を直接操作するコードを書く必要がない。
