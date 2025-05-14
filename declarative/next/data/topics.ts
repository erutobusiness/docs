import { SlideSection } from '@/types/slides';

// 話題の型定義
export interface Topic {
  id: string;
  title: string;
  description: string;
  subDescription?: string;
  image: string;
  link: string;
}

// 宣言的な世界の話題
const declarativeTopic: Topic = {
  id: 'declarative',
  title: '宣言的な世界',
  description: '宣言的UIを端に、歴史やクイズを通して、モダン開発のパラダイムを理解する',
  subDescription: '……客船クイーンエリザベスとグラン・マルニエを添えて',
  image: '/declarative/next/img/宣言的UI.png',
  link: '/slides',
};

// すべての話題のリスト
export const topics: Topic[] = [
  declarativeTopic,
  // 将来的に他の話題を追加できるようにしておく
];

// すべての話題を取得する関数
export function getAllTopics(): Topic[] {
  return topics;
}

// IDで特定の話題を取得する関数
export function getTopicById(id: string): Topic | undefined {
  return topics.find((topic) => topic.id === id);
}
