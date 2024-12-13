import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/api/webhook(.*)', 
  '/'
])

// Define admin-only routes
const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
  '/dashboard/settings(.*)',
  '/dashboard/users(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  // If it's a public route, allow access
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  // Get the user's authentication status
  const { userId, has, redirectToSignIn } = await auth()

  // Special handling for admin routes
  if (isAdminRoute(req)) {
    // If not logged in, redirect to 404 for admin routes
    if (!userId) {
      return NextResponse.redirect(new URL('/404', req.url))
    }

    // Check if user has admin role
    const userHasAdminRole = await has({ role: 'admin' })
    if (!userHasAdminRole) {
      return NextResponse.redirect(new URL('/404', req.url))
    }
  }

  // For other protected routes, redirect to sign-in if not logged in
  if (!userId && !isAdminRoute(req)) {
    return redirectToSignIn()
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}