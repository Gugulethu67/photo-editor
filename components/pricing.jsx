"use client"

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

// Custom intersection observer hook
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, isIntersecting];
};

function PricingCard({ plan, price, features, buttonText, planId, featured, delay = 0 }) {
  const [ref, inView] = useIntersectionObserver();
  const [isHovered, setIsHovered] = useState(false);
  const { has, isLoaded } = useAuth();

  // Check if user has this specific plan
  const isCurrentPlan = isLoaded && planId ? has?.({ plan: planId }) : false;

  const handleCheckout = async () => {
    if (isCurrentPlan || !planId) return;

    try {
      // For free plans, you might want different logic
      if (price === 0) {
        // Handle free plan signup
        console.log("Signing up for free plan");
        return;
      }

      // Open Clerk's checkout for paid plans
      if (window.Clerk && window.Clerk.__internal_openCheckout) {
        await window.Clerk.__internal_openCheckout({
          planId: planId,
          planPeriod: "month",
          subscriberType: "user",
        });
      } else {
        console.error("Clerk checkout not available");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl p-8 transition-all duration-700 transform ${
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${
        featured
          ? "backdrop-blur-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-2 border-purple-400/50 scale-105 shadow-2xl shadow-purple-500/25"
          : "backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10"
      } hover:scale-105 hover:shadow-xl group`}
      style={{ 
        transitionDelay: `${delay}ms`,
        animationDelay: `${delay}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{plan}</h3>
        <div className="flex items-baseline justify-center">
          <span className={`text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}>
            ${price}
          </span>
          <span className="text-white/60 ml-2">/month</span>
        </div>
      </div>

      <ul className="mb-8 space-y-4">
        {features.map((feature, i) => (
          <li 
            key={i} 
            className="text-white/80 flex items-center gap-3 group-hover:text-white transition-all duration-300"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            <div className={`w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
              inView ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            }`}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="transition-all duration-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleCheckout}
        disabled={isCurrentPlan || !isLoaded}
        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group ${
          featured
            ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25"
            : "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40"
        }`}
      >
        {/* Button shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <span className="relative z-10">
          {!isLoaded ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Loading...
            </div>
          ) : isCurrentPlan ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Current Plan
            </div>
          ) : (
            buttonText
          )}
        </span>
      </button>

      {/* Floating particles effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-70 animate-ping"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 2) * 60}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CustomPricingSection() {
  const plans = [
    {
      id: "free_user",
      plan: "Creator",
      price: 0,
      features: [
        "Neural Background Removal",
        "1000 Monthly Enhancements",
        "Basic Quantum Upscaling",
        "Standard Processing Speed",
      ],
      planId: "free_user",
      buttonText: "Start Creating",
    },
    {
      id: "creator",
      plan: "Creator",
      price: 14.99,
      features: [
        "Everything in Creator",
        "Unlimited Enhancements",
        "Advanced Quantum Upscaling",
        "Predictive Enhancement AI",
        "Priority Processing",
        "Commercial License",
      ],
      planId:"cplan_31XvoSWDiVazusAgu4j6LNyODNY",
      buttonText: "Unleash Power",
    },
    {
      id: "professional",
      plan: "Professional",
      price: 49.99,
      features: [
        "Everything in Professional",
        "Custom AI Model Training",
        "Dedicated Processing Cores",
        "API Access",
        "White-label Solutions",
        "24/7 Neural Support",
      ],
      planId:"cplan_31XwIYPtNT6iq1Aprwl3dDDsuGU",
      buttonText: "Contact Sales",
    },
  ];

  return (
    <section id="pricing" className="py-32 relative overflow-hidden z-0">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Choose Your Power
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Unlock the full potential of neural image processing with plans designed for every creator
          </p>
        </div>

        {/* <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard 
              key={plan.id} 
              {...plan} 
              delay={index * 200}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}