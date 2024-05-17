
// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request) {
      console.log(request.nextUrl.pathname)
       console.log(request.nextauth.token)

      // console.log(`dddh ${request.nextauth.token}`)
  },
  {
      callbacks: {
          authorized: ({ token }) => token?.role==="admin"
      },
  }
)

// Applies next-auth only to matching routes - can be regex /Supplychain/:path*
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 export const config = { matcher: ["/extra/:path*", "/client/:path*"] }