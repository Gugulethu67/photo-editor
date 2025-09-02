"use client"
import AnimatedCounter from "@/components/AnimatedCounter"

export default function InteractiveStats() {
  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
            <AnimatedCounter target={1000000} suffix="+" />
            <p className="text-white/70 mt-2">Images Enhanced</p>
          </div>
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
            <AnimatedCounter target={50000} suffix="+" />
            <p className="text-white/70 mt-2">Happy Creators</p>
          </div>
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
            <AnimatedCounter target={99} suffix="%" />
            <p className="text-white/70 mt-2">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}
