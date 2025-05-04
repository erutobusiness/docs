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
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-8">
      <div className="w-full max-w-5xl bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-2xl overflow-hidden border border-amber-200">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b border-amber-200 pb-2">
            {slide.title}
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              {slide.content.map((text) => (
                <p key={text} className="text-slate-700 mb-4">
                  {text}
                </p>
              ))}
            </div>

            {(slide.imageUrl || slide.codeExample) && (
              <div className="flex-1">
                {slide.imageUrl && (
                  <div className="mb-6 relative w-full h-64 border border-amber-200 rounded-lg overflow-hidden">
                    {isMounted ? (
                      <Image
                        src={slide.imageUrl}
                        alt={`${slide.title}の図解`}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-amber-50 flex items-center justify-center text-slate-600">
                        画像読み込み中...
                      </div>
                    )}
                  </div>
                )}

                {slide.codeExample && (
                  <div className="bg-slate-900 rounded-lg p-4 overflow-auto border border-slate-700">
                    <pre className="text-sm text-amber-100">
                      <code>{slide.codeExample.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
