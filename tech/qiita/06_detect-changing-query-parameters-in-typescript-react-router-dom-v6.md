---
title: React TypeScript React-Router-Dom v6 クエリパラメータの変更と変更検知
tags: React TypeScript クエリパラメータ react-router useSearchparams
author: nyarlathotep
created_at: "2024-04-01"
updated_at: "2024-04-01"
id: ac78cce00f7a2f698896
organization_url_name: visionary-jp
slide: false
ignorePublish: false
---

# 求められた仕様

## クエリパラメータ関連

- URLのクエリパラメータに合わせて表示を変更する
- 画面操作でクエリパラメータを変更できる

## ブラウザ操作関連

- ブラウザの戻るボタンを押したら前のクエリパラメータの状態に戻る
- リロードしても表示は変わらない

# 使用技術

- ReactとTypeScript を使用する
- 標準的なライブラリであるReact Routerの最新バージョンを使用する
  - パッケージは`react-router-dom`の`v6`を使用する

# 実装

## 配置

弊社のGitHubに配置している。

https://visionary-japan.github.io/react_ui_comparison/query

## コード

`string`と`number`の2つの型でクエリパラメータを値として管理する。
複数のファイルで使用できるよう、カスタムフックで実装した。

```typescript:useQuery.tsx
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useQuery() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [str, setStr] = useState<string>('');
    const [num, setNum] = useState<number>(0);

    const getParam = useCallback(
        (key: string) => {
            return searchParams.get(key) || '';
        },
        [searchParams],
    );

    const castStrToNum = useCallback((s: string) => {
        switch (s) {
            case 'NaN':
                return Number.NaN;
            default:
                return Number(s);
        }
    }, []);

    useEffect(() => {
        setStr(getParam('str'));
        setNum(castStrToNum(getParam('num')));
    }, [getParam, castStrToNum]);

    const handleChangeParams = useCallback(
        (newStr: string, newNum: number) => {
            setSearchParams({ str: newStr, num: String(newNum) });
        },
        [setSearchParams],
    );

    return { str, num, castStrToNum, handleChangeParams };
}

```

## 結論

- `useSearchParams`の
  - `searchParams`を`useEffect`の依存配列に含むことでクエリパラメータの変更を検知できる
  - `setSearchParams`でクエリパラメータを変更する

以上が結論です。

以降は余談になります。

# よくない例

最初は以下のように実装していた。

```typescript:useQuery.tsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useQuery() {
    const location = useLocation();

    const [str, setStr] = useState<string>('');
    const [num, setNum] = useState<number>(0);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newStr = params.get('str');
        const newNum = params.get('num');
        setStr(newStr === null ? '' : newStr);
        setNum(newNum === null || newNum === '' ? 0 : newNum);
    }, [location]);

    const [searchParams, setSearchParams] = useSearchParams();

    const onChangeParams = (newStr: string, newNum: number) => {
        searchParams.set('str', newStr);
        searchParams.set('num', newNum);
        setSearchParams(searchParams);
    };

    return { str, num, onChangeParams };
}
```

特に以下がよくなかった。

- 変更検知のためだけに`useLocation()`を使用している
- クエリパラメータ取得のためだけに`URLSearchParams()`を使用している
- クエリパラメータ変更のためだけに`useSearchParams()`を使用している

# 疑問

## クエリパラメータ関連のオブジェクトの違い

- 実装するなかで以下の３つを触ったが、それぞれどう異なるのか
  - `searchParams = URLSearchParams()`の`searchParams`
  - `[searchParams, setSearchParams] = useSearchParams()`の`searchParams`
  - `location = useLocation()`の`location.search`

### URLSearchParams

- 以下のように使用する：
  ```typescript
  const searchParams = new URLSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.get("str");
  newSearchParams.set("str", "1");
  ```
- **Reactに依存しないWeb API**の一部
- URLのクエリ文字列を解析して操作するためのインターフェースを提供する
- 任意のクエリ文字列を受け取って解析し、`URLSearchParams`オブジェクトを作成する
- そのオブジェクトからクエリパラメータの取得・変更などができる

https://developer.mozilla.org/ja/docs/Web/API/URLSearchParams/URLSearchParams

### useSearchParams

- 以下のように使用する：
  ```typescript
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams(searchParamsInit);
  setSearchParams({ str: "1", num: "1" });
  ```
- React Router v6 で導入されたフック
- URL のクエリ文字列を解析して操作するためのインターフェースを提供する
- 任意のクエリ文字列を受け取って解析し、 `URLSearchParams` オブジェクトと `SetURLSearchParams` メソッドを作成する
- そのオブジェクトからクエリパラメータを取得し、そのメソッドからクエリパラメータを変更できる
- **React の状態として扱われているため、クエリパラメータを変更することがコンポーネントの状態変更となり、関連するコンポーネントが再レンダリングされる**

https://reactrouter.com/en/main/hooks/use-search-params

### useLocation

- 以下のように使用する：
  ```typescript
  const location = useLocation();
  return <div>Query String: {location.search}</div>;
  ```
- React Router v5 以前から存在するフック
- 現在の URL の `location` オブジェクトを提供する
- そのオブジェクトからは、URL のパス、クエリ、ハッシュなど、現在の URL について様々な情報を取得できる
- **取得できるのみで、操作や管理には直接関与しない**

https://reactrouter.com/en/main/hooks/use-location

### 結論

- `URLSearchParams`は純粋なJavaScrip の機能で、任意のクエリ文字列を解析・操作するために使用される
- `useSearchParams`はReact Routerの機能で、クエリパラメータの管理をReactコンポーネントに統合し、状態の更新と連動させるために使用する
- `useLocation`はReact Routerの機能で、現在のクエリを提供するが、提供する情報が多いため、追加の操作が必要となる

結果として、今回はReactを使用しているので、状態の更新とレンダリングを連動させるためには、 `useSearchParams`がクエリ変更検知元のオブジェクトとクエリ変更方法として最適となった。

## 逆にReactでURLSearchParamsやuseLocationを使う場合って、どんなとき？ [調査中]

- URLSearchParams は useSearchParams を使うほどでもないときに使いそう
  - そんなことってあるか？？
  - 取得だけして変更を検知しないならありえる？？
- useLocation は URL 全体を見るときに使いそう
  - そんなことってあるか？？
  - 各種 URL 情報を一括して取得したいときに使いそう

# 課題

プロジェクトによるが、以下の場合については処理を考える必要があるかもしれない。

- 必要なクエリパラメータが存在しない場合
- クエリパラメータが空の場合
- 不要なクエリパラメータが設定されている場合

# 脚注

[^*1]: ここでは言葉を以下のように定義していた

    - 与える：値を設定すること
    - 渡す：値を入力として使われること
