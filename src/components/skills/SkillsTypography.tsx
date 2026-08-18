"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Massive decorative "SKILLS" typography layer.
 * Sits behind the rotating arc, above the page background.
 * Purely environmental — no pointer events, no selection.
 */
export function SkillsTypography() {
  const ref = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  // Subtle parallax: 5-10px vertical shift based on scroll position within the section
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number | null = null;

    function update() {
      if (!el) return;
      const section = el.closest("section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section top hits viewport bottom, 1 when section bottom hits viewport top
      const progress = Math.min(
        Math.max(-rect.top / (rect.height - vh), 0),
        1
      );
      // Map to -5px → +5px range
      setOffsetY((progress - 0.5) * 10);
      rafId = null;
    }

    function onScroll() {
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 1 }}
    >
      <span
        className="whitespace-nowrap font-semibold uppercase text-white/[0.04]"
        style={{
          fontFamily: '"PP Neue Corp Condensed", "PP Neue Corp", "Impact", "Arial Black", sans-serif',
          fontSize: "clamp(13rem, 48vw, 40rem)",
          letterSpacing: "-0.04em",
          lineHeight: 0.85,
          transform: `translate3d(0, ${offsetY}px, 0)`,
          willChange: "transform",
        }}
      >
        SKILLS
      </span>
    </div>
  );
}
