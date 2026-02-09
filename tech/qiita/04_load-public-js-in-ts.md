---
title: publicにあるJavaScriptの変数をTypeScriptで型定義して読む in React + Vite
tags: JavaScript TypeScript React vite
author: nyarlathotep
created_at: "2024-03-30"
updated_at: "2024-04-03"
id: 9567088f05d27761ca5a
organization_url_name: visionary-jp
slide: false
ignorePublish: false
---

# これはなに？なにがうれしい？

`public`配下にあるJavaScriptの設定ファイルをReactで読む必要があった。
この記事ではグローバルオブジェクト`window`を使用した方法をメインに紹介する。
この方法は、提供されたJSファイルなどを型定義して読み込みたい場合に使用できる。

# 試したけどダメだった方法

- `public`に定義した変数を`src`内の`.d.ts`でアンビエント宣言(declare)
  - `public`に定義した変数と同名の変数をアンビエント宣言したからといって読み込めるわけではない
- ES Modulesの`import/export`を使用
  - `src`から`src`の外を`import`できない
  - CommonJSの`module.exports/require`はそもそもダメ

# 参考記事

<https://zenn.dev/qnighy/articles/9c4ce0f1b68350>

<https://qiita.com/crml1206/items/1ffe928339950c4938a4>

# コード

## /index.html

Viteの場合はルート直下に`index.html`がある。
対象JSは`/public/js/configs.js`とする。

```diff:index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
+++ <script type="module" src="/public/js/configs.js"></script>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create React Appの場合は`public`直下にある。

```diff:/public/index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>React Create App</title>
  </head>
  <body>
    <div id="root"></div>
+++ <script type="module" src="%PUBLIC_URL%/js/configs.js"></script>
  </body>
</html>
```

## /public/js/config.js

オブジェクトとして定義してみる。

```javascript:/public/config.js
window.configs = {
    windowConfig1: { keyString: 'windowConfigString1' },
    windowConfig2: { keyString: 'windowConfigString2' },
};
```

## /src/@types/index.d.ts

`config.js`にあるオブジェクトの形に沿って型を定義する。
TypeScriptが`Window`インターフェースに`window`オブジェクトの持つべきプロパティやメソッドの型を定義している。
`Window`インターフェースにアンビエント宣言することで宣言マージされ、`Window`インターフェースが拡張される。

```typescript:/src/@types/index.d.ts
interface Config {
    keyString: string;
}

interface Configs {
    [id: string]: Config;
}

// ここが本題
declare global {
    interface Window {
        configs: Configs;
    }
}
```

## /src/*.*.tsx

読み込めていない場合を想定したほうがよい。

```tsx:/src/pages/public/Js.tsx
import { type FC, memo } from 'react';
import { EXPORT_CONFIGS } from '/public/js/configs.js';

const Component: FC = () => {
    const windowConfigs = window.configs;

    return (
        <>
            {windowConfigs &&
                Object.keys(windowConfigs).map(key => (
                    <div key={key}>{windowConfigs?.[key]?.keyString}</div>
                ))}
        </>
    );
};

export const Js = memo(Component);
```

## 出力の抜粋

```html
<div id="root">
  <div>windowConfigString1</div>
  <div>windowConfigString2</div>
</div>
```
