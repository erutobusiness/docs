"use client";

import type { SlideSection } from "@/types/slides";
import { useCallback, useEffect, useState } from "react";

export interface UseSlideShowReturn {
  currentSlideIndex: number;
  goToNextSlide: () => void;
  goToPrevSlide: () => void;
  hasNextSlide: boolean;
  hasPrevSlide: boolean;
  handleScroll: (event: React.WheelEvent) => void;
  handleDragStart: (event: React.MouseEvent | React.TouchEvent) => void;
  handleDragMove: (event: React.MouseEvent | React.TouchEvent) => void;
  handleDragEnd: () => void;
  dragOffset: number;
  isDragging: boolean;
  animationId: number | null;
  animationDirection: "left" | "right";
  handleAnimationComplete: (id: number) => void;
}

interface UseSlideShowProps {
  slideSection: SlideSection;
  isTextSelectMode: boolean;
}

/**
 * スライドショーの状態管理とナビゲーションのためのカスタムフック
 * @param props スライドセクションデータとテキスト選択モードの状態
 * @returns スライド操作のための状態と関数
 */
export function useSlideShow({
  slideSection,
  isTextSelectMode,
}: UseSlideShowProps): UseSlideShowReturn {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // アニメーション関連の状態
  const [animationId, setAnimationId] = useState<number | null>(null);
  const [animationDirection, setAnimationDirection] = useState<
    "left" | "right"
  >("right");

  // ドラッグ関連の状態
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // アニメーション完了時のハンドラ
  const handleAnimationComplete = useCallback(() => {
    setAnimationId(null);
  }, []);

  // 次のスライドへ移動する関数
  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex < slideSection.slides.length - 1) {
      // アニメーションを設定
      setAnimationDirection("left");
      setAnimationId(Date.now());
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  }, [currentSlideIndex, slideSection.slides.length]);

  // 前のスライドへ移動する関数
  const goToPrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      // アニメーションを設定
      setAnimationDirection("right");
      setAnimationId(Date.now());
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  }, [currentSlideIndex]);

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

      const clientX =
        "touches" in event ? event.touches[0].clientX : event.clientX;

      setDragStartX(clientX);
      setDragOffset(0);
    },
    [isTextSelectMode]
  );

  const handleDragMove = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging || isTextSelectMode) return;

      const clientX =
        "touches" in event ? event.touches[0].clientX : event.clientX;

      const newOffset = clientX - dragStartX;
      setDragOffset(newOffset);
    },
    [isDragging, dragStartX, isTextSelectMode]
  );

  const handleDragEnd = useCallback(() => {
    // テキスト選択モードの場合も、必ずドラッグ状態をリセット
    if (isTextSelectMode) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    if (!isDragging) return;

    // ドラッグが一定距離以上なら、スライド移動
    const slideWidth = window.innerWidth;
    const dragThreshold = slideWidth * 0.15; // 画面幅の15%を閾値とする

    if (dragOffset > dragThreshold && currentSlideIndex > 0) {
      // 右にドラッグで前のスライドへ
      goToPrevSlide();
    } else if (
      dragOffset < -dragThreshold &&
      currentSlideIndex < slideSection.slides.length - 1
    ) {
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
      // テキスト選択モードの場合はキーボードによるスライド移動を無効化
      if (isTextSelectMode) return;

      if (
        event.key === "ArrowRight" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        goToNextSlide();
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        goToPrevSlide();
      }
    },
    [goToNextSlide, goToPrevSlide, isTextSelectMode]
  );

  // キーボードイベントのリスナー登録
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    // マウスが画面外に出た場合にドラッグ終了
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
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
  };
}
