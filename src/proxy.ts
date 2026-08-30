import { NextRequest, NextResponse } from 'next/server';

// ─── Route Classification ─────────────────────────────────────────────────────
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password', '/auth/callback'];

/**
 * Next.js 16 Proxy (formerly Middleware).
 * File must be named `proxy.ts` and export a named `proxy` function.
 *
 * Strategy:
 *  - Unauthenticated users hitting protected routes → redirect to /login?from=<path>
 *  - Authenticated users hitting /login           → redirect to /
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  // The access_token cookie is set by the login page after a successful login
  const accessToken = request.cookies.get('access_token')?.value;

  if (!accessToken && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Run on all routes EXCEPT Next.js internals and static assets.
   */
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
