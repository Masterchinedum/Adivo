// lib/validations/tests.ts

import * as z from 'zod'

export const testSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  isPublished: z.boolean().default(false)
})

// Schema for updating a test
export const updateTestSchema = testSchema.partial().extend({
  id: z.string().min(1, 'Test ID is required')
})

// For query parameters
export const testQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(['asc', 'desc']).optional(),
  isPublished: z.enum(['true', 'false']).optional()
})

export type TestFormValues = z.infer<typeof testSchema>
export type UpdateTestFormValues = z.infer<typeof updateTestSchema>
export type TestQueryParams = z.infer<typeof testQuerySchema>