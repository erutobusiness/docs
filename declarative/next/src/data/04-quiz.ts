import type { SlideSection } from '@/types/slides';

// 宣言的UIの実践（クイズ形式）セクションのスライドデータ
export const quizSection: SlideSection = {
  id: '04 - quiz',
  title: '宣言的UIの実践（クイズ形式）',
  description: '宣言的UIと命令的UIの違いを実践的なコード例で解説',
  slides: [
    {
      id: '04-quiz-1',
      title: 'クイズ形式で学ぶ宣言的UI',
      content: [
        'これから、同じUI機能を実装した命令的コードと宣言的コードを比較します',
        '両方のアプローチの違いを理解し、それぞれの特徴を把握しましょう',
        '次のスライドからクイズが始まります！',
      ],
    },
    {
      id: '04-quiz-2',
      title: 'クイズ1：リストの表示と更新',
      content: [
        '問題：ユーザーリストを表示し、新しいユーザーを追加する機能を実装するコードはどちらが宣言的ですか？',
      ],
      codeExample: {
        language: 'js',
        code: `// コードA：
function UserList() {
  const [users, setUsers] = useState(['Alice', 'Bob']);

  function addUser(name) {
    setUsers([...users, name]);
  }

  return (
    <div>
      <ul>
        {users.map(user => <li key={user}>{user}</li>)}
      </ul>
      <button onClick={() => addUser('Charlie')}>
        ユーザー追加
      </button>
    </div>
  );
}

// コードB：
function setupUserList() {
  const users = ['Alice', 'Bob'];
  const userList = document.querySelector('ul');
  const addButton = document.querySelector('button');

  // 初期リストの描画
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user;
    userList.appendChild(li);
  });

  // ボタンクリックイベント
  addButton.addEventListener('click', () => {
    const li = document.createElement('li');
    li.textContent = 'Charlie';
    userList.appendChild(li);
    users.push('Charlie');
  });
}`,
      },
    },
    {
      id: '04-quiz-3',
      title: 'クイズ1の解答',
      content: [
        '答え：コードAが宣言的UIアプローチです',
        '解説：',
        '・コードAは「何を」表示するかを記述し、userステート変更に伴うDOM更新はReactが自動的に処理',
        '・コードBは「どのように」DOM要素を操作するかの手順を明示的に記述しており、命令的アプローチ',
      ],
    },
  ],
};
