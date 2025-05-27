'use client';

import type { Testimony, TestimonyStatement } from '@/types/gyakusai';
import { useState, useEffect } from 'react';
import styles from '@/styles/IconButton.css'; // 既存のボタン用CSSを流用

interface TestimonyViewProps {
  testimony: Testimony;
  initialStatementId?: string; // 特定の証言から開始する場合
  onPress: (statementId: string) => void; // 「待った！」が押されたときのコールバック
  onPresent: (statementId: string) => void; // 「つきつける」が押されたときのコールバック
  onPreviousStatement?: () => void; // 右クリックで前の証言に戻るためのコールバック
  onStatementChange?: (statementId: string) => void; // 表示中の証言が変わったときのコールバック
}

export default function TestimonyView({
  testimony,
  initialStatementId,
  onPress,
  onPresent,
  onPreviousStatement,
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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // デフォルトのコンテキストメニュー表示を抑制
    onPreviousStatement?.();
  };

  if (!currentStatement) {
    return <div>証言が見つかりません。</div>;
  }

  return (
    <div
      className="absolute bottom-0 w-full h-[280px] bg-black bg-opacity-80 text-white p-4 flex flex-col justify-between border-t-4 border-yellow-400"
      onClick={(e) => e.stopPropagation()} // イベント伝播を停止
      onKeyUp={(e) => e.stopPropagation()} // イベント伝播を停止
      onContextMenu={handleContextMenu} // 右クリックイベントをハンドル
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
        <div /> {/* 左側のスペース確保のため空のdivを配置 */}

        {/* アクションボタン */}
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => onPress(currentStatement.id)}
            className="text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-all duration-150 ease-in-out relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-blue-300 hover:opacity-90 active:opacity-80"
            style={{
              backgroundImage: 'url(/gyakusai/wait.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'rgba(59, 130, 246, 0.8)', // bg-blue-600 with some transparency
            }}
          >
            <span className="relative z-10">待った！</span>
          </button>
          <button
            type="button"
            onClick={() => onPresent(currentStatement.id)}
            className="text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-all duration-150 ease-in-out relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-red-300 hover:opacity-90 active:opacity-80"
            style={{
              backgroundImage: 'url(/gyakusai/take.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'rgba(220, 38, 38, 0.8)', // bg-red-600 with some transparency
            }}
          >
            <span className="relative z-10">つきつける</span>
          </button>
        </div>
      </div>
    </div>
  );
}
