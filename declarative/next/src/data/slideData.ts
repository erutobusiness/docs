import type { SlideSection } from '@/types/slides';

// スライドデータの定義
export const slideSections: SlideSection[] = [
  {
    id: '01 - intro',
    title: '宣言的UIとはなにか？かんたんに',
    description: '宣言的UIの基本概念について解説します',
    slides: [
      {
        id: '01-intro-1',
        title: '宣言的UIとは',
        content: [
          '宣言的UIとは「何を」表示するかを記述し、「どのように」表示するかの詳細はフレームワークに任せるアプローチです。',
          'プログラマーはUIの最終的な状態を宣言し、状態変化に応じた更新はフレームワークが自動的に行います。',
        ],
        codeExample: {
          language: 'jsx',
          code: `// React（宣言的UI）の例
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        増やす
      </button>
    </div>
  );
}`,
        },
      },
      {
        id: '01-intro-2',
        title: '命令的UIとの違い',
        content: [
          '命令的UIでは「どのように」UIを変更するかの手順を記述します。',
          'DOM操作を直接行い、要素の追加・削除・更新を明示的に指示します。',
        ],
        codeExample: {
          language: 'js',
          code: `// 命令的UIの例（JavaScript DOM操作）
const counter = document.getElementById('counter');
const button = document.getElementById('button');
let count = 0;

button.addEventListener('click', () => {
  count++;
  counter.textContent = \`カウント: \${count}\`;
});`,
        },
      },
      {
        id: '01-intro-3',
        title: '宣言的UIの特徴',
        content: [
          '状態を中心とした設計：UI = f(state)',
          '再利用可能なコンポーネント',
          '自動的なUI更新',
          'コードの可読性と保守性の向上',
        ],
        imageUrl: '/images/declarative-ui-diagram.png',
      },
    ],
  },
  {
    id: '02 - why_now',
    title: '宣言的・宣言性を学ぶメリット',
    description: '宣言的アプローチがなぜ現代のUI開発に適しているのかを解説します',
    slides: [
      {
        id: '02-why-1',
        title: '複雑なUIを管理しやすい',
        content: [
          'モダンWebアプリケーションはUIの複雑さが増しています',
          '宣言的アプローチは状態管理を簡潔にし、UIの一貫性を保ちやすくします',
          '複雑な状態遷移もデータフローとして捉えられるため、デバッグが容易になります',
        ],
      },
      {
        id: '02-why-2',
        title: '幅広いプラットフォームへの応用',
        content: [
          '宣言的UIの考え方は様々なフレームワークで採用されています：',
          'Web: React, Vue, Svelte',
          'モバイル: SwiftUI, Flutter, React Native',
          'デスクトップ: WPF (XAML), JavaFX',
        ],
        imageUrl: '/images/cross-platform.png',
      },
      {
        id: '02-why-3',
        title: '将来性と学習効率',
        content: [
          '一度宣言的UIの概念を理解すれば、異なるフレームワーク間の知識移行が容易になります',
          '新しいフレームワークの習得が早くなります',
          'AI時代のプログラミングとの親和性が高い：AIは「何をしたいか」を理解するのが得意ですが、「どう実装するか」の詳細を理解するのは苦手です',
        ],
      },
    ],
  },
  {
    id: '03 - history',
    title: '宣言的・宣言的UIの歴史',
    description: '宣言的プログラミングの起源から現代のUIフレームワークまでの発展を解説します',
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
  },
  {
    id: '04 - quiz',
    title: '宣言的UIの実践（クイズ形式）',
    description: '宣言的UIと命令的UIの違いを実践的なコード例で学びます',
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
  },
  {
    id: '05 - letter',
    title: '宣言的UIのこぼれ話（お便り形式）',
    description: '宣言的UIに関するよくある質問や誤解について解説します',
    slides: [
      {
        id: '05-letter-1',
        title: 'お便り1：宣言的UIはパフォーマンスが悪い？',
        content: [
          '質問：「宣言的UIは内部で多くの処理が行われるため、命令的UIより遅いのでは？」',
          '回答：',
          '・初期のフレームワークでは確かにオーバーヘッドがありました',
          '・しかし現代のフレームワークは差分検知アルゴリズムやコンパイラ最適化で高速化されています',
          '・React、Vue、Svelteなどは実行時のパフォーマンスを重視して設計されています',
          '・命令的に最適化された手書きコードより遅い場合もありますが、保守性や開発効率の向上というメリットが上回ることが多いです',
        ],
      },
      {
        id: '05-letter-2',
        title: 'お便り2：宣言的UIは学習コストが高い？',
        content: [
          '質問：「新しい概念や抽象化が多く、習得が難しいのでは？」',
          '回答：',
          '・確かに最初の学習曲線は存在します',
          '・しかし「状態に基づいてUIが決まる」という単純な概念に基づいています',
          '・一度概念を理解すれば、異なるフレームワーク間での知識移行も容易です',
          '・命令的UIでは複雑なUIになるほど状態管理が複雑になり、最終的な学習・保守コストは上がります',
        ],
        imageUrl: '/images/learning-curve.png',
      },
      {
        id: '05-letter-3',
        title: 'お便り3：宣言的UIとReactは同じもの？',
        content: [
          '質問：「宣言的UIといえばReactのことでしょうか？」',
          '回答：',
          '・Reactは宣言的UIの代表的な実装の一つですが、同じではありません',
          '・Vue、Svelte、SwiftUI、Flutter、Compose（Android）なども宣言的UIフレームワークです',
          '・それぞれのフレームワークは独自のアプローチで宣言的UIを実現しています',
          '・宣言的UIはアプローチ・思想であり、特定の実装ではありません',
        ],
        codeExample: {
          language: 'html',
          code: `<!-- Vue.jsの宣言的UI例 -->
<template>
  <div>
    <p>カウント: {{ count }}</p>
    <button @click="increment">増やす</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>`,
        },
      },
    ],
  },
  {
    id: '06 - summary',
    title: 'まとめ',
    description: '宣言的UIのコンセプトと重要ポイントの復習',
    slides: [
      {
        id: '06-summary-1',
        title: '宣言的UIの要点',
        content: [
          '1. 状態（データ）に基づくUI設計：UI = f(state)',
          '2. 「何を」表示するかを記述し、「どのように」表示するかはフレームワークが担当',
          '3. 再利用可能なコンポーネントによる抽象化',
          '4. 自動的なUI更新によるDOMとの同期',
        ],
      },
      {
        id: '06-summary-2',
        title: '宣言的UIの利点',
        content: [
          '・コードの可読性と保守性の向上',
          '・状態の一元管理による予測可能性',
          '・テストの容易さ',
          '・宣言的な思考法は他の領域（IaC、AI連携など）にも応用できる',
        ],
      },
      {
        id: '06-summary-3',
        title: '次のステップ',
        content: [
          '・異なるフレームワークを比較してみる',
          '・ReactやVueなどのフレームワークで実際に開発を行う',
          '・状態管理ライブラリ（Redux、Vuex、Recoilなど）について学ぶ',
          '・サーバーコンポーネントなど最新の宣言的UIトレンドを追う',
        ],
        codeExample: {
          language: 'jsx',
          code: `// 宣言的UIの基本形
function App() {
  const [state, setState] = useState(initialState);
  
  return (
    <UI based on state />
  );
}`,
        },
      },
    ],
  },
];

// 特定のスライドセクションを取得する関数
export function getSlideSection(id: string): SlideSection | undefined {
  return slideSections.find((section) => section.id === id);
}

// すべてのスライドセクションを取得する関数
export function getAllSlideSections(): SlideSection[] {
  return slideSections;
}
