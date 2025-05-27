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

// 証言の各発言
export interface TestimonyStatement {
  id: string; // 証言内でのユニークID (例: "statement-1")
  text: string;
}

// 証言への「待った！」アクション定義
export interface TestimonyPressAction {
  reactionDialogues?: Dialogue[]; // 「待った！」に対するキャラクターのリアクション台詞
  nextSceneId?: string;         // 「待った！」の結果、次に遷移するシーンID
  updatedStatement?: Partial<TestimonyStatement>; // 証言内容が更新される場合
}

// 証言への「つきつける」条件定義
export interface TestimonyPresentCondition {
  correctEvidenceId: string;    // 正しい証拠品のID
  correctNextSceneId: string; // 正解時に遷移するシーンID
  // 不正解時のカスタムリアクションやペナルティも将来的に追加可能
}

// 証言セット定義
export interface Testimony {
  id: string; // この証言セットのユニークID (例: "witness-testimony-1")
  title?: string; // 証言のタイトル (例: "事件当日の目撃証言")
  witnessCharacterId: string; // 証言者のキャラクターID
  statements: TestimonyStatement[];
  pressActions?: {
    [statementId: string]: TestimonyPressAction; // statement.id をキーとする
  };
  presentConditions?: {
    [statementId: string]: TestimonyPresentCondition; // statement.id をキーとする
  };
  defaultWrongPresentSceneId: string; // 証拠つきつけが不正解だった場合のデフォルト遷移先シーンID
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
  testimonyId?: string; // <--- この行を追加
}

// ケース（事件）定義
export interface Case {
  id: string;
  title: string;
  description: string;
  characters: Character[];
  evidences: Evidence[];
  testimonies?: Testimony[]; // <--- この行を追加
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
