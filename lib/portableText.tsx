import React from 'react';
import { PortableTextComponents } from '@portabletext/react';
import { SanityImage } from '@/app/types/blog';
import Image from 'next/image';
import { urlForImage } from '@/app/sanity/sanity.image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyCodeButton } from '@/components/CopyCodeButton';
import { YouTubeEmbed } from '@/components/YouTubeEmbed';

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset?._ref) return null;

      return (
        <div className="my-4">
          <Image
            src={urlForImage(value)}
            alt={value.alt || 'Blog post image'}
            width={1200}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>
      );
    },
    codeBlock: ({ value }: { value: { code: string; language?: string; filename?: string } }) => {
      const { code, language = 'javascript', filename } = value;

      return (
        <div className="my-4 relative group">
          <CopyCodeButton code={code} /> {/* Use the client component */}
          {filename && (
            <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600 rounded-t-lg border-b">
              {filename}
            </div>
          )}
          <SyntaxHighlighter 
            language={language} 
            style={oneDark}
            customStyle={{
              borderRadius: filename ? '0 0 0.5rem 0.5rem' : '0.5rem',
              margin: 0,
              position: 'relative',
              paddingRight: '40px', // Make space for copy button
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
    },
    flexImage: ({ value }: { value: { 
      image: SanityImage, 
      layout?: 'default' | 'flexLeft' | 'flexRight' | 'centered', 
      caption?: string, 
      alt?: string 
    } }) => {
      const { image, layout = 'default', caption, alt } = value;

      if (!image?.asset?._ref) return null;

      const layoutClasses = {
        default: 'w-full',
        flexLeft: 'float-left mr-4 mb-4 max-w-md',
        flexRight: 'float-right ml-4 mb-4 max-w-md',
        centered: 'mx-auto block'
      };

      return (
        <div className={`my-4 ${layoutClasses[layout]} clear-both`}>
          <Image
            src={urlForImage(image)}
            alt={alt || 'Flexible layout image'}
            width={1200}
            height={600}
            className="rounded-lg object-cover"
          />
          {caption && (
            <p className="text-center text-sm text-gray-600 mt-2">
              {caption}
            </p>
          )}
        </div>
      );
    },
    youtubeVideo: ({ value }: { value: {
      url: string;
      title?: string;
      caption?: string;
      startTime?: number;
      stopTime?: number;
    } }) => {
      return (
        <YouTubeEmbed 
          url={value.url}
          title={value.title}
          caption={value.caption}
          startTime={value.startTime}
          stopTime={value.stopTime}
        />
      );
    }
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold my-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold my-4">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mb-4">{children}</p>
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 mb-4">{children}</ol>
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a 
        href={value.href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 hover:underline"
      >
        {children}
      </a>
    ),
    underline: ({ children }) => <u>{children}</u>,
    'strike-through': ({ children }) => <s>{children}</s>
  }
};