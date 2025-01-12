//app/sanity/sanity.queries.ts

export const singlePostQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  mainImage,
  body,
  publishedAt,
  readTime,
  featured,
  excerpt,
  tags,
  "author": author->{
    _id,
    name,
    slug,
    image,
    bio,
    role,
    social
  },
  "postcategory": postcategory[]->{
    _id,
    title,
    slug,
    description
  }
}`;