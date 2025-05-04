// スライドのデータ型定義
export interface Slide {
  id: string;
  title: string;
  content: string[];
  codeExample?: {
    language: string;
    code: string;
  };
  imageUrl?: string;
}

// スライドのセクション定義
export interface SlideSection {
  id: string;
  title: string;
  description?: string;
  slides: Slide[];
}
