'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import styles from './WaveAnimation.module.css';

interface WaveAnimationProps {
  animationId: number | null;
  direction?: 'left' | 'right';
  onAnimationComplete?: (id: number) => void;
}

/**
 * スライド切り替え時に表示される波のアニメーションコンポーネント
 * CSSベースの波アニメーションを使用 - 画面下半分を中心に表示
 * アニメーションIDを使用して、複数のアニメーションがシームレスに実行できるように
 */
export default function WaveAnimation({
  animationId,
  direction = 'right',
  onAnimationComplete,
}: WaveAnimationProps) {
  // 各アニメーションが独自のタイマーを持つように
  useEffect(() => {
    if (animationId !== null) {
      // アニメーションの長さと同じ時間のタイマーを設定
      const timer = setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete(animationId);
        }
      }, 900); // waveAppearアニメーションの長さに合わせる (0.9秒)

      return () => clearTimeout(timer);
    }
  }, [animationId, onAnimationComplete]);

  // アニメーションIDがない場合は何も表示しない
  if (animationId === null) return null;

  // ユニークなキーでコンポーネントをレンダリングすることで、
  // Reactは新しいアニメーションを新しいコンポーネントとして扱う
  return (
    <AnimatePresence>
      <motion.div
        key={`wave-${animationId}`}
        className={`${styles.waveContainer} ${direction === 'right' ? styles.fromRight : styles.fromLeft}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.liquid}>
          {/* 第一波 */}
          <div className={styles.wave} />
          {/* 第二波 */}
          <div className={styles.wave2} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
