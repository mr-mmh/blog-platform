/**
 * this file use for route management for any purpose like check permission or route protection or ...
 */

/**
 * every routes that starts with this, redirect to auth page if not authenticated.
 * @type {string}
 */
export const protectedRoutes: string = "/account";

/**
 * An array of routes that are use for authentication.
 * These routes will redirect logged in users to protectedRoutes.
 * @type {string[]}
 */
export const authRoutes: string[] = ["/auth/login", "/auth/register"];

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/account";

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes (by default use by next-auth).
 * @type {string}
 */

export const apiAuthPrefix: string = "/api/auth";
