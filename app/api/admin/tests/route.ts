// app/api/admin/tests/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

import prisma from '@/lib/prisma'
import { testSchema, testQuerySchema } from '@/lib/validations/tests'
import type { TestError } from '@/types/tests/test'

// GET - List all tests with pagination and filtering
export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const queryResult = testQuerySchema.safeParse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      search: searchParams.get('search'),
      sort: searchParams.get('sort'),
      isPublished: searchParams.get('isPublished')
    })

    if (!queryResult.success) {
      return NextResponse.json(
        { message: 'Invalid query parameters' },
        { status: 400 }
      )
    }

    const page = parseInt(queryResult.data.page || '1')
    const limit = parseInt(queryResult.data.limit || '10')
    const skip = (page - 1) * limit

    // Build the query with proper types
    const whereClause: Prisma.TestWhereInput = {
      ...(queryResult.data.search && {
        title: {
          contains: queryResult.data.search,
          mode: Prisma.QueryMode.insensitive
        }
      }),
      ...(queryResult.data.isPublished && {
        isPublished: queryResult.data.isPublished === 'true'
      })
    }

    // Get total count and tests
    const [totalTests, tests] = await Promise.all([
      prisma.test.count({ where: whereClause }),
      prisma.test.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: {
          createdAt: queryResult.data.sort === 'asc' ? 'asc' : 'desc'
        }
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

// POST - Create a new test
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

    const test = await prisma.test.create({
      data: validationResult.data
    })

    return NextResponse.json(test, { status: 201 })
  } catch (error) {
    console.error('[TESTS_POST]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}