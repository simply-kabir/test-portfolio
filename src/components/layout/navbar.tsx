"use client";

import { useEffect, useRef } from "react";
import { NAVIGATION } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import NavLink from "./navlink";

declare global {
  interface Window {
    liquidGlass?: (
      el: HTMLElement,
      opts?: Record<string, number>
    ) => { supported: boolean; refresh: () => void; destroy: () => void };
  }
}

export default function Navbar() {
  const active = useActiveSection();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current || typeof window === "undefined") return;

    let cleanupFn: (() => void) | undefined;

    const initGlass = () => {
      if (window.liquidGlass && navRef.current) {
        const glass = window.liquidGlass(navRef.current, {
          scale: -70,
          chroma: 4,
          blur: 3,
          saturate: 1.5,
          mapBlur: 12,
        });
        cleanupFn = () => glass.destroy();
      }
    };

    if (window.liquidGlass) {
      initGlass();
    } else {
      const script = document.createElement("script");
      script.src = "/liquid-glass.js";
      script.onload = initGlass;
      document.head.appendChild(script);
    }

    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, []);

  return (
    <header className="fixed top-4 sm:top-6 left-1/2 z-50 -translate-x-1/2 w-[calc(100vw-1.5rem)] sm:w-auto max-w-max flex justify-center">
      <nav
        ref={navRef}
        className="
          flex items-center gap-x-3 sm:gap-x-6 md:gap-x-8
          rounded-full px-3.5 sm:px-6 md:px-8 py-2.5 sm:py-3.5
          shadow-[0_24px_60px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.5),inset_0_-8px_20px_rgba(255,255,255,0.06),inset_0_0_0_1px_rgba(255,255,255,0.13)]
        "
        style={{
          borderRadius: "9999px",
          background:
            "linear-gradient(180deg, rgba(14,14,22,0.18), rgba(14,14,22,0.32))",
        }}
      >
        {NAVIGATION.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            active={active === item.href.replace("#", "")}
          />
        ))}
      </nav>
    </header>
  );
}