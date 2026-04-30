import { QuizItem } from "@/store/quizStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/shadcn/radio-group";
import { Field, FieldContent, FieldLabel } from "@/components/ui/shadcn/field";
import { Activity } from "react";

interface QuizContentProps {
  readonly quiz: QuizItem[] | undefined;
  readonly showAnswers: "hidden" | "visible";
}

interface GetTypeOfQuestionArgs {
  readonly field_type: string;
  readonly options?: string[] | null;
}

const dottedLine = (
  <p className="border-b border-gray-200 border-dashed w-full h-4" />
);

const getTypeOfQuestion = ({ field_type, options }: GetTypeOfQuestionArgs) => {
  switch (field_type) {
    case "multiple_choice":
    case "true_false":
      return (
        <RadioGroup className="w-fit">
          {options?.map((option) => {
            const id = option?.replaceAll(" ", "_");
            return (
              <Field orientation="horizontal" key={id}>
                <RadioGroupItem value={option} id={id} />
                <FieldContent>
                  <FieldLabel
                    htmlFor={id}
                    className="user-select-auto"
                    style={{ userSelect: "auto" }}
                  >
                    {option}
                  </FieldLabel>
                </FieldContent>
              </Field>
            );
          })}
        </RadioGroup>
      );
    case "short_answer":
      return dottedLine;
    case "long_answer":
      return (
        <>
          {dottedLine}
          {dottedLine}
          {dottedLine}
          {dottedLine}
        </>
      );
  }
};

export default function QuizContent({
  quiz,
  showAnswers = "hidden",
}: QuizContentProps) {
  if (!quiz) return null;

  return (
    <ul className="flex flex-col gap-4">
      {quiz?.map(({ id, question, options, field_type, answer }) => (
        <li key={id} className="flex flex-col gap-2">
          <p>{question}</p>
          {getTypeOfQuestion({
            field_type: field_type,
            options,
          })}
          <Activity mode={showAnswers}>
            <p className="font-bold">Answer: {answer}</p>
          </Activity>
        </li>
      ))}
    </ul>
  );
}
