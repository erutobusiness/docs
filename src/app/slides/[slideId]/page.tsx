import '@declarative/theme.css';
import '@theArtOfLoving/theme.css';
import IconButton from '@/components/IconButton';
import SlideShow from '@/components/SlideShow';
import SlideThemeLoader from '@/components/SlideThemeLoader';
import {
  getAllSlideSections as getAllDeclarativeSlideSections,
  getSlideSection as getDeclarativeSlideSection,
} from '@declarative/data/slideData';
import { HomeIcon } from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';
import {
  getAllSlideSections as getAllTheArtOfLovingSlideSections,
  getSlideSection as getTheArtOfLovingSlideSection,
} from '@theArtOfLoving/data/slideData';

type SlidePageProps = {
  params: Promise<{
    slideId: string;
  }>;
};

export async function generateStaticParams() {
  const declarativeSections = getAllDeclarativeSlideSections().map((section) => ({
    slideId: `declarative-${encodeURIComponent(section.id)}`,
  }));
  const theArtOfLovingSections = getAllTheArtOfLovingSlideSections().map((section) => ({
    slideId: `theArtOfLoving-${encodeURIComponent(section.id)}`,
  }));

  return [...declarativeSections, ...theArtOfLovingSections];
}

export default async function SlidePage({ params }: SlidePageProps) {
  const { slideId } = await params;
  const [slideType, ...rest] = slideId.split('-');
  const decodedSlideId = decodeURIComponent(rest.join('-'));

  let slideSection = undefined;
  if (slideType === 'declarative') {
    slideSection = getDeclarativeSlideSection(decodedSlideId);
  } else if (slideType === 'theArtOfLoving') {
    slideSection = getTheArtOfLovingSlideSection(decodedSlideId);
  }

  if (!slideSection) {
    return notFound();
  }
  return (
    <main className="bg-linear-to-br from-[var(--slide-gradient-to)] to-[var(--slide-gradient-from)] min-h-screen">
      <SlideThemeLoader slideType={slideType} />
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
