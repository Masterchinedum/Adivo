"use client";

import { useEffect, useState } from "react";
import { TableOfContentsItem } from "@/app/types/blog";
import { extractTableOfContents } from "@/lib/utils";
import { PortableTextBlock } from '@portabletext/types';

interface TableOfContentsProps {
  content: PortableTextBlock[];
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);

  useEffect(() => {
    const toc = extractTableOfContents(content);
    setTableOfContents(toc);
  }, [content]);

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Table of Contents</h3>
      <ul className="space-y-2">
        {tableOfContents.map((item) => (
          <li 
            key={item.slug} 
            className={`pl-${(item.level - 1) * 4} text-sm`}
          >
            <a 
              href={`#${item.slug}`} 
              className="text-blue-600 hover:underline"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}