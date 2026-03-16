import SectionTitle from "@/components/ui/section-title";
import { steps } from "@/app/(landing)/_components/const";

type Step = (typeof steps)[number];

export default function HowItWorksSection() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle
          title="How it works"
          description="From content to quiz in four simple steps."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {steps.map((s: Step) => (
            <div key={s.step} className="flex gap-5">
              <span className="text-4xl font-extrabold text-blue-100 leading-none select-none">
                {s.step}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
