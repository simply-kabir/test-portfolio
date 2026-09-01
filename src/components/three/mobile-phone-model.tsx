'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CanvasTexture, LinearFilter, LinearMipmapLinearFilter } from 'three';
import { RoundedBox } from '@react-three/drei';

/**
 * Procedural iPhone 17 Pro model — built entirely from primitives, no GLTF.
 * Real-world proportions: 150.0 x 71.9 x 8.75mm body.
 *
 * Screen rendering:
 * Uses a dedicated PlaneGeometry with 1:1 planar UV mapping and a high-performance
 * Retina (768x1632) CanvasTexture. The Monogram "K" Logo and typography are
 * prominently sized and locked at the exact dead center of the display.
 * The animation runs smoothly ONCE on initial load (~1.6s) then settles into a static texture.
 */

// Easing: cubic-bezier(0.22, 1, 0.36, 1)
function cubicEase(t: number) {
  const clamped = Math.min(Math.max(t, 0), 1);
  const p = 1 - clamped;
  return 1 - p * p * p;
}

const SCALE = 0.02;

// --- Real-world iPhone 17 Pro dimensions (mm), scaled ---
const BODY_WIDTH = 71.9 * SCALE;
const BODY_HEIGHT = 150.0 * SCALE;
const BODY_DEPTH = 8.75 * SCALE;
const CORNER_RADIUS = 9.5 * SCALE;

const SCREEN_INSET = 1.2 * SCALE; // razor-thin iPhone 17 Pro uniform border
const SCREEN_DEPTH = 0.06 * SCALE;

const ISLAND_WIDTH = 21.0 * SCALE; // realistic compact dynamic island
const ISLAND_HEIGHT = 6.8 * SCALE;
const ISLAND_FROM_TOP = 8.2 * SCALE;

const BUMP_SIZE = 33 * SCALE;
const BUMP_DEPTH = 2.4 * SCALE;
const BUMP_RADIUS = 8 * SCALE;
const BUMP_MARGIN = 4 * SCALE;

const LENS_RADIUS = 4.4 * SCALE;
const LENS_DEPTH = 0.7 * SCALE;
const LENS_INSET = 8 * SCALE;

const BUTTON_DEPTH = 2.0 * SCALE; // protrusion from the side band
const BUTTON_THICKNESS = 3.4 * SCALE; // thickness along Z axis

type ButtonSpec = {
  y: number;
  height: number;
  side: 'left' | 'right';
};

const LEFT_BUTTONS: ButtonSpec[] = [
  { y: 38 * SCALE, height: 8.0 * SCALE }, // action button
  { y: 22 * SCALE, height: 13.5 * SCALE }, // volume up
  { y: 5 * SCALE, height: 13.5 * SCALE }, // volume down
].map((b) => ({ ...b, side: 'left' as const }));

const RIGHT_BUTTONS: ButtonSpec[] = [
  { y: 26 * SCALE, height: 17.5 * SCALE }, // single power (side lock) button
].map((b) => ({ ...b, side: 'right' as const }));

