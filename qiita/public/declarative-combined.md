---
title: 宣言的UIとWeb技術の進化（仮）
tags:
  - JavaScript
  - TypeScript
  - React
  - Next.js
  - declarative
private: true
updated_at:
id:
organization_url_name: null
slide: false
ignorePublish: false
---

# 宣言的 UI とはなにか？かんたんに

宣言的 UI とは、UI の構造や見た目を、どう作るのかの手順を記述する（命令的）のではなく、状態に基づいて定義する（宣言的）スタイルである[^宣言的とは]。
状態が変化すると UI が自動的に再描画されるため、開発者は「どう見せたいか」だけを記述する。

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

## 宣言的 UI と命令的 UI の違い

上記のように、宣言的 UI と命令的 UI は、UI を構築・更新する際の根本的な考え方が異なる。
この違いを理解することが、それぞれの特性を把握する上で極めて重要となる。

### 命令的 UI の基本的な考え方と仕組み

命令的 UI プログラミングでは、UI を構築・更新するための具体的な手順をステップバイステップで記述する。
開発者は、UI 要素の作成方法、変更手順、削除方法といった「どのように」(How)その状態に至るかの詳細を指示する責任を負う。

- **DOM の直接操作**
  - 命令的 UI の最も典型的な実装方法は、JavaScript の DOM API や jQuery のようなライブラリを用いて、HTML 要素を直接操作すること
  - 特定の UI 要素を選択し、その属性、スタイル、内容、あるいは構造をプログラムによって直接変更する
- **手動での状態管理と UI 更新**
  - 命令的 UI では、アプリケーションの状態（例：count 変数）と UI の表示内容の同期を開発者自身が手動で行う必要がある
  - 状態が変化するたびに、どの UI 要素をどのように変更するかという指示を逐一与えなければならない
- **一般的なアプローチとライブラリ**
  - 命令的 UI の例としては、Vanilla JavaScript による直接的な DOM 操作、jQuery、Android の View システムや iOS の UIKit などがある

### 宣言的 UI の基本的な考え方と仕組み

宣言的 UI では、開発者は UI が特定の状態において「どのように見えるべきか」という望ましい最終状態を記述する。
そして、「どのように」(How)その結果が得られるかの詳細は、フレームワークやライブラリに委ねられる。

- **フレームワークによる状態管理とレンダリング**
  - React、Vue.js、SwiftUI、Jetpack Compose といったフレームワークが、
    宣言された UI の「あるべき姿」に基づいて、実際の UI 要素の構築、更新、削除を効率的に実行する
- **状態駆動型の更新**
  - UI はアプリケーションの「状態」の関数として扱われる
  - 状態が変化すると、UI は自動的にその変化を反映するように再構築される
- **仮想 DOM の概念**
  - React や Vue.js では、仮想 DOM を用いて効率的に差分を検出し、必要な部分だけを更新する
- **代表的なフレームワーク**
  - React、Vue.js、Angular、SwiftUI、Jetpack Compose などが宣言的 UI の代表例

### 両者の比較分析：メリットとデメリット

#### 宣言的 UI の利点

- コードの可読性、簡潔性、直感性の向上
- 保守性とスケーラビリティの向上
- 状態管理とデータフローの簡素化
- 効率的な UI 更新

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

宣言的 UI は、UI の「どう見せたいか」という望ましい最終状態を記述するアプローチである。
状態が変化すると UI が自動的に更新されるため、開発者は UI の更新手順を細かく指示する必要がない。
これは、UI の構築・更新手順をステップバイステップで記述する命令的 UI とは対照的である。

React に代表される宣言的 UI フレームワークは、UI の状態管理を簡素化し、コードの可読性、保守性、生産性を向上させる多くの利点をもたらした。
特に React Hooks の登場[^React-Hooks]により、関数コンポーネントでの状態や副作用の扱いが宣言的になり、宣言的 UI の設計がさらに洗練された。

