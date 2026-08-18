"use client";

import { useEffect, useState } from "react";

export function useScrolledPast(elementId: string, fadeDistance = 300) {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    function update() {
      const el = document.getElementById(elementId);
      if (!el) return;
      const bottom = el.getBoundingClientRect().bottom;
      const raw = (0 - bottom) / fadeDistance;
      setAmount(Math.min(Math.max(raw, 0), 1));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [elementId, fadeDistance]);

  return amount;
}