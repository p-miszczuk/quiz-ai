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
        title="Create New Quiz"
        description="Enter the details of the quiz you want to create"
      >
        {({ register, errors, isSubmitting, isSubmitSuccessful }) => (
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
            {isSubmitSuccessful && (
              <FormSuccessMessage text="Quiz created successfully" />
            )}
            <Button size="lg" type="submit" disabled={isSubmitting}>
              Create Quiz
            </Button>
          </>
        )}
      </FormWrapper>
    </Card>
  );
}
