"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/shadcn/card";
import { Button } from "../ui/shadcn/button";
import { Loader2 } from "lucide-react";
import { useQuizTemplate } from "./hooks/useQuizTemplate";
import Message from "../layout/messages/Message";
import CloseButton from "../ui/CloseButton";
import { Suspense, lazy } from "react";

const QuizContent = lazy(() => import("./components/QuizContent"));

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
        <Loader2 className="w-4 size-4 animate-spin w-full flex justify-center" />
      )}
      {/* TODO: add a skeleton loading */}
      {isDataAvailable && (
        <Card className="w-full shadow-lg">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <div className="flex flex-row gap-2">
              <Button onClick={handleShowAnswers} className="shadow-md">
                {answerButtonText}
              </Button>
              <Button onClick={handleSaveQuiz} className="shadow-md">
                Save Quiz
              </Button>
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
          {!!content?.length && (
            <CardContent className="w-full">
              <Suspense
                fallback={
                  <Loader2 className="w-4 size-4 animate-spin w-full flex justify-center" />
                }
              >
                <QuizContent content={content} showAnswers={showAnswers} />
              </Suspense>
            </CardContent>
          )}
        </Card>
      )}
    </section>
  );
}
