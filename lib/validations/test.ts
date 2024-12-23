// lib/validations/test.ts
import { z } from "zod"

const questionOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  value: z.union([z.string(), z.number()])
});

const questionSchema = z.object({
  text: z.string(),
  type: z.enum(['MULTIPLE_CHOICE', 'CHECKBOX', 'SCALE', 'TEXT']),
  options: z.array(questionOptionSchema).optional(),
  order: z.number()
});

// Create schema requires questions
export const createTestSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  questions: z.array(questionSchema), // Required for creation
  isPublished: z.boolean().optional()
});

// Update schema makes everything optional
export const updateTestSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  description: z.string().max(500).optional(),
  questions: z.array(questionSchema).optional(), // Optional for updates
  isPublished: z.boolean().optional()
});

export type CreateTestSchema = z.infer<typeof createTestSchema>
export type UpdateTestSchema = z.infer<typeof updateTestSchema>