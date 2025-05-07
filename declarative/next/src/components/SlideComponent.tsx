'use client';

import type { Slide } from '@/types/slides';
import { Suspense } from 'react';
import CodeBlock from './common/CodeBlock';
import Descriptions from './common/Descriptions';
import ListComponent from './common/ListComponent';
import TableComponent from './common/TableComponent';
import CodeComparison from './layouts/CodeComparison';
import ImageBottom from './layouts/ImageBottom';
import ImageRight from './layouts/ImageRight';

interface SlideComponentProps {
  slide: Slide;
  isTextSelectMode?: boolean;
}

export default function SlideComponent({ slide, isTextSelectMode = false }: SlideComponentProps) {
  return (
    <div className="rounded-xl shadow-2xl overflow-hidden max-w-1920 max-h-1080 flex flex-col bg-linear-to-br from-(--gradient-accent-from) to-(--gradient-accent-to) border border-(--accent-dark)">
      <div className="p-8 overflow-y-auto grow">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 pb-2 text-(--card-fg)">
          {slide.title}
        </h2>

        <div className="mx-4 sm:mx-8">
          {/* コンテンツがある場合は表示 */}
          {slide.descriptions && slide.descriptions.length > 0 && (
            <div className="mb-4">
              <Descriptions contents={slide.descriptions} />
            </div>
          )}

          {/* テーブルがある場合は表示 */}
          {slide.table && <TableComponent headers={slide.table.headers} rows={slide.table.rows} />}
          {/* グループ化リストがある場合は表示 */}
          {slide.list && <ListComponent groups={slide.list.groups} />}

          {/* コードがある場合は表示 */}
          {slide.codeExample && (
            <div className="mb-4">
              <Suspense fallback={<div className="h-8" />}>
                <CodeBlock code={slide.codeExample.code} language={slide.codeExample.language} />
              </Suspense>
            </div>
          )}
          {/* コードリストがある場合は表示 */}
          {slide.codeExamples && slide.codeExamples.length > 0 && (
            <CodeComparison codeExamples={slide.codeExamples} />
          )}

          {/* 画像がある場合は表示 */}
          {slide.image && slide.image.position === 'right' ? (
            <ImageRight slide={slide} isTextSelectMode={isTextSelectMode} />
          ) : (
            <ImageBottom slide={slide} isTextSelectMode={isTextSelectMode} />
          )}

          {/* ビデオがある場合は表示 */}
          {slide.video && (
            <div className="w-full flex justify-center items-center pointer-events-none">
              <video autoPlay muted loop className="w-auto h-auto max-h-96 rounded-lg shadow-lg">
                <source src={slide.video.url} type="video/mp4" />
                {/* <track kind="captions" srcLang="ja" src="" /> */}
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
