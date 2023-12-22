import * as React from 'react';

export function MyComp({ title, children, otro, escierto }) {
  return (
    <div className="mycomp">
      <strong>-{title}-</strong>
      <strong>*{otro}*</strong>
      {escierto && <strong>Es cierto</strong> || <strong>Es falso</strong>}

      <span>{children}</span>
      <style jsx>
        {`
          .mycomp {
            display: flex;
            flex-direction: column;
            padding: 12px 16px;
            background: #f0f4f8;
            border: 1px solid #d9e2ec;
            border-radius: 8px 8px 0 0;
          }
          .mycomp :global(p) {
            margin: 0;
          }
        `}
      </style>
    </div>
  );
}
