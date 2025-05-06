import type { SlideSection } from '@/types/slides';

// 宣言的・宣言的UIの歴史セクションのスライドデータ
export const historySection: SlideSection = {
  id: '03 - history',
  title: '宣言的・宣言的UIの歴史',
  description: '宣言的プログラミングの起源から現代のUIフレームワークまでの発展を解説',
  slides: [
    {
      id: '03-history-1',
      title: '宣言的プログラミングの起源',
      content: [
        '宣言的プログラミングの概念は1970年代のPrologなどの論理型言語に始まります',
        'HTML自体も宣言的な言語：ページの構造を記述し、表示方法はブラウザに任せます',
        'SQLも宣言的：「どのようにデータを取得するか」ではなく「どのようなデータが欲しいか」を指定します',
      ],
    },
    {
      id: '03-history-2',
      title: 'UIライブラリの変遷',
      content: [
        '2000年代前半：XMLベースのUIフレームワーク（XAML, XUL）',
        '2010年：HTMLテンプレートエンジン（Handlebars, Mustache）',
        '2013年：ReactによるVirtual DOMの革新',
        '2014年以降：Vue, Angular, Svelteなどの宣言的UIフレームワークの発展',
        '2019年以降：SwiftUI, Jetpack Composeなどネイティブプラットフォームでの宣言的UI採用',
      ],
    },
    {
      id: '03-history-3',
      title: '現代のトレンド',
      content: [
        'サーバーコンポーネント：ReactやVue 3でのサーバーサイドレンダリングの発展',
        'AIとの融合：UIコード生成、設計支援',
        'メタバースやAR/VRにおける3D宣言的UI',
        'インフラストラクチャにおける宣言的アプローチ（IaC）',
      ],
      codeExample: {
        language: 'jsx',
        code: `// React Server Componentの例
// server-component.jsx
export default async function Comments({ postId }) {
  // サーバー上で実行される非同期データ取得
  const comments = await getCommentsForPost(postId);

  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id}>
          <h3>{comment.author}</h3>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}`,
      },
    },
  ],
};
