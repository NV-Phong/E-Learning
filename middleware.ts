import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")

  const publicRoutes = ["/", "/teachers", "/packages"]

  const protectedRoutes = ["/booking", "/payment", "/dashboard", "/success"]

  const pathname = request.nextUrl.pathname

  // Allow access to public routes
  if (publicRoutes.includes(pathname) || pathname.startsWith("/teachers/")) {
    return NextResponse.next()
  }

  // Check authentication for protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|auth|api|static|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)"],
}
