import { saveNewQuiz, SaveNewQuizResponse } from "@/actions/quizes/save-quiz";
import { useQuziStore } from "@/store/quizStore";
import { Quiz } from "@/validators/quiz";
import { useEffect, useState } from "react";

type Message = Readonly<SaveNewQuizResponse>;

export function useQuizTemplate() {
  const data = useQuziStore((s) => s.data);
  const isPending = useQuziStore((s) => s.isPending);
  const { title, content, description } = data || {};
  const isDataAvailable = !!data && !isPending;

  const [showAnswers, setShowAnswers] = useState<"hidden" | "visible">(
    "hidden",
  );
  const [responseMessage, setResponseMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (isPending) return;
    setResponseMessage(null);
    setShowAnswers("hidden");
  }, [isPending]);

  const handleShowAnswers = () => {
    setShowAnswers((prev) => (prev === "hidden" ? "visible" : "hidden"));
  };

  const handleSaveQuiz = async () => {
    const { type, message } = await saveNewQuiz({
      title: title as string,
      description: description as string,
      content: content as Quiz["content"],
    });

    setResponseMessage({ type, message });
  };

  const removeMessage = () => {
    setResponseMessage(null);
  };

  return {
    title,
    content,
    showAnswers,
    handleShowAnswers,
    handleSaveQuiz,
    isPending,
    isDataAvailable,
    responseMessage,
    removeMessage,
    answerButtonText:
      showAnswers === "hidden" ? "Show Answers" : "Hide Answers",
  };
}
