// app/api/admin/tests/[id]/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { updateTestSchema } from '@/lib/validations/tests'
import type { TestError } from '@/types/tests/test'

// GET - Retrieve a specific test by ID
export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return new NextResponse('Bad Request: Missing test ID', { status: 400 })
    }

    const test = await prisma.test.findUnique({ where: { id } })
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

// PATCH - Update a specific test by ID
export async function PATCH(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const validationResult = updateTestSchema.safeParse(json)

    if (!validationResult.success) {
      const errorResponse: TestError = {
        message: 'Invalid request data',
        errors: validationResult.error.flatten().fieldErrors
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const test = await prisma.test.update({
      where: { id: validationResult.data.id },
      data: validationResult.data
    })

    return NextResponse.json(test)
  } catch (error) {
    console.error('[TEST_PATCH]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a specific test by ID
// app/api/admin/tests/[id]/route.ts

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Make sure to await the params
    const id = context.params.id
    if (!id) {
      return new NextResponse('Bad Request: Missing test ID', { status: 400 })
    }

    await prisma.test.delete({ where: { id } })

    // Fix the 204 response
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[TEST_DELETE]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}