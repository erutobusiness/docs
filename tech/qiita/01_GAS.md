---
title: 【営業さんも学べる】一方通行「スプレッドシートにアドオンを追加する程度の能力だァ……?」【GAS】
tags: GoogleAppsScript GAS spreadsheet 初心者向け 営業でもできる
author: nyarlathotep
created_at: "2023-12-03"
updated_at: "2023-12-03"
id: 67278bcd66275caea9e3
organization_url_name: visionary-jp
slide: false
ignorePublish: false
---

# 0. <ruby><rb>自己紹介</rb> <rt>イントロダクション</rt></ruby>

<https://github.com/MathExpansion/MathExpansion>

<ruby><rb>Google Sheets</rb><rt>スプレッドシート</rt></ruby> にデータ分析を行う<ruby><rb>数式</rb><rt>アルゴリズム</rt></ruby>の<ruby><rb>拡張機能</rb><rt>アドオン</rt></ruby>を組み込む、だァ……？
おもしれープロジェクトだなァ
ふーン、 <ruby><rb>GAS</rb><rt>ガス</rt></ruby> って技術で実装してンのか スゲェスゲェ

そーいやァ、自己紹介がまだだったな <ruby><rb>一方通行</rb><rt>アクセラレータ</rt></ruby>
学園都市にいる7人の<ruby><rb>超能力者</rb><rt>レベル5</rt></ruby>の第1位だ
今回はアドベントカレンダーの3日目をつとめることとなった

|<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/472c57cc-edf4-54c8-a8ed-33bedce4d8cc.png" alt="Novel AI で生成した一方通行" width="50%" />|
|:-:|
|図0 <ruby><rb>一方通行</rb><rt>アクセラレータ</rt></ruby>を知らない人に向けた <br /> Novel AI で生成した<ruby><rb>一方通行</rb><rt>アクセラレータ</rt></ruby>のイメージ|

今回は特別に、 <ruby><rb>GAS</rb><rt>ガス</rt></ruby> を使って各種サービスと連携する方法を教えてやンよォ
コーディング経験の無い営業さンにも分かるように、なるべく丁寧に解説するつもりだから感謝しろォ

まずは <ruby><rb>GAS</rb><rt>ガス</rt></ruby> について知らなきゃいけねェから説明してくぞ
覚悟は……出来てンだろうなァ

<details>
    <summary>
        <ruby><rb>免責事項</rb><rt>ゆるして</rt></ruby>
    </summary>

:::note warn

- <ruby><rb>一方通行</rb><rt>アクセラレータ</rt></ruby>と本記事の関係について
  - 「とある」シリーズ作品のキャラクターである<ruby><rb>一方通行</rb><rt>アクセラレータ</rt></ruby>と弊社とは一切関係ございません
  - <ruby><rb>一方通行</rb><rt>アクセラレータ</rt></ruby>および「とある」シリーズ作品のイメージを傷つけるつもりは一切ございません
  - 本記事は<ruby><rb>一方通行</rb><rt>アクセラレータ</rt></ruby>の視点で説明していますが、<ruby><rb>一方通行</rb><rt>アクセラレータ</rt></ruby>が作品内で <ruby><rb>GAS</rb><rt>ガス</rt></ruby> について調べることはありません
  - 本記事における<ruby><rb>一方通行</rb><rt>アクセラレータ</rt></ruby>の発言は創作であり、公式の見解や声明とは無関係です
- 記事の内容とスタイルについて
  - <ruby><rb>一方通行</rb><rt>アクセラレータ</rt></ruby>の視点で説明することは、読者が楽しく読むための工夫であり、筆者の趣味でもあります
  - この記事は筆者の個人的な興味に基づいており、エンターテインメントとして楽しんでいただけると幸いです
  - <ruby><rb>一方通行</rb><rt>アクセラレータ</rt></ruby>の口調で話すために、失礼ともとれる発言を繰り返すことがありますが、誰かを傷つけるつもりのものではございません
- キャラクター解釈と情報の正確性に関する注意
  - 作品における特定の期間に限定せずに、また複数の作品からセリフを参照しているため、キャラクターがブレています
  - キャラクターの解釈には筆者独自の視点が含まれていることをご注意ください
  - 本記事は情報の正確性を確保するために多数の記事を参考にしていますが、情報に誤りがある可能性があるため、正確な情報を得るためには他の情報も参照することを推奨します

