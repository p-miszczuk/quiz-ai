import { ThrowServiceError } from "@/lib/query";

export const createQuizArray = (quizContent: string) => {
  if (!quizContent)
    throw new ThrowServiceError({
      type: "quiz-generation-error",
      error: "No quiz content provided",
    });

  //remove markdown code blocks
  const cleaned = quizContent
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  return JSON.parse(cleaned);
};
