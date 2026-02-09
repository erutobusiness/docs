---
marp: true
theme: default
paginate: true
backgroundColor: #1a1a2e
color: #eaeaea
style: |
  section {
    font-family: 'Noto Sans JP', 'Hiragino Sans', sans-serif;
    padding: 40px 60px;
  }
  section.lead {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  h1 {
    color: #ffd700;
    text-align: center;
  }
  h2 {
    color: #00d4ff;
    border-bottom: 2px solid #00d4ff;
    padding-bottom: 0.3em;
  }
  h3 {
    color: #00d4ff;
  }
  strong {
    color: #ff6b6b;
  }
  blockquote {
    border-left: 4px solid #ffd700;
    background: rgba(255, 215, 0, 0.1);
    padding: 0.5em 1em;
    font-style: italic;
    margin: 1em auto;
    max-width: 80%;
  }
  table {
    font-size: 0.75em;
    display: table;
    width: auto !important;
    max-width: 95%;
    margin-left: auto !important;
    margin-right: auto !important;
    border-collapse: collapse;
    background: transparent !important;
  }
  th {
    background: #16213e !important;
    color: #ffd700 !important;
    border: 1px solid #00d4ff !important;
    padding: 0.4em 0.8em;
    text-align: center;
  }
  td {
    background: #1a1a2e !important;
    color: #eaeaea !important;
    border: 1px solid #444 !important;
    padding: 0.4em 0.8em;
    text-align: center;
  }
  tr:nth-child(even) td {
    background: #16213e !important;
  }
  .note {
    font-size: 0.8em;
    background: rgba(0, 212, 255, 0.1);
    border-left: 3px solid #00d4ff;
    padding: 0.5em 1em;
    margin: 0.5em 0;
  }
---

<!-- _class: lead -->

# 📖 コンテキスト（文脈）の重要性

**「空気を読む」力は、対戦やエンジニアリングで武器になる**

***

## コンテキストとは？

> 物事の**背景や状況**のこと。同じ行動でも、状況によって意味が変わる。

### Baby Cupでコンテキストが重要な理由

- **4人対戦**という形式
- **リアルタイムで変化するメタゲーム**
- **極端に制限された種族値**（300以下）

エンジニアリングも同様：技術選定・設計・運用はすべて**状況依存**

***

## 対応関係まとめ

|ポケモン対戦（Baby Cup）|エンジニアリング|
|-|-|
|メタゲーム（流行）|技術トレンド・業界動向|
|4人対戦のヘイト管理|複数チーム間の利害調整|
|種族値制限|予算・技術的制約|
|対戦ごとのパーティ変更|スプリントごとの改善|
|プレイヤー間の認識齟齬|ドキュメント不足・暗黙知|

***

<!-- _class: lead -->

# 🎮 具体例①

## 4人対戦特有の「ヘイト管理」

***

## ヘイト管理とは？

### ポケモン対戦での例

1対1ではなく**4人同時**に戦うため、「**誰が誰を狙っているか**」が重要

- 狙われないよう立ち回りつつ、削れた相手を横から倒す「**漁夫の利**」
- 独走するプレイヤーは、他3人から集中攻撃される

> 「みんなでボろうぜ」と点数トップを狙う場面も

***

## エンジニアリングでの対応

### マルチステークホルダー環境と同じ

- 複数チーム・複数部署の利害調整
- 「目立ちすぎる」とリソース争奪の標的に
- **政治的な立ち回り**も技術力のうち

> 「全方位から攻められないポジション取り」は、社内調整でも重要

***

<!-- _class: lead -->

# 🔄 具体例②

## 10回戦で進化する「メタゲーム」

***

## メタゲームの進化

### ポケモン対戦での例

全10戦、1戦ごとにパーティ変更可能。
**前の試合の文脈**に合わせて調整

- **タイプの補完**: 電気タイプが暴れたら → 次は地面を2枚投入
- **強者への対策**: フカマル（環境の主人公）→ ユキワラシで対抗

### エンジニアリングでの対応

- 市場の技術トレンドへの追従
- 競合の動向を見て機能追加
- 「前回のスプリントで何が問題だったか」→ 次に活かす

***

<!-- _class: lead -->

# ⚖️ 具体例③

## 制約下での相対的価値

***

## 制約が価値を変える

### ポケモン対戦での例

種族値300以下という制限で、**通常とは技の価値が変わる**

- **必中技の価値上昇**: ムンナの「必中サイコキネシス」
- **意外な技が刺さる**: ヤヤコマの「そらをとぶ」で地面技を透かす

### エンジニアリングでの対応

- 予算制限があるときの**OSS**活用
- レガシー環境で動く技術の選定
- ハイスペック環境では見向きもされないツールが**制約下で最適解**に

> 💡 OSS = 無料で使える公開ソフトウェア

***

<!-- _class: lead -->

# 🤔 具体例④

## 知識と勘違いがもたらす影響

***

## 認識のズレが結果を変える

### ポケモン対戦での例

- **タイプ相性の誤認**: ヤヤコマにゴースト技を打ち続ける
  - 「ファイアローの進化前だから」という思い込み
  - 実際はノーマル・ひこうタイプ → ゴースト無効

### エンジニアリングでの対応

- 古い仕様書を信じて実装 → 動かない
- 「みんな知ってるはず」が実は誰も知らない
- チームメンバー間の認識齟齬がバグを生む

> 「なんでこの実装になってるの？」→ 前任者しか知らない暗黙知

***

<!-- _class: lead -->

# 🏃 具体例⑤

## 理論と実運用のギャップ

***

## 動かせることと運用できることは別

### ポケモン対戦での例

数値上の強さだけでなく、**実際の「動かしやすさ」**も重要

- タマゲタケ：「移動が遅い」→ 乱戦で運用困難
- 種族値や技が良くても、実戦では動かせないことがある

### エンジニアリングでの対応

- ベンチマークでは高性能でも、実環境で使いづらいツール
- 「スペックは良いが、オペレーションが煩雑」
- **運用負荷を考慮した**技術選定が重要

***

## まとめ：多層的なコンテキストを読む力

Baby Cupで勝つために必要なのは、**多層的なコンテキストを読む力**

1. **今の環境で何が流行っているか**（メタ読み）
2. **誰がポイントを稼いでいるか**（競合分析）
3. **この制約で何が有効か**（制約理解）

これはエンジニアリングでも同じ

***

<!-- _class: lead -->

<!-- _backgroundColor: #0f0f23 -->

# 💡 Key Takeaway

## 「技術力」だけでなく「状況判断力」が問われる

> コンテキストを無視した技術選定は、
> メタ無視で好きなポケモンを使うのと同じ。
> 勝てないわけじゃないけど、効率悪い。
