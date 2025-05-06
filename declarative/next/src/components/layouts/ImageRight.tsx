'use client';

import type { Slide } from '@/types/slides';
import CodeBlock from '../common/CodeBlock';
import Descriptions from '../common/Descriptions';
import SlideImage from '../common/SlideImage';

interface ImageRightProps {
  slide: Slide;
  isTextSelectMode?: boolean;
}

export default function ImageRight({ slide, isTextSelectMode = false }: ImageRightProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
      {/* コンテンツがある場合は表示 */}
      {slide.image?.descriptions && slide.image?.descriptions.length > 0 && (
        <Descriptions contents={slide.image?.descriptions} />
      )}

      {/* 画像がある場合は表示 */}
      {slide.image && (
        <div className="mb-4 sm:mb-6">
          <SlideImage
            imageUrl={slide.image.url}
            altText={`${slide.title}の図解`}
            isTextSelectMode={isTextSelectMode}
          />
        </div>
      )}
    </div>
  );
}
