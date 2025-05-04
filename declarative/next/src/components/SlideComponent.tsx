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
    <div
      className="rounded-xl shadow-2xl overflow-hidden w-full"
      style={{
        background:
          'linear-gradient(to bottom right, var(--gradient-accent-from), var(--gradient-accent-to))',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--accent-dark)',
      }}
    >
      <div className="p-4 sm:p-8">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 pb-2"
          style={{
            color: 'var(--card-fg)',
            borderBottom: '1px solid var(--accent-dark)',
          }}
        >
          {slide.title}
        </h2>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
          <div className="flex-1">
            {slide.content.map((text) => (
              <p key={text} className="mb-2 sm:mb-4" style={{ color: 'var(--card-fg)' }}>
                {text}
              </p>
            ))}
          </div>

          {(slide.imageUrl || slide.codeExample) && (
            <div className="flex-1">
              {slide.imageUrl && (
                <div
                  className="mb-4 sm:mb-6 relative w-full h-48 sm:h-64 rounded-lg overflow-hidden"
                  style={{
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--accent-dark)',
                  }}
                >
                  {isMounted ? (
                    <Image
                      src={slide.imageUrl}
                      alt={`${slide.title}の図解`}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        backgroundColor: 'var(--accent-light)',
                        color: 'var(--card-fg)',
                      }}
                    >
                      画像読み込み中...
                    </div>
                  )}
                </div>
              )}

              {slide.codeExample && (
                <div
                  className="rounded-lg p-3 sm:p-4 overflow-auto max-h-[300px]"
                  style={{
                    backgroundColor: 'var(--color-gray-900)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--color-gray-700)',
                  }}
                >
                  <pre className="text-xs sm:text-sm" style={{ color: 'var(--accent)' }}>
                    <code>{slide.codeExample.code}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
