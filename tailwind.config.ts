import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./node_modules/@nextui-org/theme/dist/components/(button|input|ripple|spinner).js",
    ],
    theme: {
        extend: {
            screens: {
                xs: "375px",
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "0.5rem",
                },
            },
            fontFamily: {
                iYekan: "var(--font-iYekan)",
            },
            fontWeight: {
                extraBlack: "1000",
            },
        },
    },
    plugins: [nextui()],
};
export default config;
