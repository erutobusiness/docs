# スライドシステム設計方針メモ

本ファイルは、本プロジェクトとは別に新規プロジェクトを立ち上げる際のスライドシステム設計方針をまとめたものです。
以下の内容は、スライドシステムの基本方針、使用技術、構造、アニメーション要件、テクニックなどを含みます。

## 1. 決定事項

### 1.1. 基本方針

- 表現力のあるスライドシステムを構築する
- スライド発表する際の利便性を重視する

### 1.2. 使用技術

- **フレームワーク**: Next.js (App Router)
- **言語**: TypeScript, React
- **フォーマッター/リンター**: Biome
- **他ライブラリ**: framer-motion, react-zoom-pan-pinch, @heroicons/react, react-syntax-highlighter

### 1.3. 各種構造

- **URL構造**: `src/app/[presentationId]/[sectionId]`
  - `[presentationId]`: プレゼンテーション全体のまとまり (例: `declarative_ui`)
  - `[sectionId]`: 個別のスライド番号や章 (例: `01_intro`)
- **画面構造**:
  - プレゼンテーション一覧: `src/app/page.tsx`
    - プレゼンテーション詳細: `src/app/[presentationId]/page.tsx`
      - プレゼンテーション: `src/app/[presentationId]/[sectionId]/page.tsx`
        - スライド: `src/components/SlideComponent.tsx`
          - スライドコンテンツ: ヘッダーテキスト `src/components/contents/TextHeader.tsx` など
          - アニメーション: 波打ち背景アニメーション `src/components/animations/WaveAnimation.tsx` など
- **データ構造**:
  - プレゼンテーションデータ: `src/data/{presentationId}/index.ts`
    - 各セクション・各スライドの情報を取得する
  - スライドデータ: `src/data/{presentationId}/{sectionId}/{slideId}.ts`
    - スライドの内容（テキスト、画像パス等）を、スライドごとにファイルを分けて定義する
  - 原稿データ: `src/data/{presentationId}/{sectionId}/00_script.md`
    - スライドの原稿を、セクションごとにファイルを分けて定義する

### 1.4. コンポーネント設計

- **データとビューの分離**: スライドの内容（テキスト、画像パス等）は `src/data/{presentationId}/{sectionId}/{slideId}.ts` のようなファイルで一元管理する
- **レイアウトコンポーネント**: 共通レイアウト（タイトル、2カラム等）は `src/components/layouts/` に作成し、再利用する
- **カスタムスライド**: 特定のスライド用にユニークなコンポーネントを作成・動的読み込みする仕組みも用意し、表現の自由度を担保する

### 1.5. スタイル管理

- **グローバルスタイル**: `globals.css` に、全体共通のCSS変数や基本スタイルを定義する
- **プレゼンテーションスタイル**: 各プレゼンテーションのスタイルは、各プレゼンテーション用CSSを作成して局所化する
- **コンポーネントスタイル**: コンポーネントファイル内にスタイルを局所化する

---

## 2. アニメーション要件

- **背景アニメーション**
  - **要件**: スライドをめくった際の背景アニメーションを、スライドごとに指定できるようにする
  - **実装案**:
    - スライドデータオブジェクトに `backgroundAnimation: 'wave' | 'heart' | 'boom'` のようなプロパティを持たせる
    - スライドコンポーネントが、そのプロパティに応じたCSSクラスを適用する

- **スライドめくりアニメーション**
  - **要件**: スライドをめくる際のスライドアニメーションを、スライドごとに指定できるようにする
  - **実装案**:
    - スライドデータオブジェクトに `slideTransition: 'slide' | 'fade' | 'zoom'` のようなプロパティを持たせる
    - スライドコンポーネントが、そのプロパティに応じたCSSクラスを適用する

- **コンテンツアニメーション**
  - **要件**: スライド内の各コンテンツ（テキスト、画像など）の表示・非表示アニメーションを、コンテンツ単位で制御できるようにする
  - **実装案**:
    - アニメーションを適用するための専用コンポーネント（例: `<AppearAnimation type="fade-in-up" delay={100}>...<AppearAnimation/>`）を作成する
    - アニメーションの種類（フェードイン、スライドイン等）やタイミング（遅延）をpropsで指定できるようにする
    - アニメーション用のCSSは、コンポーネントファイル内で定義する

---

## 3. テクニック

