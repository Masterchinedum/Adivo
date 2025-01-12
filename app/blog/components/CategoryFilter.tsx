// app/blog/components/CategoryFilter.tsx
'use client';

import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Category } from "@/app/types/blog";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2">
            <Badge
              variant={selectedCategories.length === 0 ? "secondary" : "outline"}
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => {
                // Clear all selected categories
                selectedCategories.forEach(cat => onCategoryChange(cat));
              }}
            >
              All Posts
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category._id}
                variant={selectedCategories.includes(category._id) ? "secondary" : "outline"}
                className="cursor-pointer hover:bg-secondary/80"
                onClick={() => onCategoryChange(category._id)}
              >
                {category.title}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}