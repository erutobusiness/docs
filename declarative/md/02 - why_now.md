# なぜ今その話をするのか？

<!-- ここで、フロントエンドエンジニアでないエンジニアに、宣言的UIを学ぶモチベーションを与える -->

## 今の GUI 技術の主要パラダイムだから

- React, Vue, Flutter, SwiftUI など、
  現代の主要な GUI フレームワークやライブラリは、
  宣言的 UI をその**核となる思想として採用**している
  - 単なる UI 開発の一時的なトレンドではなく、
    **ソフトウェア開発における重要な考え方**となっている

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/83d20cfe-6603-4982-b0b7-2c1e11c20b40.png" width=50% /> |
| :----------------------------------------------------------------------------------------------------------------------------------: |
|                                          ChatGPT の画像生成は横並びにさせると左側が見切れる                                          |

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
  - 結果として、バックエンドエンジニアや他の役割のメンバーにとっても、
    フロントエンドの構造やデータフローを理解しやすくなり、
    システム全体の整合性を保った開発を進めやすくなる

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/a5a504b5-7881-4a89-95a0-8d8ef3177ed7.png" width=50% /> |
| :----------------------------------------------------------------------------------------------------------------------------------: |
|                                                         フロー図はいいかんじ                                                         |

## チーム開発において、共通認識として不可欠になりつつあるから

- 宣言的な考え方を理解していないと、意図せずチームに負担をかけてしまう可能性がある
  - 結果として、他の人が読みにくく、変更しにくく、不具合が潜みやすいコードになる

<details>
  <summary>Reactの命令的／宣言的なコードで比較</summary>

この前、以下のようなコードを見た：

- ref ではなく document.query で要素を取得
- クラス名の変更を return 部ではなくイベントハンドラ内の .classList 変更で実装

これは React 思想や仕様を完全に無視するアプローチであり、
コンポーネントの再利用性や予測可能性を著しく損なう！
複数の同じコンポーネントがレンダリングされた場合に ID が衝突したり、
意図しない要素を操作したりするリスクも高く、
**最も避けるべき書き方の一つ（アンチパターン）**である

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

</details>

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
`div` の `className` は自動的に状態に合わせて変化する
開発者は DOM を直接操作する必要がない

- 宣言的なアプローチは、状態と UI の結びつきを明確にすることで、コードの**可読性**を高める
- どこで状態が変わり、それがどのように UI に反映されるかが追いやすくなるため、
  **不具合の原因特定や修正（デバッグ）も容易に**なる
- このように、UI の状態管理やコンポーネントの設計は、
  アプリケーション全体のデータフローやアーキテクチャにも影響を与える
- そのため、宣言的 UI の考え方は、フロントエンドエンジニアだけでなく、
  **システム開発に関わるすべてのエンジニアが知っておくべき共通言語**となりつつある

## 他のパラダイムや技術との相性がいいから

つまりは、**今後も長く使われ続ける可能性が高い、汎用的な考え方**

- 特に**関数型プログラミング**の考え方と親和性が高い
  - 状態を入力として受け取り、それに基づいて UI（描画結果）を出力するという考え方は、
    副作用を抑え、入力が同じなら常に同じ出力を返す「純粋関数」の概念に近い
  - これにより、UI の振る舞いが予測可能になり、テストもしやすくなる
  - 同じ入力に対して常に同じ結果を返す「参照透過性」の性質を持つことで、
    計算結果をキャッシュしてパフォーマンスを最適化する（メモ化や遅延評価）といったメリットも得られる
- UI 開発に限らず、様々な技術や領域を学ぶうえでの土台となる
  - たとえば、サーバーインフラの構成をコードで管理する **Infrastructure as Code (IaC)** や、
    データパイプラインの定義など、ソフトウェア開発の様々な領域で応用されている
- 私見だけど、AI と相性がいい

このように、宣言的という考え方が持つ**汎用性の高さ**も、今学ぶべき理由の一つと言える
