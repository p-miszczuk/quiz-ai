import { RadioGroup, RadioGroupItem } from "@/components/ui/shadcn/radio-group";
import { Field, FieldContent, FieldLabel } from "@/components/ui/shadcn/field";
import { Activity, useState } from "react";
import { Quiz } from "@/validators/quiz";
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

export interface SelectedItem {
  id: string;
  type: "question" | "answer" | "option";
  optionIndex?: number;
  value: string;
}

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

  const handleEdit = (data: SelectedItem) => () => {
    setSelectedItem(data);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
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
                <div className="group flex flex-row items-center gap-2">
                  <Field orientation="horizontal" key={optionId}>
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

  if (!content) return null;
  return (
    <ul className="flex flex-col gap-4">
      {content?.map(({ id, question, options, field_type, answer }) => (
        <li key={id} className="flex flex-col gap-2">
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
                onClick={handleEdit({ id, type: "answer", value: answer })}
              />
            </div>
          </Activity>
        </li>
      ))}
      {!!selectedItem && (
        <DialogComponent
          isDialogOpen
          closeDialog={handleCloseDialog}
          action="text_edit"
          title="Update element"
          data={selectedItem}
        />
      )}
    </ul>
  );
}
