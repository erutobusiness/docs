'use client';

import type { SlideSection } from '@/types/slides';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseSlideShowReturn {
  currentSlideIndex: number;
  isFullScreen: boolean;
  goToNextSlide: () => void;
  goToPrevSlide: () => void;
  toggleFullScreen: () => void;
  hasNextSlide: boolean;
  hasPrevSlide: boolean;
  handleScroll: (event: React.WheelEvent) => void;
  handleDragStart: (event: React.MouseEvent | React.TouchEvent) => void;
  handleDragMove: (event: React.MouseEvent | React.TouchEvent) => void;
  handleDragEnd: () => void;
  dragOffset: number;
  isDragging: boolean;
  isTextSelectMode: boolean;
  toggleTextSelectMode: () => void;
  // 波アニメーション用の状態と関数
  waveAnimationId: number | null;
  waveDirection: 'left' | 'right';
  onWaveAnimationComplete: (id: number) => void;
}

/**
 * スライドショーの状態管理とナビゲーションのためのカスタムフック
 * @param slideSection スライドセクションデータ
 * @returns スライド操作のための状態と関数
 */
export function useSlideShow(slideSection: SlideSection): UseSlideShowReturn {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  // ドラッグ関連の状態
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // テキスト選択モードの状態
  const [isTextSelectMode, setIsTextSelectMode] = useState(false);

  // 波アニメーション関連の状態 - ユニークIDを使用
  const waveAnimationIdRef = useRef<number>(0);
  const [waveAnimationId, setWaveAnimationId] = useState<number | null>(null);
  const [waveDirection, setWaveDirection] = useState<'left' | 'right'>('right');

  // フルスクリーン状態の監視
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  // テキスト選択モードの切り替え
  const toggleTextSelectMode = useCallback(() => {
    setIsTextSelectMode((prev) => !prev);
  }, []);

  // 波アニメーション完了時のハンドラ - 特定のアニメーションIDのみを処理
  const onWaveAnimationComplete = useCallback(
    (id: number) => {
      // 現在のアニメーションIDと一致する場合のみリセット
      if (waveAnimationId === id) {
        setWaveAnimationId(null);
      }
    },
    [waveAnimationId]
  );

  // 次のスライドへ移動する関数
  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex < slideSection.slides.length - 1) {
      // 新しいアニメーションIDを生成
      const newAnimationId = waveAnimationIdRef.current + 1;
      waveAnimationIdRef.current = newAnimationId;

      // 波のアニメーション表示（右方向）
      setWaveDirection('right');
      setWaveAnimationId(newAnimationId);

      // スライドインデックスを更新
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  }, [currentSlideIndex, slideSection.slides.length]);

  // 前のスライドへ移動する関数
  const goToPrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      // 新しいアニメーションIDを生成
      const newAnimationId = waveAnimationIdRef.current + 1;
      waveAnimationIdRef.current = newAnimationId;

      // 波のアニメーション表示（左方向）
      setWaveDirection('left');
      setWaveAnimationId(newAnimationId);

      // スライドインデックスを更新
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  }, [currentSlideIndex]);

  // フルスクリーン切り替え関数
  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`フルスクリーンモード有効化エラー: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, []);

  // スクロールイベントハンドラ
  const handleScroll = useCallback(
    (event: React.WheelEvent) => {
      // テキスト選択モードの場合はスクロールによるスライド移動を無効化
      if (isTextSelectMode) return;

      event.preventDefault();
      event.stopPropagation();

      // スクロールのデバウンス処理
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // 少し遅延を設けてスクロールイベントの連続発火を防止
      const timeout = setTimeout(() => {
        if (event.deltaY > 0) {
          goToNextSlide();
        } else if (event.deltaY < 0) {
          goToPrevSlide();
        }
      }, 100);

      setScrollTimeout(timeout);
    },
    [goToNextSlide, goToPrevSlide, scrollTimeout, isTextSelectMode]
  );

  // ドラッグイベントハンドラ
  const handleDragStart = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      // テキスト選択モードの場合はドラッグによるスライド移動を無効化
      if (isTextSelectMode) return;

      setIsDragging(true);

      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;

      setDragStartX(clientX);
      setDragOffset(0);
    },
    [isTextSelectMode]
  );

  const handleDragMove = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging || isTextSelectMode) return;

      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;

      const newOffset = clientX - dragStartX;
      setDragOffset(newOffset);
    },
    [isDragging, dragStartX, isTextSelectMode]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging || isTextSelectMode) return;

    // ドラッグが一定距離以上なら、スライド移動
    const slideWidth = window.innerWidth;
    const dragThreshold = slideWidth * 0.15; // 画面幅の15%を閾値とする

    if (dragOffset > dragThreshold && currentSlideIndex > 0) {
      // 右にドラッグで前のスライドへ
      goToPrevSlide();
    } else if (dragOffset < -dragThreshold && currentSlideIndex < slideSection.slides.length - 1) {
      // 左にドラッグで次のスライドへ
      goToNextSlide();
    }

    setIsDragging(false);
    setDragOffset(0);
  }, [
    isDragging,
    dragOffset,
    currentSlideIndex,
    goToNextSlide,
    goToPrevSlide,
    slideSection.slides.length,
    isTextSelectMode,
  ]);

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
    // マウスが画面外に出た場合にドラッグ終了
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
      // タイムアウトのクリーンアップ
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [handleKeyDown, handleDragEnd, scrollTimeout]);

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
    handleScroll,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    dragOffset,
    isDragging,
    isTextSelectMode,
    toggleTextSelectMode,
    // 波アニメーション関連の状態と関数を追加
    waveAnimationId,
    waveDirection,
    onWaveAnimationComplete,
  };
}
