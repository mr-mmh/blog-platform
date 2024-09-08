import { z, Schema, ZodError } from "zod";

/**
 * this function get zError or result.error (after safeParse with zod) and return an object with key of field and value of
 * error msg (that prepeare with zod).
 * @param zError
 * @returns
 */
export function parseZodError(zError: ZodError) {
    let zodErrors = {};
    // handle error
    zError.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return zodErrors;
}

export function checkValidationWithZ<T>(schema: Schema, data: T) {
    const result = schema.safeParse(data);
    if (!result.success) {
        return { errors: parseZodError(result.error) };
    }
    return { success: result.data };
}
