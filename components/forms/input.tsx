import { Input as DefaultInput, InputProps } from "@nextui-org/input";
import { memo, useCallback, useState } from "react";
import { RenderIcon } from "../icons/render-icon";
import { Button } from "../ui/button";

export const Input = memo(function Input({ ...props }: InputProps) {
    if (props.type === "password") {
        return <PasswordInput {...props} />;
    }
    return <DefaultInput {...props} />;
});
Input.displayName = "Input";

function PasswordInput({ ...props }: InputProps) {
    const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

    const togglePassVisibility = useCallback(
        () => setIsPassVisible(!isPassVisible),
        [isPassVisible],
    );

    return (
        <DefaultInput
            {...props}
            type={isPassVisible ? "text" : props.type}
            endContent={
                !!props.endContent ? (
                    props.endContent
                ) : (
                    <Button size="sm" variant="light" isIconOnly onClick={togglePassVisibility}>
                        {isPassVisible ? (
                            <RenderIcon iconName="VscEye" className="size-5 text-gray-400" />
                        ) : (
                            <RenderIcon iconName="VscEyeClosed" className="size-5 text-gray-400" />
                        )}
                    </Button>
                )
            }
        />
    );
}
