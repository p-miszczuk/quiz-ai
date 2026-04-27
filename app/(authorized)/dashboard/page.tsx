import { verifySuccess } from "@/lib/query";
import { getUserQuizzes } from "@/services/quiz";
import SectionTitle from "@/components/ui/section-title";
import QuzziesTable from "./_components/QuzziesTable";

export default async function DashboardPage() {
  const quizzes = verifySuccess(await getUserQuizzes());

  return (
    <section className="flex flex-col items-center justify-start h-screen w-full">
      <SectionTitle title="Generated Quizzes" position="center" />
      <QuzziesTable quizzes={quizzes} />
    </section>
  );
}
