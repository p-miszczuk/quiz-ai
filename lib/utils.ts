import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { setTreeifyError } from "@/validators/auth";
import { treeifyError, ZodError, ZodSafeParseResult } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isDataInResponse = <T>(result: unknown): result is { data: T } => {
  return typeof result === "object" && result !== null && Array.isArray(result);
};

export const getFormErrorMessage = (error: string | string[]): string => {
  return typeof error === "string" ? error : (error[0] ?? "Unknown error");
};

function firstMessageFromErrorTree(tree: unknown): string | undefined {
  if (tree === null || typeof tree !== "object") return undefined;
  const { errors, properties, items } = tree as {
    errors?: unknown;
    properties?: Record<string, unknown>;
    items?: unknown[] | Record<string, unknown>;
  };
  if (Array.isArray(errors) && errors.length > 0) {
    const first = errors[0];
    if (typeof first === "string") return first;
  }
  if (properties && typeof properties === "object") {
    for (const child of Object.values(properties)) {
      const found = firstMessageFromErrorTree(child);
      if (found) return found;
    }
  }
  if (Array.isArray(items)) {
    for (const item of items) {
      const found = firstMessageFromErrorTree(item);
      if (found) return found;
    }
  } else if (items && typeof items === "object") {
    for (const child of Object.values(items)) {
      const found = firstMessageFromErrorTree(child);
      if (found) return found;
    }
  }
  return undefined;
}

//TODO: refactor this part to insert sefeParse here
export const getTreeifyErrorMessage = <T>(
  validatedData: ZodSafeParseResult<T>,
): string => {
  if (!validatedData) return "Validation failed";
  const { error } = validatedData || {};
  const treeified = setTreeifyError(error as ZodError);

  return (
    firstMessageFromErrorTree(treeified) ??
    error?.issues?.[0]?.message ??
    "Validation failed"
  );
};
