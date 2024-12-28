// app/api/admin/tests/[id]/questions/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createQuestionSchema } from '@/lib/validations/question'

export async function POST(request: Request) {
    try {
      const { userId } = await auth()
      if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 })
      }
  
      // Extract test ID from the URL
      const testId = request.url.split('/tests/')[1].split('/')[0]
      if (!testId) {
        return new NextResponse('Invalid test ID', { status: 400 })
      }
  
      const json = await request.json()
      const validationResult = createQuestionSchema.safeParse({
        ...json,
        testId
      })
  
      if (!validationResult.success) {
        return NextResponse.json(
          {
            message: 'Invalid request data',
            errors: validationResult.error.flatten().fieldErrors
          },
          { status: 400 }
        )
      }
  
      const { options, ...questionData } = validationResult.data
  
      // Verify test exists
      const test = await prisma.test.findUnique({
        where: { id: testId }
      })
  
      if (!test) {
        return new NextResponse('Test not found', { status: 404 })
      }
  
      const question = await prisma.question.create({
        data: {
          ...questionData,
          categoryId: questionData.categoryId, // Add this line
          options: {
            create: options?.map(option => ({
              text: option.text,
              point: option.point
            })) || []
          }
        },
        include: {
          options: true,
          category: true // Add this line
        }
      })
  
      return NextResponse.json(question, { status: 201 })
    } catch (error) {
      console.error('[QUESTION_POST]', error)
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      )
    }
  }