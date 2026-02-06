# ゲームメカニクス・概念集

このドキュメントでは、ゲームデザインにおける重要なメカニクスや概念、ジャンルの分類についてまとめまる。

## パーマデス (Permadeath)

### 定義

Permanent Death（恒久的な死）の略。
プレイヤーキャラクターが死亡した際、復活や直前のセーブポイントからのやり直しができず、そのキャラクターや進行状況を永久に失うシステム。

### 主な分類と実装パターン

|分類|説明|代表的な例|
|:-|:-|:-|
|**完全なパーマデス (Hardcore)**|死亡するとセーブデータごとそのプレイが消失し、最初からやり直しとなる、最も厳しい形式|*Minecraft (Hardcore Mode)*, *The Long Dark*|
|**ローグライク (Roguelike)**|プレイごとのランダム生成とパーマデスがセット。伝統的には進行状況を一切持ち越さない|*NetHack*, *Rogue*|
|**ローグライト (Roguelite)**|パーマデスはあるが、死亡しても一部のリソースやアンロック要素（メタプログレッション）を次回のプレイに持ち越せる、現代的な主流|*Hades*, *Dead Cells*, *Vampire Survivors*|
|**キャラクターロスト (Character Loss)**|ユニットや仲間キャラクター個別に死が適用される。ゲーム自体の進行は続くが、育てた仲間は戻らない|*Fire Emblem* (Classic), *XCOM*, *Darkest Dungeon*|
|**リソース/装備ロスト (Extraction)**|キャラクター自体は残ることもあるが、死亡時にそのセッションで保持していた装備やアイテムを全てその場に落とし、失う|*Escape from Tarkov*, *Hunt: Showdown*, *Minecraft (Normal)*|
|**セーブデータ削除 (Meta/Narrative)**|物語上の演出や選択として、システム側が意図的にセーブデータを削除する特殊な形式|*NieR: Automata*, *Undertale* (一部ルート)|

### デザインの意図

- **緊張感の創出**: 「失敗したら全て終わり」というプレッシャーが、プレイヤーに慎重かつ戦略的な判断を強制する
- **リプレイ性の向上**: 何度もやり直すことを前提とし、学習によるプレイヤー自身のスキル向上（Player Skill Progression）を重視する

***

## ゲームジャンルの分類 (メカニクス視点)

ゲームのジャンルは「雰囲気」や「物語」ではなく、「プレイヤーが何をするか（Core Mechanics / Interaction）」によって分類されることが多い。

### アクション (Action)

**コアメカニクス**: タイミング・正確な操作・反射神経などの、物理的な課題の克服。

- **Platformer**: ジャンプ、移動による地形の走破 (*Super Mario*)
- **Shooter (FPS/TPS)**: 遠距離からの照準合わせと射撃 (*Call of Duty*, *Splatoon*)
- **Fighting**: 近接戦闘、コマンド入力、読み合い (*Street Fighter*)
- **Stealth**: 敵の視界を避ける、隠れる (*Metal Gear Solid*)

### ストラテジー (Strategy)

**コアメカニクス**: 計画、リソース管理、戦術的判断。

- **RTS (Real-Time)**: 時間経過と共に変化する戦況への即応 (*StarCraft*)
- **TBS (Turn-Based)**: 熟考し、最適な一手を打つ将棋的な思考 (*Civilization*)
- **MOBA**: アクションとRTSの融合、個の操作と全体の戦術 (*League of Legends*)

### ロールプレイング (RPG)

**コアメカニクス**: 成長（Progression）・能力値管理・役割の実演。

- 経験値によるレベルアップ、スキルツリーの選択、装備の更新による数値的な強さの向上が主軸

### アドベンチャー (Adventure)

**コアメカニクス**: 探索、パズル解決、物語の進行。

- アクション要素が薄く、環境への働きかけや謎解きが中心

### シミュレーション (Simulation)

**コアメカニクス**: 現実世界の事象やシステムの模倣・再現。

- **Management**: 経営、都市建設 (*SimCity*)
- **Life Sim**: 生活体験 (*The Sims*, *Animal Crossing*)
- **Vehicle Sim**: 操縦体験 (*Gran Turismo*, *Flight Simulator*)

### 複合ジャンル (Hybrid Genres)

現代のゲームの多くは複数のジャンルを融合している：

- **Action RPG**: アクションの操作性とRPGの成長要素の融合 (*Dark Souls*, *Monster Hunter*)
- **Metroidvania**: Platformerの探索とAction RPGの能力獲得による行動範囲拡大 (*Hollow Knight*)
- **Battle Royale**: Survival（探索・収集）とShooter（戦闘）とLast Man Standingルールの融合 (*Fortnite*, *Apex Legends*)
