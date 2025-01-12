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


const webProjectFields = `
  _id,
  _createdAt,
  name,
  slug,
  link,
  description,
  mainImage,
  techStack
`;

const scientificProjectFields = `
  _id,
  _createdAt,
  title,
  slug,
  link,
  abstract,
  projectType,
  mainImage,
  tags
`;

export const getWebProjectsQuery = `
  *[_type == "webProject"] | order(_createdAt desc)[0...4] {
    ${webProjectFields}
  }
`;

export const getScientificProjectsQuery = `
  *[_type == "scientificProject"] | order(_createdAt desc)[0...4] {
    ${scientificProjectFields}
  }
`;