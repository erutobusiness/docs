'use client';

import styles from '@/components/animations/ShakeAnimation.module.css';
import type { Character, Emotion } from '@/types/gyakusai';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CharacterViewProps {
  character: Character;
  emotion: Emotion;
  isShaking?: boolean;
}

export default function CharacterView({
  character,
  emotion,
  isShaking = false,
}: CharacterViewProps) {
  const [imageSource, setImageSource] = useState<string>('');

  useEffect(() => {
    // 指定された感情に応じた画像を選択
    const emotionImage = character.images[emotion] || character.images.normal;
    setImageSource(emotionImage);
  }, [character, emotion]);
  // シェイクアニメーションのクラス名
  const shakeAnimationClass = isShaking ? styles.shakeAnimation : '';

  return (
    <div className={`absolute flex flex-col items-center ${shakeAnimationClass}`}>
      {imageSource && (
        <Image
          src={imageSource}
          alt={`${character.name} - ${emotion}`}
          width={300}
          height={400}
          style={{
            width: '100%',
            height: 'auto',
          }}
          priority
          className="object-contain drop-shadow-md transition-transform duration-300 ease-in-out"
        />
      )}
    </div>
  );
}