:::

</details>

# 1. <ruby><rb>G.A.S.</rb> <rt>Google Apps Script</rt></ruby>

サービスについて知りてェなら、公式のドキュメントを確認するのが鉄板だなァ
公式ページには以下の紹介があンぞ：

<https://workspace.google.co.jp/products/apps-script/>

> Apps Script は、Google Workspace の統合、自動化、拡張のためのビジネス ソリューションをすばやく簡単に構築するための唯一のローコード プラットフォームです。
> Apps Script を使えば、ビジネス ユーザーは本格的なソフトウェア開発の経験がなくても、Google Workspace 上にカスタム ソリューションを構築できます。
> Apps Script は、Gmail アカウントをお持ちであればどなたでもご利用いただけます。

要は、Google のサービスを自動化・拡張するために使用する、プログラミング環境およびスクリプト言語ってなワケだ
これにより、俺らはカスタム API の作成、データベースのような機能の実装、ウェブアプリケーションの開発などを行うことができる

<https://qiita.com/iconss/items/3db0761bb4cfe1422a6e>

この "Apps Script" の前に "Google" をつけることで Google が提供するスクリプト環境であることを明示して「Google Apps Script」と呼ぶ
ただ、これだと口頭で呼ぶには長ェから、その略称として <ruby><rb>GAS</rb><rt>ガス</rt></ruby> と言うことが多いがなァ

<https://uncle-gas.com/what-is-google-apps-script/>

他にも、他の言語と比べて以下のメリットがあり、未経験者だけでなくプログラミング初学者にもオススメできるぜ：

- プロジェクトの作成が容易で、とっつきやすい
- 直感敵な開発環境で実行しやすく、運用しやすい
- 身近なサービスに反映できるため、成果がわかりやすい

また、言語のベースが JavaScript になっているのも、学習しやすくてイイよなァ

初学者に向けた詳しい説明は、以下の先行記事を参照しな：

<https://qiita.com/massa-potato/items/2db4cd27f8e8dc4c3f97>

<ruby>GAS<rt>ガス</rt></ruby> についての説明はこれくらいにして、お楽しみの実装に移っていこうじゃねェか

# 2. <ruby><rb>環境構築</rb> <rt>セットアップ</rt></ruby>

実装してェなら以下の <ruby>GAS<rt>ガス</rt></ruby> ページにアクセスしてプロジェクトを作成すりゃいい：

<https://script.google.com/home>

ただ、この章では簡単に動作を確認するために、 <ruby><rb>Google Sheets</rb><rt>スプレッドシート</rt></ruby> に紐付けた状態でプロジェクトを作成する方法を採る
以下にアクセスし、いつも通り空白のスプレッドシートを開いておけ：

<https://docs.google.com/spreadsheets/>

次に、以下のように拡張機能欄から Apps Script をクリックしろ：

|<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/3f47143e-b7f1-d776-9ed4-7e2c8c07bab7.png" alt="Google Sheets から GAS へのアクセス方法" width="75%" />|
|:-:|
|図1 <ruby><rb>Google Sheets</rb><rt>スプレッドシート</rt></ruby> から <ruby><rb>GAS</rb><rt>ガス</rt></ruby> へのアクセス方法|

別タブで <ruby><rb>GAS</rb><rt>ガス</rt></ruby> が開かれるはずだ <ruby><rb>GAS</rb><rt>ガス</rt></ruby> にアクセスすると、デフォでエディタがある
加えて、以下のように無題のプロジェクトに `コード.gs` があるはずだ：

|<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/a0c060e6-0cc1-6b49-da80-3717ef149e70.png" alt="GAS アクセス直後の画面" width="75%" />|
|:-:|
|図2 <ruby><rb>GAS</rb><rt>ガス</rt></ruby> アクセス直後の画面|

その部分を以下に書き換えてやれ：

```javascript:コード.gs
function myFunction() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]; // アクティブなスプレッドシートの最初のシートを取得
  sheet.getRange('A1').setValue('Hello World!');                      // A1セルにテキストをセット
}
```

|<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/b3b3e538-0052-785f-8e9b-1bf551bdd2d3.png" alt="GAS プログラム記載後" width="75%" />|
|:-:|
|図3 <ruby><rb>GAS</rb><rt>ガス</rt></ruby> プログラム記載後|

