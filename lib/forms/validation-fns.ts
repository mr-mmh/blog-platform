/**
 * this function get a regex and a value and check that value pass test regex
 * @param regex
 * @param value
 * @returns boolean
 */
export function checkRegexOnValue(regex: RegExp, value: string) {
    return regex.test(value);
}

export function haveUpperCaseValidation(value: string) {
    const haveUpperCaseRegex = /^(?=.*[A-Z]).*$/;
    return checkRegexOnValue(haveUpperCaseRegex, value);
}

export function haveNumberValidation(value: string) {
    const haveNumberRegex = /^(?=.*[0-9]).*$/;
    return checkRegexOnValue(haveNumberRegex, value);
}
