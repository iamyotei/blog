// components/BSLCodeBlock.tsx
'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface BSLCodeBlockProps {
  className?: string;
  children?: React.ReactNode;
}

export function BSLCodeBlock({ className, children, ...props }: BSLCodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const code = String(children).replace(/\n$/, '');
  const isBSL = ['bsl', '1c'].includes(language);

  if (!isBSL) {
    return (
      <pre className="">
        <code className={className}>{children}</code>
      </pre>
    );
  }

  return (
    <div className="my-6 group">

      <SyntaxHighlighter
        language="javascript"
        style={oneLight}
        customStyle={{
          margin: 0,
          // padding: '3rem 1rem 1rem 1rem',
          // borderRadius: '0 0 0.5rem 0.5rem',
          fontSize: '0.8rem',
          fontFamily: 'geistSans.variable',
        }}
        showLineNumbers={false}
        wrapLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}