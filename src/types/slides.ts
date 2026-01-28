// スライドのデータ型定義
export interface Slide {
  id: string;
  title: string;
  descriptions?: string[];
  // コード例
  codeExample?: {
    language: string;
    code: string;
  };
  codeExamples?: {
    language: string;
    code: string;
    title?: string;
    descriptions?: string[];
  }[];
  // 画像
  image?: {
    url: string;
    position?: "right" | "bottom";
    descriptions?: string[];
  };
  // アルバム
  video?: {
    url: string;
  };
  // 表
  table?: {
    headers: string[];
    rows: string[][];
  };
  // リスト
  list?: {
    groups: {
      title: string;
      points: string[];
    }[];
  };
}

// スライドのセクション定義
export interface SlideSection {
  id: string;
  title: string;
  description?: string;
  slides: Slide[];
}
