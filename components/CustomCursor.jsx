"use client"
import { useState, useEffect } from "react";
import  useMousePosition  from "../hooks/useMousePosition";
import React from "react";

export default function CustomCursor() {
  const mousePosition = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    const els = document.querySelectorAll("button, a, [data-cursor-hover]");
    els.forEach(el => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      els.forEach(el => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <div
      className={`fixed w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 transition-transform duration-150 ${
        isHovering ? "scale-150" : "scale-100"
      }`}
      style={{
        left: mousePosition.x - 10,
        top: mousePosition.y - 10,
      }}
    />
  );
}
