import { PageHeader } from "@/components/layout/PageHeader";

export default function CreateNewQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full">
      <PageHeader
        title="Create New Quiz"
        description="Enter the details of the quiz you want to create"
      />
      {children}
    </div>
  );
}
