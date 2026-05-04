"use server";

import { getTreeifyErrorMessage } from "@/lib/utils";
import { createQuiz } from "@/services/quiz";
import { createQuizArray } from "@/services/utils";
import { CreateNewQuizInputs, createNewQuizSchema } from "@/validators/quiz";

export async function createNewQuiz(data: CreateNewQuizInputs) {
  const validatedData = createNewQuizSchema.safeParse(data);

  if (validatedData?.error) {
    return { error: getTreeifyErrorMessage(validatedData) };
  }

  const result = await createQuiz(data);

  if (result.success && result.data) {
    const quizItems = createQuizArray(result.data);
    if ("error" in quizItems) {
      return { error: quizItems.error };
    }
    return { data: quizItems };
  }

  const message =
    "error" in result && "error" in result.error
      ? (result.error?.error as string)
      : "Quiz creation failed";
  return { error: message };
}
