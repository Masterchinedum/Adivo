//app/sanity/sanity.image.ts

import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { SanityClient } from '../sanity/client';

const builder = imageUrlBuilder(SanityClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).url(); // Call `.url()` to generate the image URL as a string
}
