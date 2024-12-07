// utils/auth.ts
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { Role } from "@prisma/client"

export async function checkRole(allowedRoles: Role[]) {
  const session = await getServerSession()
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const userRole = session.user.role as Role
  
  if (!allowedRoles.includes(userRole)) {
    redirect('/dashboard')
  }
}