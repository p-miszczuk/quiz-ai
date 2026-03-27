import { dalVerifySuccess } from "@/lib/dal/helpers";
import { getUserQuizzes } from "./_dal/queries";

export default async function DashboardPage() {
  const quizzes = dalVerifySuccess(await getUserQuizzes());

  return (
    <div>
      <div>Dashboard</div>
      <code>{JSON.stringify(quizzes, null, 2)}</code>
    </div>
  );
}
