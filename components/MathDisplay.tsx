/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { useEffect, useRef } from 'react';

interface MathDisplayProps {
  latex: string;
  className?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export default function MathDisplay({
  latex,
  className = '',
}: MathDisplayProps) {
  const mathRef = useRef<any>(null);

  useEffect(() => {
    const loadMathLive = async () => {
      try {
        await import('mathlive');

        if (
          mathRef.current &&
          !mathRef.current.hasAttribute('data-initialized')
        ) {
          mathRef.current.value = latex;
          mathRef.current.readOnly = true;
          mathRef.current.style.display = 'inline-block';
          mathRef.current.style.border = 'none';
          mathRef.current.style.outline = 'none';
          mathRef.current.style.background = 'transparent';
          mathRef.current.setAttribute('data-initialized', 'true');
        }
      } catch (error) {
        // Error loading MathLive - math field will remain empty
      }
    };

    loadMathLive();
  }, [latex]);

  return <math-field ref={mathRef} className={className} />;
}
