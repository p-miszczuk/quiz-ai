import { User } from "@/types/user";
import {
  DalError,
  DalReturn,
  errorResponse,
  successResponse,
  ThrowDalError,
} from "./types";
import { getCurrentUser } from "../auth";
import { redirect } from "next/navigation";
// import { UserRole } from "@/services/db";

export function dalLoginRedirect<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
) {
  if (dalReturn.success) return dalReturn;
  if (dalReturn.error.type === "no-user") return redirect("/login");

  return dalReturn as DalReturn<T, Exclude<E, { type: "no-user" }>>;
}

export const dalUnauthorizedRedirect = <T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
  redirectTo = "/",
) => {
  if (dalReturn.success) return dalReturn;
  if (dalReturn.error.type === "no-access") {
    redirect(redirectTo);
  }
  return dalReturn as DalReturn<T, Exclude<E, { type: "no-access" }>>;
};

export const dalThrowError = <T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
) => {
  if (dalReturn.success) return dalReturn;
  throw dalReturn.error;
};

export const dalVerifySuccess = <T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
  {
    redirectTo = "/",
  }: {
    redirectTo?: string;
  } = {},
): T => {
  const result = dalThrowError(
    dalUnauthorizedRedirect(dalLoginRedirect(dalReturn), redirectTo),
  );

  return result.data;
};

export const dalRequireAuth = async <T, E extends DalError>(
  callback: (user: User) => Promise<DalReturn<T, E>>,
  // { allowedRoles }: { allowedRoles?: UserRole[] } = { allowedRoles: ['user'] },
) => {
  const user = await getCurrentUser();
  if (!user) return errorResponse({ type: "no-user" });

  // if (allowedRoles && !allowedRoles.includes(user.role)) {
  //   return errorResponse({ type: "no-access" });
  // }

  return callback(user);
};

export const dalDbQuery = async <T>(callback: () => Promise<T>) => {
  try {
    const result = await callback();

    return successResponse(result);
  } catch (error) {
    if (error instanceof ThrowDalError) {
      return errorResponse(error.dalError);
    }

    return errorResponse({
      type: "unknown-error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
