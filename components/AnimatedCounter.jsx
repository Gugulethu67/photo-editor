"use client"
import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"

export default function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })
  const animationRef = useRef()

  useEffect(() => {
    if (inView) {
      const start = 0
      const end = Number.parseInt(target, 10)
      if (start === end) return

      let startTime = null

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        setCount(Math.floor(progress * (end - start) + start))
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(step)
        }
      }

      animationRef.current = requestAnimationFrame(step)

      return () => cancelAnimationFrame(animationRef.current)
    }
  }, [inView, target, duration])

  return (
    <div
      ref={ref}
      className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
    >
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}
