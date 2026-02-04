# ゲームメカニクス・概念集

このドキュメントでは、ゲームデザインにおける重要なメカニクスや概念、ジャンルの分類についてまとめまる。

## パーマデス (Permadeath)

### 定義

Permanent Death（恒久的な死）の略。
プレイヤーキャラクターが死亡した際、復活や直前のセーブポイントからのやり直しができず、そのキャラクターや進行状況を永久に失うシステム。

### 主な分類と実装パターン

| 分類                                    | 説明                                                                                                                         | 代表的な例                                                   |
| :-------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| **完全なパーマデス (Hardcore)**         | 死亡するとセーブデータごとそのプレイが消失し、最初からやり直しとなる、最も厳しい形式                                         | _Minecraft (Hardcore Mode)_, _The Long Dark_                 |
| **ローグライク (Roguelike)**            | プレイごとのランダム生成とパーマデスがセット。伝統的には進行状況を一切持ち越さない                                           | _NetHack_, _Rogue_                                           |
| **ローグライト (Roguelite)**            | パーマデスはあるが、死亡しても一部のリソースやアンロック要素（メタプログレッション）を次回のプレイに持ち越せる、現代的な主流 | _Hades_, _Dead Cells_, _Vampire Survivors_                   |
| **キャラクターロスト (Character Loss)** | ユニットや仲間キャラクター個別に死が適用される。ゲーム自体の進行は続くが、育てた仲間は戻らない                               | _Fire Emblem_ (Classic), _XCOM_, _Darkest Dungeon_           |
| **リソース/装備ロスト (Extraction)**    | キャラクター自体は残ることもあるが、死亡時にそのセッションで保持していた装備やアイテムを全てその場に落とし、失う             | _Escape from Tarkov_, _Hunt: Showdown_, _Minecraft (Normal)_ |
| **セーブデータ削除 (Meta/Narrative)**   | 物語上の演出や選択として、システム側が意図的にセーブデータを削除する特殊な形式                                               | _NieR: Automata_, _Undertale_ (一部ルート)                   |

### デザインの意図

- **緊張感の創出**: 「失敗したら全て終わり」というプレッシャーが、プレイヤーに慎重かつ戦略的な判断を強制する
- **リプレイ性の向上**: 何度もやり直すことを前提とし、学習によるプレイヤー自身のスキル向上（Player Skill Progression）を重視する

---

## ゲームジャンルの分類 (メカニクス視点)

ゲームのジャンルは「雰囲気」や「物語」ではなく、「プレイヤーが何をするか（Core Mechanics / Interaction）」によって分類されることが多い。

### アクション (Action)

**コアメカニクス**: タイミング・正確な操作・反射神経などの、物理的な課題の克服。

- **Platformer**: ジャンプ、移動による地形の走破 (_Super Mario_)
- **Shooter (FPS/TPS)**: 遠距離からの照準合わせと射撃 (_Call of Duty_, _Splatoon_)
- **Fighting**: 近接戦闘、コマンド入力、読み合い (_Street Fighter_)
- **Stealth**: 敵の視界を避ける、隠れる (_Metal Gear Solid_)

### ストラテジー (Strategy)

**コアメカニクス**: 計画、リソース管理、戦術的判断。

- **RTS (Real-Time)**: 時間経過と共に変化する戦況への即応 (_StarCraft_)
- **TBS (Turn-Based)**: 熟考し、最適な一手を打つ将棋的な思考 (_Civilization_)
- **MOBA**: アクションとRTSの融合、個の操作と全体の戦術 (_League of Legends_)

### ロールプレイング (RPG)

**コアメカニクス**: 成長（Progression）・能力値管理・役割の実演。

- 経験値によるレベルアップ、スキルツリーの選択、装備の更新による数値的な強さの向上が主軸

### アドベンチャー (Adventure)

**コアメカニクス**: 探索、パズル解決、物語の進行。

- アクション要素が薄く、環境への働きかけや謎解きが中心

### シミュレーション (Simulation)

**コアメカニクス**: 現実世界の事象やシステムの模倣・再現。

- **Management**: 経営、都市建設 (_SimCity_)
- **Life Sim**: 生活体験 (_The Sims_, _Animal Crossing_)
- **Vehicle Sim**: 操縦体験 (_Gran Turismo_, _Flight Simulator_)

### 複合ジャンル (Hybrid Genres)

現代のゲームの多くは複数のジャンルを融合している：

- **Action RPG**: アクションの操作性とRPGの成長要素の融合 (_Dark Souls_, _Monster Hunter_)
- **Metroidvania**: Platformerの探索とAction RPGの能力獲得による行動範囲拡大 (_Hollow Knight_)
- **Battle Royale**: Survival（探索・収集）とShooter（戦闘）とLast Man Standingルールの融合 (_Fortnite_, _Apex Legends_)
