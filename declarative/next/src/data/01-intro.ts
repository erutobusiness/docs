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
      content: [
        '宣言的UIとは「何を」表示するかを記述し、「どのように」表示するかの詳細はフレームワークに任せるアプローチ',
        '開発者はUIの最終的な状態を宣言し、状態変化に応じた更新はフレームワークが自動的に行う',
      ],
      imageUrl: '/img/宣言的UI.png',
      imagePosition: 'bottom',
    },
    {
      id: '01-intro-4',
      title: 'コード比較：カウンターボタンの実装',
      content: [
        '同じ機能（ボタンクリックでカウントアップ）を命令的UIと宣言的UIで実装した例を比較して、アプローチの違いを明確にしてみる',
      ],
      codeExamples: [
        {
          title: '命令的UI（JavaScript DOM）',
          language: 'js',
          description: [
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
          description: [
            '状態(count)の変更がUIの更新を自動的にトリガー',
            'setCount関数で状態を更新するだけでボタンの表示も自動的に更新される',
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
  ],
};
