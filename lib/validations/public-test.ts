import * as z from "zod"

// For query parameters in public test listing
export const publicTestQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).optional().default('1'),
  limit: z.string().regex(/^\d+$/).optional().default('10'),
  search: z.string().optional().default('')
}).transform(data => ({
  ...data,
  page: data.page ?? '1',
  limit: data.limit ?? '10',
  search: data.search ?? ''
}))

export type PublicTestQueryParams = z.infer<typeof publicTestQuerySchema>