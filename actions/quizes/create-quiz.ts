"use server";

import { getTreeifyErrorMessage } from "@/components/utils";
// import { createNewQuiz } from "@/services/quizes";
import { CreateNewQuizInputs, createNewQuizSchema } from "@/validators/quiz";

export async function createNewQuiz(data: CreateNewQuizInputs) {
  const validatedData = createNewQuizSchema.safeParse(data);

  if (validatedData?.error) {
    return { error: getTreeifyErrorMessage(validatedData.error) };
  }

  //   const result = await createNewQuiz({
  //     currentPassword: data.currentPassword,
  //     newPassword: data.newPassword,
  //   });

  const result = { success: true, error: {} };

  if (result.success) {
    return { success: true };
  }

  const message =
    "error" in result.error
      ? (result.error.error as string)
      : "Quiz creation failed";
  return { error: message };
}
