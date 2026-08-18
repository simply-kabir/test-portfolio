"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Dust {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  phase: number;
}

export default function About({ progress }: { progress: number }) {
  const isActive = progress >= 0.55;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Floating dust particles in volumetric warm rim light
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const dusts: Dust[] = [];
    for (let i = 0; i < 16; i++) {
      dusts.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.5 + Math.random() * 0.8,
        alpha: 0.08 + Math.random() * 0.12,
        speed: 0.12 + Math.random() * 0.18,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dusts.length; i++) {
        const d = dusts[i];
        d.phase += 0.005 * d.speed;
        d.y -= d.speed * 0.25;
        d.x += Math.sin(d.phase + time) * 0.2;

        if (d.y < 0) {
          d.y = height;
          d.x = Math.random() * width;
        }

        const currentAlpha = d.alpha * (0.6 + 0.4 * Math.sin(d.phase * 2));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 210, 175, ${currentAlpha.toFixed(3)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-visible lg:overflow-hidden bg-[#060608] py-10 sm:py-14 lg:py-16 text-white">
      {/* Ambient Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,#140f0c_0%,#0a0807_45%,#060608_80%)] lg:bg-[radial-gradient(circle_at_68%_50%,#140f0c_0%,#0a0807_40%,#060608_75%)] opacity-90" />

      {/* Top & Bottom Soft Edge Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,#060608_0%,transparent_10%,transparent_90%,#060608_100%)] z-10" />

      {/* Main Multi-Breakpoint Grid Layout — Minimal & Perfectly Balanced */}
      <div className="relative z-20 mx-auto grid w-full max-w-[1280px] grid-cols-1 md:grid-cols-2 lg:grid-cols-[50%_50%] items-center gap-8 sm:gap-12 px-6 sm:px-8 lg:px-12">
        
        {/* LEFT COLUMN — Ultra-Minimal Editorial Copy */}
        <div
          className="flex flex-col justify-center py-2 sm:py-4 lg:py-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
            willChange: "opacity, transform",
          }}
        >
          {/* Eyebrow Label */}
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/40 font-mono mb-4">
            IDENTITY
          </p>

          {/* Minimal Visual Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-light tracking-tight text-white leading-[1.08] sm:leading-[1.06] mb-6">
            Hi, I'm Kabir. <br />
            <span className="text-white/60">AI Engineer & Full Stack Developer.</span>
          </h1>

          {/* Short, Ultra-Refined Paragraphs */}
          <div className="space-y-4 max-w-[500px] text-white/75 font-light text-base lg:text-[17px] leading-relaxed">
            <p>
              I build intelligent web applications and automated systems designed to turn complex ideas into fast, elegant, and genuinely useful tools.
            </p>
            <p>
              My work balances technical rigor with human-centered design — focusing on clean architectures, low latency, and calm interfaces.
            </p>
          </div>

          {/* Understated Current Focus Block */}
          <div className="mt-8 pt-5 border-t border-white/[0.08] max-w-[500px]">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 font-mono mb-3">
              CURRENTLY
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-xs sm:text-[13px] text-white/70 font-light">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white/30" />
                Building AI-powered products
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white/30" />
                Full-stack & automation
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white/30" />
                Human-centered design
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white/30" />
                B.Tech CS (AI & ML)
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN — Vertically Centered Balanced Portrait */}
        <div
          className="relative flex h-full w-full items-center justify-center lg:justify-start lg:pl-4 overflow-visible transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "scale3d(1, 1, 1)" : "scale3d(0.98, 0.98, 1)",
            willChange: "opacity, transform",
          }}
        >
          {/* Layer 1: CAD Blueprint Lines */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none select-none opacity-20"
            viewBox="0 0 500 600"
            fill="none"
          >
            <line x1="40" y1="0" x2="40" y2="600" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" strokeDasharray="3 5" />
            <line x1="460" y1="0" x2="460" y2="600" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" strokeDasharray="3 5" />
            <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" strokeDasharray="3 5" />
            <line x1="0" y1="480" x2="500" y2="480" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" strokeDasharray="3 5" />
            
            <circle cx="250" cy="300" r="140" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" />
            <circle cx="250" cy="300" r="190" stroke="rgba(255, 255, 255, 0.025)" strokeWidth="0.8" strokeDasharray="2 6" />
            <line x1="235" y1="300" x2="265" y2="300" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
            <line x1="250" y1="285" x2="250" y2="315" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
          </svg>

          {/* Layer 2: Volumetric Soft Warm Tungsten Light Scatter */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 48%, rgba(216, 154, 91, 0.10) 0%, rgba(184, 118, 56, 0.03) 48%, transparent 70%)",
            }}
          />

          {/* Layer 3: Floating Dust Particles Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full pointer-events-none z-10 opacity-70"
          />

          {/* Layer 4: Transparent PNG Portrait — Refined Height & Symmetry */}
          <div
            className="relative h-[300px] sm:h-[360px] md:h-[420px] lg:h-[500px] w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] mx-auto z-20 overflow-visible"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, black 62%, rgba(0, 0, 0, 0.4) 84%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 62%, rgba(0, 0, 0, 0.4) 84%, transparent 100%)",
            }}
          >
            <Image
              src="/about/portrait.png"
              alt="Portrait of Kabir"
              fill
              className="object-contain object-center filter contrast-[1.02] desaturate-[0.05]"
              sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 85vw"
            />
            {/* Soft Ambient Bottom Edge Fade Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 lg:h-24 bg-gradient-to-t from-[#060608] via-[#060608]/80 to-transparent pointer-events-none z-30" />
          </div>
        </div>

      </div>
    </section>
  );
}