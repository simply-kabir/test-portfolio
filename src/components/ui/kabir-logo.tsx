"use client";

interface KabirLogoProps {
  progress?: number; // 0 to 1 automatic animation progress
  className?: string;
  size?: number;
  isDocked?: boolean;
}

export default function KabirLogo({
  progress = 1,
  className = "",
  size = 48,
  isDocked = false,
}: KabirLogoProps) {
  const p = Math.min(Math.max(progress, 0), 1);
  const dashOffset = (1 - p) * 100;

  return (
    <div
      className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Soft Backdrop Glow */}
      <div
        className="absolute inset-0 rounded-full blur-lg transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245, 245, 245, 0.15) 0%, rgba(0,0,0,0) 70%)",
          opacity: p * (isDocked ? 0.3 : 0.5),
        }}
      />

      {/* SVG Monogram 'K' (3-Stroke Geometry) */}
      <svg
        viewBox="0 0 100 100"
        className="relative z-10 w-full h-full overflow-visible"
      >
        {/* Stroke 1: Vertical Stem */}
        <path
          d="M 38 20 L 38 80"
          stroke="#F5F5F5"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength="100"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: dashOffset,
            transition: "stroke-dashoffset 0.05s linear",
          }}
        />

        {/* Stroke 2: Upper Diagonal Arm */}
        <path
          d="M 38 50 L 70 20"
          stroke="#F5F5F5"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength="100"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: dashOffset,
            transition: "stroke-dashoffset 0.05s linear",
          }}
        />

        {/* Stroke 3: Smooth Lower Curved Arm */}
        <path
          d="M 38 47 C 52 62, 64 70, 72 80"
          stroke="#F5F5F5"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength="100"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: dashOffset,
            transition: "stroke-dashoffset 0.05s linear",
          }}
        />
      </svg>
    </div>
  );
}
