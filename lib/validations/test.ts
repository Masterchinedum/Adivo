// lib/validations/test.ts
import { z } from "zod"

// Create schema requires questions
export const createTestSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  isPublished: z.boolean().optional()
});

// Update schema makes everything optional
export const updateTestSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  description: z.string().max(500).optional(),
  isPublished: z.boolean().optional()
});

export type CreateTestSchema = z.infer<typeof createTestSchema>
export type UpdateTestSchema = z.infer<typeof updateTestSchema>