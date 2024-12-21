// lib/validations/test.ts
import { z } from "zod"

export const createTestSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
})

export const updateTestSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  description: z.string().max(500).optional(),
  isPublished: z.boolean().optional(),
})

export type CreateTestSchema = z.infer<typeof createTestSchema>
export type UpdateTestSchema = z.infer<typeof updateTestSchema>