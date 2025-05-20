'use client';

import pulseStyles from '@/components/animations/PulseAnimation.module.css';
import patternStyles from '@/components/patterns/DialogueBoxPattern.module.css';
import { useEffect, useRef, useState } from 'react';

interface DialogueBoxProps {
  text: string;
  characterName?: string; // キャラクターの名前
  characterRole?: string; // キャラクターの役割
  onComplete?: () => void;
  typingSpeed?: number; // タイピング速度（ミリ秒）
  skipTyping?: boolean; // タイピングアニメーションをスキップするかどうか
}

export default function DialogueBox({
  text,
  characterName,
  characterRole,
  onComplete,
  typingSpeed = 60,
  skipTyping = false,
}: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null); // タイマー参照を保持するためのref

  // タイマーをクリアする関数
  const clearTypingTimer = useRef(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }).current;
  useEffect(() => {
    // テキストをリセット
    setDisplayedText('');
    setIsTyping(true);
    // 以前のタイマーがあれば必ずクリア
    clearTypingTimer();
    // スキップする場合は全テキストを表示
    if (skipTyping) {
      setDisplayedText(text);
      setIsTyping(false);
      // 自動進行しない（onComplete を呼ばない）
      return;
    }
    let index = 0;
    // timerRefに現在のタイマーを設定
    timerRef.current = setInterval(() => {
      if (index < text.length) {
        // インデックスの値を保存してから使用することで、正確に現在の文字を取得
        const currentIndex = index;
        index++;
        setDisplayedText((prev) => prev + text.charAt(currentIndex));
      } else {
        clearTypingTimer();
        setIsTyping(false);
        // 自動進行しない（onComplete を呼ばない）
      }
    }, typingSpeed);

    // コンポーネントのアンマウント時やテキスト変更時などにタイマーをクリア
    return () => clearTypingTimer();
  }, [text, typingSpeed, skipTyping, clearTypingTimer]);

  const handleClick = () => {
    if (isTyping) {
      // タイピング中にクリックされたら、タイマーをクリアして全テキストを表示
      clearTypingTimer();
      setDisplayedText(text);
      setIsTyping(false);
    } else {
      // タイピングが終了している場合は、次のダイアログに進む
      onComplete?.();
    }
  };
  return (
    <button
      type="button"
      className={`absolute bottom-0 w-full h-[160px] text-white border-t border-white cursor-pointer shadow-lg ${patternStyles.dotPattern}`}
      onClick={handleClick}
    >
      {/* キャラクター名と役割 */}
      {characterName && (
        <div className="absolute -top-8 bg-blue-500 px-4 py-1 rounded-lg text-center min-w-32 left-4">
          <span className="font-bold text-lg block">{characterName}</span>
          {characterRole && <span className="text-md opacity-80">{characterRole}</span>}
        </div>
      )}

      {/* タイピング中のテキスト */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <p className="text-2xl text-left leading-relaxed w-[1200px] m-4">{displayedText}</p>
      </div>

      {/* タイピングが終了したら、クリックして次へのメッセージを表示 */}
      {!isTyping && (
        <div
          className={`absolute bottom-2 right-2 text-base text-blue-200 bg-black/60 p-2 rounded-lg border border-blue-950 ${pulseStyles.pulsating}`}
        >
          ▼ クリックして次へ
        </div>
      )}
    </button>
  );
}
