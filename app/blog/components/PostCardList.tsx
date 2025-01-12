
// app/components/PostCardList.tsx
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { urlForImage } from "@/app/sanity/sanity.image";
import { Post } from "@/app/types/blog";
import { cn } from "@/lib/utils";

interface PostCardListProps {
  post: Post;
  priority?: boolean;
  className?: string;
}

export const PostCardList = ({ post, priority = false, className }: PostCardListProps) => {
  const imageUrl = urlForImage(post.listimage);
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all overflow-hidden",
      className
    )}>
      <div className="flex flex-col sm:flex-row h-full">
        <div className="relative w-full sm:w-[300px] aspect-[16/9] sm:aspect-square overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 300px"
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
        </div>
        <CardContent className="flex-1 p-6">
          <div className="flex gap-2 text-sm text-muted-foreground mb-3">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <Link href={`/blog/${post.slug.current}`}>
            <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
          </Link>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {typeof post.excerpt === 'string' ? post.excerpt : post.excerpt?.[0]?.children?.[0]?.text || ""}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {post.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
