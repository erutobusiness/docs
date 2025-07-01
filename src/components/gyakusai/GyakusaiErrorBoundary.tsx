'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GyakusaiErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Gyakusai Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center p-8 max-w-md">
              <h2 className="text-2xl font-bold mb-4 text-red-400">ゲームエラー</h2>
              <p className="mb-4">申し訳ございません。ゲーム中にエラーが発生しました。</p>
              <details className="text-left bg-gray-800 p-4 rounded mb-4">
                <summary className="cursor-pointer mb-2">エラー詳細</summary>
                <pre className="text-xs text-gray-300 overflow-auto">
                  {this.state.error?.stack || this.state.error?.message}
                </pre>
              </details>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
              >
                ゲームを再起動
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
