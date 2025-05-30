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
