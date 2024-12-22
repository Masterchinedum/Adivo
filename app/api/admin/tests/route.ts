// app/api/admin/tests/route.ts

import { NextResponse } from "next/server";
import { createTestSchema } from "@/lib/validations/test";
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
      }
    });

    return NextResponse.json(test);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}