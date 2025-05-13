import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Auth routes
  if (req.nextUrl.pathname.startsWith('/auth')) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return res
  }

  // Protected routes
  if (
    req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/settings') ||
    req.nextUrl.pathname.startsWith('/api/protected')
  ) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
    return res
  }

  // Public routes
  return res
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/dashboard/:path*',
    '/settings/:path*',
    '/api/protected/:path*',
  ],
}