// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "bn"];
const defaultLocale = "bn";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Step 1: Check if the path is for a resource file. If so, do nothing.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".") // Assumes resource files have an extension
  ) {
    return;
  }

  // Step 2: Check if the path already has a locale. If so, do nothing.
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  // Step 3: Redirect to the default locale.
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Run middleware on every request
  matcher: "/:path*",
};
