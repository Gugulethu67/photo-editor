"use client";

import { useEffect, useState } from "react"
import React from "react"
import { Button } from "./ui/button"
import Link from "next/link";

// Hero Section Component
export default function HeroSection() {
  const [glitchText, setGlitchText] = useState("The Future of Image Creation")
  const [demoHovered, setDemoHovered] = useState(false)
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const original = "The Future of Image Creation"
      const glitched = original
        .split("")
        .map((char) => (Math.random() > 0.9 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : char))
        .join("")

      setGlitchText(glitched)
      setTimeout(() => setGlitchText(original), 100)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <section className="h-screen flex items-center justify-center relative ">
      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
          {glitchText}
        </h1>

        <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
          Harness the power of quantum AI to transform your images with neural precision. Experience the next generation
          of creative tools.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/dashboard">
          <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                      data-cursor-hover variant={undefined}          >
            Experience the Magic
          </Button>
          </Link>
          {/* <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 bg-transparent"
            data-cursor-hover
          >
            Watch Demo
          </Button> */}
        </div>

        {/* 3D Demo Interface */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-1000 ${
            textVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          } ${demoHovered ? "transform scale-105 rotate-y-6" : ""}`}
          onMouseEnter={() => setDemoHovered(true)}
          onMouseLeave={() => setDemoHovered(false)}
          style={{ perspective: "1000px" }}
        >
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 transform-gpu">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 min-h-96">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm">Pixxel Pro</div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { icon: "✂️", label: "Crop" },
                  { icon: "📐", label: "Resize" },
                  { icon: "🎨", label: "Adjust" },
                  { icon: "🤖", label: "AI Tools" },
                ].map((tool, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-lg bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-all cursor-pointer"
                    title={tool.label}
                  >
                    <div className="text-2xl mb-1">{tool.icon}</div>
                    <div className="text-xs text-gray-400">{tool.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center">
                <div className="w-full h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl shadow-2xl shadow-blue-500/50 flex items-center justify-center">
                  <div className="text-white font-bold">Your Canvas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}