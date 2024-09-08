"use client";
import * as Form from "@/components/forms/form-comps";
import { Input } from "../input";
import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/ui/custom-link";
import { useForm } from "@/hooks/use-form";
import { loginFormSchema, LoginFormSchemaT } from "@/lib/forms/schema";
import { loginAction } from "@/lib/actions/auth/login-action";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function LoginForm() {
    const { push } = useRouter();
    const { errors, setErrors, onChange, onSubmit, isSubmitting } = useForm<LoginFormSchemaT>({
        fields: { email: "", password: "" },
        resolver: loginFormSchema,
    });

    const handleSubmit = useCallback(
        async (fields: LoginFormSchemaT) => {
            const res = await loginAction(fields);
            if (!res.success) {
                if (typeof res.error === "string") {
                    return toast.error(res.error);
                }
                setErrors(res.error as Partial<LoginFormSchemaT>);
            }
            toast.success(res.success);
            push("/account");
        },
        [push, setErrors],
    );

    return (
        <Form.FormWrapper onSubmit={onSubmit(handleSubmit)} className="rounded-xl border bg-white">
            <Form.FormHeader title="ورود" icon="RiLoginBoxLine" />
            <Input
                name="email"
                onChange={onChange}
                errorMessage={errors?.email}
                isInvalid={!!errors?.email}
                type="text"
                label="ایمیل"
            />
            <Input
                name="password"
                onChange={onChange}
                errorMessage={errors?.password}
                isInvalid={!!errors?.password}
                type="password"
                label="رمز عبور"
            />
            <Form.FormSubmitButton isLoading={isSubmitting} fullWidth>
                ورود
            </Form.FormSubmitButton>
            <Form.FormFooter wrapperClassName="py-2 text-slate-400">
                <span>اگر هنوز ثبت نام نکرده اید روی</span>{" "}
                <CustomLink href="/auth/register">صفحه ثبت نام</CustomLink> <span>بزنید.</span>
            </Form.FormFooter>
        </Form.FormWrapper>
    );
}
