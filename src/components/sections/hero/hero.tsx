"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import HeroBackground from "@/components/sections/hero/herobackground";
import About from "@/components/sections/about";
import ScreenOverlay from "@/components/ui/screen-overlay";
import { useDollyProgress } from "@/hooks/use-dolly-progress";
import { useIs3DCapable } from "@/hooks/use-is-3d-capable";

const SceneCanvas = dynamic(() => import("@/components/three/scenecanvas"), {
  ssr: false,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useDollyProgress(sectionRef);
  const { is3DCapable, isEvaluated } = useIs3DCapable();

  // Cross-fade opacity lerps smoothly between 0.55 and 0.75
  const aboutOpacity = Math.min(Math.max((progress - 0.55) / 0.20, 0), 1);
  if (!isEvaluated) return null;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-[165vh] lg:h-[165vh]"
    >
      {/* Anchor for nav's "About" link */}
      <div id="about" className="absolute left-0 w-full" style={{ top: "65vh" }} />

      {/* Viewport-Pinned Container on Desktop, Fluid Auto-Expanding on Mobile */}
      <div className="sticky top-0 min-h-[100dvh] lg:h-screen w-full overflow-visible lg:overflow-hidden">
        {/* 3D Scene Background & Workstation Canvas */}
        <HeroBackground progress={progress} />

        {is3DCapable && (
          <div className="absolute inset-0 z-0 pointer-events-none lg:pointer-events-auto hidden lg:block">
            <SceneCanvas progress={progress} />
          </div>
        )}

        {/* About Section Layer — Unconstrained Fluid Height on Mobile, Absolute Pinned Overlay on Desktop */}
        <div
          className="relative lg:absolute lg:inset-0 z-20 w-full h-auto lg:h-full overflow-visible lg:overflow-hidden transition-opacity duration-150 ease-out"
          style={{
            opacity: aboutOpacity,
            pointerEvents: aboutOpacity > 0.5 ? "auto" : "none",
          }}
        >
          <About progress={progress} />
        </div>

        <ScreenOverlay progress={progress} />
      </div>
    </section>
  );
}