参考プロジェクトから、以下のテクニックを学び、今後の開発に活用する。

### 関数中心の責務分離カスタムフック設計

- **改善点**: 単一責任原則に基づく関数型パターンで、テスタブルな階層構造を実現
- **活用案**: 関数の合成でロジックを組み立て、依存性はパラメータとして注入し、副作用を最小限に抑えたクリーンなアーキテクチャを構築する
- **設計パターン**:

  ```typescript
  // 純粋関数でビジネスロジック
  const calculateNextSlide = (current: number, total: number) =>
    Math.min(current + 1, total - 1);

  // 基本フック - 状態管理のみ
  function useSlideState(initialIndex = 0) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    return { currentIndex, setCurrentIndex };
  }

  // 拡張フック - キーボード操作
  function useKeyboardNav(onNext: () => void, onPrev: () => void) {
    useEffect(() => {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrev();
      };
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }, [onNext, onPrev]);
  }

  // 合成フック
  export function useSlidePresentation(slides: Slide[]) {
    const { currentIndex, setCurrentIndex } = useSlideState();
    const goNext = () => setCurrentIndex(calculateNextSlide(currentIndex, slides.length));
    const goPrev = () => setCurrentIndex(Math.max(currentIndex - 1, 0));

    useKeyboardNav(goNext, goPrev);

    return { currentIndex, currentSlide: slides[currentIndex], goNext, goPrev };
  }
  ```

### 関数型レンダリング戦略によるコンポーネント自動生成

- **改善点**: 関数型パターンとMapベースの戦略選択で条件分岐を排除し、拡張性を向上
- **活用案**: 型定義ベースの構造定義で、新しいレイアウトタイプの追加時にコード変更を最小化する。関数の合成でレンダリング戦略を組み立てる
- **設計パターン**:

  ```typescript
  // データ駆動型コンポーネント定義
  interface SlideData {
    layout: 'hero' | 'two-column' | 'image-focus';
    components: ComponentData[];
  }

  // レンダラーレジストリ
  function createComponentRegistry() {
    const renderers = new Map<string, (data: any) => React.ReactElement>();

    return {
      register: (type: string, renderer: (data: any) => React.ReactElement) =>
        renderers.set(type, renderer),
      render: (data: ComponentData) =>
        renderers.get(data.type)?.(data) || <div>Unknown: {data.type}</div>
    };
  }

  // 汎用レンダラー
  export function SlideRenderer({ slideData }: { slideData: SlideData }) {
    const registry = useComponentRegistry();
    const Layout = getLayoutComponent(slideData.layout);

    return (
      <Layout>
        {slideData.components.map((component, index) =>
          registry.render(component)
        )}
      </Layout>
    );
  }

  // レイアウト選択
  function getLayoutComponent(layout: string) {
    const layouts = {
      'hero': ({ children }) => <div className="hero">{children}</div>,
      'two-column': ({ children }) => <div className="two-col">{children}</div>,
    };
    return layouts[layout] || layouts.hero;
  }
  ```

### CSS Custom Properties + Context による軽量テーマシステム

- **改善点**: ネイティブCSS機能を最大限活用し、最小限のJavaScriptでテーマ切り替えを実現
- **活用案**: CSS Custom Properties、prefers-color-scheme、Container Queriesを組み合わせ、ライブラリなしでダークモード対応・レスポンシブテーマシステムを構築する
- **設計パターン**:

  ```typescript
  // CSS Custom Properties直接操作
  function applyTheme(theme: Record<string, string>) {
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }

  // 軽量テーマプロバイダー
  export function ThemeProvider({ children, themes }) {
    const [currentTheme, setCurrentTheme] = useState('default');
    const [colorScheme, setColorScheme] = useState('light');

    // システムカラースキーム検出
    useEffect(() => {
      const mq = matchMedia('(prefers-color-scheme: dark)');
      setColorScheme(mq.matches ? 'dark' : 'light');
      mq.addEventListener('change', e => setColorScheme(e.matches ? 'dark' : 'light'));
    }, []);

    // テーマ適用
    useEffect(() => {
      if (themes[currentTheme]) applyTheme(themes[currentTheme]);
    }, [currentTheme, themes]);

    return (
      <div data-theme={currentTheme} data-color-scheme={colorScheme}>
        {children}
      </div>
    );
  }

  /* CSS例 */
  .slide-container {
    background: var(--color-bg);
    color: var(--color-text);
    container-type: inline-size;
  }

  [data-color-scheme="dark"] {
    --color-bg: #0a0a0a;
    --color-text: #ffffff;
  }

  @container (max-width: 768px) {
    .slide-title { font-size: var(--font-lg); }
  }
  ```