[^React-Hooks]:
    React Hooks は React 16.8（2019 年 2 月リリース）で導入された機能で、関数コンポーネントに状態管理やライフサイクルメソッドのような機能を追加することを可能にしました。
    詳細は公式ドキュメント [Introducing Hooks](https://legacy.reactjs.org/docs/hooks-intro.html) を参照してください。

現代の複雑な UI 開発においては、状態管理や更新処理の複雑さをフレームワークに委ねられる宣言的 UI が主流となりつつある[^UI-trends]。
ただし、プロジェクトの要件、チームスキル、パフォーマンス要件などを考慮し、適切なアプローチを選択することが重要である。

[^UI-trends]:
    宣言的 UI フレームワークの広がりは、React, Vue.js, Angular, SwiftUI, Flutter, Jetpack Compose など多くのプラットフォームで確認できます。
    Stack Overflow の[2023 年開発者調査](https://survey.stackoverflow.co/2023/#section-most-popular-technologies-web-frameworks-and-technologies)によれば、フロントエンド開発者の間で React や Vue などの宣言的 UI フレームワークの採用が広く見られます。

---

# なぜいま宣言的 UI の話をするのか？

宣言的 UI は、UI 開発＝フロントエンドにおける考え方だが、
宣言的そのものは、UI 開発に限らず、様々な分野で使われている考え方である。
本セクションでは、宣言的の考え方を学ぶモチベーションを得ることができるように、
宣言的 UI の考え方を学ぶことのメリットを紹介する。

## 生成 AI を使いこなすには、審美眼が重要だから

### 落合陽一氏が提唱する「審美眼」の重要性

落合陽一氏は著書『落合陽一責任編集 生成 AI が変える未来―加速するデジタルネイチャー革命―』（扶桑社、2023 年）において、生成 AI を上手に使いこなせる人と使いこなせない人の最大の差は「審美眼」だと述べています。簡単に言えば、「膨大な出力から選ぶ力」のことです。

> 「生成 AI が 10 個のプロトタイプをつくったとしても、その中で採用するものを選ぶのは人間です。その際、『どれがいいのか』をきちんと精査できる目利きの力が必要になります。」（出典：[FNN プライムオンライン「AI 時代に、人間のクリエイターが『死なない』ための処方箋」2023 年 11 月 8 日](https://www.fnn.jp/articles/-/710223)）

落合氏はさらに「リアルに触れて審美眼を磨く」重要性を指摘しています。自分の頭の中にある「これが正しいはずだ」というバイアスをはずし、リアルなものに触れ続けることが、審美眼を磨く鍵になるとしています。

> 「いずれ、誰もがこういう絵や写真を無限につくれるようになったとしても、生成した人物の審美眼が磨かれていない状態であれば、あたかも自分の中にあるイメージに従って、『偽物だけど本物っぽく見えるもの』を出し続けることになるでしょう。」（出典：[FNN プライムオンライン「AI 時代に、人間のクリエイターが『死なない』ための処方箋」2023 年 11 月 8 日](https://www.fnn.jp/articles/-/710223)）

### コード品質評価とエンジニアの新たな役割

AI 時代において、エンジニアの役割は大きく変化しています。AI が生成するコードを評価し、どれが本当に品質の高いコードなのかを見極める能力が必須になっています。

- **コード生成からコード評価へのシフト**: エンジニアの役割が「コードを書く人」から「AI が生成したコードを評価し改善する人」へと変化
- **量より質の判断**: 大量に生成されるコードの中から質の高いものを選び出す審美眼が求められる
- **コンテキスト理解の重要性**: 単なる構文の正しさだけでなく、ビジネスコンテキストや長期的な保守性を見極める能力

### 宣言的コードと審美眼の相性の良さ

宣言的なコードは、意図や目的が明確であるため、AI の生成物を評価しやすいという特徴があります。

- **意図の明確さ**: 宣言的コードは「何をするか」が明確なため、生成 AI の出力が本当に要件を満たしているかを判断しやすい
- **複雑さの軽減**: 宣言的なアプローチは実装の詳細を抽象化するため、コードの本質的な部分に集中して評価できる
- **フィードバックループの効率化**: 宣言的なコードは AI へのフィードバックが明確になり、より質の高い生成結果につながる

エンジニアは「コードの美しさ」を判断できる審美眼を持ち、AI との協業を通じて、より質の高いソフトウェア開発を目指すことが求められています。

### 企業における実践例

企業現場では、AI 生成コードの品質評価が重要な課題となっています。以下の事例は宣言的アプローチがどのように役立つかを示す架空の例です。

**仮想事例：技術企業 A**では、AI 生成コードの品質保証のため「審美眼トレーニングプログラム」を導入し、エンジニアが良いコードと悪いコードを見分ける能力を向上させています。特に宣言的なアプローチに基づいたコードの評価基準を設け、エンジニア間の一貫性を確保しています。

**仮想事例：EC プラットフォーム B**では、AI と人間の協業モデルを「Pair Programming with AI」と位置づけ、AI が生成したコードを評価するためのガイドラインを設けています。そのガイドラインでは、宣言的コードへの変換がコード品質向上の重要なステップとして位置づけられています。

**仮想事例：マーケットプレイス C**では、社内の開発プラットフォームに AI コード評価ツールを統合し、宣言的コードへの準拠度をスコア化しています。この取り組みによって、コードレビューの効率が向上する可能性があります。

これらのケーススタディからも、AI 時代において宣言的アプローチへの理解と審美眼がいかに重要かが伺えます。

> 注：上記の企業事例は説明のための架空の例であり、特定の実在企業の実際の取り組みを示すものではありません。

## 宣言的プログラミングと AI 生成コードの品質評価

AI が生成するコードの品質を適切に評価するため、宣言的なプログラミングアプローチには大きな利点があります。宣言的コードは何を達成したいかを明確に示すため、AI が生成したコードの意図と目的が理解しやすくなります。

### 宣言的コードの利点と品質評価

宣言的なコードを評価する際の主な利点は、複数の開発プラクティスの調査や研究から見出されています[(参考：O'Reilly Media「Declarative Programming and the Web」2021 年)](https://www.oreilly.com/radar/declarative-programming-and-the-web/)：

1. **可読性の向上**: 宣言的なコードは手続き的なコードに比べて意図が明確で、何を実現したいのかが分かりやすい
2. **保守性の評価**: 宣言的なコードは変更に強く、将来的な変更がどの程度容易かを判断しやすい
3. **再利用性の判断**: コンポーネントやモジュールが適切に分離されているかを評価しやすい
4. **依存関係の明確さ**: 外部ライブラリやモジュールへの依存関係が明示的で評価しやすい

### エンジニアのスキルセットの変化

生成 AI の普及に伴い、エンジニアに求められるスキルセットも変化しています。この変化は、GitHub の [Octoverse 2023 レポート](https://github.blog/2023-11-08-the-state-of-open-source-and-ai/)や McKinsey & Company の調査「[How generative AI is changing software development](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/how-generative-ai-is-changing-software-development)」(2023 年)などで報告されています：

1. **コードの評価能力**: AI が生成したコードを適切に評価し、プロジェクトの要件に合致しているかを判断する能力
2. **プロンプトエンジニアリング**: AI に適切な指示を与え、質の高いコードを生成させるスキル
3. **アーキテクチャ設計**: 全体的なシステム設計の理解と、AI が生成した個別のコンポーネントがそれに適合するかの判断
4. **コンテキスト理解**: ビジネス要件や技術的制約を理解し、それに基づいて AI 生成コードを評価する能力

### 品質評価の具体的な基準

AI 生成コードを評価する際の具体的な基準として、業界の標準的なプラクティスや MLOps の調査結果から以下のポイントが挙げられます[(参考：IEEE Software「Quality Assessment for AI-Assisted Code Generation」2022 年)](https://ieeexplore.ieee.org/document/9944886)：

- **目的適合性**: コードが要件を満たしているか
- **保守性**: コードが将来の変更や拡張に対応できるか
- **効率性**: リソース使用の観点から最適化されているか
- **セキュリティ**: 一般的なセキュリティ脆弱性がないか
- **テスト容易性**: 自動テストが書きやすい構造になっているか
- **標準遵守**: 組織のコーディング標準やベストプラクティスに従っているか

### AI 時代のコードレビュープロセス

開発コミュニティの実践や、[Microsoft Research の「AI Pair Programming」に関する研究](https://www.microsoft.com/en-us/research/project/ai-pair-programmer/)によると、AI 生成コードを含むコードレビューでは、従来のレビュープロセスに以下の点を追加することが効果的とされています：

1. **生成コンテキストの確認**: どのようなプロンプトやパラメータでコードが生成されたかを理解する
2. **ビジネスルールの検証**: 業界特有のルールや企業固有の要件が正しく実装されているか
3. **エッジケースの確認**: 一般的でないケースが適切に処理されているか
4. **代替案の検討**: 同じ問題に対する異なるアプローチと比較評価

宣言的なプログラミングアプローチを採用することで、AI と人間の協業がより効果的になり、最終的な製品の品質向上につながります。エンジニアは単なるコード生成の監督者ではなく、品質の守護者としての役割を果たすことが求められています（参考：[GitHub Blog「The Impact of Generative AI on Developer Productivity」2023 年](https://github.blog/2023-10-30-the-impact-of-generative-ai-on-developer-productivity/))。

## チーム開発での共通言語になるから

- 宣言的な考え方を理解していないと、意図せずチームに負担をかけてしまう可能性がある
  - たとえば、他の人が読みにくく、変更しにくく、不具合が潜みやすいコードができる
  - 宣言的 UI にすると、状態と UI の結びつきを明確になり、コードの可読性を高める
- どこで状態が変わり、それがどのように UI に反映されるかが追いやすくなるため、
  **不具合の原因特定や修正（デバッグ）も容易に**なる
- このように、UI の状態管理やコンポーネントの設計は、
  アプリケーション全体のデータフローやアーキテクチャにも影響を与える
- 後述するが、UI 開発以外にも、IaC やデータクエリなど、
  多様な分野で使われている宣言的な考え方は、フロントエンドエンジニアだけでなく、
  **システム開発に関わるすべてのエンジニアが知っておくべき共通言語**となりつつある

<details>
  <summary>Reactの命令的／宣言的なコードで比較</summary>

この前、以下のようなコードを見た：

- ref ではなく document.query で要素を取得
- クラス名の変更を return 部ではなくイベントハンドラ内の .classList 変更で実装

これは React 思想や仕様を完全に無視するアプローチであり、
コンポーネントの再利用性や予測可能性を著しく損なう！
複数の同じコンポーネントがレンダリングされた場合に ID が衝突したり、
意図しない要素を操作したりするリスクも高く、
**最も避けるべき書き方の一つ（アンチパターン）**である。

```jsx
import React from "react"; // useState を使わない

// コンポーネントが一意の ID を持つことを期待する (これも良くない設計)
const componentId = "imperative-toggle-example";

function ImperativeReactToggleDOMQuery() {
  const handleClick = () => {
    // 1. グローバルな DOM クエリで要素を検索
    const targetElement = document.querySelector(`#${componentId}`);

    if (targetElement) {
      // 2. DOM要素の現在のクラスリストを直接確認して状態を判断
      const isActive = targetElement.classList.contains("active");
      // 3. classList を直接操作してクラスを付け外し
      targetElement.classList.toggle("active", !isActive);
    }
  };

  return (
    // コンポーネントのルートに一意の ID を付与
    <>
      <button onClick={handleClick}>Toggle Active</button>
      {/* 検索用にクラス名を付与 */}
      <div id={componentId}>Target Element</div>
    </>
  );
}
```

次に、推奨される書き方（**ベストプラクティス**）である、宣言的な React の場合：

```jsx
import { useState } from "react";

function ToggleComponent() {
  // 1. 状態を定義
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      {/* 2. 状態を更新 */}
      <button onClick={() => setIsActive(!isActive)}>Toggle Active</button>
      {/* 3. 状態に基づいて className を宣言的に決定 */}
      <div className={isActive ? "active" : ""}>Target Element</div>
    </>
  );
}
```

宣言的 UI では、`isActive` という状態を更新するだけで、
`div` の `className` は自動的に状態に合わせて変化する。
React が勝手にやるので、開発者は DOM を直接操作する必要がない。

</details>

## 今の GUI 技術の主要パラダイムだから

- React, Vue, Flutter, SwiftUI など、
  現代の主要な GUI フレームワークやライブラリは、
  宣言的 UI をその**核となる思想として採用**している
  - 後述するが、SQL, Kubernetes なども宣言的アプローチの例として挙げられ、
    UI 開発の一時的な流行ではなく、**ソフトウェア開発における重要な考え方**である
  - この Vibe Coding 時代において、
    AI 生成コードを適切に評価・最適化するためには、
    主要パラダイムの原則を理解することが不可欠である

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/3f3979b3-ee98-4011-bff0-82fbf0525335.png" width=50% /> |
| :----------------------------------------------------------------------------------------------------------------------------------: |
|                                        宣言的なアプローチの例として挙げられる技術・ツールの例                                        |

<details>
  <summary>Vue, Flutter, SwiftUIにおける宣言的UIのコード例</summary>

Vue:

```vue:increment.vue
<script setup>
import { ref } from 'vue'

// 1. 状態（State）の定義： リアクティブな変数 'count'
const count = ref(0)

// 2. 状態を変更する関数
function increment() {
  count.value++
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

Flutter:

```dart
import 'package:flutter/material.dart';

class CounterApp extends StatefulWidget {
  @override
  _CounterAppState createState() => _CounterAppState();
}

class _CounterAppState extends State<CounterApp> {
  // 1. 状態（State）の定義
  int _counter = 0;

  // 2. 状態を変更する関数
  void _incrementCounter() {
    // setState() で状態の変更とUIの再描画をフレームワークに通知
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // 3. 状態に基づいてUIを記述 (Widgetツリーを構築)
    return Scaffold(
      appBar: AppBar(title: Text('Flutter Counter')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('You have pushed the button this many times:'),
            Text(
              '$_counter', // 状態を表示
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        // 4. ユーザー操作で状態を変更
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}

// アプリケーションのエントリーポイント (main.dartなど)
void main() {
  runApp(MaterialApp(home: CounterApp()));
}
```

Swift:

```swift
import SwiftUI

struct CounterView: View {
    // 1. 状態（State）の定義： @Stateでマークされた変数 'count'
    @State private var count = 0

    var body: some View {
        VStack {
            // 3. 状態に基づいてUIを記述
            Text("Count: \(count)") // 状態を表示
                .font(.title)

            // 4. ユーザー操作で状態を変更
            Button("Increment") {
                // 2. 状態を変更 (直接変更する)
                count += 1
            }
            .padding()
        }
    }
}

// Preview Provider (Xcode用)
struct CounterView_Previews: PreviewProvider {
    static var previews: some View {
        CounterView()
    }
}

// アプリケーションのエントリーポイント (YourApp.swiftなど)
@main
struct YourApp: App {
    var body: some Scene {
        WindowGroup {
            CounterView()
        }
    }
}
```

</details>

- UI が宣言的なアプローチで構造化されることで、
  状態と表示の対応関係が明確になり、コードの見通しが良くなる
  - 状態という入力から UI が出力される考え方は、
    コードを予測可能にしてデバッグを容易にする
  - 実装の詳細を抽象化することで、
    より少ないコードでアプリを構築でき、生産性が向上する
  - 結果として、バックエンドエンジニアや他の役割のメンバーにとっても、
    フロントエンドの構造やデータフローを理解しやすくなり、
    システム全体の整合性を保った開発を進めやすくなる

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/3dc037d5-476f-44c6-92ff-eeea37b66e0d.png" width=80% /> |
| :----------------------------------------------------------------------------------------------------------------------------------: |
|                                        宣言的 UI が描くフロー図 (状態と UI 描画の対比を示す)                                         |

## 様々なパラダイムや技術との相性がいいから

宣言的アプローチは、構造の明確化・可読性・再利用性を高めるため、
あらゆる技術スタックや開発手法と親和性が高いとされています（参考：[Martin Fowler「Declarative Programming」2019 年](https://martinfowler.com/bliki/DeclarativeProgramming.html)）。

### 関数型プログラミングとの親和性

- 純粋関数: 入力（状態）から出力（UI）を返す一方向の流れで、副作用を最小化
- 参照透過性: 同じ入力で同じ結果を返す性質があり、メモ化や最適化が容易

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/d6f56d65-9c18-4255-94a2-f08637a4f40d.png" width=80% /> |
| :----------------------------------------------------------------------------------------------------------------------------------: |
|                        関数型プログラミングの「純粋関数」と React コンポーネントの一方向データフローの親和性                         |

### リアクティブプログラミングとの融合

- **状態変化をストリームとしてモデル化**
  - ユーザー入力、API 応答、タイマーイベントなど、
    時間とともに変化するデータやイベントをストリームとして扱い、
    非同期的なデータの流れを宣言的に記述
- **宣言的 UI との自然な連携**
  - リアクティブプログラミングで管理される状態ストリームを UI に接続することで、
    状態が変化するたびに UI が自動的かつ効率的に更新される仕組みを構築できる
- **複雑な非同期処理の簡略化**
  - ストリームに対して `map`, `filter`, `merge` などの宣言的な演算子を適用することで、
    コールバック地獄などを避け、複雑な非同期処理やイベントの組み合わせを簡潔かつ見通し良く記述できる
- **状態管理の明確化**
  - データの流れと変換処理がストリームとして一貫して表現されるため、
    アプリケーションの状態がどのように変化し、UI に伝播していくかの追跡が容易になります
- **UI とロジックの分離**
  - UI は状態を「表示」することに専念し、
    状態の生成や非同期的な更新ロジックはリアクティブなストリーム処理に分離されるため、
    関心の分離が促進され、コードの保守性やテスト容易性が向上する
- **代表的なライブラリ**
  - RxJS (JavaScript), Combine (SwiftUI),
    Flow/StateFlow (Kotlin/Android Jetpack Compose), Bloc/Riverpod (Flutter) など、
    リアクティブプログラミングのライブラリで宣言的アプローチが活用されている

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/10e1d81d-f2a2-417a-9a85-4883267784aa.png" width=80% /> |
| :----------------------------------------------------------------------------------------------------------------------------------: |
|                                      宣言的なリアクティブプログラミングにおける UI 更新のフロー                                      |

### データ駆動・クエリ言語との共鳴

- **データ取得の宣言的アプローチ**:
  - SQL や GraphQL のようなクエリ言語は、「どのようなデータが必要か」を宣言的に記述する
  - データベースやサーバーは、その宣言に基づいて最適な方法でデータを取得・加工して返すため、
    開発者はデータ取得の具体的な手順（How）を意識する必要が減る
- **UI とデータ要件の整合性**:
  - 宣言的 UI は「現在の状態に基づいてどのような UI を表示するか」を記述する
  - GraphQL などを用いると、
    UI コンポーネントが必要とするデータの形状をクエリとして宣言的に記述でき、
    UI の要求とデータ取得の仕様が自然に対応する
  - これにより、過剰なデータ取得（オーバーフェッチ）や不足（アンダーフェッチ）を防ぎやすくなる
- **フロントエンドとバックエンドの連携**:
  - データ要件がクエリとして明確に定義されるため、
    フロントエンドとバックエンド間のコミュニケーションが円滑になる
  - UI とデータレイヤーの両方で宣言的なアプローチを採用することで、
    システム全体の構造が統一され、見通しが良くなる

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/5384771d-57d8-4da0-ab36-6684a30a2d14.png" width=80% /> |
| :----------------------------------------------------------------------------------------------------------------------------------: |
|                                                 GraphQL における宣言的データフェッチ                                                 |

### インフラ・プラットフォーム自動化

もともとあった設定ファイルという概念を、宣言的なアプローチで記述することで、
インフラやプラットフォームの自動化を実現する技術が増えてきています（参考：[HashiCorp「Infrastructure as Code」](https://www.hashicorp.com/resources/what-is-infrastructure-as-code)、[Kubernetes 公式ドキュメント「Declarative Management of Kubernetes Objects Using Configuration Files」](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/declarative-config/)）。

- **Infrastructure as Code (IaC)**
  - Terraform や CloudFormation などを使用し、
    インフラ構成（サーバー、ネットワーク、DB など）をコードで**宣言的に定義**
  - 手動での構築手順ではなく、「最終的にどういう状態にしたいか」を記述することで、ツールが差分を計算し自動的に適用
  - これにより、**再現性**、**一貫性**が保たれ、**バージョン管理**も可能になる
- **コンテナオーケストレーション (Kubernetes)**
  - YAML マニフェストファイルに、
    コンテナイメージ、レプリカ数、ネットワーク設定などの**望ましい状態**を宣言的に記述
  - Kubernetes は現在の状態を監視し、
    宣言された状態との差分があれば自動的に**調整（自己修復）**を行う
  - これにより、**スケーラビリティ**や**耐障害性**の高いシステム運用を実現
- **CI/CD パイプライン**
  - GitHub Actions や Azure Pipelines などの設定ファイル（YAML 等）で、
    ビルド、テスト、デプロイといった一連の**ワークフローを宣言的に定義**
  - 各ステップの実行順序や条件を記述することで、
    パイプライン全体を**コードとして管理**でき、**自動化**と**プロセスの可視化**を促進
- **構成管理ツール**
  - Ansible, Puppet, Chef などを用いて、
    サーバーやミドルウェアの**設定状態を宣言的に記述**
  - 「特定のパッケージがインストールされている」「設定ファイルが特定の内容である」といった状態を定義し、ツールが対象システムをその状態に**収束**させる

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/15e5c394-f20a-4f29-a16d-dc98e1eb8a05.png" width=80% /> |
| :----------------------------------------------------------------------------------------------------------------------------------: |
|                                             宣言的な定義によるインフラと CI/CD の自動化                                              |

### ネットワーク制御との親和性

- **SDN (Software-Defined Networking)**
  - ネットワーク全体の**望ましい振る舞いやポリシーを宣言的に定義**し、
    コントローラーが物理/仮想ネットワーク機器に対して具体的な設定を自動適用
  - 管理者は低レベルなコマンドではなく、抽象化された意図を記述
- **モデル駆動のネットワーク自動化 (NETCONF/YANG, OpenConfig)**
  - YANG や OpenConfig といった標準化されたデータモデルを用いて、
    ネットワークデバイスの**設定や状態を宣言的に記述**
  - NETCONF プロトコルなどを介して、
    定義されたモデルに基づいて設定を適用・検証し、ベンダー間の差異を吸収
- **ネットワーク GitOps**
  - ネットワーク構成を Git リポジトリで**宣言的に管理**
  - 構成変更は Git へのコミットとプルリクエストを通じて行われ、
    承認されると自動化ツールが差分を検知し、ネットワーク機器に適用
  - これにより、**構成のバージョン管理、再現性、監査性**が向上

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/436c24d6-b9c0-4c63-b4ff-1256f827dc4a.png" width=80% /> |
| :----------------------------------------------------------------------------------------------------------------------------------: |
|                                                       宣言的ネットワーク自動化                                                       |

### テスト駆動開発（TDD）との親和性

- アサーション宣言: 期待する動作を宣言的に記述し、テストケースを自動生成・検証

- **テスト意図の明確化**
  - 宣言的なコードは「何（What）を達成したいか」に焦点を当てるため、
    テストも「期待される結果（状態や出力）がどうあるべきか」を直接的にアサートしやすくなる
  - 実装の詳細（How）ではなく、望ましい結果をテストの中心に据えることができる
- **状態ベースのテスト**
  - 宣言的 UI フレームワークでは状態管理が中心となる
  - テストでは特定の状態（入力）を設定し、
    その状態に対応する UI（出力）が宣言通りに生成されるかを検証することが容易になる
  - これは、一連の命令的な操作手順を追うテストよりもシンプルになる場合が多い
- **コンポーネントの独立性**
  - 宣言的なコンポーネント（React, Vue など）は、
    明確な入力（Props, State）と出力（UI）を持つように設計されることが多い（純粋関数に近い性質）
  - これにより、各コンポーネントを独立してテストしやすくなり、特定の入力に対する出力を検証できる
- **スナップショットテストとの相性**
  - 特に UI コンポーネントのテストにおいて、宣言的な性質はスナップショットテストと相性が良い
  - コンポーネントが特定の状態に対して生成する UI の「スナップショット（宣言された結果）」を記録し、意図しない変更がないかを検出する
- **テストの堅牢性向上**
  - 内部的な実装方法（How）の変更（リファクタリング）に対して、テストが壊れにくくなる傾向がある
  - テストがコンポーネントの「宣言された振る舞い（What）」に焦点を当てていれば、
    内部実装が変わっても期待される結果が変わらない限り、テストは成功し続ける

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/67caf7d2-ffa7-43ae-a16d-ad767b56c81d.png" width=80% /> |
| :----------------------------------------------------------------------------------------------------------------------------------: |
|                                        宣言的コンポーネントの状態とスナップショット検証の流れ                                        |

### AI/ML パイプラインとの適合

- データ前処理やモデル定義を宣言的に記述し、再現性と可読性を担保
- PromptFlow や ML DSL で Transformer モデルやデータフローを設定

- **パイプライン定義の宣言化**
  - Kubeflow Pipelines, MLflow Projects, Azure Machine Learning パイプラインなどでは、
    データ取り込み、前処理、モデル訓練、評価、デプロイといった一連の**ML ワークフロー全体を宣言的に定義**（YAML や Python DSL など）
  - 各ステップの内容や依存関係（What）を記述し、
    実行エンジンが具体的な処理（How）をオーケストレーションする
- **再現性とバージョン管理**
  - パイプライン定義、使用するコード、パラメータ、環境などを宣言的に記述することで、
    **構成全体をバージョン管理**（Git など）できる
  - これにより、実験の**再現性**が大幅に向上し、後からの追跡や他者との共有が容易になる
- **構成要素の再利用性**
  - データ処理やモデル訓練などのステップを
    独立したコンポーネント（コンテナ化されることが多い）として定義し、
    パイプライン定義では**どのコンポーネントをどのように接続するかを宣言**する
  - これにより、パイプラインの部品化と再利用が促進される
- **Prompt Engineering の構造化 (PromptFlow など)**
  - PromptFlow のようなツールでは、
    プロンプト、外部ツール連携、評価ロジックなどを組み合わせた
    **複雑な LLM ワークフローを宣言的に（ビジュアルグラフや YAML で）定義**できる
  - これにより、試行錯誤が伴うプロンプトエンジニアリングプロセスが構造化され、
    再現性や管理性が向上する
- **モデルアーキテクチャ定義 (DSL)**
  - TensorFlow (Keras API) や PyTorch のようなフレームワークは、
    複雑なニューラルネットワークモデルの**アーキテクチャを宣言的に定義**するための
    高レベル API（DSL）を提供する
  - 開発者は層の種類や接続関係を宣言し、
    フレームワークが内部的な計算グラフの構築や実行を担う

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/7c875c51-1087-42c6-8ae1-c7e3b50b34d3.png" width=80% /> |
| :----------------------------------------------------------------------------------------------------------------------------------: |
|                                                 宣言的記述で制御する ML ワークフロー                                                 |

## なぜ特に UI 開発で宣言的アプローチが語られるのか？

宣言的アプローチは様々な技術領域に存在するが、特に UI 開発の文脈で頻繁に語られる傾向がある。
その理由について考察する。

### UI は宣言的 vs 命令的の対比が特に分かりやすい

UI が宣言的 vs 命令的パラダイムの典型例として語られるのは、以下の理由による：

- **視覚的フィードバックの即時性**

  - DOM 操作の命令的コード（jQuery 的）と状態に基づく宣言的コード（React/Vue）を並べるだけで、
    「手順を書く／結果を書く」の対比が視覚的に理解しやすい
  - 学習者が Before/After を GUI で直接確認できるため、教材として最適

- **歴史的な急激なパラダイムシフト**

  - 2010 年頃までの命令的 DOM 操作（jQuery, Win32, Swing 等）から、
    2013 年以降の宣言的アプローチ（React, SwiftUI, Flutter 等）への転換が、
    同じフロントエンド領域内で短期間に起こった（参考：[React 発表(2013 年)](https://www.youtube.com/watch?v=GW0rj4sNH2w)、[SwiftUI 発表(2019 年)](https://developer.apple.com/videos/play/wwdc2019/204/)）
  - 開発者コミュニティ全体がこの変化をリアルタイムで経験したため、議論や比較が活発

- **コード量の少なさと明確な差分**

  - 「ボタンを押したら要素を表示する」程度のシンプルな例でも、
    命令的アプローチと宣言的アプローチの違いが数行のコードで説明できる
  - 説明コストの低さが理解を促進する

- **パラダイムと API 選択の直観性**
  - `document.createElement`を書き始めた時点で命令的、
    `return <div>{state}</div>`と書けば宣言的と、
    API 名がほぼそのまま思考様式を示す
  - 使用するツールとパラダイムの選択が直結している

### 他の領域にも宣言的 vs 命令的の対比は存在する

UI 開発だけが宣言的/命令的アプローチを並置できる唯一の領域ではない。
以下のような例も同様に両アプローチを対比できる：

| ドメイン     | 命令的アプローチ                  | 宣言的アプローチ                          |
| ------------ | --------------------------------- | ----------------------------------------- |
| データ処理   | for ループでフィルタ・ソート      | SQL, LINQ, SparkSQL                       |
| インフラ構成 | シェルスクリプトで AWS CLI を実行 | Terraform, CloudFormation, Kubernetes     |
| ビルド/CI    | Bash で`gcc src/*.c && cp ...`    | Makefile のターゲット定義、GitHub Actions |
| テキスト整形 | 手書き HTML で`<b>`タグを付与     | Markdown で**太字**を記述                 |

これらの例も「同じ目的を達成するコード」が How（手順）と What（結果）で書き分けられるため、
宣言的思考を学ぶ教材として活用できる。

しかし、UI 開発が特に理解しやすいのは「可視化を含めて体験が直感に落ちる」という点による。
UI は「人が直接見る出力」を扱うため、違いを五感で確認しやすく、
宣言性という抽象概念を説明する入り口として最適と言える。

### 宣言的/命令的はレイヤーではなく視点の高さの問題

同じシステムでも階層を降りていくと、必ず命令的コードが存在する点も重要：

- React の JSX は宣言的だが、その内部の`requestAnimationFrame`ループは命令的
- Terraform は宣言的だが、実際の`aws ec2 run-instances`コマンドは命令的

つまり宣言的/命令的の違いは扱うレイヤーそのものではなく、
「結果を記述するか、手順を記述するか」という視点の切り替えにある。

### まとめ

UI が宣言的/命令的の例として頻繁に挙げられるのは、
学びやすさと可視化のしやすさが主な理由だが、
この考え方は多くの技術領域に通底している。

宣言性を理解する上で重要なのは、
「結果を記述するか、手順を記述するか」という視点の切り替えであり、
UI 開発から入りつつ、SQL、IaC、クエリ言語など他領域の例にも触れることで、
宣言性の本質をより立体的に理解できる。

---

# 宣言的アプローチの歴史：黎明期から現代まで

## 宣言的思考の萌芽：コンピュータサイエンス黎明期と初期応用

- 数理論理学やアロンゾ・チャーチのラムダ計算が理論的基礎を形成
  - 関数型プログラミングの土台となる
- Lisp (1950 年代) が関数型プログラミングの概念を具体化
  - 記号処理・高階関数・再帰などを導入し、後の宣言的言語に影響
- **初期の応用**: 工学や信号処理の問題解決にも宣言的アプローチが模索される (Karsai & Sztipanovits, 1988)
  - 階層的記述言語 (Hierarchical Description Language) などが提案される

## パラダイムとしての台頭：1970 年代 - 論理と制約

- 「宣言的プログラミング」という用語が明確化
- Prolog (1972 年) が論理プログラミング言語として登場
  - 事実と規則でプログラムを記述し推論するスタイルを提供
  - 宣言的プログラミングの概念を普及させる
- **制約プログラミング**の台頭 (Van Hentenryck, 1995)
  - 問題の制約条件を宣言的に記述し、解を探索するアプローチ
  - グラフィックス、UI、AI など多様な分野に応用される

## SQL による普及：データベース操作の宣言化

- SQL (1970 年代開発, 1980 年代標準化) が登場
- 「何を」取得したいかを記述する宣言的アプローチを採用
  - 「どのように」取得するかはデータベースエンジンに委ねる
- 宣言的なデータ操作の利点が広く認識される大きなきっかけとなる

## UI 開発における進化：モデルベースから現代フレームワークへ

- **モデルベース UI 開発 (MB-UIDE)** の研究 (Szekely et al., 1995; Pinheiro da Silva, 2000)
  - UI の構造、機能、レイアウトを宣言的モデルとして分離
  - MASTERMIND のような環境が登場し、高レベル仕様からコードを自動生成
- **関数型論理プログラミング**の応用 (Hanus, 2000; Hanus, 2007; Hanus & Kluß, 2009)
  - GUI や Web UI を宣言的に構築するフレームワークが登場
  - JavaScript との連携やクロスプラットフォーム対応も進む
- **React 登場と宣言的 UI の隆盛 (2013 年〜)**
  - 状態に基づき UI が自動更新されるモデルが広く普及
  - 複雑な DOM 操作を抽象化し、開発を簡素化
  - Vue.js, SwiftUI, Flutter など後続フレームワークも宣言的アプローチを採用

## 現代への広がり：AI、インフラ、そしてその先へ

宣言的な考え方は UI 開発以外にも広く浸透し、進化を続けている

- **AI と知識表現**:
  - 論理プログラミングが機械学習、計算生物学、自然言語処理などへ拡張 (Apt et al., 2011)
  - 制約を用いた複雑な問題モデリング
  - Web サービス連携の自動化 (McIlraith, 2004) など、宣言的アプローチが AI タスクを可能に
  - **マルチパラダイム統合**: 関数型、論理、制約などを組み合わせ、表現力と問題解決能力を向上
- **インフラストラクチャ・アズ・コード (IaC)**:
  - Terraform, CloudFormation など
  - インフラ構成をコードで宣言的に定義・管理し、再現性と自動化を向上
- **コンテナオーケストレーション**:
  - Kubernetes など
  - 望ましい状態をマニフェストで宣言し、自己修復やスケーラビリティを実現
- **その他**:
  - ネットワーク制御 (SDN, NETCONF/YANG)
  - CI/CD パイプライン (GitHub Actions など)
  - 並列システム開発 (Darlington et al., 1990)
  - ローコード/ノーコードプラットフォーム

## まとめ：宣言的アプローチの進化と意義

- 工学分野での起源から、論理、関数、制約といったパラダイムを取り込み進化
- UI 開発や AI 分野で広く応用され、抽象化、再利用性、クロスプラットフォーム対応などを促進
- 抽象化レベルを高め「何を」達成したいかに集中させることで、複雑なシステムの開発を簡素化
- 再現性・保守性・自動化を促進する現代ソフトウェア開発における重要な考え方
- 今後もマルチパラダイム統合、ツールサポートの進化、新たな応用分野への展開が期待される

---

# クイズで学ぶ宣言的なアプローチ

---

## まずは React で。宣言的？命令的？コードリーディング・クイズ！

**はじめに:** このクイズは、React における「宣言的」と「命令的」なコードの違いを理解し、それぞれの特性やトレードオフについて考えることを目的とする。多くの場合、どちらか一方が絶対的に正しいということはなく、状況に応じた適切な判断が求められる。「宣言的」は React のコアコンセプトだが、それが常にベストプラクティスとは限らない。各問題を通じて、コードの意図、保守性、パフォーマンス、そして文脈に応じた設計の重要性について考察する。

**採点について:** ここでの解答は一例。「どちらがより宣言的か」という問いに対する明確な答えがある場合もあるが、多くは程度の問題であり、異なる視点からの妥当な主張も存在し得る。重要なのは、なぜそう考えたのか、その根拠を明確に説明できることである。

---

### 問題 1: 宣言性の比較（外部ライブラリ連携）

以下の 2 つの React コンポーネント（利用例を含む）を比較する。

**コード例 A (SVG Bar Chart):**

- **概要:** React の JSX と SVG 要素のみを使用し、与えられたデータに基づいてバーチャートを直接描画。データの変更に応じて SVG 要素が再レンダリングされる

```jsx
import React, { useState } from "react";

// データに基づいてSVGバーチャートを描画するコンポーネント
function SvgBarChart({ data, width = 300, height = 150, barColor = "teal" }) {
  const validData = data.filter((d) => typeof d === "number" && !isNaN(d));
  const maxValue = Math.max(0, ...validData);
  const barWidth = validData.length > 0 ? width / validData.length : 0;

  return (
    <svg width={width} height={height} style={{ border: "1px solid #ccc" }}>
      {validData.map((value, index) => {
        const barHeight =
          maxValue === 0 ? 0 : Math.max(0, (value / maxValue) * height);
        const x = index * barWidth;
        const y = height - barHeight;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={Math.max(0, barWidth - 2)}
            height={barHeight}
            fill={barColor}
          />
        );
      })}
    </svg>
  );
}

// SvgBarChart を利用する親コンポーネント
function AppA() {
  const [chartData, setChartData] = useState([10, 20, 30, 15]);

  const addData = () => {
    setChartData((prevData) => [...prevData, Math.floor(Math.random() * 50)]);
  };

  return (
    <div>
      <SvgBarChart data={chartData} />
      <button onClick={addData}>Add Data</button>
    </div>
  );
}
```

**コード例 B (Chart.js Wrapper - 実在ライブラリ例):**

- **概要:** 実在する命令的なチャートライブラリ（例: Chart.js）を React コンポーネント内でラップ。`useEffect` を使用してライブラリのインスタンスを生成・更新・破棄し、実際の描画はライブラリに委ねる

```jsx
import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

function ChartjsComponent({ data, labels }) {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Dataset",
              data: data,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        },
        options: {
          scales: { y: { beginAtZero: true } },
        },
      });
    } else {
      chartInstanceRef.current.data.labels = labels;
      chartInstanceRef.current.data.datasets[0].data = data;
      chartInstanceRef.current.update();
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [data, labels]);

  return (
    <canvas ref={canvasRef} style={{ maxWidth: "400px", maxHeight: "200px" }} />
  );
}

// ChartjsComponent を利用する親コンポーネント
function AppB() {
  const [chartData, setChartData] = useState([10, 20, 30]);
  const [chartLabels, setChartLabels] = useState(["A", "B", "C"]);

  const updateData = () => {
    const newData = [...chartData, Math.floor(Math.random() * 50)];
    const newLabel = String.fromCharCode(65 + chartLabels.length);
    setChartData(newData);
    setChartLabels([...chartLabels, newLabel]);
  };

  return (
    <div>
      <ChartjsComponent data={chartData} labels={chartLabels} />
      <button onClick={updateData}>Update Chart</button>
    </div>
  );
}
```

**設問:** コード例 A とコード例 B では、どちらがより「宣言的」なアプローチと言えるか？また、実務ではどのような観点からどちらを選択するか？理由とともに説明する。

<details><summary>解答例</summary>

- **宣言性:**
  - コード例 A (SVG Bar Chart) の方が、より宣言的なアプローチと言える。React の状態 (`data`) から直接的に UI の構造（SVG 要素）を記述しており、「何を」表示したいかがコードの中心。React が差分検出と DOM 更新を担当
  - コード例 B (Chart.js Wrapper) は、React の宣言的な枠組みの中で命令的なライブラリを扱う。`useEffect` 内で「いつ」「どのように」ライブラリの API を呼び出すかを記述しており、手続き的な側面が強い。ただし、コンポーネントのインターフェース（props を渡すと描画される）は宣言的
- **実務での選択:**
  - **例 A (SVG):**
    - メリット: 依存ライブラリ不要、バンドルサイズ小、React エコシステム内で完結、カスタマイズ性高
    - 選択基準: シンプルなチャート、高度なカスタマイズ必要、依存最小限にしたい場合
  - **例 B (ライブラリ):**
    - メリット: 高機能チャート容易実装、ライブラリ側で最適化されている場合多、開発速度速
    - 選択基準: 高機能チャート必要、開発速度優先、標準的チャートで十分な場合
  - **トレードオフ:** 宣言性の高さが常に最優先されるわけではない。ライブラリの機能性、パフォーマンス、開発コスト、保守性などを総合的に評価し、プロジェクト要件に最も適した方法を選択。もしライブラリの方が性能や機能で圧倒的に優れている場合、宣言性を多少犠牲にしてでもライブラリを採用する判断は十分にあり得る
- **出題意図:**
  - React 自身の宣言的レンダリングと、外部の命令的ライブラリをラップする際の宣言性/命令性の違いの理解を確認
  - 単に「どちらが宣言的か」だけでなく、実務における技術選定のトレードオフ（宣言性 vs 機能性/開発コストなど）について考察を促す。`destroy()` のような命令的 API の適切な管理の重要性にも気づかせる

</details>

---

### 問題 2: 宣言性の比較（データフェッチ）

以下の 2 つのカスタムフック（利用例を含む）を比較する。

**コード例 A (Fetch Hook with AbortController):**

- **概要:** `useEffect` と `AbortController` を使用してデータをフェッチ。URL が変更されたりコンポーネントがアンマウントされたりする際に、進行中のフェッチリクエストをキャンセル。（React 18 以降、`isMounted` フラグは一般的に不要とされる）

```jsx
import React, { useState, useEffect, useRef } from "react";

function useFetchWithCancel(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const abortController = new AbortController();
    const signal = abortController.signal;

    let isCancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (!isCancelled) {
          setData(result);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          if (!isCancelled) {
            setError(err);
          }
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error };
}

function UserProfileA({ userId }) {
  const apiUrl = userId ? `https://api.example.com/users/${userId}` : null;
  const { data, loading, error } = useFetchWithCancel(apiUrl);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || "Failed to fetch"}</p>;
  if (!data) return <p>No user selected or no data.</p>;

  return <div>User Name: {data.name}</div>;
}
```

**コード例 B (Using React Query / SWR - 推奨アプローチ):**

- **概要:** データフェッチ、キャッシュ、キャンセル、再試行などを宣言的に扱うためのライブラリ（例: React Query (TanStack Query) や SWR）を利用。複雑なロジックを自前で実装する代わりに、ライブラリの提供する API を利用

```jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (userId) => {
  if (!userId) return null;
  const response = await fetch(`https://api.example.com/users/${userId}`);
  if (!response.ok) {
    throw new Error(`Network response was not ok for user ${userId}`);
  }
  return response.json();
};

function UserProfileB({ userId }) {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });

  if (isLoading) return <p>Loading initial user data...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No user selected.</p>;

  return (
    <div>
      User Name: {data.name}
      {isFetching ? " (Updating...)" : ""}
    </div>
  );
}
```

**設問:** コード例 A とコード例 B では、どちらがより「宣言的」なアプローチと言えるか？また、実務ではデータフェッチに関してどのようなアプローチが推奨されるか？理由とともに説明する。

<details><summary>解答例</summary>

- **宣言性:**
  - コード例 B (React Query / SWR) の方が、より宣言的なアプローチと言える。開発者は「どのデータを」「どのように取得するか（関数）」を宣言的に記述し、ライブラリがキャッシュ管理、バックグラウンド更新、ローディング/エラー状態の管理、リクエストの重複排除、キャンセル（内部的に）などを自動実行。データフェッチに関する複雑な「手続き」を隠蔽
  - コード例 A (Fetch Hook with AbortController) は、`useEffect` を使ってデータフェッチのライフサイクル（開始、成功、失敗、キャンセル）を命令的に管理。フックのインターフェースは宣言的だが、内部実装は手続き的。`AbortController` によるキャンセル処理も命令的な操作
- **実務での推奨:**
  - 多くの場合、コード例 B のように **React Query (TanStack Query) や SWR といったデータフェッチライブラリの利用が強く推奨される**
  - コード例 A のような自前実装は、ライブラリ導入が適切でない小規模ケースや、非常に特殊な要件がある場合に限定されるべき。データフェッチロジックの「車輪の再発明」は避けるのが賢明
- **出題意図:**
  - データフェッチにおける自前実装（命令的側面が強い）と、専用ライブラリ利用（より宣言的）を比較
  - 実務において、複雑な非同期処理や状態管理は、実績のあるライブラリ活用が生産性・品質向上の鍵であることを理解させる。宣言性の追求が、必ずしも自前実装を意味するわけではないことを示す

</details>

---

### 問題 3: 宣言性の比較（フォーカス制御）

以下の 2 つの React コンポーネント（利用例を含む）を比較する。

**コード例 A (useEffect for Focus):**

- **概要:** `shouldFocus` という boolean 型の prop を受け取り、その値が `true` になったタイミングで `useEffect` を使って input 要素に命令的にフォーカス。HTML 標準の `autoFocus` 属性は初回マウント時にしか機能しないため、後からフォーカスを当てるにはこの方法が一般的

```jsx
import React, { useState, useEffect, useRef } from "react";

function FocusableInput({ shouldFocus, ...props }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  return <input ref={inputRef} {...props} />;
}

function AppA() {
  const [focusRequested, setFocusRequested] = useState(false);

  const handleFocusClick = () => {
    setFocusRequested(true);
  };

  return (
    <div>
      <button onClick={handleFocusClick}>Focus Input</button>
      <FocusableInput
        shouldFocus={focusRequested}
        placeholder="Focus me when button is clicked"
        onFocus={() => console.log("Input focused")}
        onBlur={() => setFocusRequested(false)}
      />
      <p>Other content...</p>
    </div>
  );
}
```

**コード例 B (useImperativeHandle + forwardRef):**

- **概要:** 親コンポーネントから子コンポーネントの特定のメソッド（ここでは `focus`）を命令的に呼び出すための現代的なパターン。`forwardRef` と `useImperativeHandle` を使用。（Render Props パターンはやや古いアプローチと見なされることがある）

```jsx
import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

const ImperativeFocusableInput = forwardRef((props, ref) => {
  const internalInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      internalInputRef.current?.focus();
    },
  }));

  return <input ref={internalInputRef} {...props} />;
});

function AppB() {
  const inputHandleRef = useRef(null);

  const handleFocusClick = () => {
    inputHandleRef.current?.focus();
  };

  return (
    <div>
      <ImperativeFocusableInput
        ref={inputHandleRef}
        placeholder="Focus me via imperative handle"
      />
      <button onClick={handleFocusClick}>Set Focus via Handle</button>
      <p>Other content...</p>
    </div>
  );
}
```

**設問:** コード例 A とコード例 B では、フォーカス制御という目的において、どちらがより React の思想（宣言的な状態管理と、必要に応じた命令的な操作のカプセル化）に沿っていると言えるか？それぞれのメリット・デメリットも考慮して説明する。

<details><summary>解答例</summary>

- **React の思想との整合性:**
  - どちらのアプローチも、フォーカス制御という本質的に命令的な操作を扱う。React は主に宣言的な UI 構築に優れるが、DOM API を直接操作する必要がある場面も存在
  - **コード例 B (useImperativeHandle):** 親コンポーネントが特定のタイミングで子コンポーネントのメソッド（`focus`）を直接呼び出す。これはより直接的な命令的アプローチだが、`useImperativeHandle` によって子コンポーネントが公開する API を明示的に定義し、内部実装を隠蔽（カプセル化）。これにより、親は子の内部構造を知る必要がなくなる
- **メリット・デメリット:**
  - **例 A (useEffect):**
    - メリット: 比較的シンプル、`shouldFocus` prop で制御が宣言的に見える
    - デメリット: `shouldFocus` が `true` になるたびにフォーカスが当たるため、意図しない再フォーカスが発生する可能性。フォーカスを当てるタイミングの制御が間接的
  - **例 B (useImperativeHandle):**
    - メリット: 親が任意のタイミングで `focus()` を呼び出せるため、制御が直接的。子コンポーネントの公開 API が明確
    - デメリット: `forwardRef` と `useImperativeHandle` の記述がやや冗長。命令的な呼び出しが増えるとコードが複雑化する可能性
- **どちらがより適切か:**
  - 一概にどちらが優れているとは言えない
  - 親コンポーネントが任意のタイミングで子にフォーカスを当てる必要がある場合（例: フォーム送信失敗時に特定のエラーフィールドにフォーカス）、例 B の方が直接的で制御しやすい。`useImperativeHandle` は、このような命令的な操作を安全にカプセル化するための React の標準的な方法
- **出題意図:**
  - DOM の命令的操作（フォーカス）を React で扱う際の代表的なパターン（`useEffect` vs `useImperativeHandle`）を比較
  - 宣言的な状態管理と命令的な DOM 操作の境界線上で、どのようにバランスを取るか、React が提供するツールをどう活用するかを考えさせる

</details>

---

### 問題 4: 宣言性の比較（一時的な視覚効果）

以下の 2 つの React コンポーネント（利用例を含む）を比較する。

**コード例 A (CSS Transition/Animation):**

- **概要:** 値 (`value`) が変更されたときに、CSS の Transition または Animation を利用して一時的なハイライト効果を表現。React は状態変更時にクラス名を切り替えるだけで、アニメーションの実行は CSS に完全に委ねる

```jsx
import React, { useState, useEffect, useRef } from "react";
import "./Highlight.css";

function HighlightWithCSS({ value }) {
  const [isHighlighting, setIsHighlighting] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setIsHighlighting(true);
      const timer = setTimeout(() => {
        setIsHighlighting(false);
      }, 100);

      prevValueRef.current = value;

      return () => clearTimeout(timer);
    }
  }, [value]);

  const className = `highlight-value ${isHighlighting ? "flash" : ""}`;

  return <p className={className}>値: {value}</p>;
}

