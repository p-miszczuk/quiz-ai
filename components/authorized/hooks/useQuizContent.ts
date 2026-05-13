import { useQuziStore } from "@/store/quizStore";
import { useState } from "react";

export function useQuizContent() {
  const data = useQuziStore((s) => s.data);
  const [showAnswers, setShowAnswers] = useState<"hidden" | "visible">(
    "hidden",
  );
  const { content } = data || {};

  return {
    quiz: content,
  };
}
