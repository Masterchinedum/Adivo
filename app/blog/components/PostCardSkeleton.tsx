// app/blog/components/PostCardSkeleton.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PostCardSkeletonProps {
  viewMode: 'grid' | 'list';
}

export default function PostCardSkeleton({ viewMode }: PostCardSkeletonProps) {
  const isListView = viewMode === 'list';
  
  return (
    <Card className={`overflow-hidden ${
      isListView ? 'flex flex-row gap-6' : 'flex flex-col'
    }`}>
      <CardHeader className={`p-0 relative ${
        isListView ? 'w-48 shrink-0 h-48' : 'w-full aspect-[16/9]'
      }`}>
        <Skeleton className="absolute inset-0" />
      </CardHeader>
      
      <CardContent className={`flex-1 p-6 ${isListView ? 'flex flex-col justify-center' : ''}`}>
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
        </div>
        
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        
        <div className="flex flex-wrap gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-5 w-16" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}