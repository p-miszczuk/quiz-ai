"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/shadcn/card";
import QuizContent from "./components/QuizContent";
import { Button } from "../ui/shadcn/button";
import { Loader2 } from "lucide-react";
import { useQuizTemplate } from "./hooks/useQuizTemplate";

export default function QuizTemplate() {
  const {
    title,
    quiz,
    showAnswers,
    handleShowAnswers,
    isPending,
    isDataAvailable,
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
            <Button onClick={handleShowAnswers}>
              {showAnswers === "hidden" ? "Show Answers" : "Hide Answers"}
            </Button>
          </CardHeader>
          <CardContent className="w-full">
            <QuizContent quiz={quiz} showAnswers={showAnswers} />
          </CardContent>
        </Card>
      )}
    </section>
  );
}