function AppA() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <HighlightWithCSS value={count} />
    </div>
  );
}
```

**コード例 B (useEffect with Class Manipulation):**

- **概要:** `value` prop が変更されるたびに、`useEffect` を使って対応する DOM 要素の `classList` を直接操作し、一時的に CSS クラス（例: `highlight`）を付与し、`setTimeout` で少し時間が経ったら削除

```jsx
import React, { useState, useEffect, useRef } from "react";
import "./Highlight.css";

function HighlightWithEffect({ value }) {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    let timerId = null;

    elementRef.current.classList.add("highlight");

    timerId = setTimeout(() => {
      elementRef.current?.classList.remove("highlight");
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return <p ref={elementRef}>値: {value}</p>;
}

function AppB() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <HighlightWithEffect value={count} />
    </div>
  );
}
```

**設問:** コード例 A とコード例 B では、一時的な視覚効果（ハイライト）を実現する上で、どちらがより「宣言的」なアプローチと言えるか？また、パフォーマンスや保守性の観点からはどちらが望ましいと考えられるか？

<details><summary>解答例</summary>

- **宣言性:**
  - コード例 A (CSS Transition/Animation) の方が、より宣言的なアプローチと言える。React コンポーネントは「ハイライト中である」という状態 (`isHighlighting`) を管理し、それに基づいて CSS クラス名を宣言的に設定するだけ。実際の視覚効果（どのようにアニメーションするか）は CSS に記述されており、振る舞いの定義が分離
  - コード例 B (useEffect with Class Manipulation) は、`useEffect` 内で `classList.add` や `setTimeout`, `classList.remove` といった命令的な DOM 操作とタイマー管理を実行。「どのように」ハイライトを実現するかの手続きが JavaScript コード内に直接記述
- **パフォーマンスと保守性:**
  - **パフォーマンス:** 一般的に、コード例 A の方がパフォーマンス上有利。CSS Transition や Animation はブラウザによって最適化されており、JavaScript の実行（特に `setTimeout` の多用）によるメインスレッドの負荷を回避。頻繁に値が変更される場合、例 B はタイマーの生成・クリアが頻発し、DOM 操作も都度発生するため、負荷が高くなる可能性
  - **保守性:** コード例 A の方が保守性が高いと考えられる。視覚的な振る舞い（アニメーションの詳細）は CSS ファイルにまとまっているため、デザインの変更が容易。React コンポーネントは状態とクラス名の関連付けに集中できる。例 B は、視覚効果のロジックが JavaScript コード内に混在するため、変更がコンポーネント自身に影響を与えやすく、見通しが悪くなる可能性
- **結論:**
  - 一時的な視覚効果やアニメーションに関しては、可能な限り CSS (Transition, Animation) を活用するコード例 A のアプローチが、宣言性、パフォーマンス、保守性のすべての観点で望ましいと言える。`useEffect` を使った命令的な DOM 操作（例 B）は、CSS だけでは実現できない複雑なアニメーションや、DOM 要素の特定の状態に依存する処理が必要な場合に限定して検討すべき
- **出題意図:**
  - 状態変化に応じた視覚効果を実装する際に、CSS による宣言的なアプローチと、JavaScript (useEffect) による命令的なアプローチを比較
  - `useEffect` は強力だが、DOM 操作やアニメーションの第一選択肢ではなく、より宣言的な代替手段（この場合は CSS）がないか検討することの重要性を示唆

</details>

---

### 問題 5: 宣言性の比較（状態更新ロジック）

以下の 2 つの React コンポーネント（カウンター機能）を比較する。

**コード例 A (Common Update Function / Reducer Pattern):**

- **概要:** カウンターの状態 (`count`) と、その状態を更新するためのロジックをコンポーネント内に定義。ここではシンプルな例として共通関数を使用。アクションが増えると `useReducer` を使うのがより一般的でスケールしやすいパターン

```jsx
import React, { useState, useCallback, useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    case "add":
      return { count: state.count + (action.payload || 0) };
    default:
      throw new Error("Unknown action type");
  }
}

