"use server";

import { auth } from "@/lib/auth";
import { LoginInputs, RegisterInputs } from "@/validators/auth";
import { headers } from "next/headers";

type Result<S, E extends { errorMessage: string }> =
  | { data: S; error: null }
  | { data: null; error: E };

const successResponse = <S>(data: S): Result<S, never> => {
  return { data, error: null };
};

const errorResponse = <E extends { errorMessage: string }>(
  error: E,
): Result<null, E> => {
  return { data: null, error };
};

export const createUser = async (data: RegisterInputs) => {
  const { email, password, name } = data || {};

  if (!email || !password || !name) {
    return errorResponse({ errorMessage: "All fields are required" });
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
      return errorResponse({ errorMessage: error.message as string });
    }

    return errorResponse({ errorMessage: "Unknown error" });
  }
};

export const signIn = async (data: LoginInputs) => {
  const { email, password } = data || {};

  if (!email || !password) {
    return errorResponse({ errorMessage: "All fields are required" });
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
      return errorResponse({ errorMessage: error.message as string });
    }

    return errorResponse({ errorMessage: "Unknown error" });
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({
      headers: (await headers()) as HeadersInit,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      return errorResponse({ errorMessage: error.message as string });
    }

    return errorResponse({ errorMessage: "Unknown error" });
  }
};
