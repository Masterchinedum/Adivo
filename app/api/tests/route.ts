// app/api/tests/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    
    // Parse query parameters with defaults
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') ?? '10')))
    const search = searchParams.get('search') ?? ''
    const skip = (page - 1) * limit

    // Build where clause
    const whereClause = {
      isPublished: true, // Only return published tests
      ...(search ? {
        title: {
          contains: search,
          mode: 'insensitive'
        }
      } : {})
    }

    // Get total count and tests
    const [totalTests, tests] = await Promise.all([
      prisma.test.count({ where: whereClause }),
      prisma.test.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          categories: {
            include: {
              questions: {
                select: {
                  id: true // Only return IDs for security
                }
              }
            }
          }
        }
      })
    ])

    // Format response
    const formattedTests = tests.map(test => ({
      id: test.id,
      title: test.title,
      description: test.description,
      totalQuestions: test.categories.reduce(
        (sum, cat) => sum + cat.questions.length, 
        0
      ),
      categories: test.categories.map(cat => ({
        name: cat.name,
        questionCount: cat.questions.length
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