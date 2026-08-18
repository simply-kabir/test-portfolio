"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { CONNECT_CONFIG } from "@/lib/connectConfig";
import type { SocialLink } from "@/types/portfolio";

interface ConnectLinkProps {
  link: SocialLink;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function smoothstep(t: number) {
  const c = Math.min(Math.max(t, 0), 1);
  return c * c * (3 - 2 * c);
}

export function ConnectLink({ link, index, total, progress }: ConnectLinkProps) {
  const { activationWindow, activeColor, dimColor } = CONNECT_CONFIG;

  const continuousIndex = useTransform(progress, (p) => p * (total - 1));
  const distance = useTransform(continuousIndex, (ci) => Math.abs(ci - index));

  const eased = useTransform(distance, (d) => smoothstep(Math.min(d / activationWindow, 1)));
  const color = useTransform(eased, [0, 1], [activeColor, dimColor]);
  const scale = useTransform(eased, [0, 1], [1.08, 1]);
  const dotOpacity = useTransform(eased, [0, 1], [1, 0.35]);

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex shrink-0 items-center gap-3"
    >
      <motion.span
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-current"
        style={{ opacity: dotOpacity, color: dimColor }}
      />
      <motion.span
        className="whitespace-nowrap font-mono text-[clamp(0.75rem,1.1vw,0.95rem)] uppercase tracking-wider"
        style={{ color, scale }}
      >
        {link.name}
      </motion.span>
    </a>
  );
}