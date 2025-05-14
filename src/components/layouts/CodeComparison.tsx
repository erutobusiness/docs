'use client';

import type { Slide } from '@/types/slides';
import CodeBlock from '../common/CodeBlock';

interface CodeComparisonProps {
  codeExamples: Slide['codeExamples'];
}

export default function CodeComparison({ codeExamples }: CodeComparisonProps) {
  return (
    <>
      {/* 左右に分けたコードブロックと説明文 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {codeExamples?.map((codeExample) => (
          <div key={codeExample.code} className="flex flex-col">
            {codeExample.title && (
              <h3 className="text-xl font-semibold mb-3 text-(--card-fg)">
                {codeExample.title}
              </h3>
            )}

            {/* 個別の説明文がある場合は表示 */}
            {codeExample.descriptions && codeExample.descriptions.length > 0 && (
              <div className="mb-3">
                {codeExample.descriptions.map((desc) => (
                  <p key={desc} className="mb-2 text-lg text-(--card-fg)">
                    {desc}
                  </p>
                ))}
              </div>
            )}

            <div className="grow">
              <CodeBlock code={codeExample.code} language={codeExample.language} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
