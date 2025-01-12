//app/sanity/client.ts

import { createClient } from "next-sanity";

export const SanityClient = createClient({
  projectId: "ykq9qkar",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});