import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full",
        "border border-white/10",
        "bg-white/5",
        "px-3 py-1",
        "text-xs uppercase tracking-widest text-zinc-300",
        className
      )}
    >
      {children}
    </span>
  );
}