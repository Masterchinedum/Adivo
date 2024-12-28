// app/api/admin/tests/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { testQuerySchema, testSchema } from '@/lib/validations/tests'
import type { TestError } from '@/types/tests/test'
import { getUserById } from '@/lib/users'

// GET - List all tests with pagination and filtering
export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)

    // Parse and validate query parameters with default values
    const queryResult = testQuerySchema.safeParse({
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      search: searchParams.get('search') ?? '',
      sort: searchParams.get('sort') ?? 'desc',
      isPublished: searchParams.get('isPublished') || undefined
    })

    if (!queryResult.success) {
      console.error('Validation errors:', queryResult.error.flatten())
      return NextResponse.json(
        { 
          message: 'Invalid query parameters',
          errors: queryResult.error.flatten()
        },
        { status: 400 }
      )
    }

    // Safely parse integers with fallback values
    const page = Math.max(1, parseInt(queryResult.data.page))
    const limit = Math.max(1, Math.min(100, parseInt(queryResult.data.limit))) // Add upper bound for safety
    const skip = (page - 1) * limit

    // Build the query with proper types
    const whereClause: Prisma.TestWhereInput = {}

    // Only add search condition if search string is not empty
    if (queryResult.data.search && queryResult.data.search.trim()) {
      whereClause.title = {
        contains: queryResult.data.search.trim(),
        mode: 'insensitive'
      }
    }

    // Only add isPublished condition if it's provided
    if (queryResult.data.isPublished) {
      whereClause.isPublished = queryResult.data.isPublished === 'true'
    }

    // Get total count and tests
    const [totalTests, tests] = await Promise.all([
      prisma.test.count({ where: whereClause }),
      prisma.test.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: {
          createdAt: queryResult.data.sort
        },
        include: {
          categories: {
            include: {
              questions: {
                include: {
                  options: true
                }
              }
            }
          },
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              imageUrl: true
            }
          }
        }
      })
    ])
    // Format the response data
    const formattedTests = tests.map(test => ({
      ...test,
      categories: test.categories.map(category => ({
        ...category,
        questions: category.questions.map(question => ({
          ...question,
          options: question.options
        }))
      }))
    }))

    return NextResponse.json({
      tests: formattedTests,
      totalTests,
      currentPage: page,
      totalPages: Math.ceil(totalTests / limit)
    })
  } catch (error) {
    console.error('[TESTS_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// Add POST handler for creating tests
export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const validationResult = testSchema.safeParse(json)

    if (!validationResult.success) {
      const errorResponse: TestError = {
        message: 'Invalid request data',
        errors: validationResult.error.flatten().fieldErrors
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    // Get the user's ID from the database using their Clerk ID
    const { user } = await getUserById({ clerkUserId: userId })
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    const { categories, ...testData } = validationResult.data

    // Create test with categories and their questions in a transaction
    const test = await prisma.$transaction(async (tx) => {
      // First create the test
      const newTest = await tx.test.create({
        data: {
          ...testData,
          createdBy: user.id,
        }
      })

      // Then create categories with their questions
      if (categories && categories.length > 0) {
        await Promise.all(
          categories.map(async (category) => {
            const { questions, ...categoryData } = category
            
            // Create category
            const newCategory = await tx.category.create({
              data: {
                ...categoryData,
                testId: newTest.id,
              }
            })

            // Create questions for this category if they exist
            if (questions && questions.length > 0) {
              await Promise.all(
                questions.map(async (question) => {
                  const { options, ...questionData } = question
                  
                  // Create question with its options
                  await tx.question.create({
                    data: {
                      ...questionData,
                      testId: newTest.id,
                      categoryId: newCategory.id,
                      options: {
                        create: options?.map(option => ({
                          text: option.text
                        })) || []
                      }
                    }
                  })
                })
              )
            }
          })
        )
      }

      // Return the complete test with all relations
      return tx.test.findUnique({
        where: { id: newTest.id },
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

    return NextResponse.json(test, { status: 201 })
  } catch (error) {
    console.error('[TEST_POST]', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: 'Database error: ' + error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}