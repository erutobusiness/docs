'use client';

import type { Slide } from '@/types/slides';
import CodeBlock from '../common/CodeBlock';
import Descriptions from '../common/Descriptions';
import SlideImage from '../common/SlideImage';

interface ImageBottomProps {
  slide: Slide;
  isTextSelectMode?: boolean;
}

export default function ImageBottom({ slide, isTextSelectMode = false }: ImageBottomProps) {
  return (
    <div className="flex flex-col">
      {/* コンテンツがある場合は表示 */}
      {slide.image?.descriptions && slide.image?.descriptions.length > 0 && (
        <Descriptions contents={slide.image?.descriptions} />
      )}

      {/* 画像がある場合は表示 */}
      {slide.image && (
        <SlideImage
          imageUrl={slide.image.url}
          altText={`${slide.title}の図解`}
          isTextSelectMode={isTextSelectMode}
        />
      )}
    </div>
  );
}
