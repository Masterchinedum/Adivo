// lib/validations/test-results.ts

import * as z from "zod"

export const testResultsQuerySchema = z.object({
  attemptId: z.string().cuid("Invalid test attempt ID")
})

export type TestResultsQuery = z.infer<typeof testResultsQuerySchema>