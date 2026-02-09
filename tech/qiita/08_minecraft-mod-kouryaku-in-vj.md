---
title: 社内マイクラ部でMinecraftのMODをLLMで攻略した！
tags: minecraft LLM ChatGPT NotebookLM sitemap
author: nyarlathotep
created_at: "2025-12-03"
updated_at: "2025-12-03"
id: 2506e32613fb8ca52006
organization_url_name: visionary-jp
slide: false
ignorePublish: false
---

# はじめに

結論は[NotebookLM](#notebooklm)です。

## マイクラ部

弊社の福利厚生の１つに、部活動があります。

[https://note.com/visionary_japan/n/n4b03c1aba97d#83c10f4c-f624-4c3a-a72e-c7be14044b21](https://note.com/visionary_japan/n/n4b03c1aba97d#83c10f4c-f624-4c3a-a72e-c7be14044b21)

私が所属するマイクラ部では、Minecraftサーバーを開いています。
Minecraftとは、世界的な人気を誇る箱庭ゲームで、現在はMicrosoftが運営しています。

<https://www.minecraft.net/>

部では、MODを駆使した協力プレイをしています。
資源集めが好きな人、建築が得意な人、自動化設備を作る人など、
各々のプレイスタイルに合わせて自然と役割が分かれていきました。

関わりの少ない部員同士でも、作業を手伝ったり雑談したりと、
部活動ならではの**ゆるい共同作業**を通じて、自然な交流が生まれています。

そうして各々が思い思いに施設を建設しているうちに、
いつの間にか一つの街が出来上がっていました：

![01.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/cf01cd2e-c75a-47a7-9735-349cb469a5a5.png)

## MOD

MOD（Modification）とは、ユーザーが作成した拡張プログラムのことです。
導入することで、新しいアイテムやブロック、独自のシステムなどを追加し、
本来のMinecraft（バニラ）とは全く異なる遊び方が可能になります。

現在の部活ワールドでは以下のMODなどを導入し、
スチームパンクな工業と多様な魔法を両立しています：

![2025-12-02\_17.02.48.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/e61bba0b-c563-48e4-b028-b85f1415ec35.png)

- 工業系
  - Create（風車や水車などの動力を用いた自動化）
  - Tinkers' Construct（多様な素材を使った製錬・ツール作成）
  - Embers Rekindled（ドワーフ風の魔導工業）
- 魔法系
  - Botania（植物の魔力＝マナを扱う魔法体系）
  - Goety（魂＝ソウルエネルギーを扱う魔法体系）

このように個性的なMODが多く導入されているため、まず各MODの理解が欠かせません。
しかし、これらMODの攻略は、通常のMinecraft攻略よりも遥かに困難です。
MODはWikiが無かったり、情報が個人ブログや動画などに分散していたりしていて、
必要な情報を集めるだけでも複数のページを行き来する必要があります：

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/ee8e719b-1821-42d7-a6de-46c9fc2ca6a8.png)

このカオスな情報を整理し、自分の環境に合わせて再構成できるのがLLMの強みです。
ChatGPTのような汎用型と、NotebookLMのようなソース限定型を使い分けることで、
MOD攻略の効率が大きく変わります。

## 本記事の目的

弊社アドカレ3日目である本記事では、以下の目的を優先しています：

- 多くの方にマイクラ部があって楽しい弊社を知ってもらうこと
- 副部長として、マイクラ部へ興味を持ってもらうこと
- まだ課題があるので、更なるMOD攻略への手がかりをもらうこと

:::note warn
LLMの学習データや入力ソースの著作権問題は、まだ議論が続いている領域です。
本記事はベストプラクティスを示すものではなく、あくまで一つのLLM活用事例としてご覧ください。
:::

また、本記事ではLLMに記事を執筆させず、
オリジナリティのある内容を自分で書くことを筆者の目的としています[^LLMの記事執筆]。

[^LLMの記事執筆]: 最近読んだ記事に影響されています：
    <https://zenn.dev/watany/articles/ad14f8a352d62f>
    <https://anond.hatelabo.jp/20251208081455>
    これらの思想を押し付けたいわけではありません。

***

# 汎用LLM：ChatGPTなど

いまLLMを活用して調査するなら、まずChatGPTなど汎用LLMを活用して検索するでしょう。
MinecraftのMOD攻略でも同様に、これらは強力な味方になります。

## MOD攻略法：メジャーMODとアイデア出し

学習データの多いメジャーなMODや、Minecraftの仕様を踏まえたMOD攻略において、
汎用LLMは**ある程度までは**力を発揮することができます。

- メジャーなMODの基本情報
  - Createなどの有名MODなら、風車の作り方などの基本的な質問は正確に回答
    <https://chatgpt.com/share/692ec506-d060-800f-81d7-4c5646898ffb>
- アイデア出し
  - MODリストを渡すことで、MODの特徴を使って、装飾や自動化のアイデアを提供
    <https://chatgpt.com/share/692ee68b-e414-800f-95c6-92cff86fe0ec>

## 課題：ハルシネーション

しかし、マイナーなMODや具体的なレシピの話になると、
ありもしないアイテムや仕様を述べるなど、
もっともらしく嘘をつく（ハルシネーション）ことがあります。

<https://www.nri.com/jp/knowledge/glossary/hallucination.html>

汎用LLMは確率的にありそうな文章を生成しているだけで、
仕様を参照して回答しているわけではありません。
厳密な手順が必要であるところでは致命的な問題です。

たとえば、Goetyにおける呪われた鉄の作り方を聞いてみましょう：

<https://chatgpt.com/share/692eed6c-481c-800f-988e-be5bd82cd3b0>

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/7f400855-d5b7-498e-97fd-d93725f744b9.png)

