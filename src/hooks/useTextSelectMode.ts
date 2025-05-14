'use client';

import { useCallback, useState } from 'react';

/**
 * テキスト選択モードを管理するためのカスタムフック
 * @returns テキスト選択モードの状態と切り替え関数
 */
export function useTextSelectMode() {
  // テキスト選択モードの状態
  const [isTextSelectMode, setIsTextSelectMode] = useState(false);

  // テキスト選択モードの切り替え
  const toggleTextSelectMode = useCallback(() => {
    setIsTextSelectMode((prev) => !prev);
  }, []);

  return {
    isTextSelectMode,
    toggleTextSelectMode,
  };
}
