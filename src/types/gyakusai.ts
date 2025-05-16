// 逆転裁判風ゲームのデータ型定義

// キャラクターの感情
export type Emotion =
  | 'normal'
  | 'surprised'
  | 'angry'
  | 'thinking'
  | 'confident'
  | 'nervous'
  | 'breakdown';

// キャラクター定義
export interface Character {
  id: string;
  name: string;
  role: string; // 弁護士、検事、証人など
  images: {
    [key in Emotion]: string; // 各感情に対応する画像のパス
  };
}

// 証拠品定義
export interface Evidence {
  id: string;
  name: string;
  description: string;
  image: string;
}

// 会話のセリフ定義
export interface Dialogue {
  characterId: string;
  text: string;
  emotion?: Emotion; // キャラクターの感情
  shake?: boolean; // キャラクター画像を揺らすかどうか
  sound?: string; // 効果音
  showEvidence?: string; // 表示する証拠のID
  isObjection?: boolean; // 「異議あり！」アニメーションを表示するかどうか
}

// 選択肢定義
export interface Choice {
  text: string;
  nextSceneId: string;
  isCorrect?: boolean;
}

// シーン定義
export interface Scene {
  id: string;
  background: string; // 背景画像
  characters: string[]; // 登場キャラクターのID
  dialogues: Dialogue[];
  choices?: Choice[]; // 選択肢がある場合
  evidenceCheck?: {
    question: string;
    correctEvidenceId: string;
    correctNextSceneId: string;
    wrongNextSceneId: string;
  };
}

// ケース（事件）定義
export interface Case {
  id: string;
  title: string;
  description: string;
  characters: Character[];
  evidences: Evidence[];
  scenes: Scene[];
  initialSceneId: string;
}

// 全ケースのリスト
export interface CaseList {
  cases: {
    id: string;
    title: string;
    description: string;
    image: string;
  }[];
}
