"use client"
import { useInView } from "react-intersection-observer"
import { useState } from "react"

export default function FeatureCard({ icon, title, description, delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      ref={ref}
      className={`backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:bg-white/10 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-hover
    >
      <div className={`text-4xl mb-4 transition-transform duration-300 ${isHovered ? "scale-110 rotate-12" : ""}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-white/70 leading-relaxed">{description}</p>
    </div>
  )
}
