import { verifySuccess } from "@/lib/query";
import { getUserQuizzes } from "@/services/quiz";

export default async function DashboardPage() {
  const quizzes = verifySuccess(await getUserQuizzes());

  return (
    <div>
      <div>Dashboard</div>
      <code>{JSON.stringify(quizzes, null, 2)}</code>
    </div>
  );
}
