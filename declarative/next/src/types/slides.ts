// スライドのデータ型定義
export interface Slide {
  id: string;
  title: string;
  content: string[];
  codeExample?: {
    language: string;
    code: string;
  };
  codeExamples?: {
    language: string;
    code: string;
    title?: string;
    description?: string[]; // 各コードブロックの説明文を追加
  }[];
  image?: {
    url: string;
    position?: 'right' | 'bottom';
  }; // 画像のプロパティを統合
  table?: {
    headers: string[];
    rows: string[][];
  }; // テーブル表示用のプロパティを追加
  list?: {
    groups: {
      title: string;
      points: string[];
    }[];
  }; // グループ化リスト用のプロパティを追加
}

// スライドのセクション定義
export interface SlideSection {
  id: string;
  title: string;
  description?: string;
  slides: Slide[];
}
