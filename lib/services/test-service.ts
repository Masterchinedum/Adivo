//lib/services/test-service.ts

import { PrismaClient, Prisma } from '@prisma/client'
import { CategoryInput, UpdateTestInput } from '../validations/tests'

export class TestService {
  constructor(private prisma: PrismaClient) {}

  async updateTest(data: UpdateTestInput) {
    const { id, categories, ...testData } = data

    return await this.prisma.$transaction(async (tx) => {
      // 1. Verify and update test
      await this.verifyAndUpdateTest(tx, id, testData)
      
      // 2. Process categories if they exist
      if (categories?.length) {
        await this.processCategories(tx, id, categories)
      }

      // 3. Return updated test
      return await this.getTestWithRelations(tx, id)
    })
  }

  private async verifyAndUpdateTest(
    tx: Prisma.TransactionClient, 
    id: string, 
    testData: Omit<UpdateTestInput, 'id' | 'categories'>
  ) {
    const existingTest = await tx.test.findUnique({
      where: { id },
      include: { categories: true }
    })

    if (!existingTest) {
      throw new Error('Test not found')
    }

    return await tx.test.update({
      where: { id },
      data: testData
    })
  }

  private async processCategories(
    tx: Prisma.TransactionClient,
    testId: string, 
    categories: CategoryInput[]
  ) {
    const existingCategoryIds = categories
      .map(c => c.id)
      .filter((id): id is string => id !== undefined)

    // Delete removed categories
    await tx.category.deleteMany({
      where: {
        testId,
        id: { notIn: existingCategoryIds }
      }
    })

    // Process all categories concurrently
    await Promise.all(
      categories.map(category => 
        category.id 
          ? this.updateExistingCategory(tx, category)
          : this.createNewCategory(tx, testId, category)
      )
    )
  }

  private async updateExistingCategory(
    tx: Prisma.TransactionClient,
    category: CategoryInput
  ) {
    // First get existing category to verify testId
    const existingCategory = await tx.category.findUnique({
      where: { id: category.id },
      select: { testId: true }
    });

    if (!existingCategory) {
      throw new Error('Category not found');
    }

    await tx.category.update({
      where: { id: category.id },
      data: {
        name: category.name,
        description: category.description,
        scale: category.scale,
        questions: {
          upsert: category.questions.map(q => ({
            where: { id: q.id || 'temp-id' },
            update: {
              title: q.title,
              options: {
                deleteMany: {},
                createMany: {
                  data: q.options
                }
              }
            },
            create: {
              title: q.title,
              testId: existingCategory.testId, // Use the correct testId from existing category
              options: {
                createMany: {
                  data: q.options
                }
              }
            }
          }))
        }
      }
    });
  }

  private async createNewCategory(
    tx: Prisma.TransactionClient,
    testId: string,
    category: Omit<CategoryInput, 'id'>
  ) {
    await tx.category.create({
      data: {
        name: category.name,
        description: category.description,
        scale: category.scale,
        testId,
        questions: {
          create: category.questions.map(q => ({
            title: q.title,
            testId,
            options: {
              createMany: {
                data: q.options
              }
            }
          }))
        }
      }
    })
  }

  private async getTestWithRelations(tx: Prisma.TransactionClient, id: string) {
    return await tx.test.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            questions: {
              include: {
                options: true
              }
            }
          }
        }
      }
    })
  }
}