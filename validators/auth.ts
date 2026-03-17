import { z } from "zod";

const emailPattern =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

export const registerSchema = z
  .object({
    email: z.email({
      pattern: emailPattern,
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
        },
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
        },
      ),
    name: z.string().min(1, { message: "Name is required" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInputs = z.infer<typeof registerSchema>;

export const setTreeifyError = (error: z.ZodError) => {
  return z.treeifyError(error);
};

export const loginSchema = z.object({
  email: z.email({
    pattern: emailPattern,
  }),
  password: z.string().min(8),
});
