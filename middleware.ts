import { NextResponse, NextRequest } from "next/server";

// Public routes - accessible without authentication
const publicRoutes = ["/login", "/main", "/redirect"];

// Protected routes - require authentication
const protectedRoutes = ["/", "/play"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  console.log(`[Middleware] Pathname: ${path} at ${new Date().toISOString()}`);

  // Check if it's a public route first (exact match or starts with)
  const isPublicRoute = publicRoutes.some((route) => {
    return path === route || path.startsWith(route + "/");
  });

  if (isPublicRoute) {
    console.log(`[Middleware] Public route - Access granted to ${path}`);
    return NextResponse.next();
  }

  // Check for zkLogin auth data in cookies
  const userId = request.cookies.get("user_id")?.value;
  const salt = request.cookies.get("salt")?.value;
  const maxEpoch = request.cookies.get("max_epoch")?.value;

  const hasAuthData = Boolean(userId && salt && maxEpoch);

  console.log(`[Middleware] Auth Status: ${hasAuthData ? "Authenticated" : "Not authenticated"}`);

  // Check if it's a protected route
  const isProtectedRoute = protectedRoutes.some((route) => {
    // Exact match for root path
    if (route === "/") {
      return path === "/";
    }
    // Prefix match for other routes
    return path === route || path.startsWith(route + "/");
  });

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !hasAuthData) {
    console.log(`[Middleware] Redirecting to /login - No auth data found`);
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  console.log(`[Middleware] Access granted to ${path}`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (static files)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
