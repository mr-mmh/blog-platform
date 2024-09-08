import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import db from "./database/db";
import { getUserById } from "./database/query";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    logger: {
        error(code, ...message) {},
        warn(code, ...message) {
            console.warn(code, message);
        },
        debug(code, ...message) {
            console.debug(code, message);
        },
    },
    callbacks: {
        // eslint-disable-next-line no-unused-vars
        async signIn({ user, account }) {
            // if (account?.provider !== "credentials") return true;
            const existingUser = await getUserById(user.id);
            if (!existingUser) return false;
            return true;
        },
        async jwt({ token }) {
            // token.sub: userID in database
            if (!token.sub) return token;

            const DbUser = await getUserById(token.sub);
            if (!DbUser) return token;

            // add aditional property of user to token here ...
            token.email = DbUser.email;
            token.firstName = DbUser.firstName;
            token.lastName = DbUser.lastName;
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub || "";
                session.user.email = token.email || "";
                session.user.firstName = token.firstName || "";
                session.user.lastName = token.lastName || "";
                session.user.emailVerified = token.emailVerified || null;
                if (token.firstName && token.lastName)
                    session.user.fullName = token.firstName + " " + token.lastName;
            }

            return session;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
