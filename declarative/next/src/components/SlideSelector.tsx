'use client';

import type { SlideSection } from '@/types/slides';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SlideSelectorProps {
  slideSections: SlideSection[];
}

export default function SlideSelector({ slideSections }: SlideSelectorProps) {
  const pathname = usePathname();

  return (
    <div className="w-full max-w-5xl mx-auto my-8 p-6 bg-gradient-to-br from-indigo-900 to-black rounded-xl shadow-lg border border-indigo-700">
      <h1 className="text-3xl font-bold text-indigo-50 mb-6 border-b border-indigo-700 pb-2">
        宣言的UIスライドショー
      </h1>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {slideSections.map((section) => {
          // スライドIDをURLセーフにエンコード
          const encodedId = encodeURIComponent(section.id);
          const isActive = pathname === `/slides/${encodedId}`;

          return (
            <Link
              key={section.id}
              href={`/slides/${encodedId}`}
              className={`block p-5 rounded-lg transition-all ${
                isActive
                  ? 'bg-indigo-800 text-indigo-50 shadow-md transform scale-105 border border-indigo-600'
                  : 'bg-indigo-950 hover:bg-indigo-900 hover:shadow-md border border-indigo-800'
              }`}
            >
              <div
                className={`font-semibold text-lg mb-2 ${isActive ? 'text-indigo-50' : 'text-indigo-100'}`}
              >
                {section.title}
              </div>
              {section.description && (
                <p className={`text-sm ${isActive ? 'text-indigo-200' : 'text-indigo-300'}`}>
                  {section.description}
                </p>
              )}
              <div className={`mt-2 text-xs ${isActive ? 'text-indigo-300' : 'text-indigo-400'}`}>
                {section.slides.length}枚のスライド
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