function CounterA() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => dispatch({ type: "add", payload: 5 })}>
        Add 5
      </button>
    </div>
  );
}
```

**コード例 B (Using useEffect for Updates - アンチパターン寄り):**

- **概要:** カウンターの状態 (`count`) とは別に、実行したいアクションの種類を保持する状態 (`pendingAction`) を定義。ボタンクリックで `pendingAction` を更新し、`useEffect` を使って `pendingAction` の変更を監視し、変更があった場合に `count` を更新。**この方法は通常、冗長であり、アンチパターンと見なされることが多い**

```jsx
import React, { useState, useEffect } from "react";

function CounterB() {
  const [count, setCount] = useState(0);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    if (pendingAction === null) return;

    switch (pendingAction.type) {
      case "increment":
        setCount((c) => c + 1);
        break;
      case "decrement":
        setCount((c) => c - 1);
        break;
      case "reset":
        setCount(0);
        break;
      case "add":
        setCount((c) => c + (pendingAction.payload || 0));
        break;
      default:
        console.warn("Unknown action type in effect");
    }

    setPendingAction(null);
  }, [pendingAction]);

  const handleAction = (type, payload = null) => {
    setPendingAction({ type, payload, timestamp: Date.now() });
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => handleAction("increment")}>Increment</button>
      <button onClick={() => handleAction("decrement")}>Decrement</button>
      <button onClick={() => handleAction("reset")}>Reset</button>
      <button onClick={() => handleAction("add", 5)}>Add 5</button>
    </div>
  );
}
```

**設問:** コード例 A (`useReducer` または共通関数) とコード例 B (`useEffect` を利用) では、状態更新ロジックの実装方法としてどちらがより適切で、React の考え方に沿っていると言えるか？コード例 B のアプローチがなぜ一般的に推奨されないのか、その理由も説明する。

<details><summary>解答例</summary>

- **適切性と React の考え方:**
  - コード例 A (`useReducer` または共通関数) の方が、このシナリオにおいては圧倒的に適切であり、React の考え方（状態更新はイベントハンドラ内で直接的に行う）に沿っている
  - シンプルなケースでは共通関数でも十分だが、状態やアクションが増えると `useReducer` の方がスケールしやすい
- **コード例 B が推奨されない理由:**
  - **冗長性:** ユーザーのアクション（ボタンクリック）に対して直接状態 (`count`) を更新できるのに、わざわざ中間状態 (`pendingAction`) を設け、`useEffect` を介して間接的に `count` を更新。これは不必要に複雑
  - **`useEffect` の誤用:** `useEffect` は、レンダリングの結果として発生する副作用（API フェッチ、DOM 操作、サブスクリプション設定など）を扱うためのもの。コンポーネント内部の同期的な状態更新ロジックのために使うべきではない
- **結論:**
  - ユーザーイベントに応じてコンポーネントの状態を同期的に更新する場合は、イベントハンドラ内で直接 `setState` や `dispatch` を呼び出す（コード例 A のアプローチ）のが、最もシンプルで直接的、かつ React の設計思想に合致した方法。コード例 B のように `useEffect` を状態更新のトリガーとして使うのは、多くの場合アンチパターンであり避けるべき
- **出題意図:**
  - 状態更新ロジックの実装方法として、イベントハンドラからの直接的な更新 (`useState`/`useReducer`) と、`useEffect` を介した間接的な更新を比較
  - 「宣言的」に見えるコードが必ずしも良い設計とは限らないこと、特に `useEffect` の誤用がアンチパターンにつながりやすいことを理解させる

</details>

---

**まとめ:**

このクイズを通じて、React における宣言的・命令的なアプローチの様々な側面を見てきた。重要なのは、これらの概念が二元論ではなくグラデーションであること、そして実際の開発では、宣言性だけでなく、パフォーマンス、保守性、開発コスト、ライブラリの活用、チームのスキルセットなど、多くの要因を考慮して最適な設計を選択する必要があるということ。常に「なぜこのアプローチを選ぶのか？」という問いを持ち続けることが、より良いコードを書くための鍵となる。

---

# フロントエンド以外の宣言的 vs 命令的 クイズ

宣言的 vs. 命令的という対立軸は、UI 開発以外の領域でも重要な設計判断ポイントになる。
次の各問題について、宣言的アプローチと命令的アプローチのどちらが利点を持つか、理由とともに考えてみよう。

## 問題 1: インフラ構築

以下の 2 つの方法で VPC（Virtual Private Cloud）を構築した場合、どちらがより idempotent（冪等性）か？

**A. Terraform**

```hcl
resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "example-vpc"
  }
}
```

**B. Bash + AWS CLI**

```bash
#!/usr/bin/env bash
aws ec2 create-vpc --cidr-block 10.0.0.0/16 \
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=example-vpc}]'
```

<details><summary>解答例</summary>
Terraform の方がより宣言的かつ冪等性が高い。リソースの望ましい状態を宣言するだけで、作成済みかどうかを自動判定し、必要な差分のみ適用する。Bash + AWS CLI は実行するたびに create コマンドを発行し続けるため、冪等性を保証しにくい。
</details>

---

## 問題 2: コンテナオーケストレーション

次の 2 通りで Deployment のレプリカ数を 3 → 5 に変更する場合、どちらの方法が宣言的か？

**A. Kubernetes マニフェスト（YAML）**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webserver
spec:
  replicas: 5 # ここを修正
  template:
    # ...
```

