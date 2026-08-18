import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto",
        "w-full",
        "max-w-7xl",
        "px-6",
        "lg:px-8",
        "xl:px-12",
        className
      )}
    >
      {children}
    </div>
  );
}