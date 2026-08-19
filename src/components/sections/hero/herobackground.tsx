"use client";

import { useIsMobile } from "@/hooks/use-is-mobile";
import HeroBackgroundDesktop from "./herobackground-desktop";

export default function HeroBackground({ progress = 0 }: { progress?: number }) {
  const isMobile = useIsMobile();

  if (isMobile === null) return null;

  if (isMobile) {
    return <div className="absolute inset-0 -z-10 bg-bg" />;
  }

  return <HeroBackgroundDesktop progress={progress} />;
}