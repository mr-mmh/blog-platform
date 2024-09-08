import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export async function Providers({ children }: { children: React.ReactNode }) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <NextUIProvider>{children}</NextUIProvider>
        </SessionProvider>
    );
}
