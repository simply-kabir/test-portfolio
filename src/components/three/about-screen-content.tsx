"use client";

export default function AboutScreenContent() {
  return (
    <div
      style={{
        width: "880px",
        height: "520px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 50% 40%, rgba(245, 245, 245, 0.022) 0%, rgba(8, 7, 10, 0.98) 70%)",
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", "Geist", sans-serif',
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Monogram K SVG Logo */}
      <svg width="80" height="90" viewBox="0 0 100 110" fill="none">
        <path d="M 38 15 L 38 95" stroke="#F5F5F5" strokeWidth="6" strokeLinecap="round" />
        <path d="M 38 55 L 74 15" stroke="#F5F5F5" strokeWidth="6" strokeLinecap="round" />
        <path d="M 38 52 C 55 68, 70 78, 76 95" stroke="#F5F5F5" strokeWidth="6" strokeLinecap="round" />
      </svg>

      {/* Name */}
      <h1
        style={{
          fontSize: "22px",
          fontWeight: 300,
          letterSpacing: "0.35em",
          color: "rgba(245, 245, 245, 0.92)",
          margin: "24px 0 0 0",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        KABIR
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "11px",
          fontWeight: 400,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(245, 245, 245, 0.40)",
          marginTop: "12px",
          marginBottom: 0,
        }}
      >
        AI ENGINEER • FULL STACK DEVELOPER
      </p>
    </div>
  );
}