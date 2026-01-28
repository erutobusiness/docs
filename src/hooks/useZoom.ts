"use client";

import { useCallback, useState } from "react";

// ズームの増減の刻み値
const zoomStep = 0.25;
const maxZoom = 3.0;
// const minZoom = 1.0;

/**
 * 画面全体の拡大/縮小機能を管理するカスタムフック
 * クリックした位置を中心にズームする機能を提供
 * @returns ズーム関連の状態と操作関数
 */
export function useZoom() {
  // ズーム状態（デフォルトは拡大なし = 1.0）
  const [zoomFactor, setZoomFactor] = useState(1.0);
  // ズームが有効かどうかのフラグ
  const [isZoomEnabled, setIsZoomEnabled] = useState(false);
  // ズームの中心位置
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 }); // デフォルトは中央 (%)

  // クリックした位置でズームする関数
  const zoomAtPosition = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isZoomEnabled) return;

      // ボタン要素上でのクリックは無視
      if (e.target instanceof Element) {
        const targetElement = e.target as Element;
        // button要素やIconButtonの子要素をチェック
        if (
          targetElement.tagName === "BUTTON" ||
          targetElement.closest("button") ||
          targetElement.closest(".icon-button")
        ) {
          return;
        }
      }

      // 右クリックの場合はズームをリセット
      if ("button" in e && e.button === 2) {
        resetZoom();
        return;
      }

      // クリック/タップイベントからページ内の位置を取得
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        // タッチイベントの場合
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        // マウスイベントの場合
        clientX = e.clientX;
        clientY = e.clientY;
      }

      // ウィンドウサイズに対する割合を計算 (%)
      const percentX = (clientX / window.innerWidth) * 100;
      const percentY = (clientY / window.innerHeight) * 100;

      // ズームの中心位置を設定
      setZoomOrigin({ x: percentX, y: percentY });

      // ズーム倍率を増加
      setZoomFactor((prevZoom) => {
        const newZoom = Math.min(prevZoom + zoomStep, maxZoom);
        return newZoom;
      });
    },
    [isZoomEnabled]
  );

  // ズームをリセットする関数
  const resetZoom = useCallback(() => {
    setZoomFactor(1.0);
    setZoomOrigin({ x: 50, y: 50 }); // 中央に戻す
  }, []);

  // ズーム機能の有効/無効を切り替える関数
  const toggleZoom = useCallback(() => {
    setIsZoomEnabled((prev) => {
      // ズームをオフにする時はズーム率もリセット
      if (prev) {
        resetZoom();
      }
      return !prev;
    });
  }, [resetZoom]);

  // 右クリックでズームをリセットする関数
  const handleRightClick = useCallback(
    (e: React.MouseEvent) => {
      if (isZoomEnabled && zoomFactor > 1.0) {
        e.preventDefault(); // デフォルトのコンテキストメニューを表示しない
        resetZoom();
      }
    },
    [isZoomEnabled, zoomFactor, resetZoom]
  );

  return {
    zoomFactor,
    isZoomEnabled,
    zoomOrigin,
    zoomAtPosition,
    resetZoom,
    toggleZoom,
    handleRightClick,
  };
}
