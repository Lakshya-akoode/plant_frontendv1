import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/css') ||
    pathname.startsWith('/js') ||
    pathname.startsWith('/img') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/public') ||
    pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Allow all page routes (root / and rewrites handle /about, /blog, etc.)
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|img/|css/|js/|images/|assets/|public/|admin/).*)',
  ],
};
