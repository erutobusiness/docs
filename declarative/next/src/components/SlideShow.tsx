'use client';

import { useSlideShow } from '@/hooks/useSlideShow';
import { Slide } from '@/types/slides';
import type { SlideSection } from '@/types/slides';
import SlideComponent from './SlideComponent';

interface SlideShowProps {
  slideSection: SlideSection;
}

export default function SlideShow({ slideSection }: SlideShowProps) {
  const {
    currentSlideIndex,
    isFullScreen,
    goToNextSlide,
    goToPrevSlide,
    toggleFullScreen,
    hasNextSlide,
    hasPrevSlide,
  } = useSlideShow(slideSection);

  if (!slideSection || !slideSection.slides || slideSection.slides.length === 0) {
    return <div className="p-8">スライドがありません。</div>;
  }

  const currentSlide = slideSection.slides[currentSlideIndex];

  return (
    <div className="relative">
      <SlideComponent slide={currentSlide} />

      <div className="fixed bottom-4 left-0 right-0 flex justify-center items-center gap-4 z-10">
        <button
          type="button"
          onClick={goToPrevSlide}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition ${!hasPrevSlide ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!hasPrevSlide}
        >
          前へ
        </button>

        <span className="text-sm font-medium text-gray-800 bg-white px-3 py-1 rounded shadow">
          {currentSlideIndex + 1} / {slideSection.slides.length}
        </span>

        <button
          type="button"
          onClick={goToNextSlide}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition ${!hasNextSlide ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!hasNextSlide}
        >
          次へ
        </button>

        <button
          type="button"
          onClick={toggleFullScreen}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
        >
          {isFullScreen ? 'フルスクリーン解除' : 'フルスクリーン'}
        </button>
      </div>
    </div>
  );
}