添削する気にもなりません。前提から間違っています。
ここでは祭壇を使いませんし、存在しないアイテムに言及していますし、
そんなモブはいませんし、ドロップして得るものでもありません。

この大問題を解決するために導入したのが、次に紹介するNotebookLMです。

***

# NotebookLM

本記事の肝です。

汎用LLMが「広大なネットの海からそれっぽい答えを探す」のに対し、
NotebookLMは「手元の攻略本だけを徹底的に読み込ませる」アプローチです。
そのおかげで、正確な情報をLLMから得ることができます。

<https://notebooklm.google/>

メリデメは以下の通りです：

- メリット
  - ハルシネーションしにくい
  - 情報ソースを限定できるので、自身の環境にあった情報のみに限定できる
    - MODはバージョンによって動作の異なる場合が多いため、この限定は非常に有効
  - YouTube動画からの情報取得に強い
    - 外国語の動画を翻訳してくれてありがたい
    - 動画では実際の操作についての説明に強い
  - 前提のプロンプトが減るため、質問しやすい
  - 共有しやすい
    - ノートブック[^ノートブックとは]を共有することで、複数の固定メモも同時に共有できる
- デメリット
  - 手動で情報ソースを入力する必要がある
  - 翻訳が甘い
    - 「Necro Brazier」が「ネクロブラジエ」になるなど
  - 曖昧な質問に弱い
    - 「最強の方法」などを聞いてもNotebookLMは考えてくれない
    - ただし、スタートガイドなどのMOD内の関係には強い

[^ノートブックとは]: NotebookLMにおけるプロジェクト、あるいはソースのコレクションのことです。
    <https://support.google.com/notebooklm/answer/16206563?hl=ja>

NotebookLMを活用する場合、質の良いソースを集めることが大事です。
そこでまず、各MODのWikiを効率よく取り込む方法を考えてみましょう。

## Wikiの使用

MODにはしばしばWikiがあります。
基本的にWikiを読めば解決しますが、以下の問題があります：

- 英語の長文で書かれていることが多い
- やりたいことからの逆引きができない
- 複数ページを行き来して情報を統合する必要がある

これらの問題は、WikiをNotebookLMに読み込ませることで解決できます。
ただ質問すれば、複数ページの情報を統合して日本語で回答してくれるのです。

:::note warn
Wikiは著作権保護されている場合があります。
また、表記が無い限り、All Rights Reservedです。
不特定多数への公開は避けましょう。
:::

