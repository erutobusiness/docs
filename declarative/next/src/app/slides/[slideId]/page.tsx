import SlideShow from '@/components/SlideShow';
import { getAllSlideSections, getSlideSection } from '@/data/slideData';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface SlidePageProps {
  params: {
    slideId: string;
  };
}

export async function generateStaticParams() {
  const slideSections = getAllSlideSections();

  return slideSections.map((section) => ({
    slideId: encodeURIComponent(section.id),
  }));
}

export default function SlidePage({ params }: SlidePageProps) {
  const { slideId } = params;
  // URLからのパラメータをデコードして元のIDに戻す
  const decodedSlideId = decodeURIComponent(slideId);

  // スライドIDから対応するセクションを取得
  const slideSection = getSlideSection(decodedSlideId);

  if (!slideSection) {
    return notFound();
  }

  return (
    <main className="bg-gradient-to-br from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] min-h-screen">
      <div className="fixed top-4 left-4 z-10">
        <Link
          href="/"
          className="bg-[var(--button-secondary-bg)] shadow-md rounded-lg px-4 py-2 text-[var(--button-secondary-fg)] hover:bg-[var(--button-secondary-hover)] transition flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-labelledby="backButtonTitle"
          >
            <title id="backButtonTitle">戻るボタン</title>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          ホームに戻る
        </Link>
      </div>

      <SlideShow slideSection={slideSection} />
    </main>
  );
}
