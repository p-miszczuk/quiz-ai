"use server";

import { CreateQuiz, saveQuiz } from "@/services/quiz";

export interface SaveNewQuizResponse {
  type: "success" | "error";
  message: string;
}

export async function saveNewQuiz(
  data: CreateQuiz,
): Promise<SaveNewQuizResponse> {
  if (!data?.description || !data.title || !data.content) {
    return { type: "error", message: "One of the required fields is empty." };
  }
  const result = await saveQuiz(data);
  if (result.success) {
    return { type: "success", message: "Quiz has been saved successfully" };
  }
  const message =
    "error" in result?.error
      ? (result?.error?.error as string)
      : "Failed to save quiz";
  return { type: "error", message };
}
