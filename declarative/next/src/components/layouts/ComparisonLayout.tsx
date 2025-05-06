'use client';

import type { Slide } from '@/types/slides';
import CodeBlock from '../common/CodeBlock';

interface ComparisonLayoutProps {
  slide: Slide;
}

export default function ComparisonLayout({ slide }: ComparisonLayoutProps) {
  return (
    <>
      {/* 共通の説明文がある場合は上部に表示 */}
      {slide.content.length > 0 && (
        <div className="mb-6">
          {slide.content.map((text) => (
            <p key={text} className="text-xl sm:text-2xl mb-2 text-[var(--card-fg)]">
              {text}
            </p>
          ))}
        </div>
      )}

      {/* 左右に分けたコードブロックと説明文 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slide.codeExamples?.map((codeExample) => (
          <div key={codeExample.code} className="flex flex-col">
            {codeExample.title && (
              <h3 className="text-xl font-semibold mb-3 text-[var(--card-fg)]">
                {codeExample.title}
              </h3>
            )}

            {/* 個別の説明文がある場合は表示 */}
            {codeExample.description && codeExample.description.length > 0 && (
              <div className="mb-3">
                {codeExample.description.map((desc) => (
                  <p key={desc} className="mb-2 text-lg text-[var(--card-fg)]">
                    {desc}
                  </p>
                ))}
              </div>
            )}

            <div className="flex-grow">
              <CodeBlock code={codeExample.code} language={codeExample.language} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
