# AI口調問題：masterpiece顔への嫌悪

## masterpiece顔とは何か

AIが生成するスライドはなぜ均質に見えるのか、その根本原因を画像生成の世界から考えてみましょう。
Stable Diffusion[^1]で画像を生成するとき、プロンプトに`masterpiece, best quality`と入れると何が起きるか知っていますか？

[^1]: Stable DiffusionはStability AIが開発したオープンソースの画像生成AIモデルである <https://stability.ai/news/stable-diffusion-announcement>

全部同じ顔になります。

瞳は大きく、肌は滑らかで、照明は完璧。
技術的には高品質ですが、個性がありません。
これが**masterpiece顔**です。

## テキスト版のmasterpiece顔

同じことがテキストでも起きています。

AIに「良い文章を書いて」と頼むと、こんな表現が頻出します。

- 「画期的な」
- 「革命的な」
- 「シームレスに」
- 「ゲームチェンジャー」
- 「次世代の」

これらの表現は、masterpiece顔のテキスト版です。
どんな文脈でも使えるが、どんな文脈にも固有ではない。
全部入れると、全部同じ文章になります。

## 均質化への嫌悪感

なぜmasterpiece顔が不快なのでしょうか。

それは**選択の不在**を感じるからです。
George Orwellは1946年のエッセイでこう書いています[^2]。

> When you think of a concrete object, you think wordlessly, and then, if you want to describe the thing you have been visualising you probably hunt about until you find the exact words that seem to fit it. When you think of something abstract you are more inclined to use words from the start.

[^2]: George Orwell "Politics and the English Language" (1946) <https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/>

良い文章とは、無数の選択肢の中から特定の言葉を選び取った結果です。
「画期的」ではなく「じわじわ浸透した」を選ぶ。
「革命的」ではなく「地味だが確実に効いた」を選ぶ。
この選択のプロセスに、書き手の視点が表れます。

AIの出力にはこの選択がありません。
自己回帰言語モデル[^3]の仕組み上、最も確率の高いトークンが順番に並んでいるだけです。

[^3]: 自己回帰モデルとは、直前までの出力を入力として次のトークンを予測する生成方式である [https://en.wikipedia.org/wiki/Autoregressive_model](https://en.wikipedia.org/wiki/Autoregressive_model)
    だから読んでいて違和感がある。
    整っているのに、何も伝わってこない。

## 個性とは非効率

考えてみれば、個性的な文章とは情報伝達の観点では非効率です。
社会学者George Ritzerが提唱したマクドナルド化[^4]の概念が、ここでも当てはまります。

[^4]: マクドナルド化(McDonaldization)とは、効率性・計算可能性・予測可能性・制御の4原則が社会全体に浸透する現象を指す <https://en.wikipedia.org/wiki/McDonaldization>
    回り道をしたり、比喩を使ったり、あえて曖昧にしたりする。
    しかしその非効率さこそが、読者の記憶に残ります。

AIは効率的に「正しい文章」を生成しますが、効率的であるがゆえに均質になります。

## 2つの問題の交差点

ここまでで、2つの問題を見てきました。

- 人間のメモは腐る（第2章、第3章）
- AIの出力は均質で品質が低い（第4章、本章）

人間のメモもAIの出力も、そのままでは使い物にならない。
では何を頼りにすればいいのか。
まず、道具の選択から始めましょう。
