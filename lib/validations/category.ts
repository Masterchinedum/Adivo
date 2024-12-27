// lib/validations/category.ts
import * as z from "zod"

export const createCategorySchema = z.object({
    name: z
        .string()
        .min(1, "Category name is required")
        .max(100, "Category name must be less than 100 characters"),
    description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .optional(),
    testId: z.string().cuid("Invalid test ID")
})

export const updateCategorySchema = z.object({
    name: z
        .string()
        .min(1, "Category name is required")
        .max(100, "Category name must be less than 100 characters")
        .optional(),
    description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .optional()
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>