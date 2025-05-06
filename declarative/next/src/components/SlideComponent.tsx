'use client';

import type { Slide } from '@/types/slides';
import BottomImageLayout from './layouts/BottomImageLayout';
import ComparisonLayout from './layouts/ComparisonLayout';
import RightImageLayout from './layouts/RightImageLayout';

interface SlideComponentProps {
  slide: Slide;
  isTextSelectMode?: boolean;
}

export default function SlideComponent({ slide, isTextSelectMode = false }: SlideComponentProps) {
  return (
    <div className="rounded-xl shadow-2xl overflow-hidden w-full bg-gradient-to-br from-[var(--gradient-accent-from)] to-[var(--gradient-accent-to)] border border-[var(--accent-dark)]">
      <div className="p-4 sm:p-8">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 pb-2 text-[var(--card-fg)]">
          {slide.title}
        </h2>

        {/* コンテンツの分岐処理 */}
        {!slide.codeExamples || slide.codeExamples.length <= 1 ? (
          // 通常レイアウト（右または下に画像）
          <>
            {!slide.imagePosition || slide.imagePosition === 'right' ? (
              <RightImageLayout slide={slide} isTextSelectMode={isTextSelectMode} />
            ) : (
              <BottomImageLayout slide={slide} isTextSelectMode={isTextSelectMode} />
            )}
          </>
        ) : (
          // 左右対比レイアウト
          <ComparisonLayout slide={slide} />
        )}
      </div>
    </div>
  );
}
