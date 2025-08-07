import type { SlideSection } from '@/types/slides';

// 各セクションのインポート
import { introSection } from './01-intro';

// すべてのスライドセクションの配列
export const slideSections: SlideSection[] = [
  introSection,
];

// 特定のスライドセクションを取得する関数
export function getSlideSection(id: string): SlideSection | undefined {
  return slideSections.find((section) => section.id === id);
}

// すべてのスライドセクションを取得する関数
export function getAllSlideSections(): SlideSection[] {
  return slideSections;
}
