import IconButton from '@/components/IconButton';
import SlideShow from '@/components/SlideShow';
import { getAllSlideSections, getSlideSection } from '@/data/slideData';
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
        <IconButton href="/" />
      </div>

      <SlideShow slideSection={slideSection} />
    </main>
  );
}
