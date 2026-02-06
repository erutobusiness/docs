# md

ドキュメントコンテンツを格納するディレクトリです。

## declarative

宣言的、宣言的 UI について紹介します。
特に、学ぶメリットや、他のパラダイムとの相性についても触れます。

### サブディレクトリ

- **html**: スライドを作成するための HTML
- **img**: スライドやマークダウンに埋め込む画像
- **md**: Qiita のマークダウン

## baby-cup

VJ イベント「Baby Cup」の司会進行用ドキュメント。

## theArtOfLoving

エーリヒ・フロムの「愛するということ」を基にした発表資料。

## 開発コマンド

### フォーマット

|コマンド|説明|
|-|-|
|`npm run format`|Prettier + Remark で全ファイルをフォーマット|
|`npm run format:prettier`|Prettier のみ実行|
|`npm run format:remark`|Remark のみ実行|

### Lint

|コマンド|説明|
|-|-|
|`npm run lint`|全ての textlint を実行|
|`npm run lint:root`|trpg, games, ideas, tech, topics 等のlint|
|`npm run lint:readme`|README ファイル専用lint|
|`npm run lint:presentations`|プレゼンテーション資料のlint|
|`npm run lint:qiita`|Qiita 記事のlint|
|`npm run lint:prompt`|プロンプトファイルのlint|

### ショートカット

|コマンド|説明|
|-|-|
|`npm run check`|`lint` のエイリアス|
|`npm run fix`|`lint:fix` のエイリアス（フォーマット実行）|

### 個別ファイルのlint

特定ファイルをlintする場合は直接textlintを実行:

```bash
npx textlint --config .textlintrc.js <file>
```

## Index (Auto-generated)

### Folders

- [[games/README|games]]
- [[ideas/README|ideas]]
- [[presentations/README|presentations]]
- [[scripts/README|scripts]]
- [[tech/README|tech]]
- [[topics/README|topics]]
- [[trpg/README|trpg]]
- [[youtube/README|youtube]]

### Files

- [[CLAUDE]]
- [[TODO]]
