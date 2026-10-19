"use client"

import { PricingTable } from "@clerk/nextjs";
import { useInView } from "react-intersection-observer";

export default function PricingSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="pricing" className="py-32 relative overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-transparent to-green-50/80" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 ${inView ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="text-6xl font-bold mb-6">
            <span className="text-gradient">Choose Your Power</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Unlock the full potential of neural image processing with plans designed for every creator
          </p>
        </div>

        <div className={`max-w-6xl mx-auto ${inView ? "animate-fade-up anim-delay-200" : "opacity-0"}`}>
          <PricingTable />
        </div>
      </div>
    </section>
  );
}
