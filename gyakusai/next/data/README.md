# gyakusai ケースデータ構造

## 概要

ケースデータの肥大化を解決するため、ケースごとにファイルを分割した構造に変更しました。
これにより、新しいケースの追加と既存ケースの管理が容易になります。

## ディレクトリ構造

```
gyakusai/next/data/
├── caseData.ts                          # メインのエントリーポイント
└── cases/                               # ケースごとのディレクトリ
    └── missing-evidence/                # 「消えた証拠品の謎」ケース
        ├── index.ts                     # ケースの統合ファイル
        ├── characters.ts                # キャラクター定義
        ├── evidences.ts                 # 証拠品定義
        └── scenes.ts                    # シーン定義
```

## ファイルの役割

### `caseData.ts`（メインエントリーポイント）

- すべてのケースを統合して管理
- `getAllCases()` と `getCaseById()` 関数を提供
- 既存コードとの下位互換性を保持

### `cases/[case-id]/index.ts`

- ケースの統合ファイル
- キャラクター、証拠品、シーンをインポートして 1 つの Case オブジェクトに統合

### `cases/[case-id]/characters.ts`

- そのケースで使用されるキャラクターの定義
- Character 型の配列をエクスポート

### `cases/[case-id]/evidences.ts`

- そのケースで使用される証拠品の定義
- Evidence 型の配列をエクスポート

### `cases/[case-id]/scenes.ts`

- そのケースのシーン（法廷での流れ）の定義
- Scene 型の配列をエクスポート

## 新しいケースの追加方法

1. `cases/` ディレクトリに新しいケース ID でディレクトリを作成
2. 上記 4 つのファイル（index.ts, characters.ts, evidences.ts, scenes.ts）を作成
3. `caseData.ts` の `allCases` 配列に新しいケースを追加

### 例：新ケース「stolen-painting」の追加

```typescript
// cases/stolen-painting/characters.ts
import type { Character } from "@/types/gyakusai";

export const stolenPaintingCharacters: Character[] = [
  // キャラクター定義...
];
```

```typescript
// cases/stolen-painting/evidences.ts
import type { Evidence } from "@/types/gyakusai";

export const stolenPaintingEvidences: Evidence[] = [
  // 証拠品定義...
];
```

```typescript
// cases/stolen-painting/scenes.ts
import type { Scene } from "@/types/gyakusai";

export const stolenPaintingScenes: Scene[] = [
  // シーン定義...
];
```

```typescript
// cases/stolen-painting/index.ts
import type { Case } from "@/types/gyakusai";
import { stolenPaintingCharacters } from "./characters";
import { stolenPaintingEvidences } from "./evidences";
import { stolenPaintingScenes } from "./scenes";

export const stolenPaintingCase: Case = {
  id: "stolen-painting",
  title: "盗まれた名画",
  description: "美術館から盗まれた名画の謎を解け",
  characters: stolenPaintingCharacters,
  evidences: stolenPaintingEvidences,
  scenes: stolenPaintingScenes,
  initialSceneId: "intro",
};

export default stolenPaintingCase;
```

```typescript
// caseData.ts の allCases 配列に追加
import { stolenPaintingCase } from "./cases/stolen-painting";

const allCases = [
  missingEvidenceCase,
  stolenPaintingCase, // 新しいケースを追加
];
```

## 下位互換性

既存のコードは変更なしで動作するよう、以下を保証しています：

- `getAllCases()` 関数は同じ形式でケース一覧を返す
- `getCaseById()` 関数は同じ形式でケースを返す
- `sampleCase` は既存の「消えた証拠品の謎」ケースへの参照として保持

## メリット

1. **可読性の向上**: 各ケースのデータが整理され、見つけやすくなった
2. **保守性の向上**: 新しいケースの追加や既存ケースの修正が簡単
3. **ファイルサイズの管理**: 1 つのファイルが巨大にならない
4. **チーム開発**: 複数人で異なるケースを並行して開発可能
5. **再利用性**: キャラクターや証拠品を他のケースで再利用しやすい

## 注意事項

- 新しいケースを追加する際は、必ず `caseData.ts` の `allCases` 配列も更新する
- ケース ID は一意である必要がある
- ファイル名は一貫性を保つため、上記の命名規則に従う
