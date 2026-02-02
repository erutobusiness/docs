# TRPG ドキュメント

TRPG関連のドキュメントを管理するディレクトリです。

## ディレクトリ構成

```
trpg/
├── characters/          # キャラクター（システム横断）
│   ├── pc/              # プレイヤーキャラクター
│   └── npc/             # NPC（グローバル）
├── items/               # アイテム（グローバル）
├── scenarios/           # シナリオ
│   └── _template/       # シナリオテンプレート
│       ├── items/       # シナリオ固有アイテム
│       └── npcs/        # シナリオ固有NPC
├── rules/               # ルール参照
│   └── coc/             # クトゥルフ神話TRPG
└── assets/              # 共有素材
    ├── images/
    └── templates/
```

## 対応システム

- `coc7` - クトゥルフ神話TRPG 第7版

## 使い方

### キャラクター作成

1. `characters/pc/_template.md` または `characters/npc/_template.md` をコピー
2. フロントマターの `system` に対応システムを記入
3. 必要項目を埋める

### シナリオ作成

1. `scenarios/_template/` ディレクトリをコピーしてリネーム
2. `README.md` にシナリオ概要を記入
3. ハンドアウトやマップは対応するサブディレクトリに配置
4. シナリオ固有アイテムは `items/` サブディレクトリに配置
5. シナリオ固有NPCは `npcs/` サブディレクトリに配置

### アイテム作成

1. **グローバルアイテム**: `items/_template.md` をコピーして `items/` に配置
   - 複数シナリオで使用されるアイテム（神話的アーティファクトなど）
2. **シナリオ固有アイテム**: 各シナリオの `items/` サブディレクトリに配置
   - そのシナリオでのみ使用されるアイテム

### NPC作成

1. **シナリオ固有NPC**: 各シナリオの `npcs/` サブディレクトリに配置
   - そのシナリオでのみ登場するNPC
   - 新規シナリオのNPCはまずここに配置
2. **グローバルNPC**: `characters/npc/` に配置
   - 複数シナリオで共有されることが確定したNPC
   - シナリオローカルから昇格させる形で移動

## Obsidian Tips

- `[[キャラ名]]` でキャラクターにリンク
- バックリンクで「このキャラがどのシナリオに出たか」を確認可能
- Dataviewプラグインでシステム別の一覧表示が可能

## Index (Auto-generated)

### Folders

- [[assets/README|assets]]
- [[characters/README|characters]]
- [[items/README|items]]
- [[memo/README|memo]]
- [[rules/README|rules]]
- [[scenarios/README|scenarios]]
