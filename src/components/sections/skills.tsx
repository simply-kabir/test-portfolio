"use client";

import dynamic from "next/dynamic";

const SkillsSection = dynamic(
  () => import("@/components/skills/SkillsSection").then((mod) => mod.SkillsSection),
  { ssr: false }
);

export default function Skills() {
  return <SkillsSection />;
}