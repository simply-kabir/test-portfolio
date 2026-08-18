import { useMemo } from "react";
import { skills } from "@/data/skills";
import { baseAngleForIndex } from "@/lib/wheelMath";

export interface WheelIconGeometry {
  id: string;
  baseAngle: number;
}

export function useWheelGeometry(): WheelIconGeometry[] {
  return useMemo(
    () => skills.map((skill, index) => ({ id: skill.id, baseAngle: baseAngleForIndex(index, skills.length) })),
    []
  );
}