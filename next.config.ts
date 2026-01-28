import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 静的HTMLにエクスポート
  basePath: process.env.NODE_ENV === "production" ? "/docs" : "",
  trailingSlash: true, // URLの末尾にスラッシュを追加
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qiita-image-store.s3.ap-northeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "qiita-user-contents.imgix.net",
      },
    ],
    unoptimized: true, // 静的エクスポートでは画像最適化を無効にする必要がある
  },
};

export default nextConfig;
