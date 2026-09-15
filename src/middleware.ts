import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = [
  "/",
  "/clients",
  "/projects",
  "/tasks",
  "/invoices",
  "/team",
  "/departments",
  "/reports",
  "/settings",
];

// Routes that are always public
const publicRoutes = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/auth/callback",
  "/unauthorized",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public assets and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  // Check if the route is protected
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isPublic = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}?`)
  );

  const accessToken = request.cookies.get("access_token")?.value;

  // Redirect unauthenticated users trying to access protected routes
  if (isProtected && !accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages (optional)
  if (isPublic && accessToken) {
    // Only redirect if there's no explicit 'from' param (e.g., after a fresh login)
    if (pathname === "/login" && !request.nextUrl.searchParams.get("from")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)",
  ],
};
