"use server";
import { signIn } from "@/auth";
import { loginFormSchema, LoginFormSchemaT } from "@/lib/forms/schema";
import { checkValidationWithZ } from "@/lib/forms/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export async function loginAction(data: unknown) {
    const validation = checkValidationWithZ(loginFormSchema, data);
    if (!validation.success) {
        return { error: validation };
    }

    const { email, password } = validation.success as LoginFormSchemaT;

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        return { success: "با موفقیت وارد شدید" };
    } catch (error) {
        console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "اطلاعات ورودی ایمیل یا پسورد صحیح نمی باشد." };
                default:
                    return { error: "خطایی رخ داد! دوباره تلاش کنید" };
            }
        }
        return { error: "خطایی رخ داد! دوباره تلاش کنید" };

        // throw error;
    }
}
