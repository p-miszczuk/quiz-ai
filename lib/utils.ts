import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isDataInResponse = <T>(result: unknown): result is { data: T } => {
  return typeof result === "object" && result !== null && Array.isArray(result);
};
