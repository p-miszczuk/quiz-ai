export type DalReturn<T, E extends DalError = DalError> =
  | { success: true; data: T }
  | { success: false; error: E };

export type DalError =
  | { type: "no-user" }
  | { type: "no-access" }
  | { type: "api-error"; error: string }
  | { type: "unknown-error"; error: string }
  | { type: "validation-error"; error: string }
  | { type: "better-auth-error"; error: string };

export class ThrowDalError extends Error {
  dalError: DalError;

  constructor(dalError: DalError) {
    super("ThrowDalError");
    this.dalError = dalError;
  }
}

export const successResponse = <T>(data: T): DalReturn<T> => {
  return { success: true, data };
};

export const errorResponse = <E extends DalError>(
  error: E,
): DalReturn<never> => {
  return { success: false, error };
};
