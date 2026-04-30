import CreateNewQuizForm from "@/components/authorized/CreateNewQuizForm";
import QuizTemplate from "@/components/authorized/QuizTemplate";
import ContentWrapper from "@/components/layout/content-wrapper/ContentWrapper";
import { verifySuccess } from "@/lib/query";
import { getUserSettings } from "@/services/settings";

export default async function CreateNewQuizPage() {
  const { error } = await verifySuccess(await getUserSettings());

  return (
    <ContentWrapper error={error}>
      <div className="flex lg:flex-row flex-col gap-4">
        <CreateNewQuizForm />
        <QuizTemplate />
      </div>
    </ContentWrapper>
  );
}
