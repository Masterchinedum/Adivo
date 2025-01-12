//app/sanity/client.ts

import { createClient } from "next-sanity";

export const SanityClient = createClient({
  projectId: "x64cqh92",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});