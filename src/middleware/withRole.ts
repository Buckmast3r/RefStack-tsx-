import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { UserRole } from '@/types/user'

export async function withRole(
  request: NextRequest,
  allowedRoles: UserRole[],
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Get user's role from profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (error || !profile) {
      console.error('Error fetching user profile:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check if user has required role
    if (!allowedRoles.includes(profile.role)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return handler(request)
  } catch (error) {
    console.error('Role middleware error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/settings/:path*',
  ],
} 