// app/api/admin/tests/route.ts

import { NextResponse } from "next/server";
import { createTestSchema, updateTestSchema } from "@/lib/validations/test";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// GET /api/admin/tests - Get all tests
export async function GET() {
  try {
    const { sessionClaims } = await auth();
    
    // Check if user is admin
    if (sessionClaims?.metadata?.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const tests = await prisma.test.findMany({
      include: {
        questions: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(tests);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// POST /api/admin/tests - Create a new test
export async function POST(req: Request) {
  try {
    const { sessionClaims } = await auth();
    
    // Check if user is admin
    if (sessionClaims?.metadata?.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = createTestSchema.parse(json);

    const test = await prisma.test.create({
      data: {
        title: body.title,
        description: body.description,
        isPublished: body.isPublished,
        questions: {
          create: body.questions?.map((q) => ({
            text: q.text,
            type: q.type,
            options: q.options,
            order: q.order
          })) || [] // Add fallback empty array if questions is undefined
        }
      },
      include: {
        questions: true
      }
    });

    return NextResponse.json(test);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// PATCH /api/admin/tests/[id] - Update a test
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const json = await req.json();
    const body = updateTestSchema.parse(json);

    // Delete existing questions
    await prisma.question.deleteMany({
      where: { testId: params.id }
    });

    // Update test with new questions
    const test = await prisma.test.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        isPublished: body.isPublished,
        questions: {
          create: body.questions?.map((q) => ({
            text: q.text,
            type: q.type,
            options: q.options,
            order: q.order
          }))
        }
      },
      include: {
        questions: true
      }
    });

    return NextResponse.json(test);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}