### 軽量 Hybrid Rendering + Dynamic Import Strategy

- **改善点**: Next.js標準機能を活用したシンプルなハイブリッドレンダリング戦略
- **活用案**: Dynamic Import、ISR、Edge Runtimeの組み合わせで、ライブラリ依存なしに高性能なスライドシステムを実現する
- **設計パターン**:

  ```typescript
  // 動的コンポーネント読み込み
  function createLazyLoader() {
    const cache = new Map();
    return (name: string) => {
      if (!cache.has(name)) {
        cache.set(name, import(`@/components/slides/${name}`)
          .then(m => m.default)
          .catch(() => () => <div>Component not found: {name}</div>)
        );
      }
      return cache.get(name);
    };
  }

  // 静的生成設定
  export async function generateStaticParams() {
    const manifest = await import('@/data/slide-manifest.json');
    return manifest.slides.map(slide => ({
      presentationId: slide.presentationId,
      slideId: slide.id
    }));
  }

  // スライドページ
  export default async function SlidePage({ params }) {
    const data = await getSlideData(params.presentationId, params.slideId);

    return (
      <div data-slide-id={params.slideId}>
        <Suspense fallback={<div>Loading...</div>}>
          {data.components.map((comp, i) => (
            <LazyComponent key={i} type={comp.type} {...comp.props} />
          ))}
        </Suspense>
      </div>
    );
  }

  export const runtime = 'edge';
  export const revalidate = 3600;
  ```

