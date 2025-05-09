# なぜいま宣言的 UI の話をするのか？

宣言的 UI は、UI 開発＝フロントエンドにおける考え方だが、
宣言的そのものは、UI 開発に限らず、様々な分野で使われている考え方である。
本セクションでは、宣言的の考え方を学ぶモチベーションを得ることができるように、
宣言的 UI の考え方を学ぶことのメリットを紹介する。

## 生成 AI を使いこなすには、審美眼が重要だから

https://www.fnn.jp/articles/-/710223

AI が生成するコードは、我々開発者が見定める必要がある。
AI 時代において、エンジニアはコードの品質や意図を理解し、適切に評価する能力が求められる。
宣言的なコードは、意図や目的が明確であるため、AI の生成物を評価しやすい。

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
あらゆる技術スタックや開発手法と親和性が高い。

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
インフラやプラットフォームの自動化を実現する技術が増えてきている。

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
    同じフロントエンド領域内で短期間に起こった
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
