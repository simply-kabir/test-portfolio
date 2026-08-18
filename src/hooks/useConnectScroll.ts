"use client";

import { RefObject } from "react";
import { useScroll, useSpring } from "framer-motion";

export function useConnectScroll(target: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  return useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });
}