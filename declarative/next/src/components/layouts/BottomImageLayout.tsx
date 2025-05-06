'use client';

import type { Slide } from '@/types/slides';
import CodeBlock from '../common/CodeBlock';
import SlideImage from '../common/SlideImage';

interface BottomImageLayoutProps {
  slide: Slide;
  isTextSelectMode?: boolean;
}

export default function BottomImageLayout({
  slide,
  isTextSelectMode = false,
}: BottomImageLayoutProps) {
  return (
    <div className="flex flex-col gap-4 sm:gap-8">
      <div className="w-full">
        {slide.content.map((text) => (
          <p key={text} className="text-xl sm:text-2xl mb-2 sm:mb-4 text-[var(--card-fg)]">
            {text}
          </p>
        ))}

        {slide.codeExample && (
          <div className="mb-4 sm:mb-6">
            <CodeBlock code={slide.codeExample.code} language={slide.codeExample.language} />
          </div>
        )}
      </div>

      {slide.imageUrl && (
        <SlideImage
          imageUrl={slide.imageUrl}
          altText={`${slide.title}の図解`}
          isTextSelectMode={isTextSelectMode}
        />
      )}
    </div>
  );
}
