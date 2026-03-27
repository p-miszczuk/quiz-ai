import { z } from "zod";

export const REGISTER_ERRORS = {
  email: "Invalid email address",
  password: "Password must be at least 8 characters",
  passwordPattern:
    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
  confirmPassword: "Passwords do not match",
  name: "Name is required",
  matchPasswords: "Passwords do not match",
} as const satisfies Record<string, string>;

export const LOGIN_ERRORS = {
  email: "Invalid email address",
  password: "Password is required",
} as const satisfies Record<string, string>;

const emailPattern =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerSchema = z.object({
  email: z.email({
    pattern: emailPattern,
    message: REGISTER_ERRORS.email,
  }),
  password: z
    .string()
    .min(8, { message: REGISTER_ERRORS.password })
    .regex(passwordPattern, {
      message: REGISTER_ERRORS.passwordPattern,
    }),
  confirmPassword: z
    .string()
    .min(8, { message: REGISTER_ERRORS.matchPasswords })
    .regex(passwordPattern, {
      message: REGISTER_ERRORS.matchPasswords,
    }),
  name: z.string().min(1, { message: REGISTER_ERRORS.name }),
});

export const loginSchema = z.object({
  email: z.email({
    pattern: emailPattern,
    message: LOGIN_ERRORS.email,
  }),
  password: z.string().min(1, { message: LOGIN_ERRORS.password }),
});

export type RegisterInputs = z.infer<typeof registerSchema>;

export type LoginInputs = z.infer<typeof loginSchema>;

export const setTreeifyError = (error: z.ZodError) => {
  return z.treeifyError(error);
};
