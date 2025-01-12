import { Post } from '@/app/types/blog'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/app/sanity/sanity.image'
import { cn } from '@/lib/utils'

interface RelatedPostsProps {
  posts: Post[]
  className?: string
}

const RelatedPosts = ({ posts, className }: RelatedPostsProps) => {
  if (!posts || posts.length === 0) return null

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4">Related Posts</h3>
      <div className={cn("grid gap-4", className)}>
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug.current}`}
            key={post._id}
            className="group relative flex flex-col space-y-2 transition-all duration-200 hover:opacity-80"
          >
            {post.listimage && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={urlForImage(post.listimage)}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="flex flex-col space-y-1">
              <h4 className="font-medium line-clamp-2 group-hover:text-primary">
                {post.title}
              </h4>
              <div className="flex items-center text-sm text-muted-foreground">
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                )}
                {post.readTime && (
                  <>
                    <span className="mx-1">•</span>
                    <span>{post.readTime}</span>
                  </>
                )}
              </div>
              {post.excerpt && typeof post.excerpt === 'string' && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedPosts