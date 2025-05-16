'use client';

import { useEffect, useRef, useState } from 'react';

interface SoundEffectsProps {
  sound: string | null;
  onComplete?: () => void;
}

export default function SoundEffects({ sound, onComplete }: SoundEffectsProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window === 'undefined') return;

    // サウンドがnullの場合は何もしない
    if (!sound) return;

    // 既に再生中の場合は一度停止
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // 新しいAudio要素を作成
    const audio = new Audio(`/gyakusai/sounds/${sound}`);
    audioRef.current = audio;

    // イベントリスナーを設定
    const handleEnded = () => {
      setIsPlaying(false);
      onComplete?.();
    };

    audio.addEventListener('ended', handleEnded);

    // 再生
    audio.play().catch((error) => {
      console.error('サウンド再生エラー:', error);
      onComplete?.();
    });

    setIsPlaying(true);

    // クリーンアップ関数
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [sound, isPlaying, onComplete]);

  // このコンポーネントは何もレンダリングしない
  return null;
}
