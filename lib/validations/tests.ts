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

const categorySchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required')
    .max(100, 'Category name must be less than 100 characters'),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  questions: z.array(questionSchema).default([])
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
  categories: z.array(categorySchema).default([])
})

// Schema for updating a test
export const updateTestSchema = z.object({
  id: z.string().cuid("Invalid test ID"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
    .optional(),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  isPublished: z.boolean().optional(),
  categories: z.array(
    z.object({
      id: z.string().cuid("Invalid category ID").optional(), // For existing categories
      name: z
        .string()
        .min(1, "Category name is required")
        .max(100, "Category name must be less than 100 characters"),
      description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .optional(),
      questions: z.array(
        z.object({
          id: z.string().cuid("Invalid question ID").optional(), // For existing questions
          title: z
            .string()
            .min(1, "Question title is required")
            .max(1000, "Question title must be less than 1000 characters"),
          options: z.array(
            z.object({
              id: z.string().cuid("Invalid option ID").optional(), // For existing options
              text: z
                .string()
                .min(1, "Option text is required")
                .max(500, "Option text must be less than 500 characters")
            })
          ).optional()
        })
      ).default([])
    })
  ).default([])
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