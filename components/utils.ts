export const getFormErrorMessage = <T extends string | { errors?: string[] }>(
  error: T,
): string => {
  return typeof error === "string"
    ? error
    : (error.errors?.[0] ?? "Unknown error");
};
