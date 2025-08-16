import type { SlideSection } from '@/types/slides';

// 各セクションのインポート
import { introSection } from './01-intro';

// すべてのスライドセクションの配列
export const slideSections: SlideSection[] = [introSection];

// 特定のスライドセクションを取得する関数
export function getSlideSection(id: string): SlideSection | undefined {
  return slideSections.find((section) => section.id === id);
}

// すべてのスライドセクションを取得する関数
export function getAllSlideSections(): SlideSection[] {
  return slideSections;
}

// スライドページのデータ
export const slidesPageData = {
  title: '「愛するということ」を読んで',
  description: 'エーリヒ・フロムの「愛するということ」を読んだので、LT形式でまとめてみた',
  subDescription: '……愛することはなぜ技術なのか？',
  backgroundImage: '/theArtOfLoving/Queen_Elizabeth.jpg',
};

// スライドページのデータを取得する関数
export function getSlidesPageData() {
  return slidesPageData;
}
