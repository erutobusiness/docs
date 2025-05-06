'use client';

import type { Slide } from '@/types/slides';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SlideComponentProps {
  slide: Slide;
}

export default function SlideComponent({ slide }: SlideComponentProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="rounded-xl shadow-2xl overflow-hidden w-full bg-gradient-to-br from-[var(--gradient-accent-from)] to-[var(--gradient-accent-to)] border border-[var(--accent-dark)]">
      <div className="p-4 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 pb-2 text-[var(--card-fg)]">
          {slide.title}
        </h2>

        {/* 通常のコンテンツレイアウト */}
        {(!slide.codeExamples || slide.codeExamples.length <= 1) && (
          <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
            <div className="flex-1">
              {slide.content.map((text) => (
                <p key={text} className="mb-2 sm:mb-4 text-[var(--card-fg)]">
                  {text}
                </p>
              ))}
            </div>

            {(slide.imageUrl || slide.codeExample) && (
              <div className="flex-1">
                {slide.imageUrl && (
                  <div className="mb-4 sm:mb-6 relative w-full h-64 sm:h-80 rounded-lg overflow-hidden border border-[var(--accent-dark)]">
                    {isMounted ? (
                      <Image
                        src={slide.imageUrl}
                        alt={`${slide.title}の図解`}
                        fill
                        className="object-contain bg-slate-800"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[var(--background)] text-[var(--card-fg)]">
                        画像読み込み中...
                      </div>
                    )}
                  </div>
                )}

                {slide.codeExample && (
                  <div className="rounded-lg p-3 sm:p-4 overflow-auto max-h-[400px] bg-[var(--background)] border border-[var(--primary-dark)]">
                    <pre className="text-xs sm:text-sm text-[var(--accent-light)]">
                      <code>{slide.codeExample.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 左右対比用のレイアウト（codeExamplesが複数ある場合） */}
        {slide.codeExamples && slide.codeExamples.length > 1 && (
          <>
            {/* 共通の説明文がある場合は上部に表示 */}
            {slide.content.length > 0 && (
              <div className="mb-6">
                {slide.content.map((text) => (
                  <p key={text} className="mb-2 text-[var(--card-fg)]">
                    {text}
                  </p>
                ))}
              </div>
            )}

            {/* 左右に分けたコードブロックと説明文 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slide.codeExamples.map((codeExample) => (
                <div key={codeExample.code} className="flex flex-col">
                  {codeExample.title && (
                    <h3 className="text-lg font-semibold mb-3 text-[var(--card-fg)]">
                      {codeExample.title}
                    </h3>
                  )}

                  {/* 個別の説明文がある場合は表示 */}
                  {codeExample.description && codeExample.description.length > 0 && (
                    <div className="mb-3">
                      {codeExample.description.map((desc) => (
                        <p key={desc} className="mb-2 text-sm text-[var(--card-fg)]">
                          {desc}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="rounded-lg p-3 sm:p-4 overflow-auto max-h-[400px] flex-grow bg-[var(--background)] border border-[var(--primary-dark)]">
                    <pre className="text-xs sm:text-sm text-[var(--accent-light)]">
                      <code>{codeExample.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
