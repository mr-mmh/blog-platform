import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./database/query";

// providers
import Credentials from "next-auth/providers/credentials";

export default {
    trustHost: true,
    providers: [
        Credentials({
            async authorize(credentials) {
                try {
                    const { email, password } = credentials as {
                        email: string;
                        password: string;
                    };
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;
                } catch (error) {
                    return null;
                }

                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
