'use client';

import type { Slide } from '@/types/slides';
import CodeBlock from '../common/CodeBlock';
import SlideImage from '../common/SlideImage';

interface RightImageLayoutProps {
  slide: Slide;
  isTextSelectMode?: boolean;
}

export default function RightImageLayout({
  slide,
  isTextSelectMode = false,
}: RightImageLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
      <div className="flex-1">
        {slide.content.map((text) => (
          <p key={text} className="text-xl sm:text-2xl mb-2 sm:mb-4 text-[var(--card-fg)]">
            {text}
          </p>
        ))}

        {slide.codeExample && !slide.imageUrl && (
          <CodeBlock code={slide.codeExample.code} language={slide.codeExample.language} />
        )}
      </div>

      {(slide.imageUrl || (slide.codeExample && slide.imageUrl)) && (
        <div className="flex-1">
          {slide.imageUrl && (
            <div className="mb-4 sm:mb-6">
              <SlideImage
                imageUrl={slide.imageUrl}
                altText={`${slide.title}の図解`}
                isTextSelectMode={isTextSelectMode}
              />
            </div>
          )}

          {slide.codeExample && slide.imageUrl && (
            <CodeBlock code={slide.codeExample.code} language={slide.codeExample.language} />
          )}
        </div>
      )}
    </div>
  );
}
