import { User } from "@/types/user";
import { getCurrentUser } from "./auth";
import { redirect } from "next/navigation";

export type ServiceReturn<T, E extends ServiceError = ServiceError> =
  | { success: true; data: T }
  | { success: false; error: E };

export type ServiceError =
  | { type: "no-user" }
  | { type: "no-access" }
  | { type: "api-error"; error: string }
  | { type: "unknown-error"; error: string }
  | { type: "validation-error"; error: string }
  | { type: "better-auth-error"; error: string };

export class ThrowServiceError extends Error {
  serviceError: ServiceError;

  constructor(serviceError: ServiceError) {
    super("ThrowServiceError");
    this.serviceError = serviceError;
  }
}

export const successResponse = <T>(data: T): ServiceReturn<T> => {
  return { success: true, data };
};

export const errorResponse = <E extends ServiceError>(
  error: E,
): ServiceReturn<never> => {
  return { success: false, error };
};

export function loginRedirect<T, E extends ServiceError>(
  result: ServiceReturn<T, E>,
) {
  if (result.success) return result;
  if (result.error.type === "no-user") return redirect("/login");

  return result as ServiceReturn<T, Exclude<E, { type: "no-user" }>>;
}

export const unauthorizedRedirect = <T, E extends ServiceError>(
  result: ServiceReturn<T, E>,
  redirectTo = "/",
) => {
  if (result.success) return result;
  if (result.error.type === "no-access") {
    redirect(redirectTo);
  }
  return result as ServiceReturn<T, Exclude<E, { type: "no-access" }>>;
};

export const throwOnError = <T, E extends ServiceError>(
  result: ServiceReturn<T, E>,
) => {
  if (result.success) return result;
  throw result.error;
};

export const verifySuccess = <T, E extends ServiceError>(
  result: ServiceReturn<T, E>,
  {
    redirectTo = "/",
  }: {
    redirectTo?: string;
  } = {},
): T => {
  const verified = throwOnError(
    unauthorizedRedirect(loginRedirect(result), redirectTo),
  );

  return verified.data;
};

export const requireAuth = async <T, E extends ServiceError>(
  callback: (user: User) => Promise<ServiceReturn<T, E>>,
) => {
  const user = await getCurrentUser();
  if (!user) return errorResponse({ type: "no-user" });

  return callback(user);
};

export const dbQuery = async <T>(callback: () => Promise<T>) => {
  try {
    const result = await callback();

    return successResponse(result);
  } catch (error) {
    if (error instanceof ThrowServiceError) {
      return errorResponse(error.serviceError);
    }

    return errorResponse({
      type: "unknown-error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
