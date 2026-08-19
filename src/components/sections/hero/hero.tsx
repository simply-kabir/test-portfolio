"use client";

import { useRef } from "react";
import { useDollyProgress } from "@/hooks/use-dolly-progress";
import HeroBackground from "@/components/sections/hero/herobackground";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useDollyProgress(sectionRef);

  return (
    <section ref={sectionRef} id="hero" className="relative w-full h-screen">
      <HeroBackground progress={progress} />
      <h1 style={{ color: "white", padding: "40px", position: "relative", zIndex: 10 }}>
        Progress: {progress}
      </h1>
    </section>
  );
}