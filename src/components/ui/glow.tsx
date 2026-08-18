import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Surface({
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-3xl",
        "border border-white/10",
        "bg-white/[0.03]",
        "backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}