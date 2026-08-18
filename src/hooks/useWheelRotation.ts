"use client";

import { useRef } from "react";
import { useMotionValue, useAnimationFrame } from "framer-motion";

/**
 * Perpetual, time-based rotation offset in degrees. Only advances while
 * `active` is true — starts counting from 0 the instant entrance locks,
 * and never resets or jumps again after that.
 */
export function useWheelRotation(active: boolean, revolutionDurationSec: number) {
  const rotationOffset = useMotionValue(0);
  const degreesPerSecond = 360 / revolutionDurationSec;
  const wasActive = useRef(active);

  useAnimationFrame((_, delta) => {
    wasActive.current = active;
    if (!active) return;
    rotationOffset.set(rotationOffset.get() + degreesPerSecond * (delta / 1000));
  });

  return rotationOffset;
}