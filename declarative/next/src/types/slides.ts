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
  imageUrl?: string;
}

// スライドのセクション定義
export interface SlideSection {
  id: string;
  title: string;
  description?: string;
  slides: Slide[];
}
