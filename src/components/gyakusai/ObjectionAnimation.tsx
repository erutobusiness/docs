'use client';

import { useEffect, useState } from 'react';

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
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 animate-fadeIn">
      <div className="relative animate-scaleIn">
        <img
          src="/gyakusai/objection.webp"
          alt="Objection!"
          className="w-auto h-auto max-w-full max-h-[20rem] shadow-[0_0_10px_#ff0000,0_0_20px_#ff0000] rotate-[-5deg] m-0 relative"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle,white_0%,transparent_70%)] opacity-60 animate-flash" />
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
        @keyframes flash {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(0.8); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .animate-flash {
          animation: flash 0.7s ease-out;
        }
      `}</style>
    </div>
  );
}
