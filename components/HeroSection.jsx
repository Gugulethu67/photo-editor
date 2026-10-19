"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const HEADLINE = "The Future of Image Creation";

const DEMO_TOOLS = [
  { icon: "✂️", label: "Crop" },
  { icon: "📐", label: "Resize" },
  { icon: "🎨", label: "Adjust" },
  { icon: "🤖", label: "AI Tools" },
];

export default function HeroSection() {
  const [glitchText, setGlitchText] = useState(HEADLINE);

  useEffect(() => {
    let resetTimer;
    const glitchInterval = setInterval(() => {
      const glitched = HEADLINE.split("")
        .map((char) => (Math.random() > 0.9 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : char))
        .join("");

      setGlitchText(glitched);
      resetTimer = setTimeout(() => setGlitchText(HEADLINE), 100);
    }, 3000);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(resetTimer);
    };
  }, []);

  return (
    <section className="min-h-[calc(100vh-9rem)] flex items-center justify-center relative pb-16">
      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-8 animate-pop-in">
          <Sparkles className="h-4 w-4" />
          AI-powered photo editing
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight animate-fade-up">
          <span className="text-gradient">{glitchText}</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed animate-fade-up anim-delay-150">
          Harness the power of quantum AI to transform your images with neural precision. Experience the next generation
          of creative tools.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up anim-delay-300">
          <Link href="/dashboard">
            <Button
              variant="primary"
              size="lg"
              className="px-8 py-6 rounded-xl font-semibold text-lg hover:scale-105"
              data-cursor-hover
            >
              Experience the Magic
            </Button>
          </Link>
        </div>

        {/* Demo Interface */}
        <div className="relative max-w-4xl mx-auto animate-fade-up anim-delay-500">
          <div className="animate-float">
            <div className="bg-white/80 backdrop-blur-lg border border-emerald-100 rounded-3xl p-6 shadow-2xl shadow-emerald-500/15 transition-transform duration-500 hover:scale-[1.02]">
              <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 min-h-96 border border-emerald-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="text-slate-400 text-sm">Pixxel Pro</div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  {DEMO_TOOLS.map((tool, index) => (
                    <div
                      key={tool.label}
                      className="bg-white border border-emerald-100 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-500/10 animate-pop-in"
                      style={{ animationDelay: `${700 + index * 100}ms` }}
                      title={tool.label}
                    >
                      <div className="text-2xl mb-1">{tool.icon}</div>
                      <div className="text-xs text-slate-500">{tool.label}</div>
                    </div>
                  ))}
                </div>

                <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-xl shadow-emerald-500/30 flex items-center justify-center bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 bg-[length:200%_100%] animate-gradient">
                  <div
                    className="absolute inset-0 animate-shimmer"
                    style={{
                      backgroundImage: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                      backgroundSize: "200% 100%",
                    }}
                  />
                  <div className="relative text-white font-bold">Your Canvas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
