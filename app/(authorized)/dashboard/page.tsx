import { verifySuccess } from "@/lib/query";
import { getUserQuizzes } from "@/services/quiz";
import React, { Suspense } from "react";
import SectionTitle from "@/components/ui/section-title";
import ContentWrapper from "@/components/layout/content-wrapper/ContentWrapper";

const QuzziesTable = React.lazy(() => import("./_components/QuzziesTable"));
const Pagination = React.lazy(
  () => import("@/components/ui/pagination/Pagination"),
);

const DISPLAY_PAGINATION_FROM_PAGE = 2;

//consider splitting this page to use  client component for pagination and table and
// dashboard should be server component
// only if user experience is degraded
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const sp = await searchParams;
  const page = typeof sp.page === "string" ? parseInt(sp.page) : 0;

  const { data: dataQuizzes, error } = await verifySuccess(
    await getUserQuizzes(page),
  );
  const hasQuizzes = dataQuizzes && dataQuizzes.quizzes?.length > 0;
  const totalPages = dataQuizzes?.totalPages || 0;
  //adjust error message if there i no quizzes generated yet or page is out of range

  return (
    <section className="flex flex-col items-center justify-start h-screen w-full">
      <SectionTitle title="Generated Quizzes" position="center" />
      <ContentWrapper
        error={error}
        noData={!hasQuizzes}
        noDataMessage="No quizzes generated yet"
        className="flex flex-col items-center justify-start gap-4"
      >
        {hasQuizzes ? (
          <Suspense fallback={null}>
            <QuzziesTable quizzes={dataQuizzes?.quizzes} />
          </Suspense>
        ) : null}
        {totalPages >= DISPLAY_PAGINATION_FROM_PAGE ? (
          <Suspense fallback={null}>
            <Pagination totalPages={totalPages} page={page} />
          </Suspense>
        ) : null}
      </ContentWrapper>
    </section>
  );
}
