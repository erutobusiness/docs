import React from 'react';

interface DescriptionsProps {
  contents: string[];
}

export default function Descriptions({ contents }: DescriptionsProps) {
  return (
    <>
      {contents.map((text) => (
        <p key={text} className="text-xl sm:text-2xl mb-2 text-(--card-fg)">
          {text.split('\n').map((line, i) => (
            <React.Fragment key={line}>
              {line}
              {i < text.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      ))}
    </>
  );
}
