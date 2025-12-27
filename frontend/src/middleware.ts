import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to maintenance page
  if (pathname === '/maintenance') {
    return NextResponse.next();
  }

  // Allow access to static files and API routes
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

  // Allow access to /livetest routes
  if (pathname.startsWith('/livetest')) {
    return NextResponse.next();
  }

  // For root path, show maintenance
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url);
  }

  // For all other paths, show maintenance
  const url = request.nextUrl.clone();
  url.pathname = '/maintenance';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Static assets (img, css, js, images, assets, public, admin, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|img/|css/|js/|images/|assets/|public/|admin/).*)',
  ],
};

