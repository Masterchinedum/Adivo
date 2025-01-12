// app/blog/[slug]/page.tsx

import { SanityClient } from "@/app/sanity/client";
import { notFound } from "next/navigation";
import { PostDetails, Post, relatedPostsQuery, getExcerptText } from "@/app/types/blog";
import { singlePostQuery } from "@/app/sanity/sanity.queries";
import BlogHeader from "./components/BlogHeader";
import BlogContent from "./components/BlogContent";
import AuthorCard from "./components/AuthorCard";
import BlogProgressShare from "./components/BlogProgressShare";
import { Metadata } from 'next';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const post = await SanityClient.fetch<PostDetails>(singlePostQuery, {
    slug,
  });

  if (!post) return { title: "Not Found" };

  const excerptText = getExcerptText(post.excerpt);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://masterchinedum.vercel.app';
  const postUrl = `${baseUrl}/blog/${slug}`;

  return {
    title: post.title,
    description: excerptText,
    openGraph: {
      title: post.title,
      description: excerptText,
      type: "article",
      url: postUrl,
      ...(post.mainImage && {
        images: [{
          url: post.mainImage.asset._ref,
          width: 1200,
          height: 630,
          alt: post.title,
        }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: excerptText,
      ...(post.mainImage && {
        images: [post.mainImage.asset._ref],
      }),
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export async function generateStaticParams() {
  const posts = await SanityClient.fetch<Post[]>(
    `*[_type == "post"]{ slug }`
  );

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Fetch the main post
  const post = await SanityClient.fetch<PostDetails>(singlePostQuery, {
    slug,
  });

  if (!post) notFound();

  // Add safe category check
  const categoryId = post.postcategory?.[0]?._id;
  const relatedPosts = categoryId 
    ? await SanityClient.fetch<Post[]>(relatedPostsQuery, {
        currentPostId: post._id,
        categoryId,
      }) 
    : [];

  // Get the current URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://masterchinedum.vercel.app';
  const currentUrl = `${baseUrl}/blog/${slug}`;

  // Format publish date
  const publishDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Progress and Share Component */}
      <BlogProgressShare 
        title={post.title}
        url={currentUrl}
      />
      
      <article className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <BlogHeader
          title={post.title}
          author={post.author}
          publishedAt={publishDate}
          readTime={post.readTime}
          categories={post.postcategory}
          totalPosts={1}
          searchValue=""
        />

        {/* Main Content Section */}
        <div className="mt-8">
          <BlogContent
            content={post.body || []}
            mainImage={post.mainImage}
            relatedPosts={relatedPosts}
          />
        </div>

        {/* Author Section */}
        {post.author && (
          <div className="mt-16">
            <AuthorCard author={post.author} />
          </div>
        )}
      </article>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.publishedAt,
            dateModified: post._updatedAt,
            url: currentUrl,
            author: post.author
              ? {
                  "@type": "Person",
                  name: post.author.name,
                  ...(post.author.image && {
                    image: post.author.image.asset._ref,
                  }),
                }
              : undefined,
            image: post.mainImage
              ? post.mainImage.asset._ref
              : undefined,
            description: getExcerptText(post.excerpt),
            publisher: {
              "@type": "Organization",
              name: process.env.NEXT_PUBLIC_SITE_NAME || "MasterChinedum",
              logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo.png`,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": currentUrl,
            },
            keywords: post.tags?.join(", "),
          }),
        }}
      />
    </>
  );
}