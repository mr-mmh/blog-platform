import type { Metadata } from "next";
import { iYekanFont } from "./styles/fonts";
import "./styles/globals.css";

import { Providers } from "@/components/utils/providers";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className={`${iYekanFont.variable} antialiased`} lang="fa" dir="rtl">
            <body className="ss02 font-iYekan text-base tracking-tight">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
