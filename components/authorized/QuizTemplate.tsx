"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/shadcn/card";
import QuizContent from "./components/QuizContent";
import { Button } from "../ui/shadcn/button";
import { Loader2 } from "lucide-react";
import { useQuizTemplate } from "./hooks/useQuizTemplate";
import Message from "../layout/messages/Message";
import CloseButton from "../ui/CloseButton";

export default function QuizTemplate() {
  const {
    title,
    content,
    showAnswers,
    handleShowAnswers,
    handleSaveQuiz,
    isPending,
    isDataAvailable,
    answerButtonText,
    responseMessage,
    removeMessage,
  } = useQuizTemplate();

  return (
    <section className="flex items-start justify-start w-full">
      {isPending && (
        <Loader2 className="w-4 h-4 animate-spin w-full flex justify-center" />
      )}
      {/* TODO: add a skeleton loading */}
      {isDataAvailable && (
        <Card className="w-full">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <div className="flex flex-row gap-2">
              <Button onClick={handleShowAnswers}>{answerButtonText}</Button>
              <Button onClick={handleSaveQuiz}>Save Quiz</Button>
            </div>
          </CardHeader>
          {responseMessage && (
            <div className="flex flex-row gap-2 px-3 items-center">
              <Message
                text={responseMessage.message}
                type={responseMessage.type}
              />
              <CloseButton onClick={removeMessage} />
            </div>
          )}
          <CardContent className="w-full">
            <QuizContent quiz={content} showAnswers={showAnswers} />
          </CardContent>
        </Card>
      )}
    </section>
  );
}
