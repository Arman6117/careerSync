import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("__session_MlZoaOnl")?.value;
  console.log(authToken)

  const protectedRoutes = ["/user"];
  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!authToken) {
      const loginUrl = new URL("/login", request.url);
      NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/user"],
};
