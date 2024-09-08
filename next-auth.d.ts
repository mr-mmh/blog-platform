/* eslint-disable no-unused-vars */
import { Role, Status } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
    // additional property to user model for session in next-auth must declare here
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    fullName?: string | null;
    emailVerified?: Date | null;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        // TODO: additional property to jwt token must declare here
        firstName?: string | null;
        lastName?: string | null;
        emailVerified?: Date | null;
    }
}
