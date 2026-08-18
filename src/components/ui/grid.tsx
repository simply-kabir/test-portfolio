import { cn } from "@/lib/utils";

type Layout = "equal" | "hero" | "sidebar" | "thirds";

interface GridProps {
  children: React.ReactNode;
  layout?: Layout;
  className?: string;
}

const layouts: Record<Layout, string> = {
  equal: "grid-cols-1 lg:grid-cols-2",

  hero: "grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]",

  sidebar: "grid-cols-1 lg:grid-cols-[300px_1fr]",

  thirds: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
};

export default function Grid({
  children,
  layout = "equal",
  className,
}: GridProps) {
  return (
    <div
      className={cn(
        "grid items-center gap-16",
        layouts[layout],
        className
      )}
    >
      {children}
    </div>
  );
}