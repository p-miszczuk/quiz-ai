import { RadioGroup, RadioGroupItem } from "@/components/ui/shadcn/radio-group";
import { Field, FieldContent, FieldLabel } from "@/components/ui/shadcn/field";
import { Activity, Suspense, useState } from "react";
import { Quiz } from "@/validators/quiz";
import { Loader2, Trash2Icon } from "lucide-react";
import EditIcon from "@/components/ui/EditIcon";
import DialogComponent from "@/components/ui/dialog/Dialog";

interface QuizContentProps {
  readonly content: Quiz["content"];
  readonly showAnswers: "hidden" | "visible";
}

interface GetTypeOfQuestionArgs {
  readonly field_type: string;
  readonly options?: string[] | null;
  readonly id: string;
}

type Action = "text_edit" | "delete";

export interface SelectedItem {
  id: string;
  action: Action;
}

export type SelectedItemTextEdit = {
  type: "question" | "answer" | "option";
  optionIndex?: number;
  value: string;
} & SelectedItem;

const dottedLine = (
  <p className="border-b border-gray-200 border-dashed w-full h-4" />
);

const ADDITIONAL_CLASSES =
  "opacity-0 transition-opacity duration-200 group-hover:opacity-100";

export default function QuizContent({
  content,
  showAnswers = "hidden",
}: QuizContentProps) {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  const handleEdit = (data: SelectedItemTextEdit) => () => {
    setSelectedItem(data);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  const handleDelete =
    ({ id, action }: SelectedItem) =>
    () => {
      setSelectedItem({ id, action });
    };

  const getTypeOfQuestion = ({
    field_type,
    options,
    id,
  }: GetTypeOfQuestionArgs) => {
    switch (field_type) {
      case "multiple_choice":
      case "yes_no":
        const isYesNoType = field_type === "yes_no";
        return (
          <RadioGroup className="w-fit">
            {options?.map((option, index) => {
              const optionId = option?.replaceAll(" ", "_");
              return (
                <div
                  key={optionId}
                  className="group flex flex-row items-center gap-2"
                >
                  <Field orientation="horizontal">
                    <RadioGroupItem value={option} id={optionId} />
                    <FieldContent>
                      <FieldLabel htmlFor={id} style={{ userSelect: "auto" }}>
                        {option}
                      </FieldLabel>
                    </FieldContent>
                  </Field>
                  {!isYesNoType ? (
                    <EditIcon
                      additionalClasses={ADDITIONAL_CLASSES}
                      onClick={handleEdit({
                        id,
                        type: "option",
                        optionIndex: index,
                        value: option,
                        action: "text_edit",
                      })}
                    />
                  ) : null}
                </div>
              );
            })}
          </RadioGroup>
        );
      case "short_answer":
        return dottedLine;
      case "long_answer":
        return <>{...Array.from({ length: 4 }).map((_) => dottedLine)}</>;
    }
  };

  if (!content?.length) return null;

  const quizTitle =
    selectedItem?.action === "text_edit"
      ? "Update element"
      : "Confirm deletion of element";

  return (
    <ul className="flex flex-col gap-4">
      {content?.map(({ id, question, options, field_type, answer }) => (
        <li key={id} className="flex flex-row justify-between gap-2">
          <div className="flex flex-col gap-2">
            <div className="group flex flex-row items-center gap-2">
              <p>{question}</p>
              <EditIcon
                additionalClasses={ADDITIONAL_CLASSES}
                onClick={handleEdit({ id, type: "question", value: question })}
              />
            </div>
            {getTypeOfQuestion({
              field_type: field_type,
              options,
              id,
            })}
            <Activity mode={showAnswers}>
              <div className="group flex flex-row items-center gap-2">
                <p className="font-bold">Answer: {answer}</p>
                <EditIcon
                  additionalClasses={ADDITIONAL_CLASSES}
                  onClick={handleEdit({
                    id,
                    type: "answer",
                    value: answer,
                    action: "text_edit",
                  })}
                />
              </div>
            </Activity>
          </div>
          <div className="flex justify-center items-center w-10">
            <Trash2Icon
              className="w-4 h-4 cursor-pointer"
              onClick={handleDelete({ id, action: "delete" })}
            />
          </div>
        </li>
      ))}
      {!!selectedItem && (
        <div>
          <Suspense
            fallback={
              <Loader2 className="w-4 size-4 animate-spin w-full flex justify-center" />
            }
          >
            <DialogComponent
              isDialogOpen
              closeDialog={handleCloseDialog}
              title={quizTitle}
              data={selectedItem}
            />
          </Suspense>
        </div>
      )}
    </ul>
  );
}
