"use server";

import { getTreeifyErrorMessage } from "@/components/utils";
import { createQuiz } from "@/services/quiz";
import { CreateNewQuizInputs, createNewQuizSchema } from "@/validators/quiz";
import { redirect } from "next/navigation";

export async function createNewQuiz(data: CreateNewQuizInputs) {
  const validatedData = createNewQuizSchema.safeParse(data);

  if (validatedData?.error) {
    return { error: getTreeifyErrorMessage(validatedData.error) };
  }

  const result = await createQuiz(data);

  if (result.success) {
    return redirect("/dashboard");
  }

  const message =
    "error" in result.error
      ? (result.error.error as string)
      : "Quiz creation failed";
  return { error: message };
}
