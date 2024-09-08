import cn from "@/lib/styles/cn";
import { RenderIcon, type IconNameT } from "../icons/render-icon";
import { FormEvent } from "react";
import { Button } from "../ui/button";
import { ButtonProps } from "@nextui-org/button";

type FormWrapperProps = {
    children: React.ReactNode;
    className?: string;
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};

export function FormWrapper({ children, className, onSubmit }: FormWrapperProps) {
    return (
        <form
            onSubmit={onSubmit}
            className={cn("flex flex-col items-center justify-center gap-4 px-6 py-2", className)}
        >
            {children}
        </form>
    );
}

type FormHeaderProps = {
    children?: React.ReactNode;
    title?: string;
    titleAs?: React.ElementType;
    titleClassName?: string;
    wrapperClassName?: string;
    icon?: IconNameT;
    iconClassName?: string;
};
export function FormHeader({ titleAs: TitleElement = "h1", ...props }: FormHeaderProps) {
    return (
        <div
            className={cn(
                "flex w-full items-center justify-between gap-4 p-4",
                props.wrapperClassName,
            )}
        >
            {props.title && (
                <TitleElement
                    className={cn("text-xl font-extraBlack text-slate-300", props.titleClassName)}
                >
                    {props.title}
                </TitleElement>
            )}
            {props.icon && (
                <RenderIcon
                    iconName={props.icon}
                    className={cn("size-8 text-slate-300", props.iconClassName)}
                />
            )}
            {props.children}
        </div>
    );
}

type FormSubmitButtonProps = ButtonProps;

export function FormSubmitButton({ ...props }: FormSubmitButtonProps) {
    return (
        <Button
            isLoading={props.isLoading}
            variant={props.variant || "shadow"}
            color={props.color || "primary"}
            fullWidth={props.fullWidth}
            type={props.type || "submit"}
            className={cn("font-black", props.className)}
        >
            {props.children}
        </Button>
    );
}

type FormFooterProps = {
    children?: React.ReactNode;
    wrapperClassName?: string;
};
export function FormFooter({ ...props }: FormFooterProps) {
    return <div className={cn("", props.wrapperClassName)}>{props.children}</div>;
}
