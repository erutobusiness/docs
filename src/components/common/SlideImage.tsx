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
    <div className="flex justify-center w-full">
      <div className="relative inline-block rounded-lg overflow-hidden border border-(--accent-dark)">
        {isMounted ? (
          <Image
            src={imageUrl}
            alt={altText}
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-100 rounded-lg"
            style={imagePointerStyle}
          />
        ) : (
          <div className="w-128 h-100 flex items-center justify-center bg-(--background) text-(--card-fg)">
            画像読み込み中...
          </div>
        )}
      </div>
    </div>
  );
}
