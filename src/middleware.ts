import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PASSWORD = process.env.PASSWORD_HASH || 'capafest_offline26'
const COOKIE_NAME = 'capafest_auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow access to login page and API routes
  if (pathname === '/acceso' || pathname.startsWith('/api/')) {
    return NextResponse.next()
  }
  
  // Check for auth cookie
  const authCookie = request.cookies.get(COOKIE_NAME)
  
  if (!authCookie || authCookie.value !== PASSWORD) {
    // Redirect to login page
    const url = request.nextUrl.clone()
    url.pathname = '/acceso'
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
