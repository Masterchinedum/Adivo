import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get query parameters from URL
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const sort = searchParams.get('sort') || 'desc'
    const isPublished = searchParams.get('isPublished')

    // Build where clause without createdBy filter
    const where: Prisma.TestWhereInput = {
      ...(search && {
        title: {
          contains: search,
          mode: 'insensitive' as Prisma.QueryMode
        }
      }),
      ...(isPublished && {
        isPublished: isPublished === 'true'
      })
    }

    // Get tests with pagination
    const [tests, totalTests] = await prisma.$transaction([
      prisma.test.findMany({
        where,
        select: {
          id: true,
          title: true,
          description: true,
          isPublished: true,
          createdAt: true,
          _count: {
            select: {
              questions: true
            }
          }
        },
        orderBy: {
          createdAt: sort === 'desc' ? 'desc' : 'asc'
        },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.test.count({ where })
    ])

    return NextResponse.json({
      tests,
      totalTests,
      currentPage: page,
      totalPages: Math.ceil(totalTests / limit)
    })

  } catch (error) {
    console.error('[TEST_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}