**B. kubectl コマンド連打**

```bash
kubectl scale deployment webserver --replicas=5
```

<details><summary>解答例</summary>
Kubernetes マニフェスト（YAML）の修正が宣言的。望ましい状態（replicas: 5）を宣言し、`kubectl apply` を再実行するだけで差分適用される。一方、kubectl scale は命令的にその場で実行する操作。
</details>

---

## 問題 3: CI/CD パイプライン定義

次の 2 つの設定で、ブランチ名が変わったときに修正コストが低いのはどちらか？

**A. GitHub Actions (YAML)**

```yaml
on:
  push:
    branches:
      - main
jobs:
  build:
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test
```

**B. Jenkinsfile（シェル連打）**

```groovy
def BRANCH = "main"
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh "git checkout ${BRANCH}"
        sh 'npm install'
        sh 'npm test'
      }
    }
  }
}
```

<details><summary>解答例</summary>
GitHub Actions の YAML の方が宣言的で保守性が高い。対象ブランチを `on.push.branches` で一箇所宣言でき、変更もそこだけで済む。一方 Jenkinsfile はシェルスクリプトで分散しているため、修正箇所が増えやすい。
</details>

---

## 問題 4: データ操作言語

次の 2 種類で平均年齢を算出する場合、どちらが宣言性が高いか？

