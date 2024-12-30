// app/api/tests/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { testQuerySchema } from '@/lib/validations/tests'

export async function GET(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    // Parse and validate query parameters with default values
    const queryResult = testQuerySchema.safeParse({
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      search: searchParams.get('search') ?? '',
      sort: searchParams.get('sort') ?? 'desc'
    })

    if (!queryResult.success) {
      return NextResponse.json(
        { 
          message: 'Invalid query parameters',
          errors: queryResult.error.flatten()
        },
        { status: 400 }
      )
    }

    const page = Math.max(1, parseInt(queryResult.data.page))
    const limit = Math.max(1, Math.min(100, parseInt(queryResult.data.limit)))
    const skip = (page - 1) * limit

    // Build the where clause with proper types
    const whereClause: Prisma.TestWhereInput = {
      isPublished: true // Only show published tests
    }

    // Add search condition if provided
    if (queryResult.data.search && queryResult.data.search.trim()) {
      whereClause.title = {
        contains: queryResult.data.search.trim(),
        mode: 'insensitive' as Prisma.QueryMode
      }
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
                select: {
                  id: true // Only need count
                }
              }
            }
          }
        }
      })
    ])

    // Format the response
    const formattedTests = tests.map(test => ({
      id: test.id,
      title: test.title,
      description: test.description,
      totalQuestions: test.categories.reduce(
        (sum, category) => sum + category.questions.length, 
        0
      ),
      categories: test.categories.map(category => ({
        name: category.name,
        questionCount: category.questions.length
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