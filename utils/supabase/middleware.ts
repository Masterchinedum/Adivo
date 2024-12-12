// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Refresh session if expired
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    // Protected routes
    if (request.nextUrl.pathname.startsWith("/dashboard") && (!user || error)) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Auth routes - redirect to dashboard if logged in
    if (
      ["/sign-in", "/sign-up"].includes(request.nextUrl.pathname) &&
      user &&
      !error
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Add security headers
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "origin-when-cross-origin");
    response.headers.set("X-XSS-Protection", "1; mode=block");

    return response;
  } catch (e) {
    console.error("Middleware error:", e);
    return response;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};