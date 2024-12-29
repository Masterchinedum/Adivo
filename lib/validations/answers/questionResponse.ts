// lib/validations/answers/questionResponse.ts
import * as z from 'zod'

export const createQuestionResponseSchema = z.object({
  testAttemptId: z.string().cuid('Invalid test attempt ID'),
  questionId: z.string().cuid('Invalid question ID'),
  selectedOptionId: z.string().cuid('Invalid option ID')
})

export type CreateQuestionResponseInput = z.infer<typeof createQuestionResponseSchema>