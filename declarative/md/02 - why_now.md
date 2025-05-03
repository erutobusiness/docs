# なぜいま宣言的 UI の話をするのか？

宣言的 UI は、UI 開発＝フロントエンドにおける考え方だが、
宣言的そのものは、UI 開発に限らず、様々な分野で使われている考え方である。
本セクションでは、宣言的の考え方を学ぶモチベーションを得ることができるように、
宣言的 UI の考え方を学ぶことのメリットを紹介する。

## 今の GUI 技術の主要パラダイムだから

- React, Vue, Flutter, SwiftUI など、
  現代の主要な GUI フレームワークやライブラリは、
  宣言的 UI をその**核となる思想として採用**している
  - 単なる UI 開発の一時的なトレンドではなく、
    **ソフトウェア開発における重要な考え方**となっている

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/83d20cfe-6603-4982-b0b7-2c1e11c20b40.png" width=50% /> |
| :----------------------------------------------------------------------------------------------------------------------------------: |
|                                   宣言的 UI のデータフロー概念図 (状態から UI 描画への流れを示す)                                    |

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

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/3dc037d5-476f-44c6-92ff-eeea37b66e0d.png" width=80% /> |
| :----------------------------------------------------------------------------------------------------------------------------------: |
|                                        宣言的 UI が描くフロー図 (状態と UI 描画の対比を示す)                                         |

## チーム開発での共通言語になるから

- 宣言的な考え方を理解していないと、意図せずチームに負担をかけてしまう可能性がある
  - 結果として、他の人が読みにくく、変更しにくく、不具合が潜みやすいコードになる
  - 宣言的にすると、状態と UI の結びつきを明確になり、コードの可読性を高める
- どこで状態が変わり、それがどのように UI に反映されるかが追いやすくなるため、
  **不具合の原因特定や修正（デバッグ）も容易に**なる
- このように、UI の状態管理やコンポーネントの設計は、
  アプリケーション全体のデータフローやアーキテクチャにも影響を与える
- そのため、宣言的 UI の考え方は、フロントエンドエンジニアだけでなく、
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

## 他のパラダイムや技術との相性がいいから

宣言的アプローチは、構造の明確化・可読性・再利用性を高めるため、
あらゆる技術スタックや開発手法と親和性が高い。

- 関数型プログラミングとの親和性

  - 純粋関数: 入力（状態）から出力（UI）を返す一方向の流れで、副作用を最小化
  - 参照透過性: 同じ入力で同じ結果を返す性質があり、メモ化や最適化が容易

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/d6f56d65-9c18-4255-94a2-f08637a4f40d.png" width=80% /> |
| :----------------------------------------------------------------------------------------------------------------------------------: |
|                        関数型プログラミングの「純粋関数」と React コンポーネントの一方向データフローの親和性                         |

- リアクティブプログラミングとの融合

  - ストリーム: 時系列データを宣言的に定義し、変換・フィルタリングが直感的
  - RxJS や Reactor と組み合わせた UI/データフロー管理

<!-- AI画像生成用プロンプト:
目的: リアクティブプログラミングのストリーム処理概念を理解させる
説明: イベント発火→Observableストリーム→サブスクライバーの流れを示すコンポーネント図
-->

- データ駆動・クエリ言語との共鳴

  - SQL/GraphQL: 必要なデータ形状を宣言的に記述し、最適な実行計画をサーバーが選択
  - UI とデータレイヤーの宣言的構造を統一

<!-- AI画像生成用プロンプト:
目的: GraphQLクエリとレスポンス構造の対応を直感的に示す
説明: 上段にGraphQLクエリ文、下段に取得されるJSONレスポンスを並列に配置したダイアグラム
-->

- インフラ・プラットフォーム自動化

  - Infrastructure as Code: Terraform や CloudFormation でクラウドリソースをコード化
  - Kubernetes: YAML マニフェストでコンテナのデプロイ状態を宣言
  - CI/CD: GitHub Actions や Azure Pipelines でパイプラインを宣言的に定義

<!-- AI画像生成用プロンプト:
目的: 宣言的インフラ定義の多様性を一枚で俯瞰させる
説明: 左からTerraformコード、Kubernetesマニフェスト、CI/CDワークフローYAMLを並列に表示し、各処理結果を下段にアイコンで示す図
-->

- テスト駆動開発（TDD）との親和性

  - アサーション宣言: 期待する動作を宣言的に記述し、テストケースを自動生成・検証

<!-- AI画像生成用プロンプト:
目的: テスト宣言（アサーション）のイメージを可視化する
説明: テストコードのassert文と対象コードの振る舞いを対応づけ、矢印で結んだ関係図
-->

- AI/ML パイプラインとの適合

  - データ前処理やモデル定義を宣言的に記述し、再現性と可読性を担保
  - PromptFlow や ML DSL で Transformer モデルやデータフローを設定

<!-- AI画像生成用プロンプト:
目的: AI/MLパイプラインのステップを視覚的に理解させる
説明: データ入力→前処理→モデル適用→結果出力の流れを示すワークフロー図。各ステップにアイコンを配置
-->
