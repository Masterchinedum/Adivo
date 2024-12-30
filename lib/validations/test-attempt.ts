import * as z from "zod"

// Schema for a question response when submitting answers
export const questionResponseSchema = z.object({
  questionId: z.string().cuid("Invalid question ID"),
  selectedOptionId: z.string().cuid("Invalid option ID")
})

// Schema for starting a test attempt
export const startTestAttemptSchema = z.object({
  testId: z.string().cuid("Invalid test ID")
})

// Schema for submitting test responses
export const submitTestResponsesSchema = z.object({
  testAttemptId: z.string().cuid("Invalid test attempt ID"),
  responses: z.array(questionResponseSchema)
})

// Schema for fetching test attempts
export const testAttemptsQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).optional().default('1'),
  limit: z.string().regex(/^\d+$/).optional().default('10'),
  status: z.enum(['IN_PROGRESS', 'COMPLETED', 'ABANDONED']).optional()
}).transform(data => ({
  ...data,
  page: data.page ?? '1',
  limit: data.limit ?? '10'
}))

export type QuestionResponseInput = z.infer<typeof questionResponseSchema>
export type StartTestAttemptInput = z.infer<typeof startTestAttemptSchema>
export type SubmitTestResponsesInput = z.infer<typeof submitTestResponsesSchema>
export type TestAttemptsQueryParams = z.infer<typeof testAttemptsQuerySchema>