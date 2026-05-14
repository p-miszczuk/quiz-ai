import { PageHeader } from "@/components/layout/PageHeader";

export default function CreateNewQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full">
      <PageHeader
        title="Create Quiz"
        description="Generate a new quiz with AI"
      />
      {children}
    </div>
  );
}
