import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
