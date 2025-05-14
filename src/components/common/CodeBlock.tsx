import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  return (
    <div className="rounded-lg p-4 overflow-auto bg-(--background) border border-(--primary-dark)">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ background: 'transparent', margin: 0, padding: 0 }}
        codeTagProps={{ className: 'text-lg text-(--accent-light)' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
