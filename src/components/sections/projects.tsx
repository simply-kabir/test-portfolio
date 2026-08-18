"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PROJECTS_DATA, ProjectItem } from "@/components/projects/project-data";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const [displayedDescription, setDisplayedDescription] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Mouse-following landing page thumbnail preview tooltip state
  const [hoveringTitle, setHoveringTitle] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Window dimensions state for hydration-safe layout math
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentProject: ProjectItem = PROJECTS_DATA[currentIndex];
  const total = PROJECTS_DATA.length;

  const typeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const backspaceIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = () => {
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    if (backspaceIntervalRef.current) clearInterval(backspaceIntervalRef.current);
  };

  // Run Typewriter Effect for a given project
  const startTypewriter = useCallback((targetProject: ProjectItem) => {
    clearAllTimers();
    setIsTyping(true);

    let stage = 0; // 0: Title, 1: Subtitle, 2: Description
    let charIdx = 0;

    typeIntervalRef.current = setInterval(() => {
      if (stage === 0) {
        if (charIdx <= targetProject.title.length) {
          setDisplayedTitle(targetProject.title.slice(0, charIdx));
          charIdx++;
        } else {
          stage = 1;
          charIdx = 0;
        }
      } else if (stage === 1) {
        if (charIdx <= targetProject.subtitle.length) {
          setDisplayedSubtitle(targetProject.subtitle.slice(0, charIdx));
          charIdx++;
        } else {
          stage = 2;
          charIdx = 0;
        }
      } else if (stage === 2) {
        if (charIdx <= targetProject.description.length) {
          setDisplayedDescription(targetProject.description.slice(0, charIdx));
          charIdx++;
        } else {
          clearInterval(typeIntervalRef.current!);
          setIsTyping(false);
          setIsTransitioning(false);
        }
      }
    }, 18);
  }, []);

  // Initial Typewriter for Project 1 on Mount
  useEffect(() => {
    startTypewriter(PROJECTS_DATA[0]);
    return () => clearAllTimers();
  }, [startTypewriter]);

  // Handle Project Switch with Backspace -> Poster Slide -> Typewriter Sequence
  const handleProjectSwitch = (newIndex: number) => {
    if (isTransitioning || newIndex === currentIndex) return;
    setIsTransitioning(true);
    setHoveringTitle(false);
    clearAllTimers();

    let title = displayedTitle;
    let subtitle = displayedSubtitle;
    let description = displayedDescription;

    backspaceIntervalRef.current = setInterval(() => {
      let active = false;

      if (description.length > 0) {
        description = description.slice(0, Math.max(0, description.length - 12));
        setDisplayedDescription(description);
        active = true;
      } else if (subtitle.length > 0) {
        subtitle = subtitle.slice(0, Math.max(0, subtitle.length - 8));
        setDisplayedSubtitle(subtitle);
        active = true;
      } else if (title.length > 0) {
        title = title.slice(0, Math.max(0, title.length - 5));
        setDisplayedTitle(title);
        active = true;
      }

      if (!active) {
        clearInterval(backspaceIntervalRef.current!);
        setCurrentIndex(newIndex);
        startTypewriter(PROJECTS_DATA[newIndex]);
      }
    }, 12);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % total;
    handleProjectSwitch(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + total) % total;
    handleProjectSwitch(prevIdx);
  };

  return (
    <section
      id="projects"
      className="relative flex flex-col justify-between w-full min-h-fit lg:min-h-screen bg-[#060608] py-10 sm:py-14 lg:py-16 overflow-hidden text-white transition-colors duration-1000 select-none"
    >
      {/* Dynamic Ambient Theme Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at 35% 50%, rgba(${currentProject.ambientColor}, 0.14) 0%, rgba(10, 8, 12, 0.04) 55%, transparent 80%)`,
        }}
      />

      {/* Top & Bottom Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,#060608_0%,transparent_12%,transparent_90%,#060608_100%)] z-10" />

      {/* Floating Mouse-Following Landing Page Preview Tooltip Window */}
      <AnimatePresence>
        {hoveringTitle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              left: Math.min(mousePos.x + 20, windowWidth > 0 ? windowWidth - 260 : 300),
              top: Math.max(mousePos.y - 150, 20),
            }}
            className="fixed z-50 pointer-events-none w-52 h-32 sm:w-64 sm:h-40 rounded-xl overflow-hidden bg-[#0e0e12]/95 backdrop-blur-md border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col p-1.5"
          >
            {/* Top Bezel Header with Site Title & Live Dot */}
            <div className="flex items-center justify-between px-2 py-1 bg-white/[0.04] rounded-t-lg mb-1">
              <span className="text-[10px] font-mono text-white/70 truncate max-w-[150px]">
                {currentProject.title}
              </span>
              <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>

            {/* Live Deployed Landing Page Screenshot Thumbnail */}
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#060608]">
              <Image
                src={currentProject.previewThumbnail}
                alt={`${currentProject.title} Deployed Landing Page Preview`}
                fill
                sizes="(min-width: 1024px) 400px, 300px"
                className="w-full h-full object-cover object-top filter contrast-[1.04]"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1px rgba(${currentProject.ambientColor}, 0.35)`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header with Navigation Controls */}
      <div className="relative z-20 mx-auto w-full max-w-[1280px] px-6 sm:px-10 flex items-end justify-between pt-2 mb-6 sm:mb-8">
        <div className="flex flex-col text-left">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/40 font-mono mb-2">
            PROJECTS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white">
            Products I've Built
          </h2>
        </div>

        {/* Navigation Control Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={isTransitioning}
            aria-label="Previous project"
            className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/[0.06] hover:bg-white/[0.16] border border-white/15 text-white/70 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={isTransitioning}
            aria-label="Next project"
            className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/[0.06] hover:bg-white/[0.16] border border-white/15 text-white/70 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main 50/50 Split-Screen Showcase Layout */}
      <div className="relative z-20 mx-auto w-full max-w-[1280px] px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 my-auto">
        
        {/* LEFT HALF — Raw Floating PNG Poster */}
        <div className="relative flex items-center justify-center lg:justify-end w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, x: -70, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 70, scale: 0.95 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] aspect-[400/560] cursor-pointer"
              onClick={() =>
                window.open(currentProject.link, "_blank", "noopener,noreferrer")
              }
            >
              {/* Optimized Project Poster Image */}
              <Image
                src={currentProject.poster}
                alt={currentProject.title}
                fill
                className="object-contain object-center filter contrast-[1.03] drop-shadow-[0_24px_40px_rgba(0,0,0,0.85)]"
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 400px, 340px"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT HALF — Terminal-Style Typewriter & Backspace Info Block */}
        <div className="flex flex-col justify-center text-left py-2 min-h-[380px]">
          {/* Project Number Counter & Category */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.3em] text-white/50 mb-4">
            <span>{currentProject.number}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="uppercase text-white/40">{currentProject.category}</span>
          </div>

          {/* Clickable Deployed Title Heading with Deployed Site Landing Page Thumbnail Tooltip */}
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-3 min-h-[1.2em]">
            <a
              href={currentProject.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveringTitle(true)}
              onMouseLeave={() => setHoveringTitle(false)}
              onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
              className="inline-flex items-center gap-2.5 hover:text-white/80 transition-colors group cursor-pointer"
              title={`Visit ${currentProject.title}`}
            >
              <span>{displayedTitle}</span>
              {displayedTitle.length === currentProject.title.length && (
                <span className="text-white/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-2xl lg:text-3xl font-mono leading-none">
                  ↗
                </span>
              )}
            </a>
            {isTyping && displayedTitle.length < currentProject.title.length && (
              <span className="inline-block w-2 sm:w-2.5 h-7 sm:h-9 bg-white/80 ml-1 translate-y-1 animate-pulse" />
            )}
          </h3>

          {/* Typewriter Subtitle */}
          <p className="text-sm sm:text-base font-medium text-white/70 mb-4 max-w-[540px] leading-snug min-h-[1.4em]">
            {displayedSubtitle}
            {isTyping &&
              displayedTitle.length >= currentProject.title.length &&
              displayedSubtitle.length < currentProject.subtitle.length && (
                <span className="inline-block w-1.5 h-4 bg-white/70 ml-1 translate-y-0.5 animate-pulse" />
              )}
          </p>

          {/* Typewriter Description */}
          <p className="text-sm lg:text-base font-light text-white/60 max-w-[560px] leading-relaxed mb-6 min-h-[4.5em]">
            {displayedDescription}
            {isTyping &&
              displayedSubtitle.length >= currentProject.subtitle.length && (
                <span className="inline-block w-1.5 h-4 bg-white/70 ml-1 translate-y-0.5 animate-pulse" />
              )}
            {!isTyping && (
              <span className="inline-block w-1.5 h-4 bg-white/50 ml-1 translate-y-0.5 animate-pulse" />
            )}
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {currentProject.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono text-white/70 bg-white/[0.05] border border-white/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Link */}
          <div>
            <a
              href={currentProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-mono text-white/90 bg-white/[0.08] hover:bg-white/[0.18] border border-white/20 rounded-full transition-all duration-300 hover:scale-[1.03]"
            >
              <span>Explore Project</span>
              <svg
                className="w-4 h-4"
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
          </div>

        </div>

      </div>

      {/* Dynamic Project Index Selector Bar */}
      <div className="relative z-20 mx-auto w-full max-w-[1280px] px-6 sm:px-10 flex items-center justify-center gap-3 pt-6 pb-2">
        {PROJECTS_DATA.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => handleProjectSwitch(idx)}
            disabled={isTransitioning}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to project ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}