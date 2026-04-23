import { z } from "zod";

export const createNewQuizSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
});

export type CreateNewQuizInputs = z.infer<typeof createNewQuizSchema>;
