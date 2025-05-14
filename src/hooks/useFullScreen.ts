'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * フルスクリーン機能を提供するカスタムフック
 * @returns フルスクリーン状態と操作関数
 */
export function useFullScreen() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // フルスクリーン状態の監視
  useEffect(() => {
    // 標準のフルスクリーンAPI用のイベントリスナー
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    // F11などによるブラウザのフルスクリーン変更を検出するための追加手段
    const handleResize = () => {
      // ブラウザのフルスクリーンモードはウィンドウサイズと画面サイズが一致するか
      // または非常に近い状態になるため、それを検出する
      const isFullScreenBySize =
        window.innerWidth >= window.screen.width - 5 &&
        window.innerHeight >= window.screen.height - 5;

      // フルスクリーンAPIが有効でなく、画面サイズから判断してフルスクリーンと思われる場合
      if (!document.fullscreenElement && isFullScreenBySize) {
        setIsFullScreen(true);
      }
      // フルスクリーンAPIが有効でなく、画面サイズから判断してフルスクリーンでないと思われる場合
      else if (!document.fullscreenElement && !isFullScreenBySize) {
        setIsFullScreen(false);
      }
    };

    // F11キーを直接検知するためのキーイベントリスナー
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F11') {
        // F11キーが押されたらフルスクリーン状態を反転させる
        // （ブラウザの標準動作は妨げない）
        setTimeout(() => {
          // 少し遅延を入れて、ブラウザのフルスクリーン変更が完了したあとに状態を更新
          handleResize();
        }, 100);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    // 初期状態を設定
    handleResize();

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // フルスクリーン切り替え関数
  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`フルスクリーンモード有効化エラー: ${err.message}`);
        // APIでエラーが発生した場合、ユーザーにF11キーの使用を促す
        alert('フルスクリーンの有効化に失敗しました。F11キーを使用してみてください。');
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, []);

  return {
    isFullScreen,
    toggleFullScreen,
  };
}
