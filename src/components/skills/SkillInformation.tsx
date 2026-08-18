"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Skill } from "@/data/skills";

interface SkillInformationProps {
  skill: Skill;
}

export function SkillInformation({ skill }: SkillInformationProps) {
  return (
    <div className="flex flex-col justify-center max-w-[460px]">
      {/* Eyebrow with Pulse Indicator */}
      <div className="flex items-center gap-2.5 mb-4">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E8A33D] shadow-[0_0_10px_rgba(232,163,61,0.8)] animate-pulse" />
        <p className="text-[11px] uppercase tracking-[0.35em] text-white/40 font-mono">
          TOOLKIT
        </p>
      </div>

      {/* Section Heading */}
      <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-light tracking-tight text-white leading-[1.08] mb-6 sm:mb-8">
        Foundation built <span className="text-white/40 italic font-serif font-normal">on</span>
      </h2>

      {/* Active Skill Detail — Fast GPU-Accelerated Swap */}
      <div className="border-t border-white/[0.08] pt-6 min-h-[110px] relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-4"
          >
            {/* Ambient Vertical Accent Bar */}
            <div className="w-[2px] h-14 bg-gradient-to-b from-[#E8A33D] via-[#E8A33D]/40 to-transparent rounded-full mt-1 shrink-0" />

            <div className="pb-1">
              {/* Category Tag */}
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#E8A33D]/80 font-mono mb-1.5">
                {skill.category}
              </p>

              {/* Skill Name */}
              <h3 className="text-3xl lg:text-[42px] font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-white/60 leading-tight pb-1">
                {skill.name}
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}