そンで実行ボタンを押すと、実行ログが開く
初めての実行の場合には、未だ実行はされず、以下のように権限を求められるはずだ：

|<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/f65de733-a39e-d1aa-c5cd-0d3587f6f240.png" alt="GAS 権限確認モーダル" width="75%" />|
|:-:|
|図4 <ruby><rb>GAS</rb><rt>ガス</rt></ruby> 権限確認モーダル|

これは必要な権限が変わるごとに求められる
世話のやける野郎だが、毎回確認してやるンだな
承認すると実行され、以下のようにログが更新されるはずだ：

|<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/963fe381-9dd0-e545-8580-4672ed17bf38.png" alt="GAS 実行後" width="75%" />|
|:-:|
|図5 <ruby><rb>GAS</rb><rt>ガス</rt></ruby> 実行後|

実行ログで実行完了と表示されたら先程の <ruby><rb>Google Sheets</rb><rt>スプレッドシート</rt></ruby> を確認してやれ
以下のように A1 セルに Hello World! と表示されているはずだ：

|<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/daa3a181-a645-44b1-3126-daf73f344292.png" alt="Google Sheets 実行後" width="75%" />|
|:-:|
|図6 <ruby><rb>Google Sheets</rb><rt>スプレッドシート</rt></ruby> 実行後|

はじめてのプログラム実装と実行なンだとしたら、おめでてェ野郎だ
これでオマエも『エンジニア』の仲間入りだ

オマエをさらなる高みへ連れて行くために、次の章からは更に高度な機能について紹介する
以降の実装についても、いま作成したプロジェクトで実装して問題ねェから安心しろォ
だが、説明なしに専門用語を使用するから覚悟しなァ……

**悪りィが、こっから先は玄人向けだ**
後戻りは禁止ってなァ！大人しく腹ァ決めてさっさと次の章に進みやがれェ！！

# 3. <ruby><rb>主な機能</rb> <rt>フィーチャー</rt></ruby>

Google の各種サービスと連携する他にも、以下の主な機能もある：

- 指定した時間や条件で実行するトリガー機能
- 外部 API との連携機能
- ウェブスクレイピング
- 各種デプロイ
  - ウェブアプリ
  - 実行可能 API
  - アドオン
  - ライブラリ

上2つについて、それぞれ営業に向けた使用用途を考えた
また、下2つについては、それぞれ面白い使用例を見つけた
様々な使用方法を見ておくことで、自分なら GAS をどう使えるかが見えてくるはずだ
それに、プログラムの書き方などでも参考になるはずだ

## 3.1. トリガー

~~ニュージェネのウルトラマンのことじゃねェぞ
ちなみにブレーザーは最高に面白いぞ、カッコイイし~~

トリガーでは、指定した時間や条件でスクリプトを自動実行できる
以下では、メールを定期的に確認して、未読の「資料請求」メールに対して自動返信する：

```javascript:emailAutoReply.gs
function replyToEmails() {
  var threads = GmailApp.search('subject:"資料請求" is:unread'); // 件名に「資料請求」を含む未読のメールを取得
  for (var i = 0; i < threads.length; i++) {                    // 各スレッド（メールスレッド）について処理
    var messages = threads[i].getMessages();                    // 全メッセージを取得
    for (var j = 0; j < messages.length; j++) {                 // 各メッセージについて処理
      var message = messages[j];                                // メッセージを取得
      var replyBody =
          'お問い合わせいただきありがとうございます。\n\n' +
          '資料を添付いたしますので、ご確認ください。\n\n' +
          'ご不明な点がございましたら、お気軽にご連絡ください。';    // 自動返信のメール本文を作成
      var subject = 'Re: ' + message.getSubject();              // 件名に「Re:」を追加して返信の件名を作成
      message.reply(replyBody, {                                // 返信を送信する
        subject: subject,
        // attachments: [DriveApp.getFileById('FileID').getAs(MimeType.PDF)] // 添付ファイルを追加できる
      });
      message.markRead();                                       // メッセージを既読にする
    }
  }
}
```

トリガーを設定するには、以下の画像にあるように <ruby><rb>GAS</rb><rt>ガス</rt></ruby> のサイドメニューからトリガー画面に移動して、「トリガーを追加」ボタンより当該のトリガーを設定する：

