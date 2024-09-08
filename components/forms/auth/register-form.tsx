"use client";
import * as Form from "@/components/forms/form-comps";
import { Input } from "../input";
import { CustomLink } from "@/components/ui/custom-link";
import { useForm } from "@/hooks/use-form";
import { registerFormSchema, registerFormSchemaT } from "@/lib/forms/schema";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { registerAction } from "@/lib/actions/auth/register-action";

export function RegisterForm() {
    const { push } = useRouter();
    const { errors, setErrors, onChange, onSubmit, isSubmitting } = useForm<registerFormSchemaT>({
        fields: { firstName: "", lastName: "", email: "", password: "", rePassword: "" },
        resolver: registerFormSchema,
    });

    const handleSubmit = useCallback(
        async (fields: registerFormSchemaT) => {
            const res = await registerAction(fields);
            if (!res.success) {
                if (typeof res.error === "string") {
                    return toast.error(res.error);
                }
                return setErrors(res.error as Partial<registerFormSchemaT>);
            }
            toast.success(res.success);
            push("/auth/login");
        },
        [push, setErrors],
    );
    return (
        <Form.FormWrapper onSubmit={onSubmit(handleSubmit)} className="rounded-xl border bg-white">
            <Form.FormHeader title="ثبت نام" icon="RiLoginBoxLine" />
            <Input
                name="firstName"
                onChange={onChange}
                errorMessage={errors?.firstName}
                isInvalid={!!errors?.firstName}
                type="text"
                label="نام"
            />
            <Input
                name="lastName"
                onChange={onChange}
                errorMessage={errors?.lastName}
                isInvalid={!!errors?.lastName}
                type="text"
                label="نام خانوادگی"
            />
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
            <Input
                name="rePassword"
                onChange={onChange}
                errorMessage={errors?.rePassword}
                isInvalid={!!errors?.rePassword}
                type="password"
                label="تایید رمز عبور"
            />
            <Form.FormSubmitButton isLoading={isSubmitting} fullWidth>
                ثبت نام
            </Form.FormSubmitButton>

            <Form.FormFooter wrapperClassName="py-2 text-slate-400">
                <span>اگر قبلا ثبت نام کرده اید</span>{" "}
                <CustomLink href="/auth/login">صفحه ورود</CustomLink> <span>بزنید.</span>
            </Form.FormFooter>
        </Form.FormWrapper>
    );
}
