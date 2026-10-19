"use client"
import AnimatedCounter from "@/components/AnimatedCounter"

const STATS = [
  { target: 1000000, suffix: "+", label: "Images Enhanced" },
  { target: 50000, suffix: "+", label: "Happy Creators" },
  { target: 99, suffix: "%", label: "Satisfaction Rate" },
]

export default function InteractiveStats() {
  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-300"
            >
              <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              <p className="text-slate-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
