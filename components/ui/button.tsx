import { Button as DefaultButton, type ButtonProps } from "@nextui-org/button";

export function Button({ ...props }: ButtonProps) {
    return <DefaultButton {...props}></DefaultButton>;
}
