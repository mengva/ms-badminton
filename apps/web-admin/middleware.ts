import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { tokenName } from "./utils/constants";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(tokenName)?.value;
  const { pathname } = request.nextUrl;
  if ((token && pathname.startsWith("/auth")) || pathname === "/") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (
    !token &&
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/auth")
  ) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
    "/",
  ],
};
