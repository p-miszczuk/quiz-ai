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

export default function CreateNewQuizForm() {
  return (
    <Card className="w-full shadow-lg max-w-[600px]">
      <FormWrapper
        schema={createNewQuizSchema}
        action={createNewQuiz}
        testId="create-new-quiz-form"
        title="New Quiz Details"
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
  );
}
