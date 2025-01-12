// app/components/RecentBlogPosts.tsx
// import { Badge } from "@/components/ui/badge";
import { PostCard } from "./PostCard";
import { SanityClient } from "@/app/sanity/client";
import { Post} from "@/types/blog";
import { Button } from "@/components/ui/button"
import Link from "next/link"
// import { Post, Category } from "@/app/types/blog";

// Add this to your sanity.queries.ts file
const postFields = `
  _id,
  title,
  slug,
  listimage,
  excerpt,
  publishedAt,
  readTime,
  "postcategoryTitles": postcategory[]->title,
  tags
`;

export const getRecentPostsQuery = `
  *[_type == "post"] | order(publishedAt desc)[0...4] {
    ${postFields}
  }
`;

export const getCategoriesQuery = `
  *[_type == "postcategory"] {
    _id,
    title
  }
`;

async function getPosts() {
  return await SanityClient.fetch<Post[]>(getRecentPostsQuery, {}, {
    next: { revalidate: 600 } // 10 minutes
  });
}

// async function getCategories() {
//   return await SanityClient.fetch<Category[]>(getCategoriesQuery, {}, {
//     next: { revalidate: 600 }
//   });
// }

export default async function RecentBlogPosts() {
  // const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  const [posts] = await Promise.all([getPosts()]);

  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Recent Blog Posts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exploring Relationship Intricacies
          </p>
          
          {/* Categories Filter */}
          {/* <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge
              variant="default"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category._id}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category.title}
              </Badge>
            ))}
          </div> */}
        </div>

        <div className="grid lg:grid-cols-4 lg:gap-3 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <PostCard 
              key={post._id} 
              post={post} 
              priority={index <= 1}
            />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
        <Button asChild variant="default" size="lg">
          <Link href="/blog">
            Visit Blog
          </Link>
        </Button>
      </div>
      </div>
    </section>
  );
}