**A. SQL**

```sql
SELECT AVG(age) AS average_age
FROM users;
```

**B. JavaScript の for‑loop**

```javascript
let sum = 0;
for (const u of users) {
  sum += u.age;
}
const average = sum / users.length;
```

<details><summary>解答例</summary>
SQL の方が宣言性が高い。「何を求めたいか（平均）」だけを宣言し、集計ロジックは DB エンジンに委ねられる。JavaScript のループは手続き的に各要素を処理する必要があり、実装の手順が細かく記述される。
</details>

---

## 問題 5: 構成管理

以下の 2 つの方法で Web サーバーを最新に保つ場合、どちらがよりポータビリティと再現性に優れるか？

**A. Ansible (YAML DSL)**

```yaml
- hosts: webservers
  tasks:
    - name: Ensure nginx is latest
      ansible.builtin.yum:
        name: nginx
        state: latest
```

**B. 手続き的シェルスクリプト**

```bash
#!/usr/bin/env bash
ssh webserver01 'sudo yum update nginx'
ssh webserver02 'sudo yum update nginx'
```

<details><summary>解答例</summary>
Ansible の方が宣言的。設定ファイルに望ましい状態を記述し、ツールが複数ホストに対して一貫して適用する。シェルはホストごとに手順を明示する必要があり、再現性やメンテナンス性が低い。
</details>