WikiをNotebookLMに取り込むには、配下ページのリンクが必要です。
それにはサイトマップが便利でしょう。

サイトマップとは、Webサイトの全ページURLを一覧化したXMLファイルのことで、
SEO用に用意されていることが多く、`/sitemap.xml` で取得できることが多いです。

<https://www.google.com/sitemap.xml>

サイトマップが提供されないページはXML-Sitemapsを使用できます。
XML-Sitemapsは、URLからサイトマップを生成するツールです。

<https://www.xml-sitemaps.com/>

サイトマップXMLからURLのみを取得するには、Googleスプレッドシートを活用できます：

```plaintext
=IMPORTXML("{URL}", "//*[local-name()='loc']")
```

このようにして作成したGoetyのノートブックに聞いてみましょう：

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/779793a5-ee78-4cf2-a278-fbfdefe9ead1.png)

呪われた鉄の作り方を説明するだけでなく、上級アイテムにも触れています：

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/a5b00431-b323-41cf-bbfc-7d8fccb06424.png)

## MOD内ドキュメントの使用

一部のMODでは、MOD内ドキュメントの方が、
ネット情報よりも充実している場合があります。

:::note warn
MODのライセンスはオープンな場合が多いですが、
念のため再度確認するようにしましょう。
:::

たとえば音声説明付き動画なら、録画してYouTubeに限定公開で登録、
画像なら、撮影してOCRなどで文字起こしして登録、ができるでしょう。

そしてもし以下のEmbers Rekindledのように、
ドキュメントがテキストで存在するなら、最高のソースになります：

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/36115af5-94b5-43d3-80da-83d2feb2478e.png)

jarファイル内の `assets/{modname}/lang/` 配下にテキスト用のJSONがあります。
内容をコピーして、そのままソースに追加すると学習されます。

MOD内ドキュメントのソース追加前は、対象のアイテムについては触れられず、
関連するアイテムについて説明していましたが：

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/1c80670e-71b6-4979-9003-d97bfd018b33.png)

ソース追加後は、追加内容をもとに、対象のアイテムについて、
効果の説明だけでなく、フレーバーにも触れています：

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/41de83a1-3387-49ad-b5f2-56a0810c5b90.png)

***

# さいごに

**結論：
正確にMODの攻略情報を取得するにはNotebookLMが便利で、
Wikiを取り込むにはサイトマップを、
ゲーム内ドキュメントを取り込むにはjarを使用できるけど、
ノートブック公開の際はライセンスなどに注意しよう！**

## 展望

~~部内では共有しており、だれにも使われていないようですが（大泣）~~
ノートブックを共有することで、以下のような活用方法があるでしょう：

- 新規参入者のオンボーディング作成
- 不具合・トラブルシューティング集の作成

他にもNotebookLMや他ツールを使ったMOD攻略の知見や、
おすすめワークフローがあれば、コメントなどで教えていただけると嬉しいです。

## NotebookLM機能で広報

「MOD攻略」は情報を主体的に理解する目的でしたが、
情報を多くの方に理解してもらう「社内広報」でもNotebookLMを活用できました！

NotebookLMには、ソースを活用して画像などを作成する機能があります。
年始に社内でイベントを企画したところ、部員がNotebookLMを活用して
ポスターのようなインフォグラフィック[^インフォグラフィック]を作成してくれました！

[^インフォグラフィック]: インフォグラフィックとは、ソースの情報を１枚の画像にまとめるものです：
    <https://support.google.com/notebooklm/answer/16758265>

![unnamed.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/df248565-6f6e-4f51-88dc-064564b64e2b.png)

社内向けに書いていた広報文や使用するマップの情報を用いることで、
Minecraftらしいデザインで完結に情報をまとめてくれました！

一部漢字の乱れはありますが、手で修正して社内に共有しました！
これができるNotebookLM、作成・修正してくれた部員、本当にすごい！
ありがとうございます！！！！！

## ぜひマイクラ部へ！

興味を持ったそこのあなた！一緒にMODマイクラしませんか？
ノートブックも共有するので、攻略には困りません（たぶん）

## 注記
