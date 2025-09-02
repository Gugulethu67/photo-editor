"use client"

import CustomCursor from "@/components/CustomCursor";
import FloatingShapes from "@/components/FloatingShapes";
import GlassNavigation from "@/components/GlassNavigation";
import HeroSection from "@/components/HeroSection";
import InteractiveStats from "@/components/InteractiveStats";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/pricing";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useParallax } from "@/hooks/use-parallax";
import { Sparkles } from "lucide-react";
import GlassButton from "@/components/GlassButton";
import { PricingTable } from "@clerk/nextjs";


export default function Home() {
  const scrollY = useParallax();
  return (
    <div className="pt-59 ">
      <CustomCursor />
      <FloatingShapes />
      {/* <GlassNavigation /> */}

      <main>
        <HeroSection />
        <div className="py-12 relative"></div>
        <InteractiveStats />
        <FeaturesSection />
        <PricingSection />
        {/* <PricingTable/> */}
        

        {/* CTA Section */}
        <section className="py-32 relative">
          <div className="max-w-4xl mx-auto text-center px-6">
            <div 
              className="backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-3xl p-12"
              style={{ transform: `translateY(${scrollY * 0.05}px)` }}
            >
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Ready to Transform Reality?
                </span>
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Join thousands of creators who are already shaping the future of digital art with neural precision.
              </p>
              <GlassButton variant="primary" size="lg">
                Start Your Journey <Sparkles className="w-6 h-6" />
              </GlassButton>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              NeuralEdit
            </span>
          </div>
          <p className="text-white/60">
            © 2025 NeuralEdit. Redefining the boundaries of digital creativity.
          </p>
        </div>
      </footer>
    </div>
  );
}
