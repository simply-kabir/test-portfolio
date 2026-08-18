import { cn } from "@/lib/utils";

type Gap = "xs" | "sm" | "md" | "lg" | "xl";

interface StackProps {
  children: React.ReactNode;
  gap?: Gap;
  className?: string;
}

const gaps: Record<Gap, string> = {
  xs: "gap-2",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-10",
  xl: "gap-16",
};

export default function Stack({
  children,
  gap = "md",
  className,
}: StackProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        gaps[gap],
        className
      )}
    >
      {children}
    </div>
  );
}