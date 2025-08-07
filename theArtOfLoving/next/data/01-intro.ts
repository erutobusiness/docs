import type { SlideSection } from '@/types/slides';

// イントロダクションセクションのスライドデータ
export const introSection: SlideSection = {
  id: '01-intro',
  title: '愛するということ',
  description: 'エーリヒ・フロム「愛するということ」の紹介',
  slides: [
    {
      id: '01-intro-1',
      title: '愛は技術である',
      descriptions: [
        '愛は、たまたま落ちるものではなく、技術である。',
        '他の技術と同じように、理論を学び、実践を積む必要がある。',
      ],
    },
  ],
};
