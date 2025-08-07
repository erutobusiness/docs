'use client';

import { useEffect } from 'react';

type SlideThemeLoaderProps = {
  slideType: string;
};

const SlideThemeLoader = ({ slideType }: SlideThemeLoaderProps) => {
  useEffect(() => {
    const body = document.body;
    body.setAttribute('data-theme', slideType);

    // コンポーネントがアンマウントされる際に属性を削除する
    return () => {
      body.removeAttribute('data-theme');
    };
  }, [slideType]);

  return null;
};

export default SlideThemeLoader;