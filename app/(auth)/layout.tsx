import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header hideAuthButtons />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
