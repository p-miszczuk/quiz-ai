import Link from "next/link";
import { Button } from "@/components/ui/shadcn/button";

export default function HeroSection() {
  return (
    <section className="py-20 text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
          Powered by AI
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Create quizzes in seconds
          <br />
          <span className="text-blue-600">with the power of AI</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Paste any text, topic or URL and QuizAI instantly generates smart
          questions to test your knowledge. Study smarter, not harder.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Button size="lg">
            <Link href="/register">Get started for free</Link>
          </Button>
          <Button size="lg" variant="outline">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
