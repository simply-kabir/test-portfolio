"use client";

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { SOCIALS } from "@/data/socials";
import { CONNECT_CONFIG } from "@/lib/connectConfig";
import { useConnectScroll } from "@/hooks/useConnectScroll";
import { useMeasuredWidth } from "@/hooks/useMeasuredWidth";
import { ConnectLink } from "./ConnectLink";

export default function ConnectSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const progress = useConnectScroll(wrapperRef);
  const total = SOCIALS.length;

  const rowWidth = useMeasuredWidth(rowRef);
  const viewportWidth = useMeasuredWidth(viewportRef);
  const maxTravel = Math.max(rowWidth - viewportWidth, 0);

  const rowX = useTransform(progress, (p) => -(p * maxTravel));

  return (
    <div
      ref={wrapperRef}
      // Wrapper height = exactly one viewport (svh, stable) + however much
      // horizontal distance the content actually needs to travel. This is
      // the core fix: scroll distance now MATCHES content width by
      // construction, on any screen size — not a guessed vh multiple that
      // could be too short (early release, issue #4) or irrelevant on wide
      // screens (issue #3).
      style={{ height: `calc(100svh + ${maxTravel}px)` }}
      className="relative"
      id="connect"
    >
      <div
        ref={viewportRef}
        className="sticky top-0 flex h-dvh w-full items-center overflow-hidden bg-[#08070A] px-[clamp(1.25rem,6vw,5rem)]"
      >
        <motion.div
          ref={rowRef}
          // Bigger gap = more content width = more required scroll,
          // automatically, on any viewport — this satisfies "increase
          // spacing" and "PC shouldn't finish without scrolling" together.
          className="relative flex w-max items-center gap-[clamp(4rem,20vw,16rem)]"
          style={{ x: rowX }}
        >
          <div
            className="pointer-events-none absolute left-0 top-1/2 h-px -translate-y-1/2"
            style={{ width: "100%", backgroundColor: CONNECT_CONFIG.lineColor }}
          />

          <h2 className="relative shrink-0 text-[clamp(2rem,7vw,4.5rem)] font-medium text-[#F1EDE6]">
            Connect
          </h2>

          {SOCIALS.map((link, index) => (
            <ConnectLink key={link.name} link={link} index={index} total={total} progress={progress} />
          ))}
        </motion.div>

        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[clamp(0.65rem,2vw,0.75rem)] uppercase tracking-widest text-[#6b6b6b]">
          Scroll to explore
        </p>
      </div>
    </div>
  );
}