# アセット生成パイプライン (Asset Pipeline)

3Dモデル、テクスチャ、環境構築などの素材作成におけるAI活用。

## 3Dモデリング & リギング

- **Meshy / CSM (Common Sense Machines)**:
  - **スマートリメッシュ**: ポリゴン数(1k\~300k)を指定し、アニメーションに適した四角形ポリゴン(Quad)へ自動変換
  - **オートリギング**: 人型・四足歩行キャラにボーンを埋め込み、500種以上のプリセットアニメーションを適用可能

## フォトグラメトリ & Gaussian Splatting

- **Polycam**:
  - **Gaussian Splatting**: 空間を「3Dガウス粒子」として表現
    - 従来のメッシュでは難しい反射・透明度・薄い構造（髪、葉）を写実的に再現
  - 背景アセットとしてUnity/UEにインポート可能

## ワールドビルディング (Environment)

- **Blockade Labs (Skybox AI)**:
  - **Remix機能**: ラフなグレーボックス配置のスクショを下敷きに、詳細な背景美術を生成可能
  - Unityプラグインで即座に環境光・Skyboxとして適用
- **Promethean AI**:
  - **Braintrust機能**: チームの過去アセットや「意味的な関係」を学習
  - 「10代の部屋」等の指示で、家具や小物を論理的・文脈的に自動配置（セットドレッシング）

## テクスチャ & マテリアル

## テクスチャ & マテリアル

- **Stable Diffusion (with Texture Training)**:
  - **Stable Diffusion XL (Texture Diffusion)**: 1024pxシームレステクスチャ生成
    - 4タイルスティッチングで高解像度化
- **WithPoly**:
  - 最大8KのPBRマップ（Color, Normal, Height, AO, Roughness, Metalness）を生成
- **Adobe Substance 3D**:
  - Firefly AI統合
  - テキストからテクスチャ生成、写真からPBR変換
- **Scenario**:
  - ゲーム特化
  - 10〜50枚でLoRA学習し、スタイル一貫性のあるテクスチャを生成

## 3D生成ツール比較 (2025年時点)

|ツール|特徴|最適用途|価格|
|:-|:-|:-|:-|
|**Meshy**|多様なスタイル、最大コミュニティ|高速プロトタイプ|無料〜$120|
|**Tripo AI**|クリーンなトポロジー、自動リギング|ゲームアセット量産|無料〜$140|
|**Rodin (Hyper3D)**|最高品質、3Dネイティブモデル|本番アセット|無料〜$24+|
|**Hunyuan3D**|オープンソース、ローカル動作|コスト重視|無料|
|**CSM**|Sheet-to-3D, Text-to-4D|ワールド構築|無料〜$80|
|**Kaedim**|Human-in-the-loop (人間修正)|プロ品質保証|$22〜|

## 出典

- [2026年版 AI駆動型3Dゲーム開発エコシステム](./AI活用3Dゲーム開発手法調査.md) (詳細な調査レポート)
- [AIで3Dゲームを作る：2025年最新ツール完全ガイド](../compass_artifact_wf-4249750f-4be8-4150-a659-50fe4da38e10_text_markdown.md)
