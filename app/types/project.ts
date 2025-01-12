// app/types/project.ts
import { Image as SanityImage } from 'sanity';

export interface SanityImageType extends SanityImage {
  _type: 'image';
  alt?: string;
}

export interface WebProject {
  _id: string;
  _createdAt: string;
  name: string;
  slug: {
    current: string;
  };
  link: string;
  description: string;
  mainImage: SanityImageType;
  techStack: string[];
}

export interface ScientificProject {
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  link: string;
  abstract: string;
  projectType: string;
  mainImage: SanityImageType;
  tags: string[];
}