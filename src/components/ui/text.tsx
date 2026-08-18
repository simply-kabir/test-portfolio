import { typography } from "@/lib/design";
import { cn } from "@/lib/utils";

type Variant =
  | "hero"
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "bodyLarge"
  | "small"
  | "muted"
  | "overline";

interface TextProps {
  as?: React.ElementType;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const variants = {
  hero: typography.hero,
  h1: typography.h1,
  h2: typography.h2,
  h3: typography.h3,
  body: typography.body,
  bodyLarge: typography.bodyLarge,
  small: typography.small,
  muted: typography.small,
  overline: typography.overline,
};

export default function Text({
  as: Component = "p",
  variant = "body",
  className,
  children,
}: TextProps) {
  const Tag = Component as any;
  return (
    <Tag
      className={cn(
        variants[variant],
        className
      )}
    >
      {children}
    </Tag>
  );
}