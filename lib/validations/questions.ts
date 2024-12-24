// lib/validations/question.ts
import { z } from "zod"

const questionOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  value: z.union([z.string(), z.number()])
});

export const createQuestionSchema = z.object({
  text: z.string(),
  type: z.enum(['MULTIPLE_CHOICE', 'CHECKBOX', 'SCALE', 'TEXT']),
  options: z.array(questionOptionSchema).optional(),
  order: z.number(),
  testId: z.string()
});

export const updateQuestionSchema = z.object({
  text: z.string().optional(),
  type: z.enum(['MULTIPLE_CHOICE', 'CHECKBOX', 'SCALE', 'TEXT']).optional(),
  options: z.array(questionOptionSchema).optional(),
  order: z.number().optional()
});