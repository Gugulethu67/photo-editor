"use client"
import { useInView } from "react-intersection-observer"

export default function FeatureCard({ icon, title, description, delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true })

  return (
    <div
      ref={ref}
      className={`group bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10 ${
        inView ? "animate-fade-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
      data-cursor-hover
    >
      <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-xl bg-emerald-50 text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3 transition-colors group-hover:text-emerald-700">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  )
}
