# XR (Extended Reality)

## Spatial Reality Display (ELF-SR1)

Sonyの空間再現ディスプレイ。
メガネなしで3D映像を見ることができる。

## 事例メモ

### PhotoGrammetry + ELF-SR1 + HandTracking

- **参照**: <https://x.com/VoxelKei/status/1328064104129433600>

#### 概要

フォトグラメトリで作成した高精細な3DモデルをELF-SR1で表示し、LeapMotion (HandTracking) で操作する方法についての知見。

#### 要素技術

- **ELF-SR1**: 裸眼立体視ディスプレイ
  - 視線を追跡し、見る角度に合わせて映像をレンダリングすることで実在感のある立体視を実現する
- **Photogrammetry**: 写真から3Dモデルを生成する技術
  - 現実の物体をキャプチャしてデジタル化するのに適している
- **LeapMotion (Ultraleap)**: ハンドトラッキングセンサー
  - 手や指の動きを高精度に検知し、非接触での直感的な操作を可能にする

#### 連携のポイント

この組み合わせにより、**「実在感のある3Dオブジェクト（ELF-SR1 + Photogrammetry）」** に対し、**「直接触れるような操作感（HandTracking）」** を付与でき、没入感の高いインタラクションが実現できる。

### 関連リンク

- [VoxelKei (Twitter)](https://twitter.com/VoxelKei)
- [Sony Spatial Reality Display (ELF-SR1)](https://www.sony.jp/spatial-reality-display/)
- [Ultraleap (formerly Leap Motion)](https://www.ultraleap.com/)

> [!NOTE]
> VoxelKei氏によるELF-SR1に関する詳細な記事は見当たりませんでしたが、氏はフォトグラメトリやVRChatなどの3D技術に造詣が深く、これらの技術を組み合わせた実験的な試みとしてツイートされたものと考えられます。
