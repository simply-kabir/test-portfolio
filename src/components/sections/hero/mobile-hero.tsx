import { typography } from "@/lib/design";

export default function MobileHero() {
  return (
    <section id="hero" className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-bg px-6 py-24">
      <div
        className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8A33D]/[0.08] blur-[160px]"
      />

      <div className="relative z-10">
        <p className={typography.overline}>AI ENGINEER · FULL STACK DEVELOPER</p>

        <h1 className={`${typography.hero} mt-4 text-text-primary`}>
          I build AI products that solve{" "}
          <span className="font-serif italic font-normal text-text-secondary">
            real-world problems
          </span>
          .
        </h1>
      </div>

      <div className="relative z-10 mt-16">
        <p className="text-sm text-text-primary">Kabir</p>
        <p className="text-xs tracking-[0.2em] text-text-secondary">PORTFOLIO 2026</p>
      </div>
    </section>
  );
}