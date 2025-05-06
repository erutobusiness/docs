import { getAllSlideSections } from '@/data/slideData';
import Link from 'next/link';

export default function Home() {
  const slideSections = getAllSlideSections();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-12 p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-[var(--primary)]">宣言的な世界</h1>
        <p className="text-xl">
          宣言的UIを端に、歴史やクイズを通して、モダン開発のパラダイムを理解する
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slideSections.map((section) => (
          <Link key={section.id} href={`/slides/${section.id}`} className="block">
            <div className="p-6 rounded-lg shadow-md transition-transform hover:scale-105 bg-[var(--background)] border border-[var(--accent-dark)]">
              <h2 className="text-xl font-bold mb-2 text-[var(--primary-light)]">
                {section.title}
              </h2>
              <p>{section.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
