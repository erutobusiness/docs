# Everything Claude Code 調査・要約

元ツイート: [Claude Code設定集が凄すぎる (ハヤシシュンスケ氏)](https://x.com/The_AGI_WAY/status/2012903113213292547)

## 概要

**Everything Claude Code** は、Anthropic が提供する CLI ツール「Claude Code」を、単なる試作レベルから**本番開発（Production-Ready）レベル**に引き上げるための設定・プラグイン集。

Anthropic x Forum Ventures ハッカソンの優勝者である **Affaan Mustafa** 氏（[@affaanmustafa](https://x.com/affaanmustafa)）によって作成された。
彼はこの設定を用いて、AI 活用プラットフォーム「[zenith.chat](https://zenith.chat)」を完全に Claude Code だけで開発したとされている。

## コアコンセプト

Claude Code の標準機能を以下の 6 つのコンポーネントで拡張し、**「AI 時代の思考 OS」** とも呼べる構造を提供する。

### 1. Agents (`agents/`)

特定のタスクに特化した「サブエージェント」を定義し、複雑な作業を専門家に委任させる。

- **特徴**: 各エージェントには必要最小限のツールしか与えないことで、実行速度と精度を向上
- **例**:
  - `code-reviewer`: コード品質・セキュリティのレビュー担当
  - `architect`: 設計担当
  - `tdd-guide`: テスト駆動開発のガイド役

### 2. Skills (`skills/`)

再利用可能なワークフローの定義。
ベストプラクティスを手順化したもの。

- **例**: `tdd-workflow`（RED → GREEN → REFACTOR のサイクルを回す手順書）

### 3. Commands (`commands/`)

よく使うワークフローを `/tdd` のような短いスラッシュコマンドで呼び出せるようにする。

- **例**:
  - `/plan`: 実装計画の立案
  - `/tdd`: テスト駆動開発サイクルの実行
  - `/refactor-clean`: リファクタリングの実行

### 4. Rules (`rules/`)

プロジェクト全体で常に遵守すべきガイドライン（`.clauderc` や `.cursorrules` に相当）。

- **内容**: セキュリティ基準（APIキーをハードコードしない）、コーディング規約、Git ワークフローなど
- **推奨**: 1つの巨大なファイルにするのではなく、役割ごとにファイルを分割して管理

### 5. Hooks (`hooks/`)

特定のイベント（ツール実行時など）に自動発火するスクリプト。

- **活用例**: ファイル編集後に `console.log` が残っていないか `grep` でチェックし、もしあれば警告を出す（デバッグコードの混入防止）

### 6. MCP Configs (`mcp-configs/`)

外部サービス（GitHub, Supabase, Vercel 等）との連携設定。

- **⚠️ 重要**: MCP サーバーを有効にしすぎると、Claude のコンテキストウィンドウ（短期記憶）が圧迫されます（200k → 70k 程度まで減る可能性あり）
- **対策**: プロジェクトごとに有効化する MCP は 10 個以下、ツール総数は 80 個以下に抑えることが推奨

## 開発フローの特徴

この設定集が目指す開発スタイルは以下の通り。

1. **エージェントファースト**: 複雑なタスクは自分で抱え込まず、専門エージェントに任せる
2. **TDD（テスト駆動開発）中心**: テストを先に書き、カバレッジ 80% 以上を必須とする厳格な品質管理
3. **セキュリティファースト**: 不正なコードや脆弱性が混入しないよう、コミット前に自動チェックを行う

## クイックガイド

リポジトリの内容をご自身の Claude Code 環境（`~/.claude/` 配下）にコピーして使用する。

```bash
# クローン
git clone https://github.com/affaan-m/everything-claude-code.git

# 設定ファイルの配置例
cp everything-claude-code/agents/*.md ~/.claude/agents/
cp everything-claude-code/rules/*.md ~/.claude/rules/
cp -r everything-claude-code/skills/* ~/.claude/skills/
```

※ 自身の環境やプロジェクトに合わせて、必要なものを選別して導入することが推奨されている。

## 出典・参考文献

1. **元ツイート**: [X (@The_AGI_WAY)](https://x.com/The_AGI_WAY/status/2012903113213292547)
2. **GitHub リポジトリ**: [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)
3. **解説記事 (Zenn)**: [Anthropicハッカソン優勝者のClaude Code設定集「everything-claude-code」を読み解く](https://zenn.dev/ttks/articles/a54c7520f827be)
