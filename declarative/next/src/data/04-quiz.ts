import type { SlideSection } from '@/types/slides';

// 宣言的UIの実践（クイズ形式）セクションのスライドデータ
export const quizSection: SlideSection = {
  id: '04-quiz',
  title: '宣言的UIの実践（クイズ形式）',
  description: 'Reactにおける宣言的・命令的なコードの違いをクイズ形式で深く学ぶ',
  slides: [
    {
      id: '04-quiz-intro',
      title: '宣言的・命令的コードの判断基準を学ぶ',
      descriptions: [
        'このクイズでは「宣言的」と「命令的」なコードの違いを理解し、それぞれの特性やトレードオフについて考えます',
        '多くの場合、どちらか一方が絶対的に正しいということはなく、状況に応じた適切な判断が求められます',
        '各問題を通じて、コードの意図、保守性、パフォーマンス、文脈に応じた設計の重要性について考察します',
      ],
    },
    {
      id: '04-quiz-1',
      title: 'クイズ1：JSONとYAML、どちらがより宣言的？',
      descriptions: [
        '問題：以下の2つのコード例のうち、どちらがより宣言的なアプローチと言えるでしょうか？',
        'また、実務ではどのような観点からどちらを選択するべきか考えてみましょう。',
      ],
      codeExamples: [
        {
          title: 'コードA：JSONを使用',
          language: 'json',
          code: `{
  "name": "declarative-ui-example",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^13.4.3"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "devDependencies": {
    "typescript": "^5.0.4",
    "eslint": "^8.41.0",
    "eslint-config-next": "^13.4.3"
  }
}`,
        },
        {
          title: 'コードB：YAMLを使用',
          language: 'yaml',
          code: `name: declarative-ui-example
version: 1.0.0
dependencies:
  react: ^18.2.0
  react-dom: ^18.2.0
  next: ^13.4.3
scripts:
  dev: next dev
  build: next build
  start: next start
  lint: next lint
devDependencies:
  typescript: ^5.0.4
  eslint: ^8.41.0
  eslint-config-next: ^13.4.3`,
        },
      ],
    },
    {
      id: '04-quiz-1-answer',
      title: 'クイズ1の解答例',
      descriptions: [
        'どちらも宣言的なアプローチですが、YAMLの方がより宣言的と言えます',
        'YAMLはJSONと比較して構文がシンプルで、インデントによる階層表現、コメントの追加が可能など、「何を」定義するかに集中できる形式です',
        'JSONはYAMLと比べると中括弧やカンマなどの構文要素が多く、「どのように」記述するかという側面にも注意を払う必要があります',
      ],
      list: {
        groups: [
          {
            title: 'JSON（コードA）のメリット',
            points: [
              '広範な言語・ツールでのサポート、エコシステムが充実している',
              'パース処理が高速で、効率的なデータ交換に適している',
              '厳格な構文規則により、エラーの検出が容易',
            ],
          },
          {
            title: 'YAML（コードB）のメリット',
            points: [
              '人間が読み書きしやすく、より直感的な構文',
              'コメントやマルチラインテキストなど、豊富な機能をサポート',
              '設定ファイルやドキュメント志向の用途に適している',
            ],
          },
        ],
      },
    },
    {
      id: '04-quiz-2',
      title: 'クイズ2：データフェッチの宣言性',
      descriptions: [
        '問題：以下の2つのコード例のうち、どちらがより宣言的なアプローチと言えるでしょうか？',
        'また、Reactの思想に沿った実装方法を考えてみましょう。',
      ],
      codeExamples: [
        {
          title: 'コードA：自前のデータフェッチ',
          language: 'jsx',
          code: `function useFetchWithCancel(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const abortController = new AbortController();
    const signal = abortController.signal;
    let isCancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const result = await response.json();
        if (!isCancelled) {
          setData(result);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          if (!isCancelled) {
            setError(err);
          }
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error };
}`,
        },
        {
          title: 'コードB：React Queryを使用',
          language: 'jsx',
          code: `function UserProfileB({ userId }) {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });

  if (isLoading) return <p>Loading initial user data...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No user selected.</p>;

  return (
    <div>
      User Name: {data.name}
      {isFetching ? " (Updating...)" : ""}
    </div>
  );
}`,
        },
      ],
    },
    {
      id: '04-quiz-2-answer',
      title: 'クイズ2の解答例',
      descriptions: [
        'React Query/SWRを使用するコードBの方が、より宣言的なアプローチです',
        '開発者は「どのデータを」「どのように取得するか（関数）」を宣言的に記述し、ライブラリがキャッシュ管理、更新状態、ローディング管理などを自動実行します',
        '自前実装（コードA）は、useEffectを使ってデータフェッチのライフサイクルを命令的に管理しています',
      ],
      list: {
        groups: [
          {
            title: '実務での推奨',
            points: [
              'React Query (TanStack Query) やSWRといったデータフェッチライブラリの利用が強く推奨される',
              '自前実装は、ライブラリ導入が適切でない小規模ケースや、特殊な要件がある場合に限定すべき',
              'データフェッチロジックの「車輪の再発明」は避けるのが賢明',
            ],
          },
        ],
      },
    },
    {
      id: '04-quiz-3',
      title: 'クイズ3：フォーカス制御',
      descriptions: [
        '問題：以下の2つのコード例のうち、どちらがReactの思想に沿ったフォーカス制御の実装と言えるでしょうか？',
        'それぞれのメリット・デメリットも考慮して説明してください。',
      ],
      codeExamples: [
        {
          title: 'コードA：useEffectでフォーカス制御',
          language: 'jsx',
          code: `function FocusableInput({ shouldFocus, ...props }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  return <input ref={inputRef} {...props} />;
}

function AppA() {
  const [focusRequested, setFocusRequested] = useState(false);

  const handleFocusClick = () => {
    setFocusRequested(true);
  };

  return (
    <div>
      <button onClick={handleFocusClick}>Focus Input</button>
      <FocusableInput
        shouldFocus={focusRequested}
        placeholder="Focus me when button is clicked"
        onFocus={() => console.log("Input focused")}
        onBlur={() => setFocusRequested(false)}
      />
    </div>
  );
}`,
        },
        {
          title: 'コードB：useImperativeHandleを使用',
          language: 'jsx',
          code: `const ImperativeFocusableInput = forwardRef((props, ref) => {
  const internalInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      internalInputRef.current?.focus();
    },
  }));

  return <input ref={internalInputRef} {...props} />;
});

function AppB() {
  const inputHandleRef = useRef(null);

  const handleFocusClick = () => {
    inputHandleRef.current?.focus();
  };

  return (
    <div>
      <ImperativeFocusableInput
        ref={inputHandleRef}
        placeholder="Focus me via imperative handle"
      />
      <button onClick={handleFocusClick}>Set Focus via Handle</button>
    </div>
  );
}`,
        },
      ],
    },
    {
      id: '04-quiz-3-answer',
      title: 'クイズ3の解答例',
      descriptions: [
        'どちらのアプローチも、フォーカス制御という本質的に命令的な操作を扱います',
        'useImperativeHandle（コードB）は親コンポーネントが子コンポーネントのメソッドを直接呼び出す命令的アプローチですが、内部実装を隠蔽（カプセル化）しています',
        'DOM操作のようなUIの命令的側面に対して、Reactは適切なツールを提供しています',
      ],
      list: {
        groups: [
          {
            title: 'コードA (useEffect) のメリット・デメリット',
            points: [
              'メリット: 比較的シンプル、shouldFocus propで制御が宣言的に見える',
              'デメリット: shouldFocusがtrueになるたびにフォーカスが当たるため、意図しない再フォーカスが発生する可能性がある',
            ],
          },
          {
            title: 'コードB (useImperativeHandle) のメリット・デメリット',
            points: [
              'メリット: 親が任意のタイミングでfocus()を呼び出せるため、制御が直接的。子コンポーネントの公開APIが明確',
              'デメリット: forwardRefとuseImperativeHandleの記述がやや冗長。命令的な呼び出しが増えるとコードが複雑化する可能性がある',
            ],
          },
        ],
      },
    },
    {
      id: '04-quiz-4',
      title: 'クイズ4：一時的な視覚効果',
      descriptions: [
        '問題：以下の2つのコード例のうち、一時的な視覚効果（ハイライト）を実現する上で、どちらがより「宣言的」なアプローチと言えるでしょうか？',
        'また、パフォーマンスや保守性の観点からはどちらが望ましいと考えられるでしょうか？',
      ],
      codeExamples: [
        {
          title: 'コードA：CSS Transition/Animation',
          language: 'jsx',
          code: `function HighlightWithCSS({ value }) {
  const [isHighlighting, setIsHighlighting] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setIsHighlighting(true);
      const timer = setTimeout(() => {
        setIsHighlighting(false);
      }, 100);

      prevValueRef.current = value;

      return () => clearTimeout(timer);
    }
  }, [value]);

  const className = \`highlight-value \${isHighlighting ? "flash" : ""}\`;

  return <p className={className}>値: {value}</p>;
}`,
        },
        {
          title: 'コードB：useEffect with Class Manipulation',
          language: 'jsx',
          code: `function HighlightWithEffect({ value }) {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    let timerId = null;

    elementRef.current.classList.add("highlight");

    timerId = setTimeout(() => {
      elementRef.current?.classList.remove("highlight");
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return <p ref={elementRef}>値: {value}</p>;
}`,
        },
      ],
    },
    {
      id: '04-quiz-4-answer',
      title: 'クイズ4の解答例',
      descriptions: [
        'CSS Transition/Animationを使用するコードAの方が、より宣言的なアプローチです',
        'コードAはハイライト状態を管理し、それに基づいてCSSクラス名を宣言的に設定するだけで、実際の視覚効果はCSSに記述されています',
        'コードBはuseEffect内でclassListの追加・削除といった命令的なDOM操作とタイマー管理を実行しています',
      ],
      list: {
        groups: [
          {
            title: 'パフォーマンスと保守性',
            points: [
              'パフォーマンス面では、コードAの方が有利。CSS TransitionやAnimationはブラウザによって最適化されている',
              '保守性についても、コードAの方が高い。視覚的な振る舞いはCSSファイルにまとまっているため、デザインの変更が容易',
              '一時的な視覚効果やアニメーションには、可能な限りCSSを活用するアプローチが望ましい',
            ],
          },
        ],
      },
    },
    {
      id: '04-quiz-5',
      title: 'クイズ5：状態更新ロジック',
      descriptions: [
        '問題：以下の2つのReactコンポーネント（カウンター機能）のうち、状態更新ロジックの実装方法としてどちらがより適切で、Reactの考え方に沿っていると言えるでしょうか？',
        'コード例Bのアプローチがなぜ一般的に推奨されないのか、その理由も説明してください。',
      ],
      codeExamples: [
        {
          title: 'コードA：useReducerパターン',
          language: 'jsx',
          code: `function CounterA() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => dispatch({ type: "add", payload: 5 })}>
        Add 5
      </button>
    </div>
  );
}`,
        },
        {
          title: 'コードB：useEffectを使用した状態更新（アンチパターン）',
          language: 'jsx',
          code: `function CounterB() {
  const [count, setCount] = useState(0);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    if (pendingAction === null) return;

    switch (pendingAction.type) {
      case "increment":
        setCount((c) => c + 1);
        break;
      case "decrement":
        setCount((c) => c - 1);
        break;
      case "reset":
        setCount(0);
        break;
      case "add":
        setCount((c) => c + (pendingAction.payload || 0));
        break;
      default:
        console.warn("Unknown action type in effect");
    }

    setPendingAction(null);
  }, [pendingAction]);

  const handleAction = (type, payload = null) => {
    setPendingAction({ type, payload, timestamp: Date.now() });
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => handleAction("increment")}>Increment</button>
      <button onClick={() => handleAction("decrement")}>Decrement</button>
      <button onClick={() => handleAction("reset")}>Reset</button>
      <button onClick={() => handleAction("add", 5)}>Add 5</button>
    </div>
  );
}`,
        },
      ],
    },
    {
      id: '04-quiz-5-answer',
      title: 'クイズ5の解答例',
      descriptions: [
        'useReducerを使用するコードAの方が、圧倒的に適切であり、Reactの考え方に沿っています',
        'ユーザーのアクションに対して直接状態を更新できるのに、中間状態(pendingAction)を設け、useEffectを介して間接的に更新するコードBは不必要に複雑です',
        'useEffectは、レンダリングの結果として発生する副作用を扱うためのものであり、コンポーネント内部の同期的な状態更新ロジックのために使うべきではありません',
      ],
      list: {
        groups: [
          {
            title: 'コードBが推奨されない理由',
            points: [
              '冗長性: ユーザーアクションに対して直接状態を更新できるのに、中間状態を経由して間接的に更新している',
              'useEffectの誤用: 状態更新のロジックをuseEffectに依存させることで、コードが複雑になり、バグが発生しやすくなる',
              'ユーザーイベントに応じて状態を更新する場合は、イベントハンドラ内で直接dispatch/setStateを呼び出すべき',
            ],
          },
        ],
      },
    },
    {
      id: '04-quiz-summary',
      title: 'クイズのまとめ',
      descriptions: [
        'このクイズを通じて、React における宣言的・命令的なアプローチの様々な側面を見てきました',
        '重要なのは、これらの概念が二元論ではなくグラデーションであること',
        '実際の開発では、宣言性だけでなく、パフォーマンス、保守性、開発コスト、ライブラリの活用、チームのスキルセットなど、多くの要因を考慮して最適な設計を選択する必要があります',
        '常に「なぜこのアプローチを選ぶのか？」という問いを持ち続けることが、より良いコードを書くための鍵となります',
      ],
    },
  ],
};
