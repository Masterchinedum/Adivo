// middleware.ts
import { withAuth } from "next-auth/middleware"
import { Role } from "@prisma/client"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/auth/signin?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    // Handle role-based access
    const userRole = token?.role as Role

    // Admin routes protection
    if (req.nextUrl.pathname.startsWith('/admin') && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Moderator routes protection
    if (req.nextUrl.pathname.startsWith('/mod') && 
        !['ADMIN', 'MODERATOR'].includes(userRole)) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
    matcher: [
      '/dashboard/:path*',
      '/admin/:path*',
      '/mod/:path*',
      '/auth/signin',
      '/auth/signup',
    ]
  }