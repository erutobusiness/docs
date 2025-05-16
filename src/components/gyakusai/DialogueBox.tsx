'use client';

import { useEffect, useState } from 'react';
import styles from './styles/DialogueBox.module.css';

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
    <button type="button" className={styles.dialogueBox} onClick={handleClick}>
      <p className={styles.text}>{displayedText}</p>
      {!isTyping && <div className={styles.continueIndicator}>▼ クリックして次へ</div>}
    </button>
  );
}
