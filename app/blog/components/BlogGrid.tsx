// @/app/blog/components/BlogGrid.tsx

import { PostCardGrid } from "@/app/blog/components/PostCardGrid";
import { PostCardList } from "@/app/blog/components/PostCardList";
import { cn } from "@/lib/utils";
import { BlogGridProps } from '@/types/blog';

export function BlogGrid({ posts, viewMode }: BlogGridProps) {
  const gridCols = viewMode.type === 'grid'
    ? viewMode.columns === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2'
    : 'grid-cols-1';

  return (
    <div className={cn(
      "grid gap-4 sm:gap-6 md:gap-8",
      gridCols,
      viewMode.type === 'list' && "max-w-4xl mx-auto"
    )}>
      {posts.map((post, index) => (
        <div key={post._id} className="transition-all duration-300">
          {viewMode.type === 'grid' ? (
            <PostCardGrid
              post={post}
              priority={index < 4}
            />
          ) : (
            <PostCardList
              post={post}
              priority={index < 4}
            />
          )}
        </div>
      ))}
    </div>
  );
}