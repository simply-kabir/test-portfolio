"use client";

import { useEffect, useRef } from "react";

interface DustParticle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  phase: number;
  speed: number;
}

export default function HeroBackground({ progress = 0 }: { progress?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  // Gradually fade out atmospheric background as camera dollies into monitor (invisible by progress 0.85)
  const atmosphereOpacity = Math.max(0, 1 - progress / 0.85);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initialize 25 subtle floating dust particles across 2 depth layers
    const particleCount = 25;
    const particles: DustParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      let x = Math.random() * width;
      let y = Math.random() * height;

      // Distribution: 70% in upper half, avoid spawning in central monitor box
      if (Math.random() < 0.7) {
        y = Math.random() * (height * 0.65);
      }

      const inMonitorRegion =
        x > width * 0.38 && x < width * 0.62 && y > height * 0.22 && y < height * 0.58;

      if (inMonitorRegion) {
        x = Math.random() < 0.5 ? Math.random() * (width * 0.35) : width * 0.65 + Math.random() * (width * 0.35);
      }

      const isForeground = i % 2 === 0;

      particles.push({
        x,
        y,
        homeX: x,
        homeY: y,
        vx: 0,
        vy: 0,
        radius: isForeground ? 1.1 + Math.random() * 0.7 : 0.7 + Math.random() * 0.4,
        baseOpacity: isForeground ? 0.12 + Math.random() * 0.08 : 0.06 + Math.random() * 0.06,
        phase: Math.random() * Math.PI * 2,
        speed: isForeground ? 0.12 + Math.random() * 0.12 : 0.07 + Math.random() * 0.08,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.006; // Slow organic movement rate (~35% slower)

      // Smooth lerp mouse position for 60 FPS spotlight & repulsion
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // --- LAYER 1: Animated Aurora Gradient (Wrapped around top corners & edges, dark center) ---
      // Top-Left corner aurora pulse
      const aura1X = width * 0.22 + Math.sin(time * 0.35) * (width * 0.08);
      const aura1Y = height * 0.18 + Math.cos(time * 0.28) * (height * 0.08);
      const grad1 = ctx.createRadialGradient(aura1X, aura1Y, 0, aura1X, aura1Y, width * 0.48);
      grad1.addColorStop(0, "rgba(20, 26, 50, 0.32)");
      grad1.addColorStop(0.55, "rgba(22, 16, 44, 0.18)");
      grad1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Top-Right corner aurora pulse
      const aura2X = width * 0.78 + Math.cos(time * 0.32) * (width * 0.08);
      const aura2Y = height * 0.22 + Math.sin(time * 0.38) * (height * 0.08);
      const grad2 = ctx.createRadialGradient(aura2X, aura2Y, 0, aura2X, aura2Y, width * 0.45);
      grad2.addColorStop(0, "rgba(26, 18, 48, 0.28)");
      grad2.addColorStop(0.6, "rgba(16, 22, 42, 0.14)");
      grad2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Subtle warm amber hint along top-center edge
      const aura3X = width * 0.5 + Math.sin(time * 0.2) * (width * 0.12);
      const aura3Y = height * 0.12 + Math.cos(time * 0.25) * 30;
      const grad3 = ctx.createRadialGradient(aura3X, aura3Y, 0, aura3X, aura3Y, width * 0.35);
      grad3.addColorStop(0, "rgba(184, 130, 58, 0.045)");
      grad3.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      // --- LAYER 3: Soft Low-Opacity Cursor Spotlight ---
      if (mouseRef.current.x > -500) {
        const spotGrad = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          260
        );
        spotGrad.addColorStop(0, "rgba(232, 163, 61, 0.04)");
        spotGrad.addColorStop(0.4, "rgba(28, 34, 60, 0.02)");
        spotGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // --- LAYER 2: Floating Dust Particles (2 Parallax Layers & Subtle Repulsion) ---
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const repelRadius = 140;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += 0.008 * p.speed;

        // Slow organic ambient float (~35% slower)
        const ambientDx = Math.cos(p.phase + time) * 0.09;
        const ambientDy = Math.sin(p.phase * 0.8 + time) * 0.09;
        p.homeX += ambientDx;
        p.homeY += ambientDy;

        // Keep home within viewport bounds
        if (p.homeX < 0) p.homeX = width;
        if (p.homeX > width) p.homeX = 0;
        if (p.homeY < 0) p.homeY = height;
        if (p.homeY > height) p.homeY = 0;

        // Subtle cursor repulsion
        let targetX = p.homeX;
        let targetY = p.homeY;

        if (mouseX > -500) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repelRadius && dist > 0.1) {
            const force = (1 - dist / repelRadius) * 20;
            targetX = p.homeX + (dx / dist) * force;
            targetY = p.homeY + (dy / dist) * force;
          }
        }

        // Smooth spring return to home target
        p.vx += (targetX - p.x) * 0.03;
        p.vy += (targetY - p.y) * 0.03;
        p.vx *= 0.88;
        p.vy *= 0.88;

        p.x += p.vx;
        p.y += p.vy;

        // Render soft illuminated dust particle
        const currentOpacity = p.baseOpacity * (0.75 + 0.25 * Math.sin(p.phase * 2));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241, 237, 230, ${currentOpacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden bg-bg"
      style={{ opacity: atmosphereOpacity }}
    >
      {/* Canvas for Aurora, Floating Dust, and Cursor Spotlight */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
      />

      {/* Screen & Desk level warm background ambient glow */}
      <div
        className="
          absolute left-1/2 top-[42%] h-[750px] w-[750px]
          -translate-x-1/2 -translate-y-1/2 rounded-full
          bg-[#E8A33D]/[0.07] blur-[220px] pointer-events-none
        "
      />

      <div
        className="
          absolute left-1/2 top-[25%] h-[450px] w-[450px]
          -translate-x-1/2 rounded-full bg-[#B8823A]/[0.06] blur-[180px] pointer-events-none
        "
      />

      <div
        className="
          absolute left-1/2 bottom-[-180px] h-[500px] w-[900px]
          -translate-x-1/2 rounded-full
          bg-[#8a5a2e]/[0.07] blur-[220px] pointer-events-none
        "
      />

      {/* Bottom fade into page bg */}
      <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </div>
  );
}