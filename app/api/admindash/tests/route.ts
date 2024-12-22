// app/api/admindash/tests/route.ts
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    
    const tests = await prisma.test.findMany({
      where: {
        createdById: userId,
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    
    return NextResponse.json(tests)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}