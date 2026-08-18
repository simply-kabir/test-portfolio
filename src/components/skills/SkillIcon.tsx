"use client";

import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";
import type { Skill } from "@/data/skills";
import { WHEEL_CONFIG } from "@/lib/wheelConfig";
import { normalizeAngle, falloff } from "@/lib/wheelMath";

interface SkillIconProps {
  skill: Skill;
  baseAngle: number;
  rotationOffset: MotionValue<number>;
  radiusX: number;
  radiusY: number;
}

const DEG_TO_RAD = Math.PI / 180;

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export function SkillIcon({ skill, baseAngle, rotationOffset, radiusX, radiusY }: SkillIconProps) {
  // The only thing that changes frame to frame — everything else derives from it.
  const angle = useTransform(rotationOffset, (offset) => normalizeAngle(baseAngle + offset));

  // Elliptical positioning: separate radii for x and y axes
  const x = useTransform(angle, (a) => radiusX * Math.cos(a * DEG_TO_RAD));
  const y = useTransform(angle, (a) => radiusY * Math.sin(a * DEG_TO_RAD));

  // 0 = dead center of the visible arc, 1 = at/past its edge.
  const eased = useTransform(angle, (a) => smoothstep(falloff(a, WHEEL_CONFIG.visibleHalfArcDeg)));

  const opacity = useTransform(eased, [0, 1], [1, 0]);
  const scale = useTransform(eased, [0, 1], [1, 0.55]);
  const brightness = useTransform(eased, [0, 1], [1.15, 0.55]);
  const elevation = useTransform(eased, [0, 1], [10, 0]); // px, feeds the depth shadow

  // Sharply peaked so only the true active icon gets it — restrained, not a gradient of glow.
  const glow = useTransform(eased, [0, 0.12, 1], [0.5, 0, 0]);

  const filter = useTransform(
    [brightness, elevation],
    ([b, e]: number[]) => `brightness(${b}) drop-shadow(0 ${e}px ${e * 1.6}px rgba(0,0,0,0.35))`
  );

  const boxShadow = useTransform(glow, (g) =>
    g > 0.01 ? `0 0 ${20 * g}px rgba(255,255,255,${g})` : "none"
  );

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
      <motion.div className="will-change-transform" style={{ x, y, scale, opacity, filter }}>
        <a
          href={skill.docUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open ${skill.name} Official Documentation`}
          aria-label={`Open ${skill.name} Official Documentation`}
          className="block group cursor-pointer"
        >
          <motion.div
            className="relative h-20 w-20 rounded-xl md:h-28 md:w-28 transition-transform duration-300 group-hover:scale-110"
            style={{ boxShadow }}
          >
            <Image src={skill.icon} alt={skill.name} fill sizes="112px" className="object-contain" />
          </motion.div>
        </a>
      </motion.div>
    </div>
  );
}