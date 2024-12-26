// lib/validators/question.ts

import * as z from "zod";

export const createQuestionSchema = z.object({
  title: z
    .string()
    .min(1, "Question title is required")
    .max(1000, "Question title must be less than 1000 characters"),
  testId: z.string().cuid("Invalid test ID"),
  order: z.number().optional(),
});

export const updateQuestionSchema = z.object({
  title: z
    .string()
    .min(1, "Question title is required")
    .max(1000, "Question title must be less than 1000 characters")
    .optional(),
  order: z.number().optional(),
});

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;