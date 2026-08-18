"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useAnimation } from "framer-motion";
// If your framer-motion version has renamed this, swap to useAnimationControls().

interface UseScrollEntranceOptions {
  amount?: number; // fraction of the section visible before entrance fires
}

/**
 * One-shot entrance trigger. Fires exactly once when the section scrolls
 * into view, then locks forever — scroll position is never read again
 * after that, and this never re-triggers even if the user scrolls back up.
 */
export function useScrollEntrance({ amount = 0.3 }: UseScrollEntranceOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount, once: false });
  const controls = useAnimation();
  const [entranceComplete, setEntranceComplete] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("locked");
    } else {
      controls.start("hidden");
      setEntranceComplete(false);
    }
  }, [isInView, controls]);

  return {
    ref,
    controls,
    entranceComplete,
    onEntranceComplete: () => setEntranceComplete(true),
  };
}