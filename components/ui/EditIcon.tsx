import { cn } from "@/lib/utils";
import { PencilIcon } from "lucide-react";

export default function EditIcon({
  additionalClasses,
  onClick,
}: {
  additionalClasses?: string;
  onClick: () => void;
}) {
  return (
    <PencilIcon
      className={cn("w-4 cursor-pointer", additionalClasses)}
      onClick={onClick}
    />
  );
}
