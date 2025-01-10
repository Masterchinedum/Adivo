// app/api/admin/tests/[id]/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
// import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { updateTestSchema } from '@/lib/validations/tests'
// import type { TestError } from '@/types/tests/test'

export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const id = req.url.split('/tests/')[1].split('/')[0]
    if (!id) {
      return new NextResponse('Bad Request: Missing test ID', { status: 400 })
    }

    const test = await prisma.test.findUnique({
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

    if (!test) {
      return new NextResponse('Not Found', { status: 404 })
    }

    return NextResponse.json(test)
  } catch (error) {
    console.error('[TEST_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {
  try {
    console.log('[TEST_PATCH] Starting PATCH request')
    const id = req.url.split('/tests/')[1].split('/')[0]
    console.log('[TEST_PATCH] Extracted ID:', id)

    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const json = await req.json()
    console.log('[TEST_PATCH] Request body:', json)

    const validationResult = updateTestSchema.safeParse({
      ...json,
      id
    })

    if (!validationResult.success) {
      return NextResponse.json({
        message: 'Invalid request data',
        errors: validationResult.error.flatten().fieldErrors
      }, { status: 400 })
    }

    const { categories, ...testData } = validationResult.data

    // Wrap everything in a transaction
    const updatedTest = await prisma.$transaction(async (tx) => {
      // 1. Verify test exists
      const existingTest = await tx.test.findUnique({
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

      if (!existingTest) {
        throw new Error('Test not found')
      }

      // 2. Update test basic info
      await tx.test.update({
        where: { id },
        data: testData
      })

      // 3. Process categories
      if (categories) {
        for (const category of categories) {
          if (category.id) {
            // Update existing category
            const existingCategory = existingTest.categories.find(c => c.id === category.id)
            if (existingCategory) {
              await tx.category.update({
                where: { id: category.id },
                data: {
                  name: category.name,
                  description: category.description,
                  scale: category.scale
                }
              })

              // Process questions for existing category
              if (category.questions) {
                for (const question of category.questions) {
                  if (question.id) {
                    // Update existing question
                    await tx.question.update({
                      where: { id: question.id },
                      data: {
                        title: question.title
                      }
                    })

                    // Process options - Fix type error by filtering out undefined
                    if (question.options) {
                      // Get existing option IDs to check which ones to delete
                      const existingOptionIds = existingCategory.questions
                        .find(q => q.id === question.id)
                        ?.options.map(o => o.id) || []

                      // Get new option IDs from the update payload
                      const newOptionIds = question.options
                        .map(o => o.id)
                        .filter((id): id is string => id !== undefined) // Type guard

                      // Delete options that are no longer in the updated list
                      await tx.option.deleteMany({
                        where: {
                          questionId: question.id,
                          id: { 
                            notIn: newOptionIds,
                            in: existingOptionIds // Only delete from existing options
                          }
                        }
                      })

                      // Update or create options
                      for (const option of question.options) {
                        if (option.id) {
                          await tx.option.update({
                            where: { id: option.id },
                            data: {
                              text: option.text,
                              point: option.point
                            }
                          })
                        } else {
                          await tx.option.create({
                            data: {
                              text: option.text,
                              point: option.point,
                              questionId: question.id
                            }
                          })
                        }
                      }
                    }
                  } else {
                    // Create new question with options
                    await tx.question.create({
                      data: {
                        title: question.title,
                        categoryId: category.id,
                        testId: id,
                        options: {
                          create: question.options
                        }
                      }
                    })
                  }
                }
              }
            }
          } else {
            // Create new category with questions and options
            await tx.category.create({
              data: {
                name: category.name,
                description: category.description,
                scale: category.scale,
                testId: id,
                questions: {
                  create: category.questions?.map(question => ({
                    title: question.title,
                    testId: id,
                    options: {
                      create: question.options
                    }
                  }))
                }
              }
            })
          }
        }

        // Delete removed categories - Fix type error
        const newCategoryIds = categories
          .map(c => c.id)
          .filter((id): id is string => id !== undefined) // Type guard

        await tx.category.deleteMany({
          where: {
            testId: id,
            id: { notIn: newCategoryIds }
          }
        })
      }

      // 4. Return updated test
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
    })

    if (!updatedTest) {
      return NextResponse.json({ message: 'Failed to update test' }, { status: 500 })
    }

    return NextResponse.json(updatedTest)

  } catch (error) {
    console.error('[TEST_PATCH] Error:', error)
    const message = error instanceof Error ? error.message : 'Internal Server Error'
    return NextResponse.json({ message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Extract ID from URL
    const id = request.url.split('/tests/')[1].split('/')[0]
    if (!id) {
      return new NextResponse('Bad Request: Missing test ID', { status: 400 })
    }

    // Check if test exists
    const test = await prisma.test.findUnique({
      where: { id }
    })

    if (!test) {
      return NextResponse.json(
        { message: 'Test not found' },
        { status: 404 }
      )
    }

    // Delete the test (will cascade delete categories, questions, and options)
    await prisma.test.delete({
      where: { id }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[TEST_DELETE]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}