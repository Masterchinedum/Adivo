// app/components/PostCardGrid.tsx
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { urlForImage } from "@/app/sanity/sanity.image";
import { Post } from "@/app/types/blog";
import { cn } from "@/lib/utils";

interface PostCardGridProps {
  post: Post;
  priority?: boolean;
  className?: string;
}

export const PostCardGrid = ({ post, priority = false, className }: PostCardGridProps) => {
  const imageUrl = urlForImage(post.listimage);
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all overflow-hidden h-full",
      className
    )}>
      <CardHeader className="p-0 relative aspect-[16/9] overflow-hidden">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          priority={priority}
        />
        {post.postcategoryTitles?.length && (
          <div className="absolute top-4 left-4 z-10 flex gap-2 flex-wrap">
            {post.postcategoryTitles.map((categoryTitle, index) => (
              <Badge key={index} className="text-xs">
                {categoryTitle}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex gap-2 text-sm text-muted-foreground mb-3">
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <Link href={`/blog/${post.slug.current}`}>
          <CardTitle className="mb-3 group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </Link>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {typeof post.excerpt === 'string' 
            ? post.excerpt 
            : post.excerpt?.[0]?.children?.[0]?.text || ""}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
