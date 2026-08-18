"use client";

import { useEffect, useState } from "react";

/**
 * Multi-Layered Device & Performance Capability Hook
 * Ensures 3D WebGL scenes never load, mount, or execute on smartphones,
 * touch devices, low-spec hardware, or reduced-motion environments.
 */
export function useIs3DCapable() {
  const [is3DCapable, setIs3DCapable] = useState<boolean>(false);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkCapability = (): boolean => {
      // Layer 1: Mobile Smartphone & Tablet User Agent Check
      const ua = navigator.userAgent || "";
      const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(ua);
      if (isMobileUA) return false;

      // Layer 2: Touch & Coarse Pointer Capabilities
      const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const hasTouchPoints = typeof navigator.maxTouchPoints === "number" && navigator.maxTouchPoints > 0;
      if (isCoarsePointer && hasTouchPoints) return false;

      // Layer 3: Screen Dimensions & Viewport Breakpoints
      const isDesktopWidth = window.innerWidth >= 1024;
      const isDesktopHeight = window.innerHeight >= 600;
      if (!isDesktopWidth || !isDesktopHeight) return false;

      // Layer 4: User Motion & Data Preferences
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return false;

      const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
      if (connection?.saveData) return false;

      // Layer 5: Hardware Resource Constraints (CPU cores & Device RAM)
      const hardwareConcurrency = navigator.hardwareConcurrency;
      if (typeof hardwareConcurrency === "number" && hardwareConcurrency <= 4) {
        return false;
      }

      const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
      if (typeof deviceMemory === "number" && deviceMemory < 4) {
        return false;
      }

      // Layer 6: WebGL Sanity & Software Renderer Check
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl");
        if (!gl) return false;

        const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";
          if (/SwiftShader|llvmpipe|Software|Basic Render Driver/i.test(renderer)) {
            return false;
          }
        }
      } catch {
        return false;
      }

      return true;
    };

    setIs3DCapable(checkCapability());
    setIsEvaluated(true);

    const handleResize = () => {
      setIs3DCapable(checkCapability());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { is3DCapable, isEvaluated };
}
