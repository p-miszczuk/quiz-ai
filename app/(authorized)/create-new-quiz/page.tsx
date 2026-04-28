import CreateNewQuizForm from "@/components/authorized/CreateNewQuizForm";
import ContentWrapper from "@/components/layout/content-wrapper/ContentWrapper";
import { verifySuccess } from "@/lib/query";
import { getUserSettings } from "@/services/settings";

export default async function CreateNewQuizPage() {
  const { error } = await verifySuccess(await getUserSettings());

  return (
    <ContentWrapper error={error}>
      <section className="flex flex-col items-center justify-start h-screen">
        <CreateNewQuizForm />
      </section>
    </ContentWrapper>
  );
}
