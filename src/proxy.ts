import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

const hasValidClerkKey =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_') &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('YOUR_KEY')

export default hasValidClerkKey
  ? clerkMiddleware(async (auth, req) => {
      if (isAdminRoute(req)) {
        await auth.protect()
      }
    })
  : function fallbackMiddleware(req: NextRequest) {
      if (isAdminRoute(req)) {
        return NextResponse.redirect(new URL('/', req.url))
      }
      return NextResponse.next()
    }

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
