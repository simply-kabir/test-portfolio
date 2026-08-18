"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ProjectItem } from "./project-data";

interface ProjectPosterProps {
  project: ProjectItem;
  isCenter: boolean;
  onClick: () => void;
}

export default function ProjectPoster({
  project,
  isCenter,
  onClick,
}: ProjectPosterProps) {
  return (
    <motion.div
      layout
      onClick={onClick}
      initial={false}
      animate={{
        scale: isCenter ? 1.04 : 0.86,
        opacity: isCenter ? 1 : 0.5,
        filter: isCenter
          ? "grayscale(0%) contrast(102%)"
          : "grayscale(100%) opacity(50%)",
        zIndex: isCenter ? 30 : 10,
      }}
      whileHover={
        isCenter
          ? {
              scale: 1.06,
              y: -5,
              transition: { duration: 0.2, ease: "easeOut" },
            }
          : { scale: 0.88, opacity: 0.7 }
      }
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 24,
      }}
      className={`group relative flex-shrink-0 cursor-pointer select-none rounded-2xl ${
        isCenter ? "shadow-[0_20px_50px_rgba(0,0,0,0.85)]" : "shadow-none"
      }`}
      style={{
        boxShadow: isCenter
          ? `0 18px 45px rgba(0, 0, 0, 0.9), 0 0 25px rgba(${project.ambientColor}, 0.15)`
          : "none",
      }}
    >
      {/* Sleeker Compact Poster Card Dimensions */}
      <div className="relative w-[200px] h-[275px] sm:w-[240px] sm:h-[330px] md:w-[280px] md:h-[385px] lg:w-[320px] lg:h-[440px] rounded-2xl overflow-hidden bg-[#0a0a0d] border border-white/10">
        
        {/* Official Local Project Poster Image */}
        <Image
          src={project.poster}
          alt={project.title}
          fill
          className="object-contain object-center p-2 rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.01]"
          sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 240px"
        />

        {/* Soft Reflection Overlay at Bottom */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent pointer-events-none z-10" />

        {/* Subtle Accent Rim Glow when Center */}
        {isCenter && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-700"
            style={{
              boxShadow: `inset 0 0 0 1px rgba(${project.ambientColor}, 0.3)`,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
