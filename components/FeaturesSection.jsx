"use client"
import FeatureCard from "./FeatureCard"

const FEATURES = [
  {
    icon: "🧠",
    title: "Neural Background Removal",
    description: "Advanced AI algorithms instantly detect and remove backgrounds with pixel-perfect precision.",
  },
  {
    icon: "⚡",
    title: "Quantum Upscaling",
    description: "Enhance image resolution up to 16x while preserving every detail using quantum processing.",
  },
  {
    icon: "🎨",
    title: "Style Transfer Matrix",
    description: "Apply artistic styles from master painters or create your own unique aesthetic filters.",
  },
  {
    icon: "🔮",
    title: "Predictive Enhancement",
    description: "AI predicts and applies the perfect adjustments before you even know you need them.",
  },
  {
    icon: "🌈",
    title: "Color Harmony Engine",
    description: "Automatically balance colors and create stunning palettes that captivate viewers.",
  },
  {
    icon: "⚙️",
    title: "Batch Processing Core",
    description: "Process thousands of images simultaneously with our distributed AI infrastructure.",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 relative scroll-mt-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-gradient">Unleash Creative Power</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Revolutionary AI tools that understand your creative vision and amplify it beyond imagination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
