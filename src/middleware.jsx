import { NextRequest, NextResponse } from "next/server";

export default function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const loginRoute = new URL("/admin-hx/login", req.url);

  if (!token) {
    if (req.nextUrl.pathname === "/admin-hx/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(loginRoute);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin-hx", "/admin-hx/pedidos"],
};
