import type { SlideSection } from '@/types/slides';

// イントロダクションセクションのスライドデータ
export const introSection: SlideSection = {
  id: '01-intro',
  title: '宣言的UIとは？',
  description: '宣言的UIの基本概念について解説',
  slides: [
    {
      id: '01-intro-1',
      title: '宣言的UIとは',
      descriptions: [
        '宣言的UIとは「何を」表示するかを記述し、「どのように」表示するかの詳細はフレームワークに任せるアプローチ',
        'UIの最終的な状態を宣言し、状態変化に応じた更新はフレームワークが自動的に行う',
        'UIの構造や見た目を、どう作るのかの手順を記述する（命令的）のではなく、状態に基づいて定義する（宣言的）スタイル',
      ],
      image: {
        url: '/img/宣言的UI.png',
        position: 'bottom',
      },
    },
    {
      id: '01-intro-2',
      title: 'コード比較：カウンターボタンの実装',
      descriptions: [
        '同じ機能（ボタンクリックでカウントアップ）を命令的UIと宣言的UIで実装した例を比較して、アプローチの違いを明確にしてみる',
      ],
      codeExamples: [
        {
          title: '命令的UI（JavaScript DOM）',
          language: 'js',
          descriptions: [
            'DOM要素を直接操作して内容を変更',
            '状態（count変数）の更新とDOMの更新を明示的に記述',
            '「どのように」UIを更新するかの手順に焦点を当てている',
          ],
          code: `// HTML: <button id="counter">0</button>

function setupCounter() {
  const button = document.getElementById('counter');
  let count = 0;

  button.addEventListener('click', () => {
    // 状態の更新
    count++;

    // DOM要素の更新
    button.textContent = count;
  });
}`,
        },
        {
          title: '宣言的UI（React）',
          language: 'jsx',
          descriptions: [
            '状態(count)の変更がUIの更新を自動的にトリガー',
            'setCount関数で状態を更新するだけでボタンの表示も自動的に更新',
            '「何を」表示するかを記述し、DOMの更新処理はReactが担当',
          ],
          code: `function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}`,
        },
      ],
    },
    {
      id: '01-intro-3',
      title: '両アプローチのメリット',
      descriptions: ['命令的UIと宣言的UIはそれぞれ異なる状況で利点がある'],
      list: {
        groups: [
          {
            title: '命令的UIのメリット',
            points: [
              '細かな制御が可能なので、アニメーションなどで有利',
              '必要な部分だけを更新できるので、パフォーマンス最適化を直接できる',
              '基本的なDOM操作だけで開始できるので、学習の敷居が低い',
              '既存のライブラリやAPIとの直接的な統合が容易',
            ],
          },
          {
            title: '宣言的UIのメリット',
            points: [
              '状態とUIの関係が明確なので、コードの可読性と保守性が高い',
              'バグの減少（状態とUIの不一致が発生しにくい）',
              'コンポーネントの再利用性が高まる',
              '複雑なUIでも状態管理が整理しやすい',
            ],
          },
        ],
      },
    },
  ],
};
