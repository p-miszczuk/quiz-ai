import { verifySuccess } from "@/lib/query";
import { getUserQuizzes } from "@/services/quiz";
import React, { Suspense } from "react";
import SectionTitle from "@/components/ui/section-title";
import ContentWrapper from "@/components/layout/content-wrapper/ContentWrapper";

const QuzziesTable = React.lazy(() => import("./_components/QuzziesTable"));

export default async function DashboardPage() {
  const { data: quizzes, error } = await verifySuccess(await getUserQuizzes());
  const hasQuizzes = quizzes && quizzes.length > 0;

  return (
    <section className="flex flex-col items-center justify-start h-screen w-full">
      <SectionTitle title="Generated Quizzes" position="center" />
      <ContentWrapper
        error={error}
        noData={!hasQuizzes}
        noDataMessage="No quizzes generated yet"
      >
        {hasQuizzes ? (
          <Suspense fallback={null}>
            <QuzziesTable quizzes={quizzes} />
          </Suspense>
        ) : null}
      </ContentWrapper>
    </section>
  );
}
