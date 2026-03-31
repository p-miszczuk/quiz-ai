"use server";

import { auth } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/query";
import {
  ChangePasswordInputs,
  LoginInputs,
  RegisterInputs,
} from "@/validators/auth";
import { headers } from "next/headers";

const trimString = (str: string) => str?.trim();

export const createUser = async (data: RegisterInputs) => {
  const { email, password, name } = data || {};

  const trimmedEmail = trimString(email);
  const trimmedPassword = trimString(password);
  const trimmedName = trimString(name);

  if (!trimmedEmail || !trimmedPassword || !trimmedName) {
    return errorResponse({
      type: "validation-error",
      error: "All fields are required",
    });
  }

  try {
    return successResponse(
      await auth.api.signUpEmail({
        headers: (await headers()) as HeadersInit,
        body: {
          email: trimmedEmail,
          password: trimmedPassword,
          name: trimmedName,
        },
      }),
    );
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      return errorResponse({
        type: "better-auth-error",
        error: error.message as string,
      });
    }

    return errorResponse({
      type: "unknown-error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const signIn = async (data: LoginInputs) => {
  const { email, password } = data || {};

  const trimmedEmail = trimString(email);
  const trimmedPassword = trimString(password);

  if (!trimmedEmail || !trimmedPassword) {
    return errorResponse({
      type: "validation-error",
      error: "All fields are required",
    });
  }

  try {
    return successResponse(
      await auth.api.signInEmail({
        headers: (await headers()) as HeadersInit,
        body: {
          email: trimmedEmail,
          password: trimmedPassword,
        },
      }),
    );
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      return errorResponse({
        type: "better-auth-error",
        error: error.message as string,
      });
    }

    return errorResponse({
      type: "unknown-error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const signOut = async () => {
  try {
    return successResponse(
      await auth.api.signOut({
        headers: (await headers()) as HeadersInit,
      }),
    );
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      return errorResponse({
        type: "better-auth-error",
        error: error.message as string,
      });
    }

    return errorResponse({
      type: "unknown-error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const setNewPassword = async (
  data: Omit<ChangePasswordInputs, "confirmNewPassword">,
) => {
  const { currentPassword, newPassword } = data || {};

  const trimmedCurrentPassword = trimString(currentPassword);
  const trimmedNewPassword = trimString(newPassword);

  if (!trimmedCurrentPassword || !trimmedNewPassword) {
    return errorResponse({
      type: "validation-error",
      error: "All fields are required",
    });
  }

  try {
    return successResponse(
      await auth.api.changePassword({
        headers: (await headers()) as HeadersInit,
        body: {
          currentPassword: trimmedCurrentPassword,
          newPassword: trimmedNewPassword,
          revokeOtherSessions: true,
        },
      }),
    );
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      return errorResponse({
        type: "better-auth-error",
        error: error.message as string,
      });
    }

    return errorResponse({
      type: "unknown-error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
