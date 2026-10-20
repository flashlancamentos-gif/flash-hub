import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  // Checagem local de cookie (sem chamada de rede — evita timeout no Edge)
  const hasSession = request.cookies.getAll().some(
    (cookie) =>
      cookie.name.startsWith("sb-") && cookie.name.endsWith("-auth-token")
  );

  if (!hasSession && isDashboard) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (hasSession && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