- **Next.js標準機能による軽量ビルド最適化**
  - **改善点**: Next.jsとNode.js標準機能のみを使った増分ビルドとキャッシュ戦略
  - **活用案**: 外部ツールに依存せず、ファイルシステムベースの依存関係追跡と並列処理で高速ビルドを実現する
  - **設計パターン**:

    ```typescript
    // ファイルベースの依存関係追跡
    function createBuildDependencyTracker() {
      const dependencyCache = new Map<string, {
        lastModified: number;
        dependencies: string[]
      }>();

      const getDependencies = (filePath: string): string[] => {
        try {
          const content = readFileSync(filePath, 'utf-8');
          const importMatches = content.match(/import.*from\s+['"`]([^'"`]+)['"`]/g) || [];
          return importMatches
            .map(match => match.match(/['"`]([^'"`]+)['"`]/)?.[1])
            .filter(Boolean) as string[];
        } catch {
          return [];
        }
      };

      const hasChanged = (filePath: string): boolean => {
        const stats = statSync(filePath, { throwIfNoEntry: false });
        if (!stats) return true;

        const cached = dependencyCache.get(filePath);
        return !cached || cached.lastModified < stats.mtimeMs;
      };

      const updateCache = (filePath: string) => {
        const stats = statSync(filePath, { throwIfNoEntry: false });
        if (stats) {
          dependencyCache.set(filePath, {
            lastModified: stats.mtimeMs,
            dependencies: getDependencies(filePath),
          });
        }
      };

      return { hasChanged, updateCache, getDependencies };
    }

    // 増分ビルド関数
    async function buildSlidePresentation(presentationId: string) {
      const dependencyTracker = createBuildDependencyTracker();
      const slidesDir = `src/data/${presentationId}`;
      const outputDir = `.next/static/slides/${presentationId}`;

      try {
        const slideFiles = readdirSync(slidesDir)
          .filter(file => file.endsWith('.ts') || file.endsWith('.json'));

        // 変更されたファイルのみ処理
        const changedFiles = slideFiles.filter(file => 
          dependencyTracker.hasChanged(path.join(slidesDir, file))
        );

        if (changedFiles.length === 0) {
          console.log(`No changes in ${presentationId}, skipping build`);
          return;
        }

        // 並列処理でビルド
        await Promise.all(changedFiles.map(async (file) => {
          const inputPath = path.join(slidesDir, file);
          const outputPath = path.join(outputDir, file.replace('.ts', '.json'));

          if (file.endsWith('.ts')) {
            // TypeScript ファイルの場合は動的インポートでデータ取得
            const module = await import(inputPath);
            const data = module.default || module;
            await writeFile(outputPath, JSON.stringify(data, null, 2));
          } else {
            // JSONファイルの場合はそのままコピー
            await copyFile(inputPath, outputPath);
          }

          dependencyTracker.updateCache(inputPath);
        }));

        console.log(`Built ${changedFiles.length} slides for ${presentationId}`);
      } catch (error) {
        console.error(`Build failed for ${presentationId}:`, error);
        throw error;
      }
    }

    // 開発サーバーでのHot Reload
    function setupHotReload() {
      if (process.env.NODE_ENV !== 'development') return;

      const watcher = require('chokidar').watch('src/data/**/*.{ts,json}');

      watcher.on('change', async (filePath: string) => {
        const presentationId = filePath.match(/src\/data\/([^\/]+)/)?.[1];
        if (presentationId) {
          try {
            await buildSlidePresentation(presentationId);

            // Next.jsの開発サーバーに変更を通知
            if (global.__next_dev_server) {
              global.__next_dev_server.hotReloader.send('reloadPage');
            }
          } catch (error) {
            console.error('Hot reload failed:', error);
          }
        }
      });

      return () => watcher.close();
    }

    // 本番ビルド用の最適化
    export async function buildAllPresentations() {
      const dataDir = 'src/data';
      const presentations = readdirSync(dataDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      // CPU数に基づいて並列度を決定
      const concurrency = Math.min(require('os').cpus().length, presentations.length);
      const chunks = [];

      for (let i = 0; i < presentations.length; i += concurrency) {
        chunks.push(presentations.slice(i, i + concurrency));
      }

      // チャンクごとに並列実行
      for (const chunk of chunks) {
        await Promise.all(chunk.map(buildSlidePresentation));
      }

      console.log(`Built ${presentations.length} presentations`);
    }

    // Next.js設定例
    const nextConfig = {
      experimental: {
        outputFileTracingRoot: path.join(__dirname, '../../'),
      },
      compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
      },
      async generateBuildId() {
        // ビルドIDにgitハッシュを使用してキャッシュを最適化
        return require('child_process')
          .execSync('git rev-parse HEAD')
          .toString()
          .trim()
          .slice(0, 8);
      },
    };
    ```

### react-zoom-pan-pinch + useState による軽量ズーム・パンシステム

- **改善点**: react-zoom-pan-pinchライブラリとReact標準機能のみを使ったクリック中心ズーム機能
- **活用案**: 軽量なライブラリと独自ロジックの組み合わせで、マウス・タッチ対応の直感的なズーム操作を実現する
- **設計パターン**:

  ```typescript
  // react-zoom-pan-pinch統合のズーム・パン
  function useZoom() {
    const [zoomFactor, setZoomFactor] = useState(1.0);
    const [isZoomEnabled, setIsZoomEnabled] = useState(false);
    const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

    const zoomAtPosition = useCallback((e: React.MouseEvent | React.TouchEvent) => {
      if (!isZoomEnabled) return;

      // ボタン要素上でのクリックは無視
      if (e.target instanceof Element) {
        const targetElement = e.target as Element;
        if (
          targetElement.tagName === 'BUTTON' ||
          targetElement.closest('button') ||
          targetElement.closest('.icon-button')
        ) {
          return;
        }
      }

      // 右クリックでリセット
      if ('button' in e && e.button === 2) {
        resetZoom();
        return;
      }

      // クリック位置を取得
      let clientX = 0, clientY = 0;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      // ウィンドウサイズに対する割合を計算
      const percentX = (clientX / window.innerWidth) * 100;
      const percentY = (clientY / window.innerHeight) * 100;

      setZoomOrigin({ x: percentX, y: percentY });
      setZoomFactor(prevZoom => Math.min(prevZoom + 0.25, 3.0));
    }, [isZoomEnabled]);

    const resetZoom = useCallback(() => {
      setZoomFactor(1.0);
      setZoomOrigin({ x: 50, y: 50 });
    }, []);

    const toggleZoom = useCallback(() => {
      setIsZoomEnabled(prev => {
        if (prev) resetZoom();
        return !prev;
      });
    }, [resetZoom]);

    return {
      zoomFactor,
      isZoomEnabled,
      zoomOrigin,
      zoomAtPosition,
      resetZoom,
      toggleZoom,
      handleRightClick: useCallback((e: React.MouseEvent) => {
        if (isZoomEnabled && zoomFactor > 1.0) {
          e.preventDefault();
          resetZoom();
        }
      }, [isZoomEnabled, zoomFactor, resetZoom])
    };
  }

  // react-zoom-pan-pinchとの統合例
  import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

  export function ZoomableSlide({ children }: { children: React.ReactNode }) {
    const { zoomFactor, isZoomEnabled, zoomOrigin, zoomAtPosition, handleRightClick } = useZoom();

    return (
      <TransformWrapper
        initialScale={zoomFactor}
        disabled={!isZoomEnabled}
        centerOnInit={false}
        limitToBounds={false}
        maxScale={3}
        minScale={1}
      >
        <TransformComponent>
          <div 
            onClick={zoomAtPosition}
            onContextMenu={handleRightClick}
            style={{
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
              transform: isZoomEnabled ? `scale(${zoomFactor})` : undefined
            }}
          >
            {children}
          </div>
        </TransformComponent>
      </TransformWrapper>
    );
  }
  ```

### Web Animation API + CSS による軽量アニメーションシステム

- **改善点**: ネイティブWeb Animation API、CSS keyframes、Intersection Observerを組み合わせた高性能アニメーション
- **活用案**: ライブラリ依存なしで複雑なアニメーションシーケンス、60fps保証、モーション軽減対応、GPU加速を実現する
- **設計パターン**:

  ```typescript
  // Web Animation API ベースのアニメーション管理
  function useWebAnimations() {
    const animationMap = useRef(new Map<string, Animation>());
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
      const mediaQuery = matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    const animate = useCallback((
      element: HTMLElement,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions & { id?: string } = {}
    ) => {
      const { id, ...animationOptions } = options;

      // モーション軽減対応
      if (reducedMotion) {
        animationOptions.duration = 100;
        keyframes = keyframes.map(frame => ({ ...frame, opacity: frame.opacity ?? 1 }));
      }

      const animation = element.animate(keyframes, {
        duration: 300,
        easing: 'ease-out',
        fill: 'forwards',
        ...animationOptions,
      });

      if (id) {
        // 既存のアニメーションをキャンセル
        if (animationMap.current.has(id)) {
          animationMap.current.get(id)?.cancel();
        }
        animationMap.current.set(id, animation);
      }

      return animation;
    }, [reducedMotion]);

    const createSequence = useCallback((animations: Array<{
      element: HTMLElement;
      keyframes: Keyframe[];
      options?: KeyframeAnimationOptions;
    }>) => {
      return animations.reduce((sequence, { element, keyframes, options }, index) => {
        return sequence.then(() => {
          const animation = animate(element, keyframes, options);
          return animation.finished;
        });
      }, Promise.resolve());
    }, [animate]);

    return { animate, createSequence };
  }

  // Intersection Observer ベースのスクロールアニメーション
  function useScrollAnimations() {
    const { animate } = useWebAnimations();
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement;
            const animationType = element.dataset.animation;
            
            if (entry.isIntersecting) {
              switch (animationType) {
                case 'fade-in':
                  animate(element, [
                    { opacity: 0, transform: 'translateY(20px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                  ]);
                  break;
                case 'slide-in':
                  animate(element, [
                    { transform: 'translateX(-100%)' },
                    { transform: 'translateX(0)' }
                  ]);
                  break;
                case 'scale-in':
                  animate(element, [
                    { transform: 'scale(0.8)', opacity: 0 },
                    { transform: 'scale(1)', opacity: 1 }
                  ]);
                  break;
              }
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '50px',
        }
      );

      // data-animation属性を持つ要素を監視
      const animatedElements = document.querySelectorAll('[data-animation]');
      animatedElements.forEach(el => observer.observe(el));

      return () => observer.disconnect();
    }, [animate]);
  }

  // スライドトランジション用アニメーション
  export function SlideTransition({ 
    children, 
    direction = 'right',
    isActive = false 
  }: {
    children: React.ReactNode;
    direction?: 'left' | 'right' | 'up' | 'down';
    isActive?: boolean;
  }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { animate } = useWebAnimations();

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const directionMap = {
        left: { from: 'translateX(-100%)', to: 'translateX(0)' },
        right: { from: 'translateX(100%)', to: 'translateX(0)' },
        up: { from: 'translateY(-100%)', to: 'translateY(0)' },
        down: { from: 'translateY(100%)', to: 'translateY(0)' },
      };

      if (isActive) {
        animate(container, [
          { 
            transform: directionMap[direction].from,
            opacity: 0 
          },
          { 
            transform: directionMap[direction].to,
            opacity: 1 
          }
        ], { 
          duration: 400,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          id: `slide-transition-${direction}` 
        });
      }
    }, [isActive, direction, animate]);

    return (
      <div ref={containerRef} className="slide-transition">
        {children}
      </div>
    );
  }

  /* CSS例（GPU最適化） */
  .slide-transition {
    will-change: transform, opacity;
    backface-visibility: hidden;
    perspective: 1000px;
  }

  /* Wave アニメーション（CSS keyframes） */
  .wave-container {
    --wave-color: var(--color-primary, #3b82f6);
    --wave-duration: var(--motion-duration, 0.9s);
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .wave {
    width: 200%;
    height: 150%;
    background: var(--wave-color);
    border-radius: 45%;
    opacity: 0;
    will-change: transform, opacity;
    animation: 
      wave-appear var(--wave-duration) ease-out forwards,
      wave-rotate 8s linear infinite;
  }

  @keyframes wave-appear {
    0% { opacity: 0; transform: translateY(100%); }
    50% { opacity: 0.7; }
    100% { opacity: 0; transform: translateY(-20%); }
  }

  @keyframes wave-rotate {
    to { transform: rotate(360deg); }
  }

  @media (prefers-reduced-motion: reduce) {
    .wave {
      animation-duration: 0.1s, 0s;
      opacity: 0.3;
    }
  }
  ```

### TypeScript型システムによる軽量コンテンツ管理

- **改善点**: TypeScriptの型システムとNode.js標準機能のみを使った軽量コンテンツ管理システム
- **活用案**: 外部バリデーション不要で型安全性を保ち、開発体験とパフォーマンスを両立するシンプルなスライド管理
- **設計パターン**:

  ```typescript
  // TypeScript 型定義ベースのコンテンツ管理
  interface SlideImage {
    url: string;
    alt: string;
    position: 'top' | 'bottom' | 'left' | 'right' | 'background';
    lazy?: boolean;
  }

  interface SlideCode {
    title: string;
    filename?: string;
    language: 'typescript' | 'javascript' | 'css' | 'html' | 'json';
    code: string;
  }

  interface SlideAnimations {
    in?: {
      type: 'fade' | 'slide' | 'zoom';
      duration: number;
    };
    out?: {
      type: 'fade' | 'slide' | 'zoom';
      duration: number;
    };
  }

  interface BackgroundAnimation {
    type: 'wave' | 'heart' | 'boom';
  }

  interface Slide {
    id: string;
    title: string;
    descriptions?: string[];
    image?: SlideImage;
    codeExamples?: SlideCode[];
    slideAnimations?: SlideAnimations;
    backgroundAnimation?: BackgroundAnimation;
  }

  interface SlideSection {
    id: string;
    title: string;
    description: string;
    slides: Slide[];
  }

  // 軽量コンテンツローダー
  function useContentLoader() {
    const [cache, setCache] = useState(new Map<string, SlideSection>());

    const loadSection = useCallback(async (sectionId: string): Promise<SlideSection | null> => {
      const cached = cache.get(sectionId);
      if (cached) return cached;

      // TypeScript の動的インポートを活用
      const module = await import(`@/data/slides/${sectionId}`);
      const section = module.default || module[`${sectionId}Section`];

      setCache(prev => new Map(prev).set(sectionId, section));
      return section;
    }, [cache]);

    return {
      loadSection,
      clearCache: () => setCache(new Map()),
    };
  }
  ```

---

## 4. 運用設定

### 4.1. プロジェクト設定ファイル

#### package.json

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "format": "biome format --write .",
    "lint": "biome check .",
    "lint:fix": "biome check --apply ."
  },
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "framer-motion": "^12.9.4",
    "next": "15.3.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-syntax-highlighter": "^15.6.1",
    "react-zoom-pan-pinch": "^3.7.0"
  },
  "devDependencies": {
    "@biomejs/biome": "^1.9.4",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/react-syntax-highlighter": "^15.5.13",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

#### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "jsx": "preserve",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### biome.json

```json
{
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "always"
    }
  },
  "linter": {
    "rules": {
      "correctness": { "noUnusedVariables": "error" },
      "style": { "useConst": "error" }
    }
  }
}
```
