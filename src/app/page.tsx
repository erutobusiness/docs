'use client';

import { getAllTopics } from '@declarative/data/topics';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const topics = getAllTopics();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] p-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-[var(--primary)]">プレゼンテーション</h1>
          <p className="text-xl text-[var(--foreground)]">話題を選んでください</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={topic.link}
              className="group flex flex-col bg-[var(--background)] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={topic.image}
                  alt={topic.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-[var(--primary)]">{topic.title}</h2>
                <p className="text-[var(--foreground)]">{topic.description}</p>
                {topic.subDescription && (
                  <p className="text-sm text-[var(--foreground)] mt-1">{topic.subDescription}</p>
                )}
                <div className="mt-4 inline-block px-4 py-2 bg-[var(--button-primary-bg)] text-[var(--button-primary-fg)] rounded-lg hover:bg-[var(--button-primary-hover)] transition-colors">
                  選択する
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 将来的に追加可能な話題の案内 */}
        {topics.length === 1 && (
          <div className="mt-12 text-center text-[var(--foreground)]">
            <p>今後、より多くの話題が追加される予定です。</p>
          </div>
        )}
      </div>
    </main>
  );
}
