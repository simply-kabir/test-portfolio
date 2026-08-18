"use client";

import { useScrolledPast } from "@/hooks/use-scrolled-past";

export default function ScreenOverlay({ progress = 0 }: { progress?: number }) {
  // Screen overlay (scanlines/flicker) is active during 3D monitor dolly
  // and cross-fades out smoothly between progress 0.50 and 0.70.
  const opacity = progress > 0.70 ? 0 : Math.max(0, 1 - (progress - 0.50) / 0.20);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30"
      style={{ opacity }}
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(241,237,230,0.02) 0px, rgba(241,237,230,0.02) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Vignette — darkens edges, warm-toned rather than neutral black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(8,7,10,0.45) 100%)",
        }}
      />

      {/* Very slow, very subtle flicker */}
      <div className="absolute inset-0 animate-screen-flicker bg-transparent" />
    </div>
  );
}