# 宣言的 UI とはなにか？かんたんに

宣言的UIとは、UIの構造や見た目を、どう作るのかの手順を記述する（命令的）のではなく、状態に基づいて定義する（宣言的）スタイルである[^宣言的とは]。
状態が変化するとUIが自動的に再描画されるため、開発者は「どう見せたいか」だけを記述する。

[^宣言的とは]: これは、Reactのみにおける定義ではなく、通念的に捉えた表記にしています。
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

このHTML要素を操作するためにJavaScriptで命令的に記述する場合は、
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

一方で、Reactを使い宣言的に書くと、状態 `count` をもとに実装できる：

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

Reactの例では、`setCount` で状態 `count` を更新するだけで、
関連する `<p>` タグの表示が自動的に更新される。
開発者は画面を直接操作するコードを書く必要がない。

## 宣言的 UI と命令的 UI の違い

上記のように、宣言的UIと命令的UIは、UIを構築・更新する際の根本的な考え方が異なる。
この違いを理解することが、それぞれの特性を把握する上で極めて重要となる。

### 命令的 UI の基本的な考え方と仕組み

命令的UIプログラミングでは、UIを構築・更新するための具体的な手順をステップバイステップで記述する。
開発者は、UI要素の作成方法、変更手順、削除方法といった「どのように」(How)その状態に至るかの詳細を指示する責任を負う。

- **DOM の直接操作**
  - 命令的UIの最も典型的な実装方法は、JavaScriptのDOM APIやjQueryのようなライブラリを用いて、HTML要素を直接操作すること
  - 特定のUI要素を選択し、その属性、スタイル、内容、あるいは構造をプログラムによって直接変更する
- **手動での状態管理と UI 更新**
  - 命令的UIでは、アプリケーションの状態（例：count変数）とUIの表示内容の同期を開発者自身が手動で行う必要がある
  - 状態が変化するたびに、どのUI要素をどのように変更するかという指示を逐一与えなければならない
- **一般的なアプローチとライブラリ**
  - 命令的UIの例としては、Vanilla JavaScriptによる直接的なDOM操作、jQuery、AndroidのViewシステムやiOSのUIKitなどがある

### 宣言的 UI の基本的な考え方と仕組み

宣言的UIでは、開発者はUIが特定の状態において「どのように見えるべきか」という望ましい最終状態を記述する。
そして、「どのように」(How)その結果が得られるかの詳細は、フレームワークやライブラリに委ねられる。

- **フレームワークによる状態管理とレンダリング**
  - React、Vue.js、SwiftUI、Jetpack Composeといったフレームワークが、
    宣言されたUIの「あるべき姿」に基づいて、実際のUI要素の構築、更新、削除を効率的に実行する
- **状態駆動型の更新**
  - UIはアプリケーションの「状態」の関数として扱われる
  - 状態が変化すると、UIは自動的にその変化を反映するように再構築される
- **仮想 DOM の概念**
  - ReactやVue.jsでは、仮想DOMを用いて効率的に差分を検出し、必要な部分だけを更新する
- **代表的なフレームワーク**
  - React、Vue.js、Angular、SwiftUI、Jetpack Composeなどが宣言的UIの代表例

### 両者の比較分析：メリットとデメリット

#### 宣言的 UI の利点

- コードの可読性、簡潔性、直感性の向上
- 保守性とスケーラビリティの向上
- 状態管理とデータフローの簡素化
- フレームワークによる差分検出で必要な部分のみを更新

#### 宣言的 UI のデメリット

- 学習曲線が急である可能性
- 抽象化レイヤーによる潜在的なパフォーマンスオーバーヘッド
- デバッグの複雑化

#### 命令的 UI の利点

- 詳細な制御
- 既存技術との親和性

#### 命令的 UI のデメリット

- 複雑性増大
- バグ多発
- 冗長なコード
- 保守性・スケーラビリティ低下

### まとめ

宣言的UIは、UIの「どう見せたいか」という望ましい最終状態を記述するアプローチである。
状態が変化するとUIが自動的に更新されるため、開発者はUIの更新手順を細かく指示する必要がない。
これは、UIの構築・更新手順をステップバイステップで記述する命令的UIとは対照的である。

Reactに代表される宣言的UIフレームワークは、UIの状態管理を簡素化し、コードの可読性、保守性、生産性を向上させる多くの利点をもたらした。
特にReact Hooksの登場[^React-Hooks]により、関数コンポーネントでの状態や副作用の扱いが宣言的になり、宣言的UIの設計がさらに洗練された。

[^React-Hooks]: React HooksはReact 16.8（2019年2月リリース）にて導入された機能であり、関数コンポーネントに状態管理やライフサイクルメソッドのような機能を追加することを可能にしました。
    詳細は公式ドキュメント [Introducing Hooks](https://legacy.reactjs.org/docs/hooks-intro.html) を参照してください。

現代の複雑なUI開発においては、状態管理や更新処理の複雑さをフレームワークに委ねられる宣言的UIが主流となりつつある[^UI-trends]。
ただし、プロジェクトの要件、チームスキル、パフォーマンス要件などを考慮し、プロジェクトに合ったアプローチを選択することが重要である。

[^UI-trends]: 宣言的UIフレームワークの広がりは、React・Vue.js・Angular・SwiftUI・Flutter・Jetpack Composeなど、多くのプラットフォームで確認できます。
    Stack Overflowの[2023 年開発者調査](https://survey.stackoverflow.co/2023/#section-most-popular-technologies-web-frameworks-and-technologies)によれば、フロントエンド開発者の間でReactやVueなどの宣言的UIフレームワークの採用が広く見られます。
