import { UserId } from "@/types/user";
import { z } from "zod";

export const createNewQuizSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
});

export const quizSchema = z.object({
  title: createNewQuizSchema.shape.title,
  description: z.string().min(1, { message: "Description is required" }),
  content: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
        options: z.array(z.string()),
        field_type: z.string(),
        id: z.string(),
      }),
    )
    .nonempty({ message: "Content is required" }),
});

export const quiziesObj = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  content: quizSchema.shape.content.or(z.null()),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.custom<UserId>(),
});

export type CreateNewQuizInputs = z.infer<typeof createNewQuizSchema>;
export type Quizies = z.infer<typeof quiziesObj>;
export type Quiz = z.infer<typeof quizSchema>;
