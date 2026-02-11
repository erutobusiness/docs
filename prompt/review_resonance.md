# Resonance Scenario Review Prompt / 残響世界レビュー用プロンプト

## Instructions / 指示

You are an experienced TRPG scenario reviewer and game designer.
Review the Call of Cthulhu 7th Edition campaign scenario "Resonance" (残響世界) and provide feedback on the aspects listed below.

あなたは経験豊富なTRPGシナリオ評論家兼ゲームデザイナーです。
クトゥルフ神話TRPG（CoC 7版）のキャンペーンシナリオ「残響世界 ── Resonance」を以下の観点からレビューしてください。

## Scenario Overview / シナリオ概要

- **System**: Call of Cthulhu 7th Edition
- **Players**: 3–5
- **Structure**: Prologue → 6 non-linear locations → Finale
- **Theme**: Cosmic horror centered on "sound" rather than sight
- **Setting**: 1925, worldwide (Yokohama, Vienna, Marrakech, Buenos Aires, Varanasi, Reykjavik)

## Files to Read / 読むべきファイル

Read ALL files under the `trpg/scenarios/Resonance/` directory.
Pay special attention to:

`trpg/scenarios/Resonance/` 配下の全ファイルを読んでください。
特に注目すべきファイル:

- `README.md` — Scenario overview and structure / シナリオ概要と構成
- `chapters/*/00_概要.md` — Each location's overview / 各拠点の概要
- `chapters/07_finale/00_最終共鳴.md` — Finale chapter / 最終章
- `setting/org_*.md` — Cult organizations / カルト組織設定
- `references/kp_faq.md` — Keeper FAQ / KP向けFAQ
- `references/horror_direction.md` — Horror direction guide / ホラー演出ガイド

## Review Aspects / レビュー観点

### 1. Playability — プレイアビリティ（高優先度）

**EN**: If you were running this scenario at a table, where would you get stuck? Identify:

- Locations where the Keeper lacks enough information to run a scene
- Ambiguous or missing skill check criteria
- Unclear NPC decision trees (when/how do NPCs act?)
- Missing stat blocks or mechanical details

**JP**: KPとしてこのシナリオを実卓で回すとして、どこで詰まるか。以下を指摘してください:

- KPの情報が不足していてシーンを回せない箇所
- 判定基準が曖昧または欠落している箇所
- NPCの行動判断が不明確な箇所（いつ・どう動くのか）
- 能力値や技能データの欠落

### 2. Pacing — ペーシング（高優先度）

**EN**: Evaluate whether the content volume matches the target session count:

- Yokohama: 2–3 sessions
- Vienna: 1–2 sessions
- Marrakech: 1–2 sessions (includes desert travel + tracking)
- Buenos Aires: 1–2 sessions (includes infiltration + social maneuvering)
- Varanasi: 2 sessions (includes philosophical debate)
- Reykjavik: 1–2 sessions (includes survival horror)
- Finale: 1–2 sessions
- Flag any location that feels too dense or too thin for its target session count.

**JP**: 情報量が想定セッション数に対して適切か評価してください。過密または過疎な拠点を指摘してください。

### 3. Moral Dilemma Balance — 道徳的ジレンマのバランス（高優先度）

**EN**: Each location now has a "moral choice" section. Evaluate:

- Are the dilemmas of comparable weight across all 6 locations?
- Does any dilemma feel contrived or easily dismissed?
- Do the choice tables offer genuinely distinct outcomes?
- Would actual players engage with these dilemmas or skip past them?

**JP**: 各拠点の「道徳的選択」セクションを評価してください:

- 6拠点のジレンマの「重さ」に偏りはないか
- 不自然・形骸化しているジレンマはないか
- 選択肢テーブルの結果は本当に異なる体験を生むか
- 実際のプレイヤーはこのジレンマに向き合うか、それとも素通りするか

### 4. Antagonist Motivations — 敵対者の動機（中優先度）

**EN**: Each cult leader now has a "true motivation" section in their org file. Evaluate:

- Do the motivations feel authentic to the 1920s setting?
- Are any motivations cliché (e.g., generic tragic backstory)?
- Would a Keeper be able to roleplay these NPCs convincingly based on the provided information?
- Are there missed opportunities for player-antagonist connection?

**JP**: 各カルト幹部の「真の動機」セクションを評価してください:

- 1920年代の時代背景として動機は説得力があるか
- 紋切り型になっている動機はないか
- KPはこの情報だけでNPCを説得力を持って演じられるか
- プレイヤーと敵対者の接点として活用されていない機会はないか

### 5. Clue Redundancy — 手がかりの冗長性（中優先度）

**EN**: Verify that the "Three Clue Rule" is satisfied across all locations.
For each critical conclusion the players need to reach, confirm at least 3 independent paths exist.
Pay special attention to cross-location clue chains (how players learn about other locations from each hub).

**JP**: 全拠点で「3つの手がかりルール」が満たされているか検証してください。
プレイヤーが到達すべき重要な結論ごとに、最低3つの独立した経路が存在するか確認してください。
特に拠点間の手がかり連鎖（各拠点から他拠点の情報をどう得るか）に注目してください。

### 6. Cultural Accuracy — 文化的描写の妥当性（中優先度）

**EN**: Evaluate the 1920s depictions of:

- Marrakech (French Protectorate era Morocco)
- Buenos Aires (immigrant communities, tango culture)
- Varanasi (Hindu religious practices, caste system)
- Reykjavik (Icelandic fishing communities)
- Flag any anachronisms, stereotypes, or inaccuracies.

**JP**: 1920年代の以下の描写が妥当か評価してください:

- マラケシュ（フランス保護領時代のモロッコ）
- ブエノスアイレス（移民コミュニティ、タンゴ文化）
- ヴァラナシ（ヒンドゥー教の宗教実践、カースト制度）
- レイキャヴィク（アイスランドの漁業コミュニティ）
- 時代錯誤、ステレオタイプ、不正確な記述を指摘してください

### 7. Horror Direction — ホラー演出の実用性（低優先度）

**EN**: Review `references/horror_direction.md`. Is it:

- Specific enough for a Keeper to use at the table?
- Does it cover all five senses effectively?
- Are the SAN loss flavor texts evocative?
- Any suggestions for additional techniques or improvements?

**JP**: `references/horror_direction.md` を評価してください:

- KPが実卓で使えるほど具体的か
- 五感を効果的にカバーしているか
- SAN喪失時のフレーバーテキストは雰囲気があるか
- 追加テクニックや改善の提案があれば

### 8. Combat Incentives — 戦闘の報酬設計（低優先度）

**EN**: Currently, combat can be avoided at every location with no gameplay penalty.
Evaluate whether this is a problem. If so, suggest what incentives or consequences could differentiate "fought" vs "negotiated" outcomes.

**JP**: 現状、全拠点で戦闘を回避してもゲーム的なペナルティがありません。
これが問題か評価してください。問題であれば「戦闘した場合」と「交渉で解決した場合」を差別化するインセンティブや結果を提案してください。

## Output Format / 出力形式

Structure your review as follows:

レビューは以下の構造で出力してください:

```
## Summary / 総評
(Overall assessment in 3–5 sentences / 3〜5文の総評)

## Strengths / 強み
(What works well / うまく機能している点)

## Issues by Priority / 優先度別の問題点

### Critical (blocks play) / 致命的（プレイが成立しない）
### Major (significantly impacts quality) / 重大（品質に大きく影響）
### Minor (nice to fix) / 軽微（修正できれば良い）

## Specific Recommendations / 具体的な改善提案
(Actionable suggestions with file paths / ファイルパス付きの具体的な改善案)
```
