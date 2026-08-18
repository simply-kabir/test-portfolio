"use client";

import { useEffect, useRef, memo } from "react";
import Image from "next/image";
import { skills } from "@/data/skills";

interface SkillsBeltProps {
  onActiveSkillChange: (skillId: string) => void;
}

/**
 * Horizontal auto-scrolling skill belt for mobile / narrow viewports.
 *
 * All visual highlighting is driven by direct DOM manipulation inside the
 * rAF loop — React never re-renders this component during normal scrolling,
 * which eliminates the micro-stutter caused by reconciliation pauses.
 */
export const SkillsBelt = memo(function SkillsBelt({ onActiveSkillChange }: SkillsBeltProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastActiveIdRef = useRef<string | null>(null);
  const onChangeRef = useRef(onActiveSkillChange);

  // Keep callback ref fresh without re-mounting the effect
  useEffect(() => {
    onChangeRef.current = onActiveSkillChange;
  }, [onActiveSkillChange]);

  // Single rAF loop: scrolls, detects active icon, and highlights — all without React renders
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let scrollPos = container.scrollLeft;
    const speed = 0.5;
    const ICON_SIZE = 64;
    const GAP = 24;
    const ITEM_WIDTH = ICON_SIZE + GAP; // 88px
    const HALF_ICON = ICON_SIZE / 2;    // 32px — offset to item center
    const halfContainer = container.clientWidth / 2;
    const totalWidth = skills.length * ITEM_WIDTH;

    const step = () => {
      scrollPos += speed;

      // Seamless loop reset
      if (scrollPos >= totalWidth) {
        scrollPos -= totalWidth;
      }

      container.scrollLeft = scrollPos;

      // Determine which skill is centered — offset by half icon to align with item midpoint
      const centerPos = scrollPos + halfContainer - HALF_ICON;
      const activeIdx = Math.round(centerPos / ITEM_WIDTH) % skills.length;
      const targetId = skills[activeIdx]?.id ?? null;

      if (targetId && targetId !== lastActiveIdRef.current) {
        lastActiveIdRef.current = targetId;

        // Direct DOM class swap — no React setState, no reconciliation
        const nodes = container.querySelectorAll<HTMLElement>("[data-skill-belt]");
        nodes.forEach((node) => {
          const id = node.getAttribute("data-skill-belt");
          const isActive = id === targetId;

          // Scale + opacity via CSS classes (GPU-composited)
          node.style.transform = isActive ? "scale(1.12)" : "scale(0.88)";
          node.style.opacity = isActive ? "1" : "0.4";

          // Inner anchor styling
          const anchor = node.firstElementChild as HTMLElement | null;
          if (anchor) {
            if (isActive) {
              anchor.style.backgroundColor = "rgba(255,255,255,0.08)";
              anchor.style.borderColor = "rgba(255,255,255,0.2)";
              anchor.style.boxShadow = "0 0 20px rgba(232,163,61,0.25)";
            } else {
              anchor.style.backgroundColor = "rgba(255,255,255,0.02)";
              anchor.style.borderColor = "rgba(255,255,255,0.05)";
              anchor.style.boxShadow = "none";
            }
          }
        });

        // Notify parent for text panel update (non-blocking)
        onChangeRef.current(targetId);
      }

      animId = requestAnimationFrame(step);
    };

    // Initial highlight pass
    const initialIdx = Math.round((scrollPos + halfContainer - HALF_ICON) / ITEM_WIDTH) % skills.length;
    lastActiveIdRef.current = skills[initialIdx]?.id ?? null;

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []); // Empty deps — never re-mounts

  // Duplicate for seamless infinite loop
  const doubleSkills = [...skills, ...skills];

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Edge Gradient Mask */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#08070A] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#08070A] to-transparent" />

      {/* Horizontal Scroll Track */}
      <div
        ref={containerRef}
        className="flex items-center gap-6 overflow-x-hidden no-scrollbar py-2"
        style={{ scrollBehavior: "auto" }}
      >
        {doubleSkills.map((skill, idx) => (
          <div
            key={`${skill.id}-${idx}`}
            data-skill-belt={skill.id}
            className="shrink-0 will-change-transform"
            style={{
              transform: "scale(0.88)",
              opacity: 0.4,
              transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
            }}
          >
            <a
              href={skill.docUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`${skill.name} Docs`}
              aria-label={`Open ${skill.name} Official Documentation`}
              className="relative block h-16 w-16 rounded-xl p-2.5 border"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.05)",
                boxShadow: "none",
                transition: "background-color 0.2s, border-color 0.2s, box-shadow 0.2s",
              }}
            >
              <Image
                src={skill.icon}
                alt={skill.name}
                fill
                sizes="64px"
                className="object-contain p-2"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
});
