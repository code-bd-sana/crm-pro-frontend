import { NextRequest, NextResponse } from 'next/server';

// ─── Route Classification ─────────────────────────────────────────────────────
const PUBLIC_ROUTES = [
  '/login',
  '/forgot-password',
  '/reset-password',
  '/auth/callback',
  '/unauthorized',
];

const PROTECTED_ROUTE_PREFIXES = [
  '/clients',
  '/projects',
  '/tasks',
  '/invoices',
  '/team',
  '/departments',
  '/reports',
  '/settings',
];

/**
 * Next.js 16 Proxy (formerly Middleware).
 * File must be named `proxy.ts` and export a named `proxy` function.
 *
 * Strategy:
 *  - Unauthenticated users hitting protected routes -> redirect to /login?from=<path>
 *  - Authenticated users hitting /login           -> redirect to /
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Next.js internals and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static')
  ) {
    return NextResponse.next();
  }

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`),
  );

  const isProtected =
    pathname === '/' ||
    PROTECTED_ROUTE_PREFIXES.some((route) => pathname.startsWith(route));

  const accessToken = request.cookies.get('access_token')?.value;

  // Unauthenticated on protected route -> redirect to login
  if (isProtected && !accessToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated on login page (without ?from) -> redirect to dashboard
  if (accessToken && pathname === '/login' && !request.nextUrl.searchParams.get('from')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
