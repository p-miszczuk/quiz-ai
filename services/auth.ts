"use server";

import { auth } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/dal/types";
import { LoginInputs, RegisterInputs } from "@/validators/auth";
import { headers } from "next/headers";

export const createUser = async (data: RegisterInputs) => {
  const { email, password, name } = data || {};

  if (!email || !password || !name) {
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
          email,
          password,
          name,
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

  if (!email || !password) {
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
          email,
          password,
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