export function MobilePhoneModel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hasSettledRef = useRef(false);

  // Initialize high-performance (768 x 1632) canvas texture
  const { screenTexture, canvas } = useMemo(() => {
    if (typeof document === 'undefined') {
      return { screenTexture: null, canvas: null };
    }

    const c = document.createElement('canvas');
    c.width = 768;
    c.height = 1632;

    const tex = new CanvasTexture(c);
    tex.generateMipmaps = true;
    tex.minFilter = LinearMipmapLinearFilter;
    tex.magFilter = LinearFilter;
    tex.anisotropy = 16;

    return { screenTexture: tex, canvas: c };
  }, []);

  canvasRef.current = canvas;

  // Optimized Render loop: runs animation once on load, then settles permanently
  useFrame(({ clock }) => {
    if (!canvasRef.current || !screenTexture) return;
    const time = clock.getElapsedTime();

    const stillAnimating = time < 1.7;
    if (!stillAnimating) {
      if (hasSettledRef.current) return; // permanently halt redraws
      hasSettledRef.current = true;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const width = 768;
    const height = 1632;

    // 1. Deep OLED pitch-black background
    ctx.fillStyle = '#050508';
    ctx.fillRect(0, 0, width, height);

    // Dead center calculations for entire group (monogram + typography)
    const centerX = width / 2; // 384
    const screenCenterY = height / 2; // 816
    const logoCenterY = screenCenterY - 60; // 756 (centers the whole composition at 816)

    // 2. Soft radial illumination behind the logo
    const pulseRad = 380;
    const grad = ctx.createRadialGradient(centerX, logoCenterY, 0, centerX, logoCenterY, pulseRad);
    grad.addColorStop(0, 'rgba(245, 245, 245, 0.055)');
    grad.addColorStop(0.5, 'rgba(245, 245, 245, 0.012)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 3. ANIMATION SEQUENCE FOR MONOGRAM "K" LOGO (3-Stroke Construction)
    const t1 = cubicEase(Math.min(Math.max(time / 0.45, 0), 1));
    const t2 = cubicEase(Math.min(Math.max((time - 0.35) / 0.45, 0), 1));
    const t3 = cubicEase(Math.min(Math.max((time - 0.70) / 0.50, 0), 1));

    const pulseProgress = Math.min(Math.max((time - 1.2) / 0.4, 0), 1);
    const pulseFactor = 1 + Math.sin(pulseProgress * Math.PI) * 0.08;

    ctx.strokeStyle = `rgba(245, 245, 245, ${(0.95 * pulseFactor).toFixed(3)})`;
    ctx.lineWidth = 11; // bold, crisp strokes
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Prominent Monogram bounds (Length = 230px, Width = ~180px)
    const stemX = centerX - 65; // 319
    const stemStartY = logoCenterY + 115; // 871
    const stemEndY = logoCenterY - 115; // 641
    const stemLength = stemStartY - stemEndY; // 230

    // Stroke 1: Vertical Stem (Draws upward)
    if (t1 > 0) {
      const currentTopY = stemStartY - stemLength * t1;
      ctx.beginPath();
      ctx.moveTo(stemX, stemStartY);
      ctx.lineTo(stemX, currentTopY);
      ctx.stroke();
    }

    // Stroke 2: Upper Diagonal Stroke
    const upperJoinY = logoCenterY - 8;
    const upperEndX = centerX + 60;
    const upperEndY = logoCenterY - 115;

    if (t2 > 0) {
      const currUpperX = stemX + (upperEndX - stemX) * t2;
      const currUpperY = upperJoinY + (upperEndY - upperJoinY) * t2;
      ctx.beginPath();
      ctx.moveTo(stemX, upperJoinY);
      ctx.lineTo(currUpperX, currUpperY);
      ctx.stroke();
    }

    // Stroke 3: Smooth Lower Curved Stroke
    const lowerJoinY = logoCenterY - 12;
    const p0 = { x: stemX, y: lowerJoinY };
    const p1 = { x: stemX + 38, y: logoCenterY + 25 };
    const p2 = { x: stemX + 75, y: logoCenterY + 60 };
    const p3 = { x: centerX + 65, y: logoCenterY + 115 };

    if (t3 > 0) {
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
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

    // 4. Crisp Typography below logo
    const textAlpha = Math.min(Math.max((time - 1.0) / 0.5, 0), 1);
    if (textAlpha > 0) {
      ctx.textAlign = 'center';

      // Name: KABIR
      ctx.fillStyle = `rgba(245, 245, 245, ${(0.95 * textAlpha).toFixed(3)})`;
      ctx.font = '400 36px -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif';
      if ('letterSpacing' in ctx) {
        (ctx as any).letterSpacing = '12px';
      }
      ctx.fillText('KABIR', centerX, logoCenterY + 175);

      // Subtitle
      ctx.fillStyle = `rgba(245, 245, 245, ${(0.48 * textAlpha).toFixed(3)})`;
      ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", sans-serif';
      if ('letterSpacing' in ctx) {
        (ctx as any).letterSpacing = '3.5px';
      }
      ctx.fillText('AI ENGINEER • FULL STACK DEVELOPER', centerX, logoCenterY + 220);
    }

    screenTexture.needsUpdate = true;
  });

  const bumpOffsetX = -BODY_WIDTH / 2 + BUMP_SIZE / 2 + BUMP_MARGIN;
  const bumpOffsetY = BODY_HEIGHT / 2 - BUMP_SIZE / 2 - BUMP_MARGIN;

  const lensPositions = useMemo<[number, number][]>(
    () => [
      [bumpOffsetX - BUMP_SIZE / 2 + LENS_INSET, bumpOffsetY + BUMP_SIZE / 2 - LENS_INSET],
      [bumpOffsetX + BUMP_SIZE / 2 - LENS_INSET, bumpOffsetY + BUMP_SIZE / 2 - LENS_INSET],
      [bumpOffsetX - BUMP_SIZE / 2 + LENS_INSET, bumpOffsetY - BUMP_SIZE / 2 + LENS_INSET],
    ],
    [bumpOffsetX, bumpOffsetY]
  );

  return (
    <group name="mobile-phone-model">
      {/* Body — titanium-style frame */}
      <RoundedBox
        args={[BODY_WIDTH, BODY_HEIGHT, BODY_DEPTH]}
        radius={CORNER_RADIUS}
        smoothness={8}
      >
        <meshStandardMaterial color="#4b4b4e" metalness={0.85} roughness={0.35} />
      </RoundedBox>

      {/* Screen Base — OLED dark backplate */}
      <RoundedBox
        args={[BODY_WIDTH - SCREEN_INSET * 2, BODY_HEIGHT - SCREEN_INSET * 2, SCREEN_DEPTH]}
        radius={CORNER_RADIUS - SCREEN_INSET}
        smoothness={8}
        position={[0, 0, BODY_DEPTH / 2 + SCREEN_DEPTH / 2]}
      >
        <meshBasicMaterial color="#050508" />
      </RoundedBox>

      {/* Screen Display Face — Flat PlaneGeometry with true 1:1 planar UV mapping */}
      {screenTexture && (
        <mesh position={[0, 0, BODY_DEPTH / 2 + SCREEN_DEPTH + 0.001 * SCALE]}>
          <planeGeometry
            args={[
              BODY_WIDTH - SCREEN_INSET * 2,
              BODY_HEIGHT - SCREEN_INSET * 2,
            ]}
          />
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        </mesh>
      )}

      {/* Dynamic Island */}
      <mesh
        position={[
          0,
          BODY_HEIGHT / 2 - ISLAND_FROM_TOP,
          BODY_DEPTH / 2 + SCREEN_DEPTH + 0.002 * SCALE,
        ]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <capsuleGeometry
          args={[ISLAND_HEIGHT / 2, ISLAND_WIDTH - ISLAND_HEIGHT, 8, 32]}
        />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Camera bump */}
      <RoundedBox
        args={[BUMP_SIZE, BUMP_SIZE, BUMP_DEPTH]}
        radius={BUMP_RADIUS}
        smoothness={4}
        position={[bumpOffsetX, bumpOffsetY, -BODY_DEPTH / 2 - BUMP_DEPTH / 2]}
      >
        <meshStandardMaterial color="#3a3a3d" metalness={0.7} roughness={0.4} />
      </RoundedBox>

      {/* Lenses */}
      {lensPositions.map(([lx, ly], i) => (
        <mesh
          key={i}
          position={[lx, ly, -BODY_DEPTH / 2 - BUMP_DEPTH - LENS_DEPTH / 2]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[LENS_RADIUS, LENS_RADIUS, LENS_DEPTH, 20]} />
          <meshStandardMaterial color="#0a0a0c" metalness={0.9} roughness={0.15} />
        </mesh>
      ))}

      {/* Side buttons */}
      {[...LEFT_BUTTONS, ...RIGHT_BUTTONS].map((btn, i) => {
        const x =
          btn.side === 'left'
            ? -BODY_WIDTH / 2 - BUTTON_DEPTH / 2 + 0.3 * SCALE
            : BODY_WIDTH / 2 + BUTTON_DEPTH / 2 - 0.3 * SCALE;

        return (
          <RoundedBox
            key={i}
            args={[BUTTON_DEPTH, btn.height, BUTTON_THICKNESS]}
            radius={0.4 * SCALE}
            smoothness={4}
            position={[x, btn.y, 0]}
          >
            <meshStandardMaterial color="#4b4b4e" metalness={0.85} roughness={0.35} />
          </RoundedBox>
        );
      })}
    </group>
  );
}