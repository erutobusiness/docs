'use client';

import { useEffect, useState } from 'react';

interface ObjectionAnimationProps {
  onComplete?: () => void;
  duration?: number; // アニメーション時間（ミリ秒）
}

export default function ObjectionAnimation({
  onComplete,
  duration = 3000, // デフォルトは3秒
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
    <div className="fixed top-0 left-1/2 -translate-x-1/2 animate-fadeIn pointer-events-none">
      {/* ダイアログボックスの分だけずらす */}
      <div className="relative animate-scaleIn h-[80vh] mb-[160px]">
        <img
          src="/gyakusai/objection.webp"
          alt="Objection!"
          className="w-auto h-full m-0 relative"
        />
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </div>
  );
}
