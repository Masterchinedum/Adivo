// lib/validations/tests.ts

import * as z from 'zod'

const optionSchema = z.object({
  text: z
    .string()
    .min(1, 'Option text is required')
    .max(500, 'Option text must be less than 500 characters')
})

const questionSchema = z.object({
  title: z
    .string()
    .min(1, 'Question title is required')
    .max(1000, 'Question title must be less than 1000 characters'),
  options: z.array(optionSchema).optional()
})

export const testSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  isPublished: z.boolean().default(false),
  questions: z.array(questionSchema).optional()
})

// Schema for updating a test
export const updateTestSchema = testSchema.partial().extend({
  id: z.string().min(1, 'Test ID is required')
})

// For query parameters
export const testQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).optional().default('1'),
  limit: z.string().regex(/^\d+$/).optional().default('10'),
  search: z.string().optional().default(''),
  sort: z.enum(['asc', 'desc']).optional().default('desc'),
  isPublished: z.enum(['true', 'false']).optional()
}).transform(data => ({
  ...data,
  page: data.page ?? '1',
  limit: data.limit ?? '10',
  search: data.search ?? '',
  sort: data.sort ?? 'desc'
}))

export type TestFormValues = z.infer<typeof testSchema>
export type UpdateTestFormValues = z.infer<typeof updateTestSchema>
export type TestQueryParams = z.infer<typeof testQuerySchema>