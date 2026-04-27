import { UserId } from "@/types/user";
import { z } from "zod";

export const createNewQuizSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
});

export const quiziesSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  content: z.any(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.custom<UserId>(),
});

export type CreateNewQuizInputs = z.infer<typeof createNewQuizSchema>;
export type QuiziesSchema = z.infer<typeof quiziesSchema>;
