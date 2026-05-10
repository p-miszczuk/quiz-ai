import { cn } from "@/lib/utils";

export type MessageProps = {
  text: string;
  type: "success" | "error" | "warning" | "info";
};

export default function Message({ text, type }: MessageProps) {
  return (
    <div
      className={cn(
        "text-center text-sm font-medium",
        type === "success"
          ? "text-green-600"
          : type === "error"
            ? "text-red-600"
            : type === "warning"
              ? "text-yellow-600"
              : "text-blue-600",
      )}
    >
      {text}
    </div>
  );
}
