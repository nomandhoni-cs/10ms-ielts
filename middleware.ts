import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const defaultLocale = "bn";
const locales = ["en", "bn"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // e.g. incoming request is /products
    // The new URL is now /bn/products
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|images|favicon.ico).*)",
  ],
};
