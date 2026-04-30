import { useQuziStore } from "@/store/quizStore";
import { useEffect, useState } from "react";

export function useQuizTemplate() {
  const data = useQuziStore((s) => s.data);
  const isPending = useQuziStore((s) => s.isPending);

  const [showAnswers, setShowAnswers] = useState<"hidden" | "visible">(
    "hidden",
  );

  useEffect(() => {
    if (isPending) return;
    setShowAnswers("hidden");
  }, [isPending]);

  const handleShowAnswers = () => {
    setShowAnswers((prev) => (prev === "hidden" ? "visible" : "hidden"));
  };

  const isDataAvailable = !!data && !isPending;
  const { title, quiz } = data || {};

  return {
    title,
    quiz,
    showAnswers,
    handleShowAnswers,
    isPending,
    isDataAvailable,
  };
}
