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
    <div
      className="w-full max-w-5xl mx-auto my-8 p-6 rounded-xl shadow-lg"
      style={{
        background:
          'linear-gradient(to bottom right, var(--gradient-primary-from), var(--gradient-primary-to))',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--primary-dark)',
      }}
    >
      <h1
        className="text-3xl font-bold mb-6 pb-2"
        style={{
          color: 'var(--button-secondary-fg)',
          borderBottom: '1px solid var(--primary-dark)',
        }}
      >
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
                isActive ? 'shadow-md transform scale-105' : 'hover:shadow-md'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--primary)' : 'var(--primary-dark)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: isActive ? 'var(--primary-light)' : 'var(--primary)',
                color: isActive ? 'var(--button-primary-fg)' : 'var(--button-secondary-fg)',
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--primary-dark)';
                }
              }}
            >
              <div
                className="font-semibold text-lg mb-2"
                style={{
                  color: isActive ? 'var(--button-primary-fg)' : 'var(--button-secondary-fg)',
                }}
              >
                {section.title}
              </div>
              {section.description && (
                <p
                  className="text-sm"
                  style={{
                    color: isActive ? 'var(--color-indigo-200)' : 'var(--color-indigo-300)',
                  }}
                >
                  {section.description}
                </p>
              )}
              <div
                className="mt-2 text-xs"
                style={{ color: isActive ? 'var(--color-indigo-300)' : 'var(--color-indigo-400)' }}
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
