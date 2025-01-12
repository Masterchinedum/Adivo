// app/blog/page.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { SanityClient } from "@/app/sanity/client";
import BlogHeader from "./components/BlogHeader";
import { BlogListControls } from "./components/BlogListControls";
import { BlogGrid } from "./components/BlogGrid";
import { CategoryFilter } from "./components/CategoryFilter";
import { 
  Category, 
  FilterState, 
  Post, 
  SortOption, 
  ViewMode 
} from '@/app/types/blog';

const postFields = `
  _id,
  title,
  slug,
  listimage,
  excerpt,
  publishedAt,
  readTime,
  featured,
  "postcategoryTitles": postcategory[]->title,
  "categories": postcategory[]->{ _id, title, slug },
  tags
`;

const getAllPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    ${postFields}
  }
`;

const getCategoriesQuery = `
  *[_type == "postcategory"] {
    _id,
    title,
    slug,
    description
  }
`;

// Default filter state
const defaultViewMode: ViewMode = {
  type: 'grid',
  columns: 3
};

const defaultFilterState: FilterState = {
  categories: [],
  tags: [],
  search: '',
  sort: 'newest',
  view: defaultViewMode
};

export default function BlogPage() {
  // State management
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, categoriesData] = await Promise.all([
          SanityClient.fetch<Post[]>(getAllPostsQuery),
          SanityClient.fetch<Category[]>(getCategoriesQuery)
        ]);
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle sort change
  const handleSortChange = useCallback((sort: SortOption['value']) => {
    setFilters(prev => ({ ...prev, sort }));
  }, []);

  // Handle view mode change
  const handleViewChange = useCallback((view: ViewMode) => {
    setFilters(prev => ({ ...prev, view }));
  }, []);

  // Handle category selection/deselection
  const handleCategoryChange = useCallback((categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  }, []);

  // // Handle search input
  // const handleSearchChange = useCallback((search: string) => {
  //   setFilters(prev => ({ ...prev, search }));
  // }, []);

  const handleSearchChange = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search }));
  }, []);

  // Filter posts based on all criteria
  const filteredPosts = posts.filter(post => {
    // Check if post has any category that matches selected categories
    const matchesCategories = filters.categories.length === 0 || 
      post.categories?.some(category => 
        filters.categories.includes(category._id)
      );
    
    // Check if post has any matching tags
    const matchesTags = filters.tags.length === 0 ||
      filters.tags.some(tag => post.tags.includes(tag));
    
    // Check if post matches search query
    const matchesSearch = !filters.search || 
      post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      (post.excerpt && typeof post.excerpt === 'string' && 
       post.excerpt.toLowerCase().includes(filters.search.toLowerCase()));
  
    return matchesCategories && matchesTags && matchesSearch;
  });

  // Sort filtered posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (filters.sort) {
      case 'oldest':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case 'popular':
        // You might want to add a view count or other popularity metric
        return 0;
      case 'newest':
      default:
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[20%] top-1/4 h-96 w-96 rounded-full bg-purple-200 opacity-20 blur-3xl dark:bg-purple-900" />
        <div className="absolute right-[20%] top-3/4 h-96 w-96 rounded-full bg-blue-200 opacity-20 blur-3xl dark:bg-blue-900" />
      </div>

      {/* Header with search functionality */}
      <BlogHeader 
        totalPosts={posts.length} 
        onSearchChange={handleSearchChange}
        searchValue={filters.search}
      />

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategories={filters.categories}
        onCategoryChange={handleCategoryChange}
      />

      {/* Controls for view mode and sorting */}
      <BlogListControls
        viewMode={filters.view}
        onViewChange={handleViewChange}
        sortOption={filters.sort}
        onSortChange={handleSortChange}
        totalPosts={filteredPosts.length}
      />

      {/* Posts Grid */}
      <section className="py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold">No posts found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filters or search criteria
              </p>
            </div>
          ) : (
            <BlogGrid
              posts={sortedPosts}
              viewMode={filters.view}
            />
          )}
        </div>
      </section>
    </main>
  );
}