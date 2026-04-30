"use client";

import { Card } from "../ui/shadcn/card";
import { InputField } from "../ui/fields/InputField";
import { FieldError } from "../ui/shadcn/field";
import { Button } from "../ui/shadcn/button";
import { createNewQuiz } from "@/actions/quizes/create-quiz";
import { createNewQuizSchema } from "@/validators/quiz";
import { TextareaField } from "../ui/fields/TextareaField";
import FormWrapper from "../ui/FormWrapper";
import FormSuccessMessage from "../ui/FormSuccessMessage";
import { QuizItem, useQuziStore } from "@/store/quizStore";
import { useShallow } from "zustand/react/shallow";

export default function CreateNewQuizForm() {
  const { setGeneratedQuiz, setIsPending } = useQuziStore(
    useShallow((s) => ({
      setGeneratedQuiz: s.setGeneratedQuiz,
      setIsPending: s.setIsPending,
    })),
  );

  const handleSuccess = (data: QuizItem[], title: string) => {
    setGeneratedQuiz({ title, quiz: data });
  };

  const handleSubmitStart = () => {
    setIsPending(true);
  };

  const handleSubmitError = () => {
    setIsPending(false);
  };

  return (
    <section className="flex flex-row items-start justify-start w-full max-w-full lg:max-w-[400px] ">
      <Card className="w-full shadow-lg">
        <FormWrapper
          schema={createNewQuizSchema}
          action={createNewQuiz}
          onSuccess={handleSuccess}
          onSubmitStart={handleSubmitStart}
          onSubmitError={handleSubmitError}
          testId="create-new-quiz-form"
          title="New Quiz"
          description="Enter the details of the quiz you want to create"
        >
          {({ register, errors, isSubmitting: isCreating }) => (
            <>
              <InputField
                id="quiz-title"
                type="text"
                placeholder="Enter your quiz title"
                label="Title"
                errorMessage={errors?.title?.message}
                {...register("title")}
              />
              <TextareaField
                id="quiz-description"
                placeholder="Enter your quiz prompt"
                label="Description"
                errorMessage={errors?.description?.message}
                rows={15}
                {...register("description")}
              />
              {errors.root && (
                <FieldError data-testid="create-new-quiz-form-error">
                  {errors.root.message}
                </FieldError>
              )}
              {isCreating && (
                <FormSuccessMessage text="Quiz is being generated..." />
              )}
              <Button size="lg" type="submit" disabled={isCreating}>
                Create Quiz
              </Button>
            </>
          )}
        </FormWrapper>
      </Card>
    </section>
  );
}
