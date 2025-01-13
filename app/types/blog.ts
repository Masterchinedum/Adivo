import React from 'react';
import { PortableTextBlock as SanityPortableTextBlock } from '@portabletext/types'

// Re-export PortableTextBlock
export type PortableTextBlock = SanityPortableTextBlock

// Extend existing types
export interface SanityReference {
  _ref: string;
  _type: 'reference';
}

export interface BlogContentProps {
  content: PortableTextBlock[];
  mainImage?: SanityImage;
  title?: string;
  tableOfContents?: TableOfContentsItem[];
  relatedPosts?: Post[];
}

export interface PostDetails extends Post {
  estimatedReadingTime?: number;
  tableOfContents?: TableOfContentsItem[];
}

export interface TableOfContentsItem {
  text: string;
  level: number;
  slug: string;
}

// Component Props Types
export interface BlogHeaderProps {
  totalPosts: number;
  onSearchChange?: (search: string) => void;
  searchValue?: string;
  title: string;
  author?: Author;
  publishedAt: string;
  readTime?: string;
  categories: Category[];
}



export interface BlogContentProps {
  content: PortableTextBlock[];
  mainImage?: SanityImage;
}

export interface AuthorCardProps {
  author: Author;
  className?: string;
}

// Block Child Type
export interface BlockChild {
  _type: 'span';
  text: string;
  marks?: string[];
}

// Author Interface
export interface Author extends SanityDocument {
  name: string;
  slug: Slug;
  image?: SanityImage;
  bio?: SanityBlock[];
  role?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Portable Text Types
export interface CustomPortableTextComponents {
  types: {
    image: ({ value }: { value: SanityImage }) => React.ReactElement;
    // Add other custom types here
  };
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => React.ReactElement;
    // Add other mark types here
  };
  block: {
    h1: ({ children }: { children: React.ReactNode }) => React.ReactElement;
    h2: ({ children }: { children: React.ReactNode }) => React.ReactElement;
    h3: ({ children }: { children: React.ReactNode }) => React.ReactElement;
    normal: ({ children }: { children: React.ReactNode }) => React.ReactElement;
    // Add other block types here
  };
}

// Base Types
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface Slug {
  _type: 'slug';
  current: string;
}

export interface SanityImage {
  alt: string;
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanityBlock {
  _type: 'block';
  children: BlockChild[];
  markDefs?: Array<{
    _type: string;
    _key: string;
    href?: string;
  }>;
  style?: string;
}

// Main Types
export interface Category extends SanityDocument {
  title: string;
  slug: Slug;
  description?: string;
}

export interface Post extends SanityDocument {
  title: string;
  slug: Slug;
  author?: Author;
  featured: boolean;
  listimage: SanityImage;
  mainImage: SanityImage;
  postcategory: Category[];
  categories: Category[];
  postcategoryTitles?: string[];
  readTime: string;
  publishedAt: string;
  excerpt?: Excerpt;
  body?: Array<SanityBlock>;
  tags: string[];
}

// Add helper type for excerpt handling
export type Excerpt = string | Array<SanityBlock>;

// Add helper function to safely get excerpt text
export const getExcerptText = (excerpt: Excerpt | undefined): string => {
  if (!excerpt) return '';
  if (typeof excerpt === 'string') return excerpt;
  if (Array.isArray(excerpt) && excerpt.length > 0) {
    const firstBlock = excerpt[0];
    if (typeof firstBlock === 'string') return firstBlock;
    return firstBlock.children?.[0]?.text || '';
  }
  return '';
};


// UI Component Types
export interface ViewMode {
  type: 'grid' | 'list';
  columns: 2 | 3;
}

export interface SortOption {
  label: string;
  value: 'newest' | 'oldest' | 'popular';
}

export interface FilterState {
  categories: string[];
  tags: string[];
  search: string;
  sort: SortOption['value'];
  view: ViewMode;
}

// Component Props Types
export interface BlogGridProps {
  posts: Post[];
  viewMode: ViewMode;
}

export interface BlogFilterBarProps {
  categories: Category[];
  selectedCategories: string[];
  selectedTags: string[];
  onCategoryChange: (category: string) => void;
  onTagChange: (tag: string) => void;
  availableTags: string[];
}

export interface BlogListControlsProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  sortOption: SortOption['value'];
  onSortChange: (sort: SortOption['value']) => void;
  totalPosts: number;
}

export interface PostCardProps {
  post: Post;
  priority?: boolean;
  className?: string;
}

export interface SearchablePost extends Post {
  searchableContent?: string; // Optional field for concatenated searchable content
}

export interface SearchUtils {
  buildSearchableContent: (post: Post) => string;
  searchPosts: (posts: Post[], searchTerm: string) => Post[];
}

// Add a utility function for search
export const searchUtils: SearchUtils = {
  buildSearchableContent: (post: Post): string => {
    const content = [
      post.title,
      post.excerpt,
      post.postcategoryTitles?.join(' '),
      post.tags?.join(' ')
    ].filter(Boolean).join(' ').toLowerCase();
    
    return content;
  },

  searchPosts: (posts: Post[], searchTerm: string): Post[] => {
    if (!searchTerm) return posts;
    
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    return posts.filter(post => {
      const searchableContent = searchUtils.buildSearchableContent(post);
      return searchableContent.includes(normalizedSearchTerm);
    });
  }
};

// Sanity Queries
export const singlePostQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  mainImage,
  body,
  publishedAt,
  readTime,
  featured,
  excerpt,
  tags,
  "author": author->{
    _id,
    name,
    slug,
    image,
    bio,
    role,
    social
  },
  "postcategory": postcategory[]->{
    _id,
    title,
    slug,
    description
  }
}`


export const relatedPostsQuery = `
  *[
    _type == "post" &&
    _id != $currentPostId &&
    count(postcategory) == 1 && 
    postcategory[0]._ref == $categoryId  
  ] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    listimage,
    publishedAt,
    readTime,
    excerpt,
    "postcategory": postcategory[]->{
      _id,
      title,
      slug
    }
  }
`