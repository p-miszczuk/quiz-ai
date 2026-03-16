import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  description?: string;
  titleColor?: string;
  descriptionColor?: string;
};

export default function SectionTitle({
  title,
  description,
  titleColor = "text-gray-900",
  descriptionColor = "text-gray-500",
}: SectionTitleProps) {
  return (
    <>
      <h2 className={cn("text-3xl font-bold text-center mb-2", titleColor)}>
        {title}
      </h2>
      {description && (
        <p className={cn("text-center mb-12", descriptionColor)}>
          No complicated setup. Just paste, generate, and test yourself.
        </p>
      )}
    </>
  );
}
