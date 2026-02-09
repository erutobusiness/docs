# レベルデザインとプロシージャル生成 (Level Design & PCG)

AIとアルゴリズムを活用したマップ・環境の自動生成技術。

## プロシージャル生成の進化

- **Wave Function Collapse (WFC)**:
  - 制約ベースのアルゴリズム（「Bad North」「Townscaper」等で採用）
  - 2024年以降は遺伝的アルゴリズムや時空間WFCへの拡張が進む
- **LLM駆動設計 (PAG)**:
  - 「三本の川の合流点にある中世の港」といった自然言語の指示を解釈し、機能的なレベルを生成する研究(Procedural and Adaptive Generation)

## 主要ツール・フレームワーク

- **Unreal Engine PCG Framework**:
  - UE5.3以降で標準搭載
  - Blueprint上でプロシージャルなワールド構築が可能
- **Promethean AI**:
  - **AI駆動の環境構築特化**
  - コマンドでアセット配置、ライティング設定を行う
- **Unity Assets**:
  - **Dungeon Architect**: ダンジョン生成の定番
  - **Gaia / MapMagic**: 地形・ワールド生成
- **Unity Sentis**:
  - ランタイムでの機械学習推論により、プレイに適応してマップを変化させることも可能

## 出典

- [AIで3Dゲームを作る：2025年最新ツール完全ガイド](../compass_artifact_wf-4249750f-4be8-4150-a659-50fe4da38e10_text_markdown.md)
  - ※[World Building](./assets.md)については別ファイル参照
