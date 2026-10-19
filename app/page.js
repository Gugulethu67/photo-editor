"use client"

import Link from "next/link";
import { Sparkles } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/HeroSection";
import InteractiveStats from "@/components/InteractiveStats";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/pricing";
import GlassButton from "@/components/GlassButton";
import { useParallax } from "@/hooks/use-parallax";

export default function Home() {
  const scrollY = useParallax();

  return (
    <div className="pt-36">
      <CustomCursor />

      <HeroSection />
      <InteractiveStats />
      <FeaturesSection />
      <PricingSection />

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div
            className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 border border-emerald-100 rounded-3xl p-12 shadow-xl shadow-emerald-500/10"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-emerald-200/50 blur-3xl animate-blob" />
            <div className="relative">
              <h2 className="text-5xl font-bold mb-6">
                <span className="text-gradient">Ready to Transform Reality?</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Join thousands of creators who are already shaping the future of digital art with neural precision.
              </p>
              <Link href="/dashboard" className="inline-block">
                <GlassButton size="lg">
                  Start Your Journey <Sparkles className="w-6 h-6" />
                </GlassButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 border-t border-emerald-100 bg-white/60">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-3xl font-bold mb-4">
            <span className="text-gradient">NeuralEdit</span>
          </div>
          <p className="text-slate-500">
            © {new Date().getFullYear()} NeuralEdit. Redefining the boundaries of digital creativity.
          </p>
        </div>
      </footer>
    </div>
  );
}
