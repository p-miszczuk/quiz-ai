import { SelectedItem } from "@/components/authorized/components/QuizContent";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogFooter,
} from "../shadcn/dialog";
import { Input } from "../shadcn/input";
import { Button } from "../shadcn/button";
import type { SubmitEventHandler } from "react";
import { useQuziStore } from "@/store/quizStore";

type Action = "text_edit";

interface DialogProps {
  readonly isDialogOpen: boolean;
  readonly closeDialog: () => void;
  readonly action: Action;
  readonly data: SelectedItem;
  readonly title: string;
}

export default function DialogComponent({
  isDialogOpen,
  closeDialog,
  title,
  action,
  data,
}: DialogProps) {
  const updateQuiz = useQuziStore((s) => s.updateQuiz);

  const handleSaveChanges: SubmitEventHandler<HTMLFormElement> = (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const value = formData.get("value") as string;

    updateQuiz({
      ...data,
      value,
    });
    closeDialog();
  };

  const getDialogFields = (action: Action): React.ReactNode => {
    if (action === "text_edit") {
      return (
        <form onSubmit={handleSaveChanges}>
          <Input type="text" defaultValue={data.value} name="value" />
          <DialogFooter className="sm:justify-start">
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      );
    }

    return null;
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">{getDialogFields(action)}</div>
      </DialogContent>
    </Dialog>
  );
}
