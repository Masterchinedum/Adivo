// app/api/admin/tests/questions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Question } from "@prisma/client";

// POST /api/admin/tests/questions - Add questions to a test
export async function POST(request: NextRequest) {
  try {
    const { sessionClaims } = await auth();
    
    if (sessionClaims?.metadata?.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const { text, type, options, order, testId } = json;

    const question = await prisma.question.create({
      data: {
        text,
        type,
        options,
        order,
        testId
      }
    });

    return NextResponse.json(question);
  } catch (err) {
    console.error('Error creating question:', err)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// PUT /api/admin/tests/questions - Update questions
export async function PUT(request: NextRequest) {
  try {
    const { sessionClaims } = await auth();
    
    if (sessionClaims?.metadata?.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const { questions, testId } = json;

    const updates = questions.map((question: Question) =>
      prisma.question.update({
        where: { 
          id: question.id,
          testId
        },
        data: { order: question.order }
      })
    );

    await prisma.$transaction(updates);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error updating questions:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE /api/admin/tests/questions - Delete questions
export async function DELETE(request: NextRequest) {
  try {
    const { sessionClaims } = await auth();
    
    if (sessionClaims?.metadata?.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const { questionIds, testId } = json;

    await prisma.question.deleteMany({
      where: {
        id: {
          in: questionIds
        },
        testId
      }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting questions:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}