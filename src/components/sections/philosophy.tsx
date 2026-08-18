"use client";

const PHILOSOPHIES = [
  {
    number: "01",
    title: "Think",
    subtitle: "Understand the problem before writing code.",
    description:
      "Deep technical solutions begin with clarity of thought. I spend time framing constraints, discovering core user intent, and architecting systems that are clean by design.",
  },
  {
    number: "02",
    title: "Build",
    subtitle: "Create intelligent systems with purpose.",
    description:
      "Code is an expression of intentionality. From full-stack architectures to machine learning workflows, every component is built for stability, scale, and longevity.",
  },
  {
    number: "03",
    title: "Refine",
    subtitle: "Obsess over polish, performance, and usability.",
    description:
      "Great software feels effortless because every detail has been scrutinized. I refine micro-interactions, optimize latency, and eliminate friction until only pure utility remains.",
  },
  {
    number: "04",
    title: "Grow",
    subtitle: "Never stop learning and improving.",
    description:
      "Technology evolves rapidly, but foundational principles remain. I cultivate relentless curiosity, pushing boundaries in AI research, web engineering, and product design.",
  },
];

export default function Philosophy() {
  return (
    <section className="relative w-full bg-[#070709] py-28 text-white">
      <div className="mx-auto max-w-[1360px] px-8 lg:px-16">
        {/* Section Header */}
        <div className="mb-20 max-w-[520px]">
          <p className="text-[12px] uppercase tracking-[0.35em] text-white/40 font-mono mb-3">
            PRINCIPLES
          </p>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-white/90">
            Pages from an engineering notebook.
          </h2>
        </div>

        {/* Philosophy Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {PHILOSOPHIES.map((item) => (
            <div
              key={item.number}
              className="group relative flex flex-col justify-between border-t border-white/15 pt-8 transition-colors duration-500 hover:border-white/40"
            >
              {/* Top Meta: Number & Title */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-6">
                  <span>{item.number}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-white/20 transition-colors group-hover:bg-white/80" />
                </div>

                <h3 className="text-3xl lg:text-4xl font-light tracking-tight text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-sm font-medium text-white/80 mb-4 leading-snug">
                  {item.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs lg:text-sm font-light text-white/50 leading-relaxed mt-4">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
