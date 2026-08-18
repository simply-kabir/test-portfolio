"use client";

import { PROJECTS_DATA } from "./project-data";
import ProjectPoster from "./project-poster";

interface ProjectBeltProps {
  activeIndex: number;
  onSelectProject: (index: number) => void;
}

export default function ProjectBelt({
  activeIndex,
  onSelectProject,
}: ProjectBeltProps) {
  return (
    <div className="relative w-full overflow-x-auto lg:overflow-hidden py-6 flex items-center justify-center no-scrollbar">
      {/* Sleeker, Tighter Belt Container */}
      <div className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-6 px-4 sm:px-8 max-w-[1100px] mx-auto min-w-max lg:min-w-0">
        {PROJECTS_DATA.map((project, index) => {
          const isSelected = index === activeIndex;

          return (
            <ProjectPoster
              key={project.id}
              project={project}
              isCenter={isSelected}
              onClick={() => onSelectProject(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
