# TRPG ドキュメント

TRPG関連のドキュメントを管理するディレクトリです。

## ディレクトリ構成

```
trpg/
├── characters/          # キャラクター（システム横断）
│   ├── pc/              # プレイヤーキャラクター
│   └── npc/             # NPC
├── scenarios/           # シナリオ
│   └── _template/       # シナリオテンプレート
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

## Obsidian Tips

- `[[キャラ名]]` でキャラクターにリンク
- バックリンクで「このキャラがどのシナリオに出たか」を確認可能
- Dataviewプラグインでシステム別の一覧表示が可能
