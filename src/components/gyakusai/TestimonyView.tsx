'use client';

import type { Testimony, TestimonyStatement } from '@/types/gyakusai';
import { useState, useEffect } from 'react';
import styles from '@/styles/IconButton.css'; // 既存のボタン用CSSを流用

interface TestimonyViewProps {
  testimony: Testimony;
  initialStatementId?: string; // 特定の証言から開始する場合
  onPress: (statementId: string) => void; // 「待った！」が押されたときのコールバック
  onPresent: (statementId: string) => void; // 「つきつける」が押されたときのコールバック
  onStatementChange?: (statementId: string) => void; // 表示中の証言が変わったときのコールバック
}

export default function TestimonyView({
  testimony,
  initialStatementId,
  onPress,
  onPresent,
  onStatementChange,
}: TestimonyViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (initialStatementId) {
      const index = testimony.statements.findIndex(s => s.id === initialStatementId);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [initialStatementId, testimony.statements]);

  useEffect(() => {
    if (onStatementChange) {
      onStatementChange(testimony.statements[currentIndex].id);
    }
  }, [currentIndex, onStatementChange, testimony.statements]);

  const currentStatement = testimony.statements[currentIndex];

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimony.statements.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + testimony.statements.length) % testimony.statements.length);
  };

  if (!currentStatement) {
    return <div>証言が見つかりません。</div>;
  }

  return (
    <div 
      className="absolute bottom-0 w-full h-[280px] bg-black bg-opacity-80 text-white p-4 flex flex-col justify-between border-t-4 border-yellow-400"
      onClick={(e) => e.stopPropagation()} // イベント伝播を停止
      onKeyUp={(e) => e.stopPropagation()} // イベント伝播を停止
    >
      {/* 証言タイトル */}
      {testimony.title && (
        <h2 className="text-xl font-bold text-yellow-300 mb-2 text-center">{testimony.title}</h2>
      )}
      
      {/* 証言内容 */}
      <div className="flex-grow overflow-y-auto p-3 bg-black bg-opacity-50 rounded-md mb-3 min-h-[100px]">
        <p className="text-2xl leading-relaxed whitespace-pre-wrap">
          {currentStatement.text}
        </p>
      </div>

      {/* 操作ボタンエリア */}
      <div className="flex justify-between items-center">
        {/* 証言ナビゲーション */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-l disabled:opacity-50"
            disabled={testimony.statements.length <= 1}
          >
            &lt; 前
          </button>
          <span className="bg-gray-800 text-white py-2 px-3">
            {currentIndex + 1} / {testimony.statements.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-r disabled:opacity-50"
            disabled={testimony.statements.length <= 1}
          >
            次 &gt;
          </button>
        </div>

        {/* アクションボタン */}
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => onPress(currentStatement.id)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-colors icon-button" // icon-button クラスは IconButton.css から
            style={{ backgroundImage: 'url(/gyakusai/wait.webp)' }} // 「待った！」画像 (仮)
          >
            待った！
          </button>
          <button
            type="button"
            onClick={() => onPresent(currentStatement.id)}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-colors icon-button" // icon-button クラスは IconButton.css から
            style={{ backgroundImage: 'url(/gyakusai/take.webp)' }} // 「つきつける！」画像 (仮)
          >
            つきつける
          </button>
        </div>
      </div>
    </div>
  );
}
