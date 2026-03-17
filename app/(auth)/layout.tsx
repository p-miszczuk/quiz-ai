import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

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
