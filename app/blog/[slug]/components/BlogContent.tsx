import { PortableText } from "@portabletext/react";
import { PortableTextReactComponents, PortableTextComponentProps } from "@portabletext/react";
import { BlogContentProps, Post } from "@/types/blog";
import { portableTextComponents } from "@/lib/portableText";
import Image from "next/image";
import { urlForImage } from "@/app/sanity/sanity.image";
import RelatedPosts from "./RelatedPosts";
import TableOfContents from "./TableOfContents";
import { createHeadingId } from "@/lib/utils";
import { PortableTextSpan, PortableTextBlock } from '@portabletext/types';

interface ExtendedBlogContentProps extends BlogContentProps {
  relatedPosts?: Post[];
}

type CustomPortableTextBlock = PortableTextBlock;

type BlockComponentProps = PortableTextComponentProps<CustomPortableTextBlock>;

export default function BlogContent({ 
  content, 
  mainImage, 
  relatedPosts = [] 
}: ExtendedBlogContentProps) {
  // Safe text extraction for heading ID
  const extractHeadingText = (value: CustomPortableTextBlock): string => {
    // Safely handle null or undefined children
    if (!value || !value.children || value.children.length === 0) {
      return '';
    }

    // Ensure children is an array and safely extract text
    return (value.children as PortableTextSpan[])
      .map((child) => {
        // Safely get text, default to empty string if undefined
        return child.text || '';
      })
      .join('');
  };

  // Custom components to add ids to headings with proper typing and error handling
  const enhancedPortableTextComponents: Partial<PortableTextReactComponents> = {
    ...portableTextComponents,
    block: {
      h1: ({ value, children }: BlockComponentProps) => {
        const text = extractHeadingText(value);
        return <h1 id={text ? createHeadingId(text) : undefined}>{children}</h1>;
      },
      h2: ({ value, children }: BlockComponentProps) => {
        const text = extractHeadingText(value);
        return <h2 id={text ? createHeadingId(text) : undefined}>{children}</h2>;
      },
      h3: ({ value, children }: BlockComponentProps) => {
        const text = extractHeadingText(value);
        return <h3 id={text ? createHeadingId(text) : undefined}>{children}</h3>;
      },
      normal: ({ children }: BlockComponentProps) => <p>{children}</p>
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8 relative">
        {/* Main content */}
        <div className="flex-1 prose prose-lg max-w-none">
          {mainImage && (
            <div className="relative w-full h-[500px] mb-8">
              <Image
                src={urlForImage(mainImage)}
                alt="Blog post main image"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}
          
          {/* Mobile table of contents */}
          <div className="lg:hidden mb-8">
            <TableOfContents content={content} />
          </div>
          
          <PortableText 
            value={content} 
            components={enhancedPortableTextComponents} 
          />
          
          {/* Related Posts rendered below the main content on mobile */}
          <div className="mt-16 lg:hidden">
            <RelatedPosts posts={relatedPosts} className="grid-cols-1 md:grid-cols-3" />
          </div>
        </div>
        
        {/* Right sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-4 space-y-8">
            {/* Desktop table of contents */}
            <TableOfContents content={content} />
            
            <RelatedPosts posts={relatedPosts} className="flex flex-col space-y-4" />
          </div>
        </div>
      </div>
    </div>
  );
}