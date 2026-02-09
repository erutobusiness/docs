# エディタ自動化とコントロールプレーン (Editor Automation)

ゲームエンジン（Unity/Unreal Engine）をAIで制御するための技術群。

## Model Context Protocol (MCP)

AIモデルと外部ツール（ゲームエンジン）を接続する標準プロトコル。
これにより、ChatGPTやClaudeなどのLLMが、エディタ内のオブジェクトを直接操作したり、コンポーネントをアタッチしたりすることが可能になる。

### Unity

- **UnityMCP**:

  - **アーキテクチャ**: Unityエディタ内でローカルサーバー(localhost:8080)を起動し、JSONベースの命令を受信
  - **主なツール機能**:
    - `manage_scene`: オブジェクト生成、Transform操作（グレーボクシング自動化）
    - `validate_script`: Roslynを使用したC#コードの構文・型エラー検証（コンパイルエラー回避）
    - `programmatic asset management`: ファイル操作、インポート設定変更

  #### セットアップ (CoplayDev版)

  1. Package Managerから `https://github.com/CoplayDev/unity-mcp.git` を追加
  2. Window → Unity MCP → "Auto Configure Claude/Cursor"
  3. Claude Desktopの設定ファイルに自動追記され、接続完了(🟢)

  - **要件**: Python 3.12+, Git, Unity 2020.3+

  #### できること

  - **シーン操作**: GameObject作成・変更、コンポーネント追加
  - **コード生成**: スクリプト生成・修正・アタッチ
  - **自動化**: メニュー実行、プレイモード切替、ビルド
  - ※メッシュ生成は不可（Meshyなどと併用）

### Unreal Engine

- **Python Bridge**:
  - UnrealのPython APIを通じて、外部AIからの命令を実行(TCPソケット通信)
- **Flop Agent (v0.6+)**:
  - **Blueprintの自律生成**: ノードグラフの解析・生成が可能
    - 「敵AIのパトロールロジック」などをBPで構築できる
  - **ワールド生成**: `create_maze` などのマクロコマンドでレベルをプロシージャル生成

## AIコーディングと.cursorrules

Cursor等を使用する場合、プロジェクトルートに `.cursorrules` を配置して「憲法」として機能させることが重要。

- **コンテキスト強制**: Unityバージョン、使用パイプライン(URP/HDRP)の明示
- **規約遵守**: 命名規則の強制、非推奨APIの禁止

## メリット

- **GUI操作の削減**: メニューを深く掘る必要がなく、意図を伝えるだけで設定が完了する
- **スクリプト作成の自動化**: 「プレイヤーが近づいたらドアが開くスクリプトをつけて」でコード生成→アタッチまで完結

## AIコーディングツール (AI Coding Tools)

### ツール比較

|ツール|特徴|用途|価格|
|:-|:-|:-|:-|
|**GitHub Copilot**|Unity C#統合、インライン補完|日常的なコーディング|$10〜|
|**Cursor**|VS Codeフォーク、エージェント機能|高速プロトタイピング|$20〜|
|**Claude Code**|ターミナル操作、複雑な推論|大規模設計、リファクタリング|$17〜|

### エンジン内蔵AI

- **Unity AI (Muse進化版)**: スプライト・テクスチャ生成、LoRA活用 (Unity 6.2)
- **Unreal Engine**: Python Bridge, NVIDA ACEプラグイン
- **Roblox**: 4D Generative AI (物理付きオブジェクト生成)

## 出典

- [2026年版 AI駆動型3Dゲーム開発エコシステム](./AI活用3Dゲーム開発手法調査.md) (詳細な調査レポート)
- [AIで3Dゲームを作る：2025年最新ツール完全ガイド](../compass_artifact_wf-4249750f-4be8-4150-a659-50fe4da38e10_text_markdown.md)