---

## 問題 6: ビルド定義

次の 2 通りで依存関係の変更に応じて自動ビルドを行う場合、どちらが宣言的か？

**A. Bazel (BUILD ファイル)**

```python
cc_binary(
  name = "app",
  srcs = ["main.cc"],
  deps = [":lib"],
)
```

**B. Makefile (手続き的コマンド)**

```makefile
app: main.cc lib.a
	g++ main.cc lib.a -o app
lib.a: lib.cc
	g++ -c lib.cc -o lib.o
	ar rcs lib.a lib.o
```

<details><summary>解答例</summary>
Bazel の BUILD ファイルは依存関係グラフを宣言し、変更されたファイルのみを再ビルドする。Makefile はルールを定義するものの、手続きを順次記述するため、依存関係の定義と手順が混在しやすい。
</details>

---

## 問題 7: ネットワークポリシー

以下の 2 つで「特定の CIDR からポート 443 のみ許可」を表現する場合、どちらが宣言的か？

**A. Kubernetes NetworkPolicy (YAML)**

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-https
spec:
  podSelector: {}
  ingress:
    - from:
        - ipBlock:
            cidr: 10.0.0.0/8
      ports:
        - protocol: TCP
          port: 443
```

**B. iptables コマンド**

```bash
iptables -A INPUT -p tcp --dport 443 -s 10.0.0.0/8 -j ACCEPT
```

<details><summary>解答例</summary>
NetworkPolicy の YAML が宣言的。望ましいポリシーを定義し、Kubernetes が適用と維持を自動化する。iptables は逐次コマンドを実行する手続き的操作。
</details>

---

## 問題 8: アクセス制御 (IAM)

次の 2 通りでユーザーに特定 S3 バケットへの読み書きを許可する場合、どちらが宣言的か？

**A. AWS IAM ポリシー (JSON)**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

**B. aws iam attach-user-policy コマンド**

```bash
aws iam put-user-policy \
  --user-name Alice \
  --policy-name S3Access \
  --policy-document file://policy.json
```

<details><summary>解答例</summary>
IAM ポリシーの JSON が宣言的。ポリシーとして何を許可するかを記述し、AWS が適用管理する。CLI は命令的に API 呼び出しを行う操作。
</details>

---

## 問題 9: データパイプライン / ETL

次の 2 つで依存関係を持つタスクの実行を定義する場合、どちらが再現性と監視性に優れるか？

**A. Airflow DAG (Python)**

```python
def my_dag():
    t1 = task1()
    t2 = task2()
    t1 >> t2  # 依存関係を宣言
```

**B. cron + シェルスクリプト連鎖**

```cron
0 * * * * /path/to/task1.sh && /path/to/task2.sh
```

<details><summary>解答例</summary>
Airflow は DAG で依存関係と再実行、モニタリングを宣言的に管理。cron は手続き的にスクリプトを順次実行するだけで、個別実行や失敗時のリトライ管理が難しい。
</details>

---

## 問題 10: プログラミング言語パラダイム

次の 2 種類で副作用を抑え、並列化しやすい設計を考える場合、どちらが宣言的パラダイムか？

**A. Haskell (純関数型)**

```haskell
add :: Int -> Int -> Int
add x y = x + y
```

**B. C (命令型)**

```c
int add(int x, int y) {
    return x + y;
}
```

<details><summary>解答例</summary>
Haskell の純関数は副作用を持たず、同じ入力に対して同じ結果を返すことを宣言する。並列化やメモ化が容易。C の関数は命令的だが、純粋関数とは限らず、副作用が起こり得る。
</details>

---

## 問題 11: テスト記述

次の 2 つで最終的な UI の状態だけを示すテストを書く場合、どちらが宣言的か？

**A. Gherkin / Cypress の should チェーン**

```gherkin
Then('I see the welcome message', () => {
  cy.get('#message').should('contain', 'Welcome');
});
```

**B. Selenium による逐次クリック・アサート**

```java
WebElement msg = driver.findElement(By.id("message"));
assertEquals("Welcome", msg.getText());
```

<details><summary>解答例</summary>
Gherkin + Cypress はシナリオとして期待状態を自然言語ライクに宣言し、should チェーンで最終状態を検証。Selenium は命令型に要素取得・比較を記述。
</details>

---

## 問題 12: ML パイプライン定義

次の 2 つで再現性の高いパイプラインを作成する場合、どちらが宣言的か？

**A. Kubeflow Pipelines (YAML/DSL)**

```yaml
apiVersion: kubeflow.org/v1
kind: Pipeline
spec:
  tasks:
    - name: preprocess
      template: preprocess-template
    - name: train
      template: train-template
      dependsOn: [preprocess]
```

**B. Jupyter Notebook の手動実行**

```markdown
# 1. データ前処理

# 2. モデル訓練

# 3. 評価
```

<details><summary>解答例</summary>
Kubeflow はタスク依存と実行環境を宣言し、再現性と自動化を保証。Notebook は手動ステップの記述に留まり、実行順序や環境依存が発生しやすい。
</details>

---

# 宣言的(UI)・宣言性こぼれ話（お便り形式）

架空の質問や悩みに対して、宣言性が答える形式でまとめる。

## クロスプラットフォームの宣言的 UI

- 差出人：デベロッパー A さん
- 悩み：Web 以外の宣言的 UI をもっと知りたい
  - いつも React や Vue を使っているが、
  - Qt/QML や SwiftUI といった他プラットフォームの宣言的 UI が気になる
  - どんな特徴があるのか教えてほしい

宣言性からの返信

- プラットフォームの違いを超えて「What」を宣言する本質を共有している
- Qt/QML では JavaScript 風のシンタックスを通して私を表現できる
- SwiftUI では Swift 言語の強力な型システムを活かして私を具現化している
- いずれも「どう実現するか」ではなく「何を実現したいか」を記述する私の本質を体現している
- ホットリロードによる開発体験と型安全性の向上は、私がもたらす普遍的な恩恵である

<details>
<summary>Qt/QMLの例</summary>

```qml
import QtQuick 2.0

Rectangle {
  width: 200; height: 100
  color: 'lightblue'
  Text { text: 'Hello, declarative world!' }
}
```

</details>

<details>
<summary>SwiftUIの例</summary>

```swift
import SwiftUI

