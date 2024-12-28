// lib/validations/question.ts
import * as z from "zod"

const optionSchema = z.object({
    text: z
        .string()
        .min(1, "Option text is required")
        .max(500, "Option text must be less than 500 characters"),
    point: z
        .number()
        .int("Point must be an integer")
        .min(0, "Point must be a non-negative number")
})

export const createQuestionSchema = z.object({
    title: z
        .string()
        .min(1, "Question title is required")
        .max(1000, "Question title must be less than 1000 characters"),
    testId: z.string().cuid("Invalid test ID"),
    categoryId: z.string().cuid("Invalid category ID").optional(),  // New field
    options: z.array(optionSchema).optional()
})

export const updateQuestionSchema = z.object({
    title: z
        .string()
        .min(1, "Question title is required")
        .max(1000, "Question title must be less than 1000 characters")
        .optional(),
    categoryId: z.string().cuid("Invalid category ID").optional(),  // New field
    options: z.array(
        z.object({
            id: z.string().cuid("Invalid option ID").optional(),
            text: z.string()
                .min(1, "Option text is required")
                .max(500, "Option text must be less than 500 characters")
        })
    ).optional()
})

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>