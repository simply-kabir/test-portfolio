"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns 0→1 progress through the hero's own scrollable height, independent
 * of total page length. 0 = top of hero, 1 = dolly fully zoomed in.
 * Naturally reversible since it's just scrollY math, recomputed every scroll.
 */
export function useDollyProgress(sectionRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    function update() {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableDistance = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;

      const value =
        scrollableDistance <= 0
          ? 0
          : Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

      setProgress(value);
      rafId.current = null;
    }

    function onScroll() {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [sectionRef]);

  return progress;
}