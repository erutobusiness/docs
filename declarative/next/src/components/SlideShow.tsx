'use client';

import { useFullScreen } from '@/hooks/useFullScreen';
import { useSlideScaling } from '@/hooks/useSlideScaling';
import { useSlideShow } from '@/hooks/useSlideShow';
import { useTextSelectMode } from '@/hooks/useTextSelectMode';
import { useZoom } from '@/hooks/useZoom';
import type { SlideSection } from '@/types/slides';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  CursorArrowRaysIcon,
  DocumentTextIcon,
  MagnifyingGlassPlusIcon,
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

  // スケーリング係数を専用フックから取得
  const scaleFactor = useSlideScaling();

  // ズーム機能を取得（新しい実装）
  const { zoomFactor, isZoomEnabled, zoomOrigin, zoomAtPosition, toggleZoom, handleRightClick } =
    useZoom();

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
    animationId,
    animationDirection,
    handleAnimationComplete,
  } = useSlideShow({
    slideSection,
    isTextSelectMode,
  });

  if (!slideSection || !slideSection.slides || slideSection.slides.length === 0) {
    return <div className="p-8">スライドがありません。</div>;
  }

  return (
    <div
      className={`relative overflow-hidden w-full h-screen flex flex-col ${isTextSelectMode ? 'select-text' : 'select-none'} ${isDragging ? 'cursor-grabbing' : isTextSelectMode ? 'cursor-text' : isZoomEnabled ? 'cursor-zoom-in' : 'cursor-grab'}`}
      onWheel={(e) => handleScroll(e)}
      onMouseDown={(e) => {
        if (isZoomEnabled) {
          zoomAtPosition(e);
        } else {
          handleDragStart(e);
        }
      }}
      onMouseMove={(e) => {
        if (!isZoomEnabled) {
          handleDragMove(e);
        }
      }}
      onMouseUp={() => {
        if (!isZoomEnabled) {
          handleDragEnd();
        }
      }}
      onMouseLeave={() => {
        if (!isZoomEnabled) {
          handleDragEnd();
        }
      }}
      onTouchStart={(e) => {
        if (isZoomEnabled) {
          zoomAtPosition(e);
        } else {
          handleDragStart(e);
        }
      }}
      onTouchMove={(e) => {
        if (!isZoomEnabled) {
          handleDragMove(e);
        }
      }}
      onTouchEnd={() => {
        if (!isZoomEnabled) {
          handleDragEnd();
        }
      }}
      onContextMenu={(e) => {
        if (isZoomEnabled) {
          e.preventDefault();
          handleRightClick(e);
        }
      }}
      style={{
        transform: isZoomEnabled && zoomFactor > 1 ? `scale(${zoomFactor})` : 'scale(1)',
        transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
        transition: 'transform 0.2s ease-out',
      }}
    >
      {/* アニメーションコンポーネント */}
      <div className="absolute inset-0 origin-center pointer-events-none">
        <WaveAnimation
          animationId={animationId}
          direction={animationDirection}
          onAnimationComplete={handleAnimationComplete}
        />
      </div>

      {/* 右上のアイコンボタンとセクションタイトル */}
      <div className="absolute top-4 w-full pl-34 pr-4 flex justify-between items-center">
        {/* セクションタイトルを左揃えで表示 */}
        <div className="text-4xl font-medium text-(--primary)">{slideSection.title}</div>

        {/* アイコンボタン */}
        <div className="flex gap-2">
          <IconButton
            href="#"
            icon={
              isTextSelectMode ? (
                <DocumentTextIcon className="w-6 h-6 text-(--card-fg)" />
              ) : (
                <CursorArrowRaysIcon className="w-6 h-6 text-(--card-fg)" />
              )
            }
            ariaLabel="テキスト選択"
            enabled={isTextSelectMode}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleTextSelectMode();
            }}
          />

          <IconButton
            href="#"
            icon={
              isZoomEnabled ? (
                <MagnifyingGlassPlusIcon className="w-6 h-6 text-(--card-fg)" />
              ) : (
                <MagnifyingGlassPlusIcon className="w-6 h-6 text-(--card-fg)" />
              )
            }
            ariaLabel="拡大モード"
            enabled={isZoomEnabled}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleZoom();
            }}
          />

          <IconButton
            href="#"
            icon={
              isFullScreen ? (
                <ArrowsPointingInIcon className="w-6 h-6 text-(--card-fg)" />
              ) : (
                <ArrowsPointingOutIcon className="w-6 h-6 text-(--card-fg)" />
              )
            }
            ariaLabel="フルスクリーン"
            enabled={isFullScreen}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFullScreen();
            }}
          />
        </div>
      </div>

      {/* スライダー本体を中央配置するためのコンテナ */}
      <div className="flex-1 flex items-center justify-center overflow-hidden mt-16">
        {/* スライド全体を包むコンテナー */}
        <div
          className={`flex slide-container w-full ${!isDragging && 'transition-transform duration-300 ease-in-out'}`}
          style={{
            transform: `translateX(calc(-${currentSlideIndex * 100}% + ${dragOffset}px))`,
            width: `${slideSection.slides.length * 100}%`,
          }}
        >
          {/* すべてのスライドを横に並べて表示 */}
          {slideSection.slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full shrink-0 slide-item flex justify-center items-center px-8"
            >
              <div
                className="mx-auto origin-center transition-transform duration-300 ease-in-out"
                style={{
                  transform: `scale(${scaleFactor})`,
                }}
              >
                <SlideComponent slide={slide} isTextSelectMode={isTextSelectMode} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 下部のナビゲーションコントロール */}
      <div className="w-full py-4 flex justify-center items-center gap-4 backdrop-blur-sm bg-linear-to-t from-(--gradient-primary-from) to-transparent">
        <IconButton
          href="#"
          icon={<ArrowLeftIcon className="w-6 h-6 text-(--card-fg)" />}
          ariaLabel="前へ"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // テキスト選択モードの場合は何もしない
            if (!isTextSelectMode && hasPrevSlide) goToPrevSlide();
          }}
          disabled={!hasPrevSlide || isTextSelectMode || isZoomEnabled}
          className={
            !hasPrevSlide || isTextSelectMode || isZoomEnabled
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }
        />

        <span className="text-sm font-medium px-3 py-1 rounded shadow min-w-[60px] text-center h-10 flex items-center justify-center bg-(--background) text-(--foreground)">
          {currentSlideIndex + 1} / {slideSection.slides.length}
        </span>

        <IconButton
          href="#"
          icon={<ArrowRightIcon className="w-6 h-6 text-(--card-fg)" />}
          ariaLabel="次へ"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // テキスト選択モードの場合は何もしない
            if (!isTextSelectMode && hasNextSlide) goToNextSlide();
          }}
          disabled={!hasNextSlide || isTextSelectMode || isZoomEnabled}
          className={
            !hasNextSlide || isTextSelectMode || isZoomEnabled
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }
        />
      </div>
    </div>
  );
}
