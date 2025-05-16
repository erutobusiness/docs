'use client';

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

  // シェイクアニメーションのスタイル
  const shakeAnimationStyle = isShaking
    ? {
        animation: 'shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
      }
    : {};

  return (
    <div className="relative flex flex-col items-center" style={shakeAnimationStyle}>
      {imageSource && (
        <Image
          src={imageSource}
          alt={`${character.name} - ${emotion}`}
          width={300}
          height={400}
          priority
          className="max-h-[450px] object-contain drop-shadow-md transition-transform duration-300 ease-in-out"
        />
      )}
      <div className="absolute -bottom-[30px] bg-black/70 text-white px-4 py-1 rounded-full text-center min-w-[120px]">
        <span className="font-bold text-lg block">{character.name}</span>
        <span className="text-xs opacity-80">{character.role}</span>
      </div>
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
