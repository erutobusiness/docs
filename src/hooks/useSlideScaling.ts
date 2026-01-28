"use client";

import { useEffect, useState } from "react";

/**
 * 画面サイズに応じたスライドのスケーリングを管理するカスタムフック
 * 幅と高さの両方を考慮し、計算結果を指定の刻みで丸めます
 * @returns スケーリング係数
 */
export function useSlideScaling() {
  const [scaleFactor, setScaleFactor] = useState(1);

  // 画面サイズに応じてスケールファクターを動的に計算
  useEffect(() => {
    const calculateScale = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // 基準となるサイズ
      const baseWidth = 1920;
      const baseHeight = 1080;

      // 幅と高さのスケール係数を個別に計算
      const widthScale = width / baseWidth;
      const heightScale = height / baseHeight;

      // 幅と高さのうち、より小さい方のスケール係数を使用（アスペクト比を維持）
      const baseScale = Math.min(widthScale, heightScale);

      // 刻み値（0.1単位）で丸める
      const step = 0.1;
      const roundedScale = Math.round(baseScale / step) * step;

      setScaleFactor(roundedScale);
    };

    // 初期計算
    calculateScale();

    // リサイズイベントで再計算
    window.addEventListener("resize", calculateScale);

    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  return scaleFactor;
}
