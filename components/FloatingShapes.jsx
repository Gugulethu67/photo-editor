"use client"
import { useMemo } from "react";
import { useParallax } from "@/hooks/use-parallax";
import React from "react";

export default function FloatingShapes() {
  const scrollY = useParallax();
  const shapes = useMemo(() => [
    { id: 1, size: "w-72 h-72", position: "top-20 left-10", gradient: "from-blue-500 to-purple-500" },
    { id: 2, size: "w-96 h-96", position: "top-40 right-20", gradient: "from-purple-500 to-cyan-500" },
    { id: 3, size: "w-64 h-64", position: "bottom-20 left-1/4", gradient: "from-cyan-500 to-blue-500" },
    { id: 4, size: "w-80 h-80", position: "bottom-40 right-10", gradient: "from-purple-500 to-pink-500" },
  ], []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {shapes.map(shape => (
        <div
          key={shape.id}
          className={`absolute ${shape.size} ${shape.position} bg-gradient-to-r ${shape.gradient} blur-3xl opacity-20 animate-pulse`}
          style={{
            transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)`
          }}
        />
      ))}
    </div>
  );
}