|<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/5d7cee72-31a5-2236-18d7-393eb2c54358.png" alt="GAS サイドメニュー" width="75%" />|
|:-:|
|図7 <ruby><rb>GAS</rb><rt>ガス</rt></ruby> サイドメニュー|

ここで設定する項目は以下だ：

|変更対象|設定値|
|-|-|
|実行する関数|replyToEmails|
|イベントのソース|時間主導型|
|時間ベースのトリガーのタイプ|分ベースのタイマー|
|時間の間隔を洗濯（分）|1 分おき|

|<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/f75930bb-2cfc-ea19-e4f6-f133905eb6d0.png" alt="GAS トリガー追加画面" width="75%" />|
|:-:|
|図8 <ruby><rb>GAS</rb><rt>ガス</rt></ruby> トリガー追加画面|

試しに Gmail でメールを送信してみな

|<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/3b16068c-fa31-a88b-89c3-684a81f3b5f4.png" alt="Gmail 送信画面" width="50%" />|
|:-:|
|図9 Gmail 送信画面|

メールを自動返信するはずだ

|<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3534741/fbc35b38-4bab-2b55-1d55-25450485c84e.png" alt="Gmail 受信画面" width="50%" />|
|:-:|
|図10 Gmail 受信画面|

用が済んだら、トリガーは消しておくンだな

## 3.2. 外部 API 連携

あとは、外部の API との連携も可能だから、色んなサービスとの連携も夢じゃねェ
Bot を介して Slack に投稿する方法を紹介すンぞ

Bot を作成するには、 Slack Workspace 内に App を作成して Incoming Webhooks を設定する必要がある
自分で作成するには以下を参考にするとイイぜェ：

<https://qiita.com/miriwo/items/cbb4b37b3f5abecc835f>

コードは以下のようにしな：

```javascript:slack.gs
function postMessageToSlack() {
  var webhookUrl = '';                            // SlackのWebhook URL
  var message = '';                               // 投稿したいメッセージ
  var options = {                                 // リクエスト内容
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify({'text': message}) // Slackのメッセージフォーマットに従ってpayloadをJSON形式で作成
  };
  UrlFetchApp.fetch(webhookUrl, options);         // Webhook URLにHTTPリクエストを送信してメッセージを投稿する
}
```

実行すると該当のチャンネルに Bot がメッセージを送信するはずだ

## 3.3. ウェブスクレイピング

立命館大学情報理工学部サイバーセキュリティ研究室の あらい大先生 がウェブスクレイピングを GAS で実装していたから見ておけ
SEIYU のウェブページからセール日を抽出してカレンダーに登録するみてェだ
最高にイカした使い方じゃねェか

<https://cysec.ise.ritsumei.ac.jp/2022/08/08/%E9%80%80%E5%B1%88%E3%81%AA%E3%81%93%E3%81%A8%E3%81%AFgas%E3%81%AB%E3%82%84%E3%82%89%E3%81%9B%E3%82%88%E3%81%86-web%E3%82%B9%E3%82%AF%E3%83%AC%E3%82%A4%E3%83%94%E3%83%B3%E3%82%B0%E7%B7%A8/>

## 3.4. 各種デプロイ

### 3.4.1. ウェブアプリ

神戸大学のプログラミング基礎演習のサイトを見つけた
どうやらこの講義では Chrome 拡張機能を作ったり GAS でウェブアプリや LINE Bot を作ったりするみてェだな

<https://www2.kobe-u.ac.jp/~tnishida/programming/>

ウェブアプリでは スプレッドシート をデータベースのように扱って、 GAS でそれを含む HTML 文書を返すみてェだな
これもイカしてやがンぜ

### 3.4.2. 実行可能 API

主に見かけるデプロイ方式はウェブアプリかこの実行可能 API になるだろう
ユーザーが、ブラウザを通じて対話的に利用する場合は前者を、他のアプリなどから呼び出す場合はこの後者になるはずだ

GMOインターネットグループ株式会社のグループ研究開発本部では、 Google Form のデータ CSV を生成するところで GAS を使っているみてェだな

<https://recruit.gmo.jp/engineer/jisedai/blog/run-gasscript-via-api/>

API がサービスと連携する場合は OAuth を使用することになるはずだから、その辺の理解も深めておく必要があるなァ……

