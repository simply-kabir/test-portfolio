"use client";

import { RefObject, useEffect, useState } from "react";

/**
 * Tracks an element's actual rendered width, live, across resizes —
 * so anything computed from it (like scroll-track travel distance)
 * stays correct at any viewport size or aspect ratio, not just the
 * one it was eyeballed against.
 */
export function useMeasuredWidth(ref: RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return width;
}