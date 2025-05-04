'use client';

import type { SlideSection } from '@/types/slides';
import { useCallback, useEffect, useState } from 'react';

export interface UseSlideShowReturn {
  currentSlideIndex: number;
  isFullScreen: boolean;
  goToNextSlide: () => void;
  goToPrevSlide: () => void;
  toggleFullScreen: () => void;
  hasNextSlide: boolean;
  hasPrevSlide: boolean;
}

/**
 * スライドショーの状態管理とナビゲーションのためのカスタムフック
 * @param slideSection スライドセクションデータ
 * @returns スライド操作のための状態と関数
 */
export function useSlideShow(slideSection: SlideSection): UseSlideShowReturn {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // 次のスライドへ移動する関数
  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex < slideSection.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  }, [currentSlideIndex, slideSection.slides.length]);

  // 前のスライドへ移動する関数
  const goToPrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  }, [currentSlideIndex]);

  // フルスクリーン切り替え関数
  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`フルスクリーンモード有効化エラー: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  }, []);

  // キーボードイベントハンドラ
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        goToNextSlide();
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        goToPrevSlide();
      } else if (event.key === 'f') {
        toggleFullScreen();
      }
    },
    [goToNextSlide, goToPrevSlide, toggleFullScreen]
  );

  // キーボードイベントのリスナー登録
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // スライドの移動可能状態を計算
  const hasNextSlide = currentSlideIndex < slideSection.slides.length - 1;
  const hasPrevSlide = currentSlideIndex > 0;

  return {
    currentSlideIndex,
    isFullScreen,
    goToNextSlide,
    goToPrevSlide,
    toggleFullScreen,
    hasNextSlide,
    hasPrevSlide,
  };
}
