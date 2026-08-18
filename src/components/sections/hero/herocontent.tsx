import { typography } from "@/lib/design";

export default function HeroContent() {
  return (
    <div className="flex max-w-[480px] flex-col gap-6 pl-2 sm:pl-0">
      <p className={typography.overline}>
        AI ENGINEER · FULL STACK DEVELOPER
      </p>

      <h1 className={`${typography.hero} text-text-primary`}>
        I build AI products that solve{" "}
        <span className="font-serif italic font-normal text-text-secondary">
          real-world problems
        </span>
        .
      </h1>
    </div>
  );
}