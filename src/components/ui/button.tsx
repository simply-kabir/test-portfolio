import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  animation,
  colors,
  radius,
} from "@/lib/design";
import type { ReactNode } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "ghost";

type Size =
  | "sm"
  | "md"
  | "lg";

interface ButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  target?: "_blank" | "_self";
  rel?: string;
}

const variants = {
  primary: cn(
    colors.surface.glass,
    "border",
    colors.border.subtle,
    "hover:bg-violet-500/10",
    "hover:border-violet-500/40"
  ),

  secondary: cn(
    "bg-transparent",
    "border",
    colors.border.subtle,
    "hover:bg-white/[0.03]"
  ),

  ghost: cn(
    "bg-transparent",
    "hover:bg-white/[0.03]"
  ),
};

const sizes = {
  sm: "h-10 px-4 text-sm",

  md: "h-11 px-6 text-sm",

  lg: "h-12 px-8 text-base",
};

export default function Button({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
  target,
  rel,
}: ButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "inline-flex items-center justify-center",

        radius.full,

        "font-medium",

        "transition-all",

        animation.normal,

        "hover:-translate-y-0.5",

        variants[variant],

        sizes[size],

        className
      )}
    >
      {children}
    </Link>
  );
}