// app/components/blog/BlogHeader.tsx
'use client';

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import NewsletterSignup from '@/components/NewsletterSignup';
import { useCallback, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';

interface BlogHeaderProps {
  totalPosts: number;
  onSearchChange?: (search: string) => void;
  searchValue?: string;
}

export default function BlogHeader({ totalPosts, onSearchChange, searchValue }: BlogHeaderProps) {
  // Create a memoized debounced function
  const debouncedSearch = useMemo(
    () => debounce((value: string) => {
      onSearchChange?.(value);
    }, 300),
    [onSearchChange]
  );

  // Clean up the debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  }, [debouncedSearch]);

  return (
    <div className="relative overflow-hidden">
      {/* Header Content */}
      <div className="py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Exploring Relationships
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dive into {totalPosts} articles where code meets science, featuring tutorials, insights, and discoveries.
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 w-full"
                  defaultValue={searchValue}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="max-w-md mx-auto bg-secondary/50 rounded-lg p-6 backdrop-blur-sm">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-pink-200 opacity-20 blur-3xl dark:bg-pink-900"
          style={{ transform: 'rotate(-15deg)' }}
        />
        <div 
          className="absolute -right-1/4 -bottom-1/4 h-[500px] w-[500px] rounded-full bg-blue-200 opacity-20 blur-3xl dark:bg-blue-900"
          style={{ transform: 'rotate(15deg)' }}
        />
      </div>
    </div>
  );
}