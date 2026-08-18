"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Custom hook providing continuous, smooth 60 FPS infinite rotation.
 * Speed: ~0.08 degrees per frame = 1 full revolution every ~75 seconds.
 */
export function useIdleRotation(speedDegreesPerFrame: number = 0.08) {
  const [rotation, setRotation] = useState(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = (now - lastTime) / 16.666; // Normalize against 60 FPS
      lastTime = now;

      setRotation((prev) => (prev + speedDegreesPerFrame * delta) % 360);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [speedDegreesPerFrame]);

  return rotation;
}
