import { ThrowServiceError } from "@/lib/query";

export const createQuizArray = (quizContent: string) => {
  if (!quizContent)
    throw new ThrowServiceError({
      type: "quiz-generation-error",
      error: "No quiz content provided",
    });

  try {
    //remove markdown code blocks
    const cleaned = quizContent
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const data = JSON.parse(cleaned);

    // Use a built-in method for generating a simple unique id
    return data.map((item: any) => ({
      ...item,
      id: crypto.randomUUID(),
    }));
  } catch (error) {
    console.error(error);
    return { error: "Failed to create quiz array" };
  }
};
