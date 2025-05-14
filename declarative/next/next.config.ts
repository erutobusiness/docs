import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // 静的HTMLにエクスポート
  basePath: process.env.NODE_ENV === 'production' ? '/docs/declarative' : '', // GitHubリポジトリ名を指定
  trailingSlash: true, // URLの末尾にスラッシュを追加
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // 静的エクスポートでは画像最適化を無効にする必要がある
  },
};

export default nextConfig;
