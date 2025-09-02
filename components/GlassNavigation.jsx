"use client"
import React from "react"
import { useState } from "react"

// Glass Navigation Component
export default function GlassNavigation() {
  const [activeLink, setActiveLink] = useState("home")

  const navItems = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full px-6 py-3">
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveLink(item.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeLink === item.id ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}