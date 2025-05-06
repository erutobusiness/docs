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
    <div className="w-full max-w-5xl mx-auto my-8 p-6 rounded-xl shadow-lg bg-gradient-to-br from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] border border-[var(--primary-dark)]">
      <h1 className="text-3xl font-bold mb-6 pb-2 text-[var(--button-secondary-fg)] border-b border-[var(--primary-dark)]">
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
                  ? 'shadow-md transform scale-105 bg-[var(--primary)] border border-[var(--primary-light)] text-[var(--button-primary-fg)]'
                  : 'hover:shadow-md bg-[var(--primary-dark)] border border-[var(--primary)] text-[var(--button-secondary-fg)] hover:bg-[var(--primary)]'
              }`}
            >
              <div
                className={`font-semibold text-lg mb-2 ${
                  isActive ? 'text-[var(--button-primary-fg)]' : 'text-[var(--button-secondary-fg)]'
                }`}
              >
                {section.title}
              </div>
              {section.description && (
                <p
                  className={`text-sm ${
                    isActive ? 'text-[var(--color-indigo-200)]' : 'text-[var(--color-indigo-300)]'
                  }`}
                >
                  {section.description}
                </p>
              )}
              <div
                className={`mt-2 text-xs ${
                  isActive ? 'text-[var(--color-indigo-300)]' : 'text-[var(--color-indigo-400)]'
                }`}
              >
                {section.slides.length}枚のスライド
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
