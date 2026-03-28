import { setTreeifyError } from "@/validators/auth";
import { ZodError } from "zod";

export const getFormErrorMessage = <T extends string | { errors?: string[] }>(
  error: T,
): string => {
  return typeof error === "string"
    ? error
    : (error.errors?.[0] ?? "Unknown error");
};

export const getTreeifyErrorMessage = (validatedData: ZodError): string => {
  const treeified = setTreeifyError(validatedData);
  return treeified?.errors?.[0] ?? "Validation failed";
};
