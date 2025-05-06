'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SlideImageProps {
  imageUrl: string;
  altText: string;
  isTextSelectMode?: boolean;
}

export default function SlideImage({
  imageUrl,
  altText,
  isTextSelectMode = false,
}: SlideImageProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 画像のスタイルをテキスト選択モードに応じて切り替え
  const imagePointerStyle = isTextSelectMode
    ? {} // 選択モード時は通常のポインターイベント（クリック可能）
    : { pointerEvents: 'none' as const }; // 通常モードではポインターイベントを無効化

  return (
    <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden border border-[var(--accent-dark)]">
      {isMounted ? (
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="object-contain bg-slate-800"
          style={imagePointerStyle}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[var(--background)] text-[var(--card-fg)]">
          画像読み込み中...
        </div>
      )}
    </div>
  );
}
