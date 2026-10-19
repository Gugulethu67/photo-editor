"use client";

import { useParallax } from "@/hooks/use-parallax";

const SHAPES = [
  { id: 1, size: "w-72 h-72", position: "top-20 left-10", gradient: "from-emerald-300 to-green-400", delay: "" },
  { id: 2, size: "w-96 h-96", position: "top-1/3 right-10", gradient: "from-green-200 to-emerald-400", delay: "anim-delay-3000" },
  { id: 3, size: "w-64 h-64", position: "bottom-20 left-1/4", gradient: "from-teal-200 to-emerald-300", delay: "anim-delay-6000" },
  { id: 4, size: "w-80 h-80", position: "bottom-1/3 right-1/4", gradient: "from-lime-200 to-green-300", delay: "anim-delay-9000" },
];

export const FloatingShapes = () => {
  const scrollY = useParallax();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {SHAPES.map((shape) => (
        <div
          key={shape.id}
          className={`absolute ${shape.size} ${shape.position}`}
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div
            className={`w-full h-full bg-gradient-to-r ${shape.gradient} rounded-full blur-3xl opacity-30 animate-blob ${shape.delay}`}
          />
        </div>
      ))}
    </div>
  );
};
