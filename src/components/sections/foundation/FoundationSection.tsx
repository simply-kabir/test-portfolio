"use client";

import { FOUNDATION_ITEMS } from "@/data/foundation";
import { FoundationStep } from "./FoundationStep";

export default function FoundationSection() {
  return (
    <section id="foundation" className="relative bg-[#08070A]">
      {/* Anchor alias for #academics nav link */}
      <div id="academics" className="absolute top-0 left-0 w-full" />

      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 md:px-16 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">

          {/* ═══ LEFT COLUMN — STICKY HEADING ═══
              Pins just below the navbar at top edge.
              Enters with the first milestone and exits together with the last milestone. */}
          <div className="md:col-span-5">
            <div className="sticky top-20 pt-8 pb-12">
              {/* Eyebrow */}
              <p className="mb-3 text-[11px] sm:text-sm uppercase tracking-[0.25em] text-[#9A958C] font-mono">
                Academic Journey
              </p>

              {/* Display heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-medium text-[#F1EDE6] leading-[1.08] tracking-tight mb-5">
                Where Engineering
                <br className="hidden sm:block" />
                <span className="italic text-[#9A958C] font-normal"> Began.</span>
              </h2>

              {/* Description */}
              <p className="max-w-sm text-xs sm:text-sm lg:text-base leading-relaxed text-[#9A958C] font-light">
                Every engineer is built upon strong fundamentals. This journey
                represents the education that shaped my approach to building
                intelligent systems.
              </p>
            </div>
          </div>

          {/* ═══ RIGHT COLUMN — SCROLLING MILESTONES ═══
              Features a continuous vertical rope starting at Node 1 center
              and ending at Node 3 center. */}
          <div className="md:col-span-7 relative pt-8 pb-12">
            {/* Continuous Vertical Line Track (Starts at Node 1 top-28px, ends at Node 3 bottom-28px) */}
            <div className="absolute left-0 top-[31px] bottom-[31px] w-px bg-white/[0.12] z-0" />

            {FOUNDATION_ITEMS.map((item, index) => (
              <FoundationStep
                key={item.id}
                item={item}
                isFirst={index === 0}
                isLast={index === FOUNDATION_ITEMS.length - 1}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}