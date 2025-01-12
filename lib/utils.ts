//lib/utils.ts

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PortableTextBlock, TableOfContentsItem } from "@/types/blog"
import { slugify } from "@/lib/slugify"
import { PortableTextSpan } from "@portabletext/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function extractTableOfContents(blocks: PortableTextBlock[]): TableOfContentsItem[] {
  const headingStyles = ['h1', 'h2', 'h3', 'h4'];
  
  return blocks
    .filter((block) => {
      const style = block.style || '';
      return headingStyles.includes(style);
    })
    .map((block) => {
      // Type-safe text extraction
      const text = block.children
        .filter((child): child is PortableTextSpan => 
          typeof child === 'object' && 
          child !== null && 
          '_type' in child && 
          child._type === 'span'
        )
        .map((child: PortableTextSpan) => child.text || '')
        .join('')
        .trim();

      const style = block.style || 'h1'; // Default to h1 if style is undefined
      
      return {
        text,
        level: headingStyles.indexOf(style) + 1, // Consistent leveling
        slug: slugify(text)
      }
    })
    .filter(item => item.text.length > 0); // Remove any empty headings
}

export function createHeadingId(text: string): string {
  return slugify(text);
}