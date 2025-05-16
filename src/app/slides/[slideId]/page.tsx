import IconButton from '@/components/IconButton';
import SlideShow from '@/components/SlideShow';
import { getAllSlideSections, getSlideSection } from '@declarative/data/slideData';
import { HomeIcon } from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';

type SlidePageProps = {
  params: Promise<{
    slideId: string;
  }>;
};

export async function generateStaticParams() {
  const slideSections = getAllSlideSections();

  return slideSections.map((section) => ({
    slideId: encodeURIComponent(section.id),
  }));
}

export default async function SlidePage({ params }: SlidePageProps) {
  // params を await して解決する
  const { slideId } = await params;
  const decodedSlideId = decodeURIComponent(slideId);

  // スライドIDから対応するセクションを取得
  const slideSection = getSlideSection(decodedSlideId);

  if (!slideSection) {
    return notFound();
  }
  return (
    <main className="bg-linear-to-br from-(--declarative-gradient-primary-to) to-(--declarative-gradient-primary-from) min-h-screen">
      <div className="fixed top-4 left-4 z-10">
        <IconButton
          href="/"
          icon={<HomeIcon className="w-6 h-6 icon-color" />}
          ariaLabel="ホームに戻る"
        />
      </div>

      <SlideShow slideSection={slideSection} />
    </main>
  );
}
