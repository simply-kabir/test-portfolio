"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { FoundationItem } from "@/data/foundation";

interface Props {
  item: FoundationItem;
  isFirst: boolean;
  isLast: boolean;
}

export function FoundationStep({ item, isFirst, isLast }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // ── Opacity ──────────────────────────────────────────────────
  const opacity = useTransform(
    scrollYProgress,
    isLast
      ? [0, 0.12, 0.25, 1.0]
      : [0, 0.12, 0.25, 0.52, 0.68],
    isLast
      ? [0, 0, 1, 1]
      : [0, 0, 1, 1, 0]
  );

  // ── Blur ─────────────────────────────────────────────────────
  const blur = useTransform(
    scrollYProgress,
    isLast
      ? [0, 0.12, 0.25, 1.0]
      : [0, 0.12, 0.25, 0.52, 0.68],
    isLast
      ? ["blur(5px)", "blur(5px)", "blur(0px)", "blur(0px)"]
      : ["blur(5px)", "blur(5px)", "blur(0px)", "blur(0px)", "blur(5px)"]
  );

  // ── Subtle Y entrance ───────────────────────────────────────
  const y = useTransform(scrollYProgress, [0.08, 0.25], [30, 0]);

  // ── Node dot activation ─────────────────────────────────────
  const dotBg = useTransform(
    scrollYProgress,
    isLast
      ? [0, 0.15, 0.28, 1.0]
      : [0, 0.15, 0.28, 0.5, 0.66],
    isLast
      ? ["rgba(232,163,61,0)", "rgba(232,163,61,0)", "#E8A33D", "#E8A33D"]
      : ["rgba(232,163,61,0)", "rgba(232,163,61,0)", "#E8A33D", "#E8A33D", "rgba(232,163,61,0)"]
  );

  const dotGlow = useTransform(scrollYProgress, (p) => {
    const active = isLast ? p > 0.25 : p > 0.25 && p < 0.6;
    return active
      ? "0 0 12px rgba(232,163,61,0.7)"
      : "none";
  });

  const dotScale = useTransform(
    scrollYProgress,
    isLast
      ? [0, 0.2, 0.28, 1.0]
      : [0, 0.2, 0.28, 0.5, 0.66],
    isLast
      ? [1, 1, 1.3, 1.3]
      : [1, 1, 1.3, 1.3, 1]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, filter: blur }}
      className={`relative pl-10 sm:pl-12 flex flex-col justify-start pt-2 ${
        isFirst
          ? "min-h-[25vh] md:min-h-[45vh] pb-8 md:pb-0"
          : isLast
            ? "min-h-[25vh] md:min-h-[30vh] pb-4"
            : "min-h-[30vh] md:min-h-[60vh] pb-10 md:pb-12"
      }`}
    >
      {/* ── Node dot (centered on the vertical line track) ── */}
      <motion.div
        className="absolute left-[-5px] top-6 h-[11px] w-[11px] rounded-full border border-white/30 z-10"
        style={{
          backgroundColor: dotBg,
          boxShadow: dotGlow,
          scale: dotScale,
        }}
      />

      {/* Eyebrow: number & period */}
      <p className="font-mono text-xs sm:text-sm text-[#9A958C] mb-3 tracking-wider">
        {item.number}
        <span className="text-white/20 mx-1.5">•</span>
        {item.period}
      </p>

      {/* Title */}
      <h3 className="text-2xl sm:text-3xl lg:text-[42px] font-medium text-[#F1EDE6] tracking-tight leading-tight mb-2">
        {item.title}
      </h3>

      {/* Specialization */}
      <p className="text-sm sm:text-base lg:text-lg text-[#E8A33D] font-mono mb-2">
        {item.subtitle}
      </p>

      {/* Institution */}
      <p className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-[#9A958C] uppercase mb-1">
        {item.institution}
      </p>

      {/* Grade (optional) */}
      {item.grade ? (
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-[#E8A33D] font-semibold mb-4">
          {item.grade}
        </p>
      ) : (
        <div className="mb-4" />
      )}

      {/* Description */}
      <p className="max-w-lg text-xs sm:text-sm lg:text-base leading-relaxed text-[#9A958C] font-light">
        {item.description}
      </p>
    </motion.div>
  );
}