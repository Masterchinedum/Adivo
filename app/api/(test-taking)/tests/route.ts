// app/api/(test-taking)/tests/route.ts

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { publicTestQuerySchema } from '@/lib/validations/public-test'

// GET - List published tests with pagination
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    
    const queryResult = publicTestQuerySchema.safeParse({
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      search: searchParams.get('search') ?? ''
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

    // Fix: Use proper Prisma types for where clause
    const whereClause: Prisma.TestWhereInput = {
      isPublished: true,
      ...(queryResult.data.search && {
        title: {
          contains: queryResult.data.search.trim(),
          mode: 'insensitive' as Prisma.QueryMode
        }
      })
    }

    const [totalTests, tests] = await Promise.all([
      prisma.test.count({ where: whereClause }),
      prisma.test.findMany({
        where: whereClause,
        select: {
          id: true,
          title: true,
          description: true,
          categories: {
            select: {
              name: true,
              description: true,
              scale: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      })
    ])

    return NextResponse.json({
      tests,
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