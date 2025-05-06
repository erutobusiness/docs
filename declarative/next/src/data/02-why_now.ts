import type { SlideSection } from '@/types/slides';

// 宣言的・宣言性を学ぶメリットセクションのスライドデータ
export const whyNowSection: SlideSection = {
  id: '02-why_now',
  title: '宣言的・宣言性を学ぶメリット',
  description: '宣言的アプローチがなぜ現代の開発に適しているのかを解説',
  slides: [
    {
      id: '02-why-1',
      title: '複雑なUIを管理しやすい',
      content: [
        'モダンWebアプリケーションはUIの複雑さが増しています',
        '宣言的アプローチは状態管理を簡潔にし、UIの一貫性を保ちやすくします',
        '複雑な状態遷移もデータフローとして捉えられるため、デバッグが容易になります',
      ],
    },
    {
      id: '02-why-2',
      title: '幅広いプラットフォームへの応用',
      content: [
        '宣言的UIの考え方は様々なフレームワークで採用されています：',
        'Web: React, Vue, Svelte',
        'モバイル: SwiftUI, Flutter, React Native',
        'デスクトップ: WPF (XAML), JavaFX',
      ],
      imageUrl: '/images/cross-platform.png',
    },
    {
      id: '02-why-3',
      title: '将来性と学習効率',
      content: [
        '一度宣言的UIの概念を理解すれば、異なるフレームワーク間の知識移行が容易に',
        '新しいフレームワークの習得が早くなります',
        'AI時代のプログラミングとの親和性が高い：AIは「何をしたいか」を理解するのが得意ですが、「どう実装するか」の詳細を理解するのは苦手です',
      ],
    },
  ],
};
