// app/api/admin/tests/[id]/questions/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Question } from "@prisma/client";

// POST /api/admin/tests/[id]/questions - Add questions to a test
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { sessionClaims } = await auth();
    
    if (sessionClaims?.metadata?.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const { text, type, options, order } = json;

    const question = await prisma.question.create({
      data: {
        text,
        type,
        options,
        order,
        testId: params.id
      }
    });

    return NextResponse.json(question);
  } catch (err) { // Changed from error to err
    console.error('Error creating question:', err)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// PUT /api/admin/tests/[id]/questions - Update question order
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { sessionClaims } = await auth();
    const testId = params.id; // Use the id parameter
    
    if (sessionClaims?.metadata?.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const { questions } = json;

    // Verify questions belong to the correct test
    const updates = questions.map((question: Question) =>
      prisma.question.update({
        where: { 
          id: question.id,
          testId: testId // Ensure question belongs to this test
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