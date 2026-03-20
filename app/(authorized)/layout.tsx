import RouteLoadingWrapper from "@/components/layout/RouteLoadingWrapper";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <RouteLoadingWrapper>
        <main className="flex-1">{children}</main>
      </RouteLoadingWrapper>
      <Footer />
    </>
  );
}
