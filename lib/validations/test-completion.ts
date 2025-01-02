// lib/validations/test-completion.ts
import * as z from "zod"

export const testCompletionSchema = z.object({
  testAttemptId: z.string().cuid("Invalid test attempt ID")
})

export const categoryCompletionSchema = z.object({
  categoryId: z.string().cuid("Invalid category ID"),
  rawScore: z.number().min(0, "Raw score must be non-negative"),
  maxRawScore: z.number().min(0, "Max raw score must be non-negative"),
  scaledScore: z.number().min(0, "Scaled score must be non-negative"),
  maxScale: z.number().min(0, "Max scale must be non-negative")
})

export type TestCompletionInput = z.infer<typeof testCompletionSchema>
