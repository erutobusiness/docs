---
title: 任意のHTML要素を使用した、React TypeScriptにおける関数コンポーネントのベストな書き方を知りたい。いや、教えてください！
tags: React TypeScript 関数コンポーネント コンポーネント
author: nyarlathotep
created_at: "2024-03-30"
updated_at: "2024-04-01"
id: e593d072c21768e378d7
slide: false
ignorePublish: false
---

# 前置き

フロントエンジニアとしてはたらくと、HTML要素を使用したReactコンポーネントをかくことが多い。
今まで試行錯誤していたが、最近ようやく関数コンポーネントの書き方が確立した。
それが適切か、批判できる点がないか、コードの特徴を洗い出して確かめる。

# コード

```tsx:Koredounan.tsx
import { type FC, type HTMLAttributes, memo } from 'react';

interface Props extends HTMLAttributes<HTML任意Element> {
    // コンポーネント仕様によって増やす
}

const Component: FC<Props> = ({ children, ...attrs }) => {
    // 実装
    return (<任意HTML要素 {...attrs} >
        {children}
    </任意HTML要素>)
};

export const Koredounan = memo(Component);
```

ここでHTML任意Elementはchildrenを受け取ることができるとする。
Propsは柔軟に要素ごとに定義するよう心がける必要があることは認識している。
任意HTML要素とHTML任意Elementは同じHTML要素である。

# コードからわかるルール

- 元要素に応じた`props`を受け取るためにPropsを定義
- コンポーネント`Component`を`React.FC<Props>`で定義
- 子要素と属性を分けるために`props`を`{ children, ...attrs }`に分割
- 元要素に`sttrs`を展開
- 子要素に`children`を展開
- ファイル名と同様のコンポーネント名を`memo`化して`export`
  - `default`にはしない

# 批判点

## `React.memo`の使用を限るべき

個人的には、パフォーマンスの最適化のために使用しているつもりだが、
一般的には、実際に問題が発生している場合にのみ使用を限るべき

https://ja.react.dev/reference/react/memo

> その他のケースでコンポーネントを memo でラップすることにメリットはありません。それを行っても重大な害はないため、個別のケースを考えずに、可能な限りすべてをメモ化するようにしているチームもあります。このアプローチのデメリットは、コードが読みにくくなることです。また、すべてのメモ化が効果的なわけではありません。例えば、毎回変化する値が 1 つ存在するだけで、コンポーネント全体のメモ化が無意味になってしまうこともあります。

---

他の批判点をください。
