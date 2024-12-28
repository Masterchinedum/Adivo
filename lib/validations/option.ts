// lib/validations/option.ts
import * as z from "zod"

export const createOptionSchema = z.object({
    text: z
        .string()
        .min(1, "Option text is required")
        .max(500, "Option text must be less than 500 characters"),
    point: z
        .number()
        .int("Point must be an integer")
        .min(0, "Point must be a non-negative number"),
    questionId: z.string().cuid("Invalid question ID")
})

export const updateOptionSchema = z.object({
    text: z
        .string()
        .min(1, "Option text is required")
        .max(500, "Option text must be less than 500 characters"),
    point: z
        .number()
        .int("Point must be an integer")
        .min(0, "Point must be a non-negative number")
        .optional()
})

export type CreateOptionInput = z.infer<typeof createOptionSchema>
export type UpdateOptionInput = z.infer<typeof updateOptionSchema>