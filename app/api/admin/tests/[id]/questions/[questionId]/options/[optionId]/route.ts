// app/api/admin/tests/[id]/questions/[questionId]/options/[optionId]/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Extract IDs from the URL
    const pathParts = request.url.split('/')
    const optionId = pathParts.pop() // Get optionId
    const questionId = pathParts[pathParts.length - 2] // Get questionId

    if (!optionId || !questionId) {
      return new NextResponse('Invalid request parameters', { status: 400 })
    }

    // First verify that the option belongs to the question
    const option = await prisma.option.findFirst({
      where: {
        id: optionId,
        questionId: questionId
      }
    })

    if (!option) {
      return new NextResponse('Option not found', { status: 404 })
    }

    // Delete the option
    await prisma.option.delete({
      where: {
        id: optionId
      }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[OPTION_DELETE]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}