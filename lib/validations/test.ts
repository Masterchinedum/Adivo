// lib/validations/test.ts
import * as z from "zod"

export const createTestSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
  description: z.string().max(500, "Description cannot exceed 500 characters").optional(),
})

export const updateTestSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  description: z.string().max(500).optional(),
  isPublished: z.boolean().optional(),
})

export const categorySchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().max(200).optional(),
  parentId: z.string().optional(),
})

export const questionSchema = z.object({
  text: z.string().min(3).max(500),
  type: z.enum(["multiple_choice", "checkbox", "scale", "text"]),
  options: z.array(z.object({
    text: z.string(),
    value: z.union([z.string(), z.number()]),
  })).optional(),
  order: z.number().int().min(0),
  categoryId: z.string(),
})

export type CreateTestSchema = z.infer<typeof createTestSchema>
export type UpdateTestSchema = z.infer<typeof updateTestSchema>
export type CategorySchema = z.infer<typeof categorySchema>
export type QuestionSchema = z.infer<typeof questionSchema>