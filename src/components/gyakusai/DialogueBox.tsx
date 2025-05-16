'use client';

import { useEffect, useState } from 'react';

interface DialogueBoxProps {
  text: string;
  onComplete?: () => void;
  typingSpeed?: number; // タイピング速度（ミリ秒）
  skipTyping?: boolean; // タイピングアニメーションをスキップするかどうか
}

export default function DialogueBox({
  text,
  onComplete,
  typingSpeed = 60, // テキスト表示速度を遅く調整（30→60）
  skipTyping = false,
}: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // テキストをリセット
    setDisplayedText('');
    setIsTyping(true);

    // スキップする場合は全テキストを表示
    if (skipTyping) {
      setDisplayedText(text);
      setIsTyping(false);
      // 自動進行しない（onComplete を呼ばない）
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        // 自動進行しない（onComplete を呼ばない）
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [text, typingSpeed, skipTyping]);

  const handleClick = () => {
    if (isTyping) {
      // タイピング中にクリックされたら、全テキストを表示
      setDisplayedText(text);
      setIsTyping(false);
      // 自動進行しない（onComplete を呼ばない）
    } else {
      // タイピングが終了している場合は、次のダイアログに進む
      onComplete?.();
    }
  };
  return (
    <button
      type="button"
      className="bg-black/80 text-white rounded-lg border border-[#6c9bd0] p-[15px_20px] min-h-[100px] relative cursor-pointer shadow-lg w-full max-w-[800px] mx-auto text-left"
      onClick={handleClick}
    >
      <p className="text-lg leading-relaxed m-0 pb-[30px] min-h-[60px]">{displayedText}</p>
      {!isTyping && (
        <div className="absolute bottom-[10px] right-[20px] text-base text-[#6c9bd0] bg-black/60 px-2.5 py-1 rounded border border-[#6c9bd0] animate-pulse">
          ▼ クリックして次へ
        </div>
      )}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
        @media (max-width: 480px) {
          button {
            padding: 12px 15px;
            min-height: 80px;
          }
          p {
            font-size: 1rem;
            min-height: 50px;
          }
          div {
            font-size: 0.9rem;
            padding: 3px 8px;
          }
        }
      `}</style>
    </button>
  );
}
