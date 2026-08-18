"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProjectItem } from "./project-data";

interface ProjectIndicatorProps {
  project: ProjectItem;
}

export default function ProjectIndicator({ project }: ProjectIndicatorProps) {
  return (
    <div className="mx-auto w-full max-w-[800px] text-center px-6 mt-4 mb-2 min-h-[160px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center"
        >
          {/* Animated Project Counter Number & Category */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.3em] text-white/50 mb-2">
            <span>{project.number}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="uppercase text-white/40">{project.category}</span>
          </div>

          {/* Active Project Title & Subtitle */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white mb-2">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm font-medium text-white/70 mb-3 max-w-[600px] leading-snug">
            {project.subtitle}
          </p>

          <p className="text-xs lg:text-sm font-light text-white/50 max-w-[620px] leading-relaxed mb-4 hidden sm:block">
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[11px] font-mono text-white/60 bg-white/[0.04] border border-white/[0.08] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Explore Project Action Link */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-mono text-white/90 bg-white/[0.08] hover:bg-white/[0.18] border border-white/20 rounded-full transition-all duration-300 hover:scale-[1.03]"
          >
            <span>Explore Project</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
