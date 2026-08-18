import { spacing } from "@/lib/design";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  id,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        spacing.section,
        className
      )}
    >
      {children}
    </section>
  );
}