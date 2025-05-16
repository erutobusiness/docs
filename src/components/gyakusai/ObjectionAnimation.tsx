'use client';

import { useEffect, useState } from 'react';
import styles from './styles/ObjectionAnimation.module.css';

interface ObjectionAnimationProps {
  onComplete?: () => void;
  duration?: number; // アニメーション時間（ミリ秒）
}

export default function ObjectionAnimation({
  onComplete,
  duration = 1200,
}: ObjectionAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  if (!isVisible) return null;

  return (
    <div className={styles.objectionContainer}>
      <div className={styles.objectionContent}>
        <h1 className={styles.objectionText}>異議あり!</h1>
        <div className={styles.objectionFlash} />
      </div>
    </div>
  );
}
