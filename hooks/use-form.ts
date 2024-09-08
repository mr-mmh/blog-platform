import { checkValidationWithZ } from "@/lib/forms/utils";
import { ChangeEvent, FormEvent, useCallback, useState, useTransition } from "react";
import { Schema } from "zod";

// this is T
// type FormFieldsT = {
//     [key: string]: string;
// };

type UseFormArgs<T> = {
    fields: T;
    resolver: Schema;
};

export function useForm<T>({ fields, resolver }: UseFormArgs<T>) {
    const [_fields, _setFields] = useState<T>(fields);
    const [_errors, _setErrors] = useState<Partial<T>>();
    const [successMsg, setSuccessMsg] = useState<string>();
    const [isSubmitting, startSubmit] = useTransition();

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        _setFields((prev) => ({ ...prev, [name]: value }));
    }, []);

    const setErrors = useCallback((errors: Partial<T>) => _setErrors(errors), []);
    const clearErrors = useCallback(() => _setErrors(undefined), []);

    const onSubmit = useCallback(
        (cb: (fields: T) => void) => (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const validation = checkValidationWithZ(resolver, _fields);
            if (validation.errors) {
                return _setErrors({ ...validation.errors });
            }

            startSubmit(() => cb(_fields));
            clearErrors();
        },
        [_fields, clearErrors, resolver],
    );

    return {
        onChange,
        onSubmit,
        fields: _fields,
        errors: _errors,
        setErrors,
        successMsg,
        isSubmitting,
    };
}
