// lib/validations/test-attempt-question.ts

import * as z from "zod"

export const testAttemptQuestionsQuerySchema = z.object({
  attemptId: z.string().cuid("Invalid attempt ID")
})

export const updateQuestionResponseSchema = z.object({
  questionId: z.string().cuid("Invalid question ID"),
  selectedOptionId: z.string().cuid("Invalid option ID")
})

export type TestAttemptQuestionsQuery = z.infer<typeof testAttemptQuestionsQuerySchema>
export type UpdateQuestionResponseInput = z.infer<typeof updateQuestionResponseSchema>