"use client";

import { useEffect } from "react";
import { getLenis } from "@/lib/lenis";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = getLenis();

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);

      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => cancelAnimationFrame(frame);
  }, []);

  return children;
}