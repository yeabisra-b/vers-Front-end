import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.jwt; // Assuming token is stored as a cookie
  const publicPaths = ["/login", "/signup"];

  if (publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
