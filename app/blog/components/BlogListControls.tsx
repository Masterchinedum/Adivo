// app/blog/components/BlogListControls.tsx
'use client';

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, LayoutList } from "lucide-react";
import { BlogListControlsProps, SortOption } from '@/app/types/blog';

const sortOptions: Array<SortOption> = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Most Popular', value: 'popular' },
];

export function BlogListControls({
  viewMode,
  onViewChange,
  sortOption,
  onSortChange,
  totalPosts,
}: BlogListControlsProps) {
  return (
    <div className="sticky top-16 z-10 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {totalPosts} posts
          </p>

          <div className="flex items-center gap-4">
            <Select
              value={sortOption}
              onValueChange={(value) => 
                onSortChange(value as SortOption['value'])
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center border rounded-lg">
              <Button
                variant={viewMode.type === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => onViewChange({ type: 'grid', columns: 3 })}
                className="rounded-none rounded-l-lg"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode.type === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => onViewChange({ type: 'list', columns: 2 })}
                className="rounded-none rounded-r-lg"
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )};