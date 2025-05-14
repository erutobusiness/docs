'use client';

import { getAllSlideSections } from '@/data/slideData';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const slideSections = getAllSlideSections();

  return (
    <main className="relative min-h-screen w-full">
      {/* 背景画像 */}
      <div className="absolute inset-0 p-8 mt-16 flex justify-center">
        <div className="relative w-[50vw] overflow-hidden rounded-xl opacity-75">
          <Image
            src="./img/PXL_20250426_045936180.PORTRAIT.ORIGINAL~2.jpg"
            alt="Queen Elizabeth"
            width={1000}
            height={1000}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* コンテンツコンテナ */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-12 p-8 rounded-lg shadow-md backdrop-blur-sm bg-white/70 dark:bg-black/70">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">宣言的な世界</h1>
          <p className="text-xl">
            宣言的UIを端に、歴史やクイズを通して、モダン開発のパラダイムを理解する
          </p>
          <p className="text-sm">……客船クイーンエリザベスとグラン・マルニエを添えて</p>
        </div>

        {/* セクション一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slideSections.map((section) => (
            <Link
              key={section.id}
              href={`/slides/${section.id}`}
              className="block p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/50 dark:bg-black/50 hover:bg-white/70 dark:hover:bg-black/70 transition-colors"
            >
              <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {section.description || '説明なし'}
              </p>
              <div className="mt-4 text-sm text-blue-600 dark:text-blue-400">
                スライドを見る &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
