import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { setTreeifyError } from "@/validators/auth";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isDataInResponse = <T>(result: unknown): result is { data: T } => {
  return typeof result === "object" && result !== null && Array.isArray(result);
};

export const getFormErrorMessage = (error: string | string[]): string => {
  return typeof error === "string" ? error : (error[0] ?? "Unknown error");
};

export const getTreeifyErrorMessage = (validatedData: ZodError): string => {
  const treeified = setTreeifyError(validatedData);
  return treeified?.errors?.[0] ?? "Validation failed";
};
