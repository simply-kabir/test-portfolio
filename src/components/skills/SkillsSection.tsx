"use client";

import { useCallback, useState, useEffect } from "react";
import { skills } from "@/data/skills";
import { useScrollEntrance } from "@/hooks/useScrollEntrance";
import { SkillsWheel } from "./SkillsWheel";
import { SkillsBelt } from "./SkillsBelt";
import { SkillInformation } from "./SkillInformation";
import { SkillsTypography } from "./SkillsTypography";

const XL_BREAKPOINT = 1280;

export function SkillsSection() {
  const entrance = useScrollEntrance({ amount: 0.3 });
  const [activeSkillId, setActiveSkillId] = useState<string>(skills[0].id);
  const [isWideScreen, setIsWideScreen] = useState<boolean>(false);

  // Track viewport width to conditionally mount only one animation component
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${XL_BREAKPOINT}px)`);
    setIsWideScreen(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsWideScreen(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const handleActiveSkillChange = useCallback((id: string) => {
    setActiveSkillId(id);
  }, []);

  const activeSkill = skills.find((s) => s.id === activeSkillId) ?? skills[0];

  return (
    <section
      ref={entrance.ref}
      id="skills"
      className="relative flex h-auto xl:h-screen w-full flex-col xl:flex-row items-center justify-center overflow-hidden bg-[#08070A] py-10 sm:py-14 xl:py-0"
    >
      {/* Background Large Display Typography Layer */}
      <SkillsTypography />

      {/* Top & Bottom Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,#08070A_0%,transparent_12%,transparent_88%,#08070A_100%)] z-10" />

      {/* Subtle Ambient Glow Behind Wheel */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "10%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232, 163, 61, 0.04) 0%, rgba(184, 130, 58, 0.02) 40%, transparent 70%)",
        }}
      />

      {/* Info Panel — Full width on small/medium screens, 42% max-width on wide Desktop */}
      <div className="relative z-20 w-full xl:max-w-[42%] px-6 sm:px-12 md:pl-20 xl:pl-24 mb-6 sm:mb-8 xl:mb-0">
        <SkillInformation skill={activeSkill} />
      </div>

      {/* Only ONE animation component is mounted at a time — prevents dual callback conflicts */}
      {isWideScreen ? (
        <div className="relative h-full flex-1 overflow-hidden w-full">
          <SkillsWheel
            controls={entrance.controls}
            entranceComplete={entrance.entranceComplete}
            onEntranceComplete={entrance.onEntranceComplete}
            onActiveSkillChange={handleActiveSkillChange}
          />
        </div>
      ) : (
        <div className="relative z-20 w-full">
          <SkillsBelt
            onActiveSkillChange={handleActiveSkillChange}
          />
        </div>
      )}
    </section>
  );
}