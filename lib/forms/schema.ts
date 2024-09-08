import { z } from "zod";
import { validationMessages } from "./validation-messages";
import { haveNumberValidation, haveUpperCaseValidation } from "./validation-fns";

// fields with default message in persian if any error in type occured.
const zodString = z.string({ message: validationMessages.default });

/////////////////////////////////////////// auth schemas ///////////////////////////////////////////

export const loginFormSchema = z.object({
    email: zodString.email({ message: validationMessages.email }).trim(),
    password: z.string({ message: "پر کردن این فیلد الزامی است." }),
});

export type LoginFormSchemaT = z.infer<typeof loginFormSchema>;
//

export const registerFormSchema = z
    .object({
        email: zodString.email({ message: validationMessages.email }).trim(),
        firstName: zodString
            .min(3, { message: validationMessages.min.min3 })
            .max(100, { message: validationMessages.max.max100 })
            .trim(),
        lastName: zodString
            .min(3, { message: validationMessages.min.min3 })
            .max(100, { message: validationMessages.max.max100 })
            .trim(),
        password: zodString
            .min(8, { message: validationMessages.min.passMin8 })
            .max(100, { message: validationMessages.max.passMax100 }),
        rePassword: zodString
            .min(8, { message: validationMessages.min.passMin8 })
            .max(100, { message: validationMessages.max.passMax100 }),
    })
    .refine((fields) => fields.password === fields.rePassword, {
        message: validationMessages.password.match,
        path: ["rePassword"],
    })
    .refine((fields) => haveUpperCaseValidation(fields.password), {
        message: validationMessages.password.haveUpper,
        path: ["password"],
    })
    .refine((fields) => haveNumberValidation(fields.password), {
        message: validationMessages.password.haveNum,
        path: ["password"],
    });
export type registerFormSchemaT = z.infer<typeof registerFormSchema>;
