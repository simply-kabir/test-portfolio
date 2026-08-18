"use client";

import { useEffect, useRef, memo } from "react";
import { motion, useAnimation } from "framer-motion";
import { skills } from "@/data/skills";
import { useWheelGeometry } from "@/hooks/useWheelGeometry";
import { useWheelRotation } from "@/hooks/useWheelRotation";
import { nearestIndexToVisibleCenter } from "@/lib/wheelMath";
import { WHEEL_CONFIG } from "@/lib/wheelConfig";
import { SkillIcon } from "./SkillIcon";

interface SkillsWheelProps {
  controls: ReturnType<typeof useAnimation>;
  entranceComplete: boolean;
  onEntranceComplete: () => void;
  onActiveSkillChange: (skillId: string) => void;
}

const entranceVariants = {
  hidden: { opacity: 0, scale: 0.55, x: 220, rotate: -14 },
  locked: {
    opacity: 1,
    scale: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: WHEEL_CONFIG.entranceDurationSec,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const SkillsWheel = memo(function SkillsWheel({
  controls,
  entranceComplete,
  onEntranceComplete,
  onActiveSkillChange,
}: SkillsWheelProps) {
  const geometry = useWheelGeometry();
  const rotationOffset = useWheelRotation(entranceComplete, WHEEL_CONFIG.revolutionDurationSec);
  const lastIndexRef = useRef<number | null>(null);

  // Set the initial active skill immediately on mount (rotationOffset starts at 0).
  useEffect(() => {
    const idx = nearestIndexToVisibleCenter(0, skills.length);
    lastIndexRef.current = idx;
    onActiveSkillChange(skills[idx].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only pushes a state update when the active skill actually flips — not every frame.
  useEffect(() => {
    const unsubscribe = rotationOffset.on("change", (value) => {
      const idx = nearestIndexToVisibleCenter(value, skills.length);
      if (idx !== lastIndexRef.current) {
        lastIndexRef.current = idx;
        onActiveSkillChange(skills[idx].id);
      }
    });
    return unsubscribe;
  }, [rotationOffset, onActiveSkillChange]);

  return (
    <div
      className="pointer-events-none relative h-full w-full"
      style={{
        WebkitMaskImage:
          "radial-gradient(circle at 30% 50%, black 0%, black 45%, rgba(0,0,0,0.35) 68%, transparent 88%)",
        maskImage:
          "radial-gradient(circle at 30% 50%, black 0%, black 45%, rgba(0,0,0,0.35) 68%, transparent 88%)",
      }}
    >
      <motion.div
        initial="hidden"
        animate={controls}
        variants={entranceVariants}
        onAnimationComplete={(definition) => {
          if (definition === "locked") onEntranceComplete();
        }}
        className="absolute top-1/2 -translate-y-1/2"
        style={{
          width: WHEEL_CONFIG.containerSize,
          height: WHEEL_CONFIG.containerSize,
          right: `-${WHEEL_CONFIG.containerSize * (WHEEL_CONFIG.rightOffsetPercent / 100)}px`,
        }}
      >
        <div className="relative h-full w-full">
          {geometry.map((g) => {
            const skill = skills.find((s) => s.id === g.id)!;
            return (
              <SkillIcon
                key={g.id}
                skill={skill}
                baseAngle={g.baseAngle}
                rotationOffset={rotationOffset}
                radiusX={WHEEL_CONFIG.radiusX}
                radiusY={WHEEL_CONFIG.radiusY}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
});