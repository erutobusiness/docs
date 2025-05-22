'use client';

import pulseStyles from '@/components/animations/PulseAnimation.module.css';
import patternStyles from '@/components/patterns/DialogueBoxPattern.module.css';
import { useEffect, useRef, useState } from 'react';

interface DialogueBoxProps {
  text: string;
  characterName?: string;
  characterRole?: string;
  typingSpeed?: number;
  skipTyping?: boolean;
  isTyping: boolean;
  setIsTyping: (v: boolean) => void;
  skipTypingTrigger: number;
}

export default function DialogueBox({
  text,
  characterName,
  characterRole,
  typingSpeed = 60,
  skipTyping = false,
  isTyping,
  setIsTyping,
  skipTypingTrigger,
}: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState('');

  const timerRef = useRef<NodeJS.Timeout | null>(null); // タイマー参照を保持するためのref

  // タイマーをクリアする関数
  const clearTypingTimer = useRef(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }).current;

  // タイピング中のテキストを表示するためのuseEffect
  useEffect(() => {
    // テキストをリセット
    setDisplayedText('');
    setIsTyping(true);
    clearTypingTimer();
    if (skipTyping) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }
    let index = 0;
    timerRef.current = setInterval(() => {
      if (index < text.length) {
        const currentIndex = index;
        index++;
        setDisplayedText((prev) => prev + text.charAt(currentIndex));
      } else {
        clearTypingTimer();
        setIsTyping(false);
      }
    }, typingSpeed);
    return () => clearTypingTimer();
  }, [text, typingSpeed, skipTyping, clearTypingTimer, setIsTyping]);

  // skipTypingTriggerが変化したら全文表示
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isTyping) {
      clearTypingTimer();
      setDisplayedText(text);
      setIsTyping(false);
    }
  }, [skipTypingTrigger]);

  // クリック処理・ボタン要素は不要になったので削除
  return (
    <div
      className={`absolute bottom-0 w-full h-[160px] text-white border-t border-white shadow-lg appearance-none border-none p-0 bg-transparent ${patternStyles.dotPattern}`}
      aria-label="ダイアログボックス"
    >
      <div className="absolute top-0 left-0 w-full h-full flex items-start justify-center">
        <div className="absolute w-[1200px] h-full">
          {/* キャラクター名と役割 */}
          {characterName && (
            <div className="absolute -top-8 bg-blue-500 border-2 border-white px-4 py-1 rounded-lg text-center min-w-32 ">
              <span className="font-bold text-lg block">{characterName}</span>
              {characterRole && <span className="text-md opacity-80">{characterRole}</span>}
            </div>
          )}
        </div>
        {/* タイピング中のテキスト */}
        <p className="text-2xl text-left leading-relaxed w-[1200px] m-4 mt-12">{displayedText}</p>
      </div>

      {/* タイピングが終了したら、クリックして次へのメッセージを表示 */}
      {!isTyping && (
        <div
          className={`absolute bottom-2 right-2 text-base text-blue-200 bg-black/60 p-2 rounded-lg border border-blue-950 ${pulseStyles.pulsating}`}
        >
          ▼ 次へ
        </div>
      )}
    </div>
  );
}
