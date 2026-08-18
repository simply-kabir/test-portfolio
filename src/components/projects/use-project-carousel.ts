"use client";

import { useState, useCallback, useEffect } from "react";
import { PROJECTS_DATA } from "./project-data";

export function useProjectCarousel() {
  // Start with KrishiSetu (Index 0) selected by default
  const [activeIndex, setActiveIndex] = useState(0);

  const total = PROJECTS_DATA.length;

  // Advance to next project (max = index 3)
  const nextProject = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, total - 1));
  }, [total]);

  // Retreat to previous project (min = index 0)
  const prevProject = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < total) {
        setActiveIndex(index);
      }
    },
    [total]
  );

  // Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextProject();
      } else if (e.key === "ArrowLeft") {
        prevProject();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextProject, prevProject]);

  return {
    activeIndex,
    setActiveIndex: goToIndex,
    nextProject,
    prevProject,
    currentProject: PROJECTS_DATA[activeIndex],
    canGoNext: activeIndex < total - 1,
    canGoPrev: activeIndex > 0,
  };
}
