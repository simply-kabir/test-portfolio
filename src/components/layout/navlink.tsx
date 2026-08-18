"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
  active: boolean;
};

export default function NavLink({
  href,
  label,
  active,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "transition-all duration-300 whitespace-nowrap",
        "text-xs sm:text-sm",
        active
          ? "text-text-primary font-medium"
          : "text-text-secondary hover:text-text-primary"
      )}
    >
      {label}
    </Link>
  );
}