import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  return (
    <div className="rounded-lg p-3 sm:p-4 overflow-auto max-h-[400px] bg-[var(--background)] border border-[var(--primary-dark)]">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ background: 'transparent', margin: 0, padding: 0 }}
        codeTagProps={{ className: 'text-xs sm:text-sm text-[var(--accent-light)]' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
