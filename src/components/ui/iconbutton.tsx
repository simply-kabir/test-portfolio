import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  animation,
  colors,
  radius,
} from "@/lib/design";

interface Props {
  href: string;
  icon: LucideIcon;
  className?: string;
}

export default function IconButton({
  href,
  icon: Icon,
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "flex h-11 w-11 items-center justify-center",

        radius.full,

        colors.surface.glass,

        "border",

        colors.border.subtle,

        "transition-all",

        animation.normal,

        "hover:-translate-y-0.5",

        "hover:border-violet-500/40",

        "hover:bg-violet-500/10",

        className
      )}
    >
      <Icon size={18} />
    </Link>
  );
}