"use client";

import { useIsMobile } from "@/hooks/use-is-mobile";
import HeroBackgroundDesktop from "./herobackground-desktop";

export default function HeroBackground({ progress = 0 }: { progress?: number }) {
  const isMobile = useIsMobile();

  if (isMobile === null) return null;

  if (isMobile) {
    return (
      <div
        className="absolute inset-0 -z-10 overflow-hidden bg-bg"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 600px 500px at 50% 35%, rgba(232, 163, 61, 0.07), transparent 70%),
            radial-gradient(ellipse 500px 400px at 20% 15%, rgba(20, 26, 50, 0.25), transparent 70%),
            radial-gradient(ellipse 450px 400px at 80% 20%, rgba(26, 18, 48, 0.22), transparent 70%)
          `,
        }}
      >
        {/* Bottom fade into page bg, matches desktop version */}
        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-bg to-transparent" />
      </div>
    );
  }

  return <HeroBackgroundDesktop progress={progress} />;
}