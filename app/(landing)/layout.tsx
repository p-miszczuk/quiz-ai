import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function LandingLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {modal}
    </>
  );
}
