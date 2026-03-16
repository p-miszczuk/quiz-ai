import SectionTitle from "@/components/ui/section-title";
import { features } from "@/app/(landing)/_components/const";

type Feature = (typeof features)[number];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50 rounded-2xl">
      <div className="max-w-5xl mx-auto px-4">
        <SectionTitle
          title="Everything you need to learn faster"
          description="No complicated setup. Just paste, generate, and test yourself."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f: Feature) => (
            <div
              key={f.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">
                <f.icon />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
