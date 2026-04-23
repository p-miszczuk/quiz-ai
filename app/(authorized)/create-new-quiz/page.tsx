import CreateNewQuizForm from "@/components/authorized/CreateNewQuizForm";
import { verifySuccess } from "@/lib/query";
import { getUserSettings } from "@/services/settings";

export default async function CreateNewQuizPage() {
  verifySuccess(await getUserSettings());

  return (
    <section className="flex flex-col items-center justify-start h-screen">
      <CreateNewQuizForm />
    </section>
  );
}
