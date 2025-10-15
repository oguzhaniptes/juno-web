import { NextResponse, NextRequest } from "next/server";
// import type { NextRequest } from "next/server";

const protectedRoutes = ["/", "/play"];
const publicRoutes = ["/login", "/main"];

export default async function middleware(request: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const token = request.cookies.get("token")?.value;

  console.log(`[Middleware] Pathname: ${path} at ${new Date().toISOString()}`); // Zaman damgası ile log
  console.log(`[Middleware] Token: ${token || "No token found"}`);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  console.log(`[Middleware] Access granted to ${path}`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico|redirect).*)",
  ],
};
