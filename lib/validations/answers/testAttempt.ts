// lib/validations/answers/testAttempt.ts
import * as z from 'zod'
import { TestStatus } from '@/types/answers/testAttempt'

export const createTestAttemptSchema = z.object({
  testId: z.string().cuid('Invalid test ID')
})

export const updateTestAttemptSchema = z.object({
  status: z.nativeEnum(TestStatus), // Fix: Use the imported TestStatus enum
  completedAt: z.date().optional(),
  totalScore: z.number().min(0, 'Score must be non-negative'),
  percentageScore: z.number().min(0, 'Percentage must be non-negative').max(100)
})

export type CreateTestAttemptInput = z.infer<typeof createTestAttemptSchema>
export type UpdateTestAttemptInput = z.infer<typeof updateTestAttemptSchema>