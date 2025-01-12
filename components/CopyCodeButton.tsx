// components/CopyCodeButton.tsx
'use client';

import React, { useState } from 'react';
import { Copy, CheckIcon } from 'lucide-react';

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code', err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className="absolute top-2 right-2 z-10 p-1.5 bg-gray-700/50 hover:bg-gray-700/75 rounded-md transition-all duration-300"
      aria-label={copied ? 'Copied!' : 'Copy code'}
    >
      {copied ? (
        <CheckIcon className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-white" />
      )}
    </button>
  );
}