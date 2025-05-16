import IconButton from '@/components/IconButton';
import { getAllCases } from '@gyakusai/data/caseData';
import { HomeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function GyakusaiHomePage() {
  // すべてのケース情報を取得
  const cases = getAllCases();

  return (
    <main className="bg-linear-to-br from-blue-900 to-gray-900 min-h-screen p-8">
      <div className="fixed top-4 left-4 z-10">
        <IconButton
          href="/"
          icon={<HomeIcon className="w-6 h-6 icon-color" />}
          ariaLabel="ホームに戻る"
        />
      </div>

      <div className="max-w-6xl mx-auto pt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            逆転裁判
            <span className="block text-2xl md:text-3xl mt-2 text-blue-300">真実は一つ！</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            熱い法廷バトルで真実を暴け！
            証拠を集め、矛盾を突き、「異議あり！」で相手の主張を論破しよう。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem) => (
            <Link
              href={`/gyakusai/${encodeURIComponent(caseItem.id)}`}
              key={caseItem.id}
              className="block group"
            >
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 border border-blue-800 hover:border-blue-400">
                <div className="relative h-48">
                  <Image src={caseItem.image} alt={caseItem.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white mb-1">{caseItem.title}</h2>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-300">{caseItem.description}</p>
                  <div className="mt-4 flex justify-end">
                    <span className="inline-block bg-blue-700 text-white px-4 py-2 rounded font-bold group-hover:bg-blue-500 transition-colors">
                      開始する
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
