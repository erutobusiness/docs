'use client';

import { useFullScreen } from '@/hooks/useFullScreen';
import { useSlideShow } from '@/hooks/useSlideShow';
import { useTextSelectMode } from '@/hooks/useTextSelectMode';
import type { SlideSection } from '@/types/slides';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  CursorArrowRaysIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import IconButton from './IconButton';
import SlideComponent from './SlideComponent';
import WaveAnimation from './animations/WaveAnimation';

interface SlideShowProps {
  slideSection: SlideSection;
}

export default function SlideShow({ slideSection }: SlideShowProps) {
  // フルスクリーン機能を直接useFullScreenから取得
  const { isFullScreen, toggleFullScreen } = useFullScreen();

  // テキスト選択モードの状態を新しいフックから取得
  const { isTextSelectMode, toggleTextSelectMode } = useTextSelectMode();

  // スライドショー機能をuseSlideShowから取得
  const {
    currentSlideIndex,
    goToNextSlide,
    goToPrevSlide,
    hasNextSlide,
    hasPrevSlide,
    handleScroll,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    dragOffset,
    isDragging,
    // 波アニメーション関連の状態と関数
    waveAnimationId,
    waveDirection,
    onWaveAnimationComplete,
  } = useSlideShow({
    slideSection,
    isTextSelectMode,
  });

  if (!slideSection || !slideSection.slides || slideSection.slides.length === 0) {
    return <div className="p-8">スライドがありません。</div>;
  }

  return (
    <div
      className={`relative overflow-hidden w-full min-h-screen flex flex-col ${isTextSelectMode ? 'select-text' : 'select-none'}`}
      onWheel={(e) => handleScroll(e)}
      onMouseDown={(e) => handleDragStart(e)}
      onMouseMove={(e) => handleDragMove(e)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e)}
      onTouchMove={(e) => handleDragMove(e)}
      onTouchEnd={handleDragEnd}
      style={{
        cursor: isDragging ? 'grabbing' : isTextSelectMode ? 'text' : 'grab',
      }}
    >
      {/* 波のアニメーションコンポーネントを追加 - アニメーションIDを使用 */}
      <WaveAnimation
        animationId={waveAnimationId}
        direction={waveDirection}
        onAnimationComplete={onWaveAnimationComplete}
      />

      {/* 右上のアイコンボタン */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <IconButton
          href="#"
          icon={
            isTextSelectMode ? (
              <DocumentTextIcon className="w-6 h-6 text-[var(--card-fg)]" />
            ) : (
              <CursorArrowRaysIcon className="w-6 h-6 text-[var(--card-fg)]" />
            )
          }
          ariaLabel="テキスト選択"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleTextSelectMode();
          }}
        />

        <IconButton
          href="#"
          icon={
            isFullScreen ? (
              <ArrowsPointingInIcon className="w-6 h-6 text-[var(--card-fg)]" />
            ) : (
              <ArrowsPointingOutIcon className="w-6 h-6 text-[var(--card-fg)]" />
            )
          }
          ariaLabel="フルスクリーン"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFullScreen();
          }}
        />
      </div>

      {/* スライダー本体を中央配置するためのコンテナ */}
      <div className="flex-1 flex items-center justify-center">
        {/* スライド全体を包むコンテナー - スムーズなトランジション用のクラスを適用 */}
        <div
          className={`flex slide-container w-full ${!isDragging ? 'transition-transform duration-300 ease-in-out' : ''}`}
          style={{
            transform: `translateX(calc(-${currentSlideIndex * 100}% + ${dragOffset}px))`,
            width: `${slideSection.slides.length * 100}%`,
          }}
        >
          {/* すべてのスライドを横に並べて表示 - ページめくり効果用のクラスを適用 */}
          {slideSection.slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 slide-item flex justify-center items-center px-4"
            >
              <div className="w-full max-w-5xl mx-auto">
                <SlideComponent slide={slide} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 下部のナビゲーションコントロール */}
      <div className="py-4 flex justify-center items-center gap-4 z-10 backdrop-blur-sm">
        <IconButton
          href="#"
          icon={<ArrowLeftIcon className="w-6 h-6 text-[var(--card-fg)]" />}
          ariaLabel="前へ"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // テキスト選択モードの場合は何もしない
            if (!isTextSelectMode && hasPrevSlide) goToPrevSlide();
          }}
          disabled={!hasPrevSlide || isTextSelectMode}
          className={!hasPrevSlide || isTextSelectMode ? 'opacity-50 cursor-not-allowed' : ''}
        />

        <span
          className="text-sm font-medium px-3 py-1 rounded shadow min-w-[60px] text-center h-10 flex items-center justify-center"
          style={{
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
          }}
        >
          {currentSlideIndex + 1} / {slideSection.slides.length}
        </span>

        <IconButton
          href="#"
          icon={<ArrowRightIcon className="w-6 h-6 text-[var(--card-fg)]" />}
          ariaLabel="次へ"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // テキスト選択モードの場合は何もしない
            if (!isTextSelectMode && hasNextSlide) goToNextSlide();
          }}
          disabled={!hasNextSlide || isTextSelectMode}
          className={!hasNextSlide || isTextSelectMode ? 'opacity-50 cursor-not-allowed' : ''}
        />
      </div>
    </div>
  );
}
