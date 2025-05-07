'use client';

import { getAllSlideSections } from '@/data/slideData';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const slideSections = getAllSlideSections();

  return (
    <main className="relative min-h-screen w-full">
      {/* 背景画像 */}
      <div className="absolute inset-0 p-8 mt-16 flex items-center justify-center">
        <div className="relative w-full max-w-8xl h-[70vh] overflow-hidden rounded-xl opacity-75">
          <Image
            src="/img/PXL_20250426_045936180.PORTRAIT.ORIGINAL~2.jpg"
            alt="Queen Elizabeth"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* コンテンツコンテナ - 元のスタイリングを維持 */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-12 p-8 rounded-lg shadow-md backdrop-blur-sm bg-[var(--background)]/70">
          <h1 className="text-4xl font-bold mb-4 text-[var(--primary)]">宣言的な世界</h1>
          <p className="text-xl">
            宣言的UIを端に、歴史やクイズを通して、モダン開発のパラダイムを理解する
          </p>
          <p className="text-sm">……客船クイーンエリザベスとグラン・マルニエを添えて</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slideSections.map((section) => (
            <Link key={section.id} href={`/slides/${section.id}`} className="block">
              <div className="p-6 rounded-lg shadow-md transition-transform hover:scale-105 bg-[var(--background)]/80 backdrop-blur-sm border border-[var(--accent-dark)]">
                <h2 className="text-xl font-bold mb-2 text-[var(--primary-light)]">
                  {section.title}
                </h2>
                <p>{section.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
