import Link from "next/link";
import { Button } from "@/components/ui/shadcn/button";
import SectionTitle from "@/components/ui/section-title";

export default function CtaSection() {
  return (
    <section className="py-20 text-center">
      <div className="max-w-2xl mx-auto bg-blue-600 rounded-2xl px-8 py-14 shadow-lg">
        <SectionTitle
          title="Ready to supercharge your learning?"
          description="Join thousands of students already using QuizAI to study smarter. It's free to get started."
          titleColor="text-white"
          descriptionColor="text-blue-100"
        />
        <Button size="lg" variant="secondary">
          <Link href="/register">Create your first quiz →</Link>
        </Button>
      </div>
    </section>
  );
}
