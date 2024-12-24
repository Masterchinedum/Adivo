// app/api/admin/tests/[id]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { updateTestSchema } from "@/lib/validations/test";

// GET /api/admin/tests/[id] - Get a specific test
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { sessionClaims } = await auth();
    
    if (sessionClaims?.metadata?.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const test = await prisma.test.findUnique({
      where: {
        id: params.id
      },
      include: {
        questions: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    if (!test) {
      return new NextResponse("Test not found", { status: 404 });
    }

    return NextResponse.json(test);
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// PATCH /api/admin/tests/[id] - Update a test
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { sessionClaims } = await auth();
    const id = params.id;
    
    if (sessionClaims?.metadata?.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = updateTestSchema.parse(json);

    // Update test without modifying questions
    const test = await prisma.test.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        isPublished: body.isPublished
      },
      include: {
        questions: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    return NextResponse.json(test);
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE /api/admin/tests/[id] - Delete a test
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { sessionClaims } = await auth();
    
    if (sessionClaims?.metadata?.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Delete the test (this will cascade delete associated questions due to the database relationship)
    await prisma.test.delete({
      where: {
        id: params.id
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}