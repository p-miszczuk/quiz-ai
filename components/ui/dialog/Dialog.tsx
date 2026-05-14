import {
  SelectedItem,
  SelectedItemTextEdit,
} from "@/components/authorized/components/QuizContent";
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

type Action = "text_edit" | "delete";

interface DialogProps {
  readonly isDialogOpen: boolean;
  readonly closeDialog: () => void;
  readonly data: SelectedItem | SelectedItemTextEdit;
  readonly title: string;
}

export default function DialogComponent({
  isDialogOpen,
  closeDialog,
  title,
  data,
}: DialogProps) {
  const updateQuiz = useQuziStore((s) => s.updateQuiz);
  const deleteQuiz = useQuziStore((s) => s.deleteQuiz);

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

  const handleDelete: SubmitEventHandler<HTMLFormElement> = (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    deleteQuiz((data as SelectedItem)?.id);
    closeDialog();
  };

  const getDialogFields = (action: Action, value?: string): React.ReactNode => {
    if (action === "text_edit") {
      return (
        <form onSubmit={handleSaveChanges}>
          <Input type="text" defaultValue={value} name="value" />
          <DialogFooter className="sm:justify-start">
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      );
    }

    if (action === "delete") {
      return (
        <form onSubmit={handleDelete}>
          <DialogFooter className="sm:justify-start">
            <Button type="submit">Delete</Button>
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
        <div className="flex flex-col gap-2">
          {getDialogFields(data.action, (data as SelectedItemTextEdit)?.value)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
