import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production'
)

// Secret login route - only you know this!
const SECRET_LOGIN_ROUTE = '/ctrl-iyed-2024'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes (except the secret login)
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL(SECRET_LOGIN_ROUTE, request.url))
    }

    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.next()
    } catch {
      const response = NextResponse.redirect(new URL(SECRET_LOGIN_ROUTE, request.url))
      response.cookies.delete('auth-token')
      return response
    }
  }

  // If already logged in and trying to access secret login, redirect to admin
  if (pathname === SECRET_LOGIN_ROUTE) {
    const token = request.cookies.get('auth-token')?.value

    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET)
        return NextResponse.redirect(new URL('/admin', request.url))
      } catch {
        // Token invalid, allow access to login
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/ctrl-iyed-2024']
}