struct ContentView: View {
  var body: some View {
    VStack {
      Text("Hello, declarative world!")
        .padding()
        .background(Color.blue)
        .foregroundColor(.white)
    }
  }
}
```

</details>

## スタイリングの宣言的アプローチ

- 差出人：デザイナー B さん
- 悩み：スタイリング周りの宣言性が知りたい
  - ailwind CSS や CSS-in-JS が流行しているが、
    それぞれの宣言的アプローチの利点と落とし穴を教えてほしい

宣言性からの返信

- Tailwind では私はユーティリティクラスの組み合わせとして表現される
- CSS-in-JS では私はコンポーネントと一体となった Style オブジェクトとして存在する
- 前者は直感的な視認性を、後者は強力なスコープ管理と動的変更を提供する
- どちらも「何を実現したいか」を明示的に記述する私の原則に忠実である

| <img src="../img/ChatGPT Image 2025年5月4日 01_03_55.png" width=80% /> |
| :--------------------------------------------------------------------: |
|                    宣言的スタイリングの比較イメージ                    |

## モーションと宣言的アニメーション

- 差出人：アニメーター C さん
- 悩み：宣言的アニメーションと命令的アニメーションの違いが曖昧
  - どのような場面で宣言的に書くと効果的なのか教えてほしい

宣言性からの返信

- CSS の@keyframes では私は始点と終点の状態のみを宣言し、中間状態はブラウザに委ねる
- Framer Motion では私は物理法則やスプリングの特性として表現される
- 単純なトランジションから複雑な物理ベースの動きまで、「どう動かすか」ではなく「どう動いてほしいか」を伝える
- 私を活用することで、複雑なアニメーション制御のロジックから解放される

## 最後に：パフォーマンス最適化の小話

宣言的 UI ライブラリの隠れた工夫

- SolidJS では私は依存関係グラフとして表現され、必要最小限の更新を可能にしている
- 私は「何を」更新すべきかを宣言するだけで、「どのように」効率的に更新するかはライブラリに任せる
- この分離こそが高速な描画と開発者体験の両立を実現する私の真骨頂である

あなたの UI 開発における私の活用を応援している

---

# 宣言的アプローチのまとめ：多様な領域での共通言語として

本シリーズでは宣言的アプローチについて多角的に探求してきた。ここでは全体を振り返り、宣言的アプローチの意義と今後の展望について考察する。

## シリーズ全体の振り返り

### 01 - 宣言的 UI の基本概念

- **宣言的アプローチの本質**：「どう作るか（How）」ではなく「何を作りたいか（What）」を記述
- **状態中心の UI 設計**：UI の状態を定義し、それに基づく画面描画を自動化
- **React による実例**：状態 `count` に基づく UI の自動更新を、命令的アプローチと比較して理解

### 02 - 宣言的アプローチを学ぶ理由

- **チーム開発の共通言語**：コードの可読性向上、デバッグ容易性の向上、保守性の向上
- **現代の主要パラダイム**：React, Vue, Flutter, SwiftUI などのフレームワークの核
- **多様な技術との親和性**：
  - 関数型プログラミング：純粋関数の特性との親和性
  - リアクティブプログラミング：状態変化をストリームとしてモデル化
  - データ駆動開発：SQL/GraphQL などのクエリ言語との共鳴
  - インフラストラクチャ：IaC, Kubernetes, CI/CD などでの活用
  - AI/ML 開発：パイプライン定義やワークフロー管理

### 03 - 宣言的アプローチの歴史的発展

- **黎明期**：数理論理学やラムダ計算が理論的基礎を形成、Lisp による具体化
- **論理/制約プログラミング**：Prolog (1972) の登場と「何を知っているか」による推論
- **SQL による普及**：「何を」取得したいかの記述によるデータベース操作の宣言化
- **UI 開発の進化**：モデルベース UI 開発から React の登場 (2013) まで
- **多分野への広がり**：AI/ML、インフラ、ネットワーク、データパイプラインなど

### 04 - 実践的なコード比較（クイズ形式）

- **React における宣言性**：
  - 外部ライブラリ連携：純粋な React vs ライブラリラッパー
  - データフェッチ：自前実装 vs 専用ライブラリ
  - DOM 操作：useEffect vs useImperativeHandle
  - 視覚効果：CSS ベース vs 命令的 DOM 操作
  - 状態更新：イベントハンドラ直接更新 vs useEffect 間接更新
- **多様な分野での宣言的 vs 命令的**：
  - インフラ構築：Terraform vs Bash
  - コンテナ管理：Kubernetes YAML vs kubectl コマンド
  - CI/CD：GitHub Actions vs Jenkinsfile
  - データ操作：SQL vs for-loop
  - 構成管理：Ansible vs シェルスクリプト
  - ML パイプライン：Kubeflow vs 手動ノートブック

## 再確認：宣言的アプローチの本質

宣言的アプローチの本質は以下のポイントに集約される：

1. **意図と実装の分離**：「何を達成したいか」と「どのように実現するか」を分離
2. **状態中心思考**：望ましい状態を記述し、その状態への収束を自動化
3. **抽象化レベルの引き上げ**：低レベルの実装詳細よりも、ビジネス要件や目的に集中
4. **差分検出と自動更新**：現在の状態と目標状態の差を検出し、必要な変更のみを適用
5. **再現性と一貫性**：環境や実行者に依存しない再現可能な結果の保証

こうした特性により、宣言的アプローチは以下のような価値をもたらす：

- **認知負荷の軽減**：実装の詳細から解放され、本質的な課題に集中できる
- **コードの簡潔化**：目的の記述に絞ることで、コード量を削減
- **保守性の向上**：内部実装の変更に強く、意図が明確に記述される
- **コラボレーションの促進**：専門知識の異なるチーム間の共通言語として機能
- **自動最適化の余地**：ツールによる実行計画の最適化が可能

## 現代開発への示唆：バランスの取れたアプローチ

宣言的アプローチは万能ではなく、以下のような配慮が必要である：

1. **適材適所の判断**：

   - 宣言的アプローチが得意な領域（UI 描画、インフラ定義、データクエリなど）
   - 命令的アプローチが必要な領域（複雑なビジネスロジック、特殊なパフォーマンス最適化など）
   - 両方を組み合わせるハイブリッドアプローチの有効性

2. **トレードオフの認識**：

   - 宣言性 vs パフォーマンス
   - 抽象化レベル vs デバッグ容易性
   - 既存ライブラリの活用 vs 純粋な宣言性

3. **学習曲線への配慮**：
   - 宣言的パラダイムへの転換には学習コストが伴う
   - チーム全体での理解の共有と段階的な導入の重要性

## 宣言的アプローチの未来

宣言的アプローチは現代のソフトウェア開発における主要なパラダイムとしてさらに進化を続けるだろう：

1. **AI との共進化**：

   - LLM を活用したコード生成は宣言的インターフェースと相性が良い
   - 「何を」実現したいかを自然言語で伝え、実装詳細は AI が担う流れ

2. **宣言的 DSL の進化**：

   - より表現力が高く、ドメイン特化型の宣言的言語の発展
   - 視覚的プログラミングとの融合による非エンジニアの参画促進

3. **自己修復・自己最適化システム**：

   - 宣言された望ましい状態への収束を自動化する仕組みの高度化
   - 障害検知・復旧・スケーリングなどの自動化の進展

4. **クロスプラットフォーム抽象化**：
   - 単一の宣言的定義から複数のプラットフォームへの展開
   - プラットフォーム固有の実装詳細からの解放

## 結論：共通言語としての価値

宣言的アプローチは単なるプログラミングスタイルの一つではなく、多様な技術分野を横断する「共通言語」として機能している。UI 開発からインフラ構築、データ処理、AI/ML まで、「何を」実現したいかに焦点を当てたアプローチは、複雑性の増すソフトウェア開発において不可欠な思考法となっている。

宣言的思考を身につけることは、特定の技術スタックに限定されない汎用的なスキルであり、技術の進化に伴う変化にも柔軟に対応できる基盤を提供する。エンジニアの役割が「すべてを自分で実装する」から「適切な抽象化を選択し組み合わせる」へとシフトする中で、宣言的アプローチはより重要性を増していくだろう。

## 本シリーズが、読者の皆さんの日々の開発実践に新たな視点をもたらし、より効果的なソリューション設計の一助となれば幸いである。

# 番外編：人文科学の視点から見る宣言的プログラミング

宣言的プログラミングは単なる技術的手法ではなく、人間の認知、言語、文化と深く関わる概念である。
本章では言語学と人類学の観点から、宣言的表現の構造的特徴と人間の思考様式との関連性を探求する。

## 言語相対性仮説と宣言的表現

- **サピア＝ウォーフ仮説**と宣言的プログラミング言語の関係
  - 使用言語が思考パターンに影響を与えるという仮説
  - プログラミング言語の設計が問題解決アプローチや思考様式を形作る可能性
- **言語構造と認知フレームワーク**
  - 宣言的言語（SQL, HTML）は「何を」に集中し、命令的言語（C, Java）は「どのように」を重視
  - これらの異なる表現様式が、開発者の問題概念化方法に影響を与える

<details>
<summary>言語相対性とプログラミングパラダイムの具体例</summary>

例えば、次のような言語間の思考様式の違いがある：

```sql
-- SQL: 宣言的 - 「何が欲しいか」を明示
SELECT name FROM users WHERE age > 18;
```

```javascript
// JavaScript: 命令的 - 「どう取得するか」を指示
const adults = [];
for (const user of users) {
  if (user.age > 18) {
    adults.push(user.name);
  }
}
```

この対比は自然言語にも見られる。例えば英語の能動態と受動態、
あるいは日本語の「〜になる」という状態変化表現と
英語の "make something X"（何かを X にする）という行為主体表現の違いに類似している。

</details>

## 宣言的言語と人間の認知負荷

- **抽象化レベルと認知処理**
  - 宣言的言語は高レベルの抽象化を提供することで、人間の作業記憶に対する認知負荷を大幅に軽減する
  - 認知心理学研究によれば、人間の短期記憶容量は「7±2 項目」という制約があり、宣言的パラダイムはこの認知的限界を補完する抽象化機能を果たしている
- **心的モデルと言語設計**
  - 宣言的アプローチの優位性は、実装詳細よりも目標状態に意識を集中できる点にある
  - これにより、問題領域に関する概念的理解が促進され、開発者は限られた認知リソースをより効率的に活用できるようになる

## パフォーマティビティと宣言的プログラミング

- **発話行為理論（J.L.オースティン）との連携**
  - 宣言的コードは「遂行的発話」に類似：言明すること自体が行為となる
  - HTML 要素の宣言は、ブラウザによるレンダリング行為を引き起こす
- **儀式的側面**
  - 人類学における儀式は、行為によって新しい社会的現実を作り出す
  - 同様に、宣言的コードは新しいデジタル現実を「宣言」することで生成
  - 例：React コンポーネントは、状態と UI の関係性を「宣言」するだけで実際の DOM 変更が実行される

<details>
<summary>発話行為と宣言的UIの類似性</summary>

発話行為理論では、「私はここに宣言する」「ここに命名する」といった表現は単なる記述ではなく、
その発話自体が社会的現実を変える行為となる。

宣言的 UI においても同様の構造がある：

```jsx
// Reactの宣言的UI - この「宣言」自体がUIを生成する行為となる
function WelcomeMessage({ username }) {
  return <h1>ようこそ、{username}さん！</h1>;
}
```

この宣言は単なる記述ではなく、実際の DOM 要素を生成する「遂行的」な性質を持つ。
React（システム）が媒介となり、宣言が現実（画面上の UI）として具現化される。

</details>

## 文化的文脈と宣言的思考

- **文化的パターンとプログラミングスタイル**
  - 集団主義的文化圏と個人主義的文化圏でのプログラミング手法の違い
  - 東アジア諸国では全体論的思考が強く、宣言的アプローチとの親和性が指摘される研究もある
- **知識伝達と宣言的ドキュメント**
  - 宣言的スタイルは知識の明示化と伝達効率を高める
  - プログラミングコミュニティにおける暗黙知と形式知の関係に影響

## 言語的多様性と技術的表現

- **自然言語の多様性とプログラミング言語の設計哲学**
  - 言語によって表現しやすい概念と表現しにくい概念が存在する
  - プログラミング言語も同様に、特定の問題領域に対する「表現力」に差がある
- **メタファーとしての宣言的プログラミング**
  - UI 設計における「宣言」という概念的メタファーの力
  - 言語学における「概念メタファー理論」（レイコフとジョンソン）との関連性

## 社会構築主義的視点

- **知識の社会的構築とコードの役割**
  - コードは単なる機能的道具ではなく、意味を伝え構築する媒体
  - 宣言的コードは特定の世界観や認識論的立場を反映している
- **権力構造とプログラミングパラダイム**
  - 特定のパラダイムが主流となることの社会的・政治的含意
  - 技術設計における価値観の埋め込みと影響力

<details>
<summary>社会構築主義とプログラミングパラダイムの例</summary>

ソフトウェア開発における「ベストプラクティス」や「パラダイム」は中立的なものではなく、
特定の社会的・歴史的文脈の中で構築されている。

例えば、命令的プログラミングは工業化時代の生産ラインや軍事指揮系統のメタファーに影響を受けている。
一方、宣言的プログラミングはより民主的なガバナンスモデルや分散型の意思決定に近い思想を反映している。

```jsx
// 命令的アプローチ：「システムへの命令」というメタファー
function updateUI() {
  const element = document.getElementById("result");
  element.innerHTML = "";
  element.classList.add("updated");
  // さらに多くの手順...
}

// 宣言的アプローチ：「望ましい状態の表明」というメタファー
function ResultView({ data, isUpdated }) {
  return <div className={isUpdated ? "updated" : ""}>{data}</div>;
}
```

これらの異なるアプローチは、単なる技術的選択ではなく、ソフトウェア開発における
権力関係や意思決定プロセスに関する異なる哲学を体現していると解釈できる。

</details>

## 総括：学際的アプローチの価値

- 宣言的プログラミングを人文科学の視点から分析することで、技術と人間の認知・文化の接点が明らかになる
- これらの学際的理解は、より人間中心のプログラミングパラダイムやツールの発展に貢献する可能性がある
- エンジニアリングの実践に人文学的視点を取り入れることで、技術の社会的・文化的影響への感度が高まる

宣言的プログラミングの原則と人間の認知・文化的側面との間には深い構造的関連性があり、
これらの接点を理解することは、より効果的で人間中心のソフトウェア設計に貢献する。