### 3.4.3. アドオン

Google Workspace のアプリケーションに機能を追加するものになる
作業効率を向上するためのカスタムツールや機能の追加に使うことになるはずだ

アドオンでは他の方式とは異なり、先駆者や使用用途を明示した記事の割合が減っているように感じるなァ
もちろんアドオンでは、イントロで紹介したプロジェクトを紹介するぜ

<https://github.com/MathExpansion/MathExpansion>

このプロジェクトは Public リポジトリなので、オマエラも参加することができる
興味のあるヤツは参加してみるとイイんじゃねェか？

### 3.4.4. ライブラリ

再利用可能なコードを集めて、他のプロジェクトに共有するためのものだ
これらは実際によく使われるものが大いに参考になるだろう

<https://auto-worker.com/blog/?p=643>

# 4. <ruby><rb>制限事項</rb> <rt>リミテーション</rt></ruby>

しかし、天下の <ruby><rb>GAS</rb><rt>ガス</rt></ruby> も『無敵』ってわけじゃねえ
以下のような制限もあるから、それには気をつけろ：

- 実行時間や実行回数に制限がある
- npm を介したモジュールを使用できない

大規模なモンを作る場合は、これらの制限を考慮に入れる必要があンぞ

前者などの数値的な制限については以下の公式ドキュメントを参照すると良い：

<https://developers.google.com/apps-script/guides/services/quotas?hl=ja#current_limitations>

後者である npm モジュールを使用できない制限は、外部のライブラリを使用したいエンジニアには大きな問題だなァ
ただこれは、次の方法により解決することができる

## 4.1. clasp の使用

GAS で npm モジュールを使用するには、 GAS を CLI で操作する Google 公式 OSS ツールの clasp を使用する
これにより、 GAS のコードをローカルマシンで開発できるようになる
そうすると、開発効率も上がるし、各種モジュールを使用できるようになるってワケだ

<https://github.com/google/clasp>

実際に、最初に紹介したプロジェクトでもその方法が用いられている
複数人で GAS のコードを管理したい場合には現状では最適な方法となっているので、把握しておくンだな

<https://qiita.com/suzukenz/items/dbe13d5f8884752a37f8>

# 5. <ruby><rb>まとめ</rb> <rt>ラストオーダー</rt></ruby>

じゃあ、最後に簡単にまとめてやる
GAS は、 Google のアプリケーションを自動化・拡張するための便利なツールだ
学習コストも低い方なので、是非使ってみるといい

ただ、こンなンじゃァオマエラは満足しねェよなァ……
そこで、もっと具体的な実用例を考えてみることにした
実際には使用するオマエラが考えることだが、よかったら次章のアイデアも参考にしな

# 6. <ruby><rb>神ならぬ身にて天上の意思に辿り着くもの</rb> <rt>S Y S T E M</rt></ruby>

ここでは GAS のイカした使い方を考えていくが、 GAS は昔からあるもので、だいたいの案は出尽くしてる
ただ今は GPTs の Custom Actions が出たばかりで、これを活用することで更にイカしたモンがつくれるハズだ
そこで、 GAS と GPT をかけあわせたモンを考えてみンぞ
オマエラも考えてみると良い

~~ハッキリ言ってもう疲れ切ってる
こっから先は妄想の垂れ流しだ~~

## 6.1. GPTs と連携して Gmail をチャットボットが返信

GPTs に Knowledge で自社の情報を与え、 Custom Actions を使って会話できるようにして、 Gmail でメールが来たらチャットボットが応対するようにできるはずだ
具体的な返信対象のメールなどは考える必要があるが、アイデアとしてはイカしてるだろ？

<https://qiita.com/iconss/items/3db0761bb4cfe1422a6e>

調べたら、既に試しているヤツもいるらしいな
俺らも負けてらンねェな

<https://www.udemy.com/course/chatgpt-gmail/>

## 6.2. スプレッドシートを参照した GPT Bot

GAS でスプレッドシートにある FAQ データにアクセス
GPT モデルでユーザーからの質問に回答する

## 6.3. GPT により Gmail 内容要約ツール

GAS で Gmail や Google ドライブ内の文書を読み込む
GPT を使用して内容を要約し、要約されたテキストをスプレッドシートに保管してレポートや分析に使用する
