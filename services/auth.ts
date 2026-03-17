import { auth } from "@/lib/auth";
import { RegisterInputs } from "@/validators/auth";

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
  const { email, password, name } = data;

  try {
    return successResponse(
      await auth.api.signUpEmail({
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
