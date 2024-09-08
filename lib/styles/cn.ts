import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * use this util function to merge TW classess with clsx utilities.
 * @param {ClassValue} inputs
 * @returns {string}
 */
export default function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
