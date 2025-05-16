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
  image: '/declarative/Decralative_Top.png',
  link: '/slides',
};

// 逆転裁判風の話題
const gyakusaiTopic: Topic = {
  id: 'gyakusai',
  title: '逆転裁判風',
  description: '逆転裁判風のインタラクティブな体験で、法廷の熱い駆け引きを楽しむ',
  subDescription: '……証拠と論理で真実を暴け！',
  image: '/gyakusai/Gyakusai_Top.png',
  link: '/gyakusai',
};

// すべての話題のリスト
export const topics: Topic[] = [
  declarativeTopic,
  gyakusaiTopic,
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
