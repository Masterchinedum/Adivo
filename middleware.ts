import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from "@/utils/supabase/middleware"

// Define public routes that don't require authentication
const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/auth/callback',
  '/',  // homepage
  '/blog', // public blog posts
  '/about',
  '/contact',
  '/terms',
  '/privacy',
]

// Define role-based routes
const adminRoutes = ['/admin']
const editorRoutes = ['/editor']
const userRoutes = ['/dashboard']

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  // Update session
  await updateSession(request)

  // Get current path
  const path = request.nextUrl.pathname

  // Check if the path is public
  if (publicRoutes.some(route => path.startsWith(route))) {
    return res
  }

  // Get user session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If no session, redirect to login except for public routes
  if (!session) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirectedFrom', path)
    return NextResponse.redirect(redirectUrl)
  }

  // Get user role from session
  const userRole = session.user?.user_metadata?.role || 'user'

  // Role-based access control
  if (
    (path.startsWith('/admin') && userRole !== 'admin') ||
    (path.startsWith('/editor') && !['admin', 'editor'].includes(userRole)) ||
    (path.startsWith('/dashboard') && !['admin', 'editor', 'user'].includes(userRole))
  ) {
    // Redirect unauthorized access to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files: images, fonts, etc
     * - api routes that need to be public
     */
    "/((?!_next/static|_next/image|favicon.ico|api/public|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
}