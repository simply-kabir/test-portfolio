"use client";

import { useRef } from "react";
import { useDollyProgress } from "@/hooks/use-dolly-progress";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useDollyProgress(sectionRef);

  return (
    <section ref={sectionRef} id="hero" className="relative w-full h-screen">
      <h1 style={{ color: "white", padding: "40px" }}>Progress: {progress}</h1>
    </section>
  );
}