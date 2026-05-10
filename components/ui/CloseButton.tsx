import { X } from "lucide-react";

interface CloseButtonProps {
  onClick: () => void;
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <div role="button" onClick={() => onClick()} className="p-0 cursor-pointer">
      <X className="w-4 h-4" />
    </div>
  );
}
