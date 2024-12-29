// lib/validations/answers/categoryScore.ts
import * as z from 'zod'

export const createCategoryScoreSchema = z.object({
  testAttemptId: z.string().cuid('Invalid test attempt ID'),
  categoryId: z.string().cuid('Invalid category ID'),
  actualScore: z.number().min(0, 'Score must be non-negative'),
  maxScale: z.number().min(0, 'Scale must be non-negative'),
  rawScore: z.number().int().min(0, 'Raw score must be non-negative'),
  maxRawScore: z.number().int().min(0, 'Max raw score must be non-negative')
})

export type CreateCategoryScoreInput = z.infer<typeof createCategoryScoreSchema>