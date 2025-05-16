'use client';

import type { Character, Emotion } from '@/types/gyakusai';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './styles/CharacterView.module.css';

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

  return (
    <div className={`${styles.character} ${isShaking ? styles.shake : ''}`}>
      {imageSource && (
        <Image
          src={imageSource}
          alt={`${character.name} - ${emotion}`}
          width={300}
          height={400}
          priority
          className={styles.characterImage}
        />
      )}
      <div className={styles.nameTag}>
        <span className={styles.name}>{character.name}</span>
        <span className={styles.role}>{character.role}</span>
      </div>
    </div>
  );
}
