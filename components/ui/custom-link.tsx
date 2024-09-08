import { default as DefaultLink, type LinkProps } from "next/link";
import { ThemeColorPallete } from "@/types/colors";
import cn from "@/lib/styles/cn";

type LinkPropsT = {
    children: React.ReactNode;
    className?: string;
    color?: ThemeColorPallete;
} & LinkProps;
export function CustomLink({ children, color, className, ...props }: LinkPropsT) {
    const _className = cn(
        "rounded-lg p-1",
        {
            "text-primary hover:bg-primary-50": !color || color === "primary",
            "text-danger hover:bg-danger-50": color === "danger",
            "text-foreground hover:bg-foreground-50": color === "foreground",
            "text-secondary hover:bg-secondary-50": color === "secondary",
            "text-success hover:bg-success-50": color === "success",
            "text-warning hover:bg-warning-50": color === "warning",
        },
        className,
    );
    return (
        <DefaultLink className={_className} {...props}>
            {children}
        </DefaultLink>
    );
}
