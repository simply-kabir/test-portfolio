"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CanvasTexture } from "three";

// Easing: cubic-bezier(0.22, 1, 0.36, 1) approximation
function cubicEase(t: number) {
  const clamped = Math.min(Math.max(t, 0), 1);
  const p = 1 - clamped;
  return 1 - p * p * p;
}

export default function Monitor({ progress = 0 }: { progress?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const grainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const hasSettledRef = useRef(false);
  // Initialize canvas and offscreen noise texture canvas
  const { screenTexture, canvas, grainCanvas } = useMemo(() => {
    if (typeof document === "undefined") {
      return { screenTexture: null, canvas: null, grainCanvas: null };
    }

    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 604;

    // Create 64x64 offscreen canvas for tileable film grain
    const gc = document.createElement("canvas");
    gc.width = 64;
    gc.height = 64;
    const gctx = gc.getContext("2d");
    if (gctx) {
      const imgData = gctx.createImageData(64, 64);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.floor(Math.random() * 255);
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = Math.floor(Math.random() * 35 + 12);
      }
      gctx.putImageData(imgData, 0, 0);
    }

    const tex = new CanvasTexture(c);
    return { screenTexture: tex, canvas: c, grainCanvas: gc };
  }, []);

  canvasRef.current = canvas;
  grainCanvasRef.current = grainCanvas;

  useFrame(({ clock }) => {
    if (!canvasRef.current || !screenTexture) return;
    const time = clock.getElapsedTime();
    // Animation (logo strokes + text fade-in) is fully resolved by ~1.6s.
    // After that, nothing on screen is actually changing frame-to-frame
    // except two extremely subtle breathing/pulse effects — not worth
    // a full canvas redraw + GPU re-upload 60 times a second forever.
    const stillAnimating = time < 1.7;

    if (!stillAnimating) {
      if (hasSettledRef.current) return; // already drew the final static frame — do nothing
      hasSettledRef.current = true;
      // fall through once more to draw the final settled frame below
    }
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const width = 1024;
    const height = 604;

    // 1. Dark OLED background with extremely subtle brightness breathing (~1.2% luminance)
    const oledFactor = 1 + Math.sin(time * 0.8) * 0.012;
    const bgR = Math.round(7 * oledFactor);
    const bgG = Math.round(7 * oledFactor);
    const bgB = Math.round(9 * oledFactor);
    ctx.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`;
    ctx.fillRect(0, 0, width, height);

    // Center coordinates for logo (positioned ~5% above true vertical center)
    const centerX = width / 2; // 512
    const logoCenterY = height * 0.40; // ~240

    // 2. Soft off-white radial illumination behind the logo (2.2% intensity, neutral white)
    const pulseRad = 320 + Math.sin(time * 0.6) * 12;
    const grad = ctx.createRadialGradient(centerX, logoCenterY, 0, centerX, logoCenterY, pulseRad);
    const glowAlpha = 0.022 + Math.sin(time * 0.7) * 0.003;
    grad.addColorStop(0, `rgba(245, 245, 245, ${glowAlpha.toFixed(4)})`);
    grad.addColorStop(0.6, `rgba(245, 245, 245, ${(glowAlpha * 0.25).toFixed(4)})`);
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 3. Faint animated film grain (imperceptible noise movement)
    if (grainCanvasRef.current) {
      const pattern = ctx.createPattern(grainCanvasRef.current, "repeat");
      if (pattern) {
        ctx.save();
        ctx.globalAlpha = 0.015;
        const dx = Math.floor(Math.sin(time * 43) * 32);
        const dy = Math.floor(Math.cos(time * 37) * 32);
        ctx.translate(dx, dy);
        ctx.fillStyle = pattern;
        ctx.fillRect(-dx, -dy, width, height);
        ctx.restore();
      }
    }

    // 4. ANIMATION SEQUENCE FOR MONOGRAM "K" LOGO (3-Stroke Construction)
    // Duration: ~1.4 seconds with cubic-bezier(0.22, 1, 0.36, 1) easing

    // Animation progress calculations:
    // Step 1: Vertical Stem (0.0s -> 0.45s)
    const t1 = cubicEase(Math.min(Math.max(time / 0.45, 0), 1));

    // Step 2: Upper Diagonal (0.35s -> 0.80s)
    const t2 = cubicEase(Math.min(Math.max((time - 0.35) / 0.45, 0), 1));

    // Step 3: Lower Curved Stroke (0.70s -> 1.20s)
    const t3 = cubicEase(Math.min(Math.max((time - 0.70) / 0.50, 0), 1));

    // Step 4 & 5: Settling & Single subtle brightness pulse (1.20s -> 1.60s)
    const pulseProgress = Math.min(Math.max((time - 1.2) / 0.4, 0), 1);
    const pulseFactor = 1 + Math.sin(pulseProgress * Math.PI) * 0.08;

    // Logo stroke styling (Pure monochrome off-white #F5F5F5)
    ctx.strokeStyle = `rgba(245, 245, 245, ${(0.92 * pulseFactor).toFixed(3)})`;
    ctx.lineWidth = 5.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Logo geometry bounds:
    // Stem: X = 472, Y = 180 to 290 (length 110px)
    const stemX = centerX - 40; // 472
    const stemStartY = logoCenterY + 50; // 290
    const stemEndY = logoCenterY - 55; // 185
    const stemLength = stemStartY - stemEndY;

    // --- STROKE 1: Perfectly Vertical Stem (Draws Upward) ---
    if (t1 > 0) {
      const currentTopY = stemStartY - stemLength * t1;
      ctx.beginPath();
      ctx.moveTo(stemX, stemStartY);
      ctx.lineTo(stemX, currentTopY);
      ctx.stroke();
    }

    // --- STROKE 2: Upper Diagonal Stroke (Grows Outward) ---
    const upperJoinY = logoCenterY - 5; // 235
    const upperEndX = centerX + 36; // 548
    const upperEndY = logoCenterY - 55; // 185

    if (t2 > 0) {
      const currUpperX = stemX + (upperEndX - stemX) * t2;
      const currUpperY = upperJoinY + (upperEndY - upperJoinY) * t2;
      ctx.beginPath();
      ctx.moveTo(stemX, upperJoinY);
      ctx.lineTo(currUpperX, currUpperY);
      ctx.stroke();
    }

    // --- STROKE 3: Smooth Lower Curved Stroke (Grows Smoothly from Center) ---
    const lowerJoinY = logoCenterY - 8; // 232
    const p0 = { x: stemX, y: lowerJoinY };
    const p1 = { x: stemX + 22, y: logoCenterY + 12 };
    const p2 = { x: stemX + 50, y: logoCenterY + 28 };
    const p3 = { x: centerX + 38, y: logoCenterY + 50 }; // (550, 290)

    if (t3 > 0) {
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);

      // Sample sub-curve along Bézier curve based on t3
      const steps = 30;
      const maxStep = Math.floor(steps * t3);
      for (let i = 1; i <= maxStep; i++) {
        const u = i / steps;
        const u1 = 1 - u;
        const bx = u1 * u1 * u1 * p0.x + 3 * u1 * u1 * u * p1.x + 3 * u1 * u * u * p2.x + u * u * u * p3.x;
        const by = u1 * u1 * u1 * p0.y + 3 * u1 * u1 * u * p1.y + 3 * u1 * u * u * p2.y + u * u * u * p3.y;
        ctx.lineTo(bx, by);
      }
      ctx.stroke();
    }

    // 5. TYPOGRAPHY BELOW LOGO (Fades in smoothly as logo settles)
    const textAlpha = Math.min(Math.max((time - 1.0) / 0.5, 0), 1);

    if (textAlpha > 0) {
      ctx.textAlign = "center";

      // Main Name: KABIR
      ctx.fillStyle = `rgba(245, 245, 245, ${(0.92 * textAlpha).toFixed(3)})`;
      ctx.font = '300 22px -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", "Geist", sans-serif';

      if ("letterSpacing" in ctx) {
        (ctx as any).letterSpacing = "8px";
      }
      ctx.fillText("KABIR", centerX, logoCenterY + 105);

      // Subtitle: AI ENGINEER • FULL STACK DEVELOPER
      ctx.fillStyle = `rgba(245, 245, 245, ${(0.40 * textAlpha).toFixed(3)})`;
      ctx.font = '400 11px -apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", "Geist", sans-serif';

      if ("letterSpacing" in ctx) {
        (ctx as any).letterSpacing = "3.5px";
      }
      ctx.fillText("AI ENGINEER • FULL STACK DEVELOPER", centerX, logoCenterY + 138);
    }

    screenTexture.needsUpdate = true;
  });

  return (
    <group position={[0, 0, -0.4]}>
      {/* Base */}
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.4, 0.04, 24]} />
        <meshStandardMaterial color="#1a171c" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Stand neck */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.7, 12]} />
        <meshStandardMaterial color="#1a171c" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Bezel */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[2.4, 1.5, 0.06]} />
        <meshStandardMaterial color="#1c1820" roughness={0.35} metalness={0.35} />
      </mesh>

      {/* Screen — WebGL texture embedded directly on 3D mesh surface */}
      <mesh position={[0, 1.1, 0.035]} name="monitor-screen">
        <planeGeometry args={[2.2, 1.3]} />
        <meshStandardMaterial
          map={screenTexture || undefined}
          emissiveMap={screenTexture || undefined}
          emissive="#ffffff"
          emissiveIntensity={0.88}
          roughness={0.15}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}