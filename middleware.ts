import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "@/auth.config";
import { protectedRoutes, apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    if (isApiAuthRoute) return NextResponse.next();

    const isLoggedIn = !!req.auth;

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
    }

    const isProtectedRoute = nextUrl.pathname.startsWith(protectedRoutes);
    if (isProtectedRoute) {
        if (isLoggedIn) {
            return NextResponse.next();
        }
        return Response.redirect(new URL("/auth/login", nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
