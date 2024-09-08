"use server";

import db from "@/database/db";
import { getUserByEmail } from "@/database/query";
import { registerFormSchema, registerFormSchemaT } from "@/lib/forms/schema";
import { checkValidationWithZ } from "@/lib/forms/utils";
import bcrypt from "bcryptjs";
import { form } from "framer-motion/client";

export async function registerAction(data: unknown) {
    const validation = checkValidationWithZ(registerFormSchema, data);
    if (!validation.success) {
        return { error: validation };
    }

    const formData = validation.success as registerFormSchemaT;
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    try {
        const isExistEmail = await getUserByEmail(formData.email);
        if (isExistEmail) return { error: "ایمیل وارد شده، قبلا ثبت شده است" };

        await db.user.create({
            data: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                emailVerified: new Date(),
                password: hashedPassword,
            },
        });
        return { success: "ثبت نام شما با موفقیت انجام شد. حالا میتوانید وارد شوید." };
    } catch (error) {
        console.log(error);
        return { error: "مشکلی رخ داد! دوباره تلاش کنید" };
    }
}
