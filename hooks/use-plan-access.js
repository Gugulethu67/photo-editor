"use client"

import { useUser } from "@clerk/nextjs"

export function usePlanAccess() {
  const { user } = useUser()

  // Get the user's current plan from their public metadata
  // This should match the values in your database schema
  const userPlan = user?.publicMetadata?.plan || "free_user"

  // Define plan types to match your database schema
  const PLAN_TYPES = {
    FREE_USER: "free_user",     // Creator (Free) - $0/month
    CREATOR: "creator",         // Creator (Paid) - $14.99/month  
    PROFESSIONAL: "professional", // Professional - $49.99/month
  }

  // Plan limits and features
  const PLAN_LIMITS = {
    [PLAN_TYPES.FREE_USER]: {
      maxProjects: 3,
      monthlyEnhancements: 1000,
      features: ["neural_background_removal", "basic_quantum_upscaling", "standard_processing_speed"],
      displayName: "Creator (Free)",
      clerkPlanId: null, // No Clerk plan for free
    },
    [PLAN_TYPES.CREATOR]: {
      maxProjects: Number.POSITIVE_INFINITY, // Unlimited
      monthlyEnhancements: Number.POSITIVE_INFINITY, // Unlimited
      features: [
        "neural_background_removal",
        "unlimited_enhancements",
        "advanced_quantum_upscaling",
        "predictive_enhancement_ai",
        "priority_processing",
        "commercial_license",
      ],
      displayName: "Creator",
      clerkPlanId: "cplan_31XvoSWDiVazusAgu4j6LNyODNY",
    },
    [PLAN_TYPES.PROFESSIONAL]: {
      maxProjects: Number.POSITIVE_INFINITY, // Unlimited
      monthlyEnhancements: Number.POSITIVE_INFINITY, // Unlimited
      features: [
        "neural_background_removal",
        "unlimited_enhancements",
        "advanced_quantum_upscaling",
        "predictive_enhancement_ai",
        "priority_processing",
        "commercial_license",
        "custom_ai_model_training",
        "dedicated_processing_cores",
        "api_access",
        "white_label_solutions",
        "24_7_neural_support",
      ],
      displayName: "Professional",
      clerkPlanId: "cplan_31XwIYPtNT6iq1Aprwl3dDDsuGU",
    },
  }

  // Get current plan configuration
  const currentPlan = PLAN_LIMITS[userPlan] || PLAN_LIMITS[PLAN_TYPES.FREE_USER]

  // Helper functions
  const isFreePlan = () => userPlan === PLAN_TYPES.FREE_USER
  const isCreatorPlan = () => userPlan === PLAN_TYPES.CREATOR
  const isProfessional = () => userPlan === PLAN_TYPES.PROFESSIONAL
  const isPaidPlan = () => isCreatorPlan() || isProfessional()

  // Project limits
  const canCreateProject = (currentProjectCount = 0) => {
    if (isFreePlan()) {
      return currentProjectCount < currentPlan.maxProjects
    }
    return true // Unlimited for paid plans
  }

  // Enhancement limits (for AI tools usage)
  const canUseEnhancements = (currentUsage = 0) => {
    if (isFreePlan()) {
      return currentUsage < currentPlan.monthlyEnhancements
    }
    return true // Unlimited for paid plans
  }

  // Feature access checks
  const hasFeature = (featureName) => {
    return currentPlan.features.includes(featureName)
  }

  // Specific feature checks based on your pricing
  const canUseNeuralBackgroundRemoval = () => hasFeature("neural_background_removal")
  const canUseAdvancedUpscaling = () => hasFeature("advanced_quantum_upscaling")
  const canUsePredictiveAI = () => hasFeature("predictive_enhancement_ai")
  const canUsePriorityProcessing = () => hasFeature("priority_processing")
  const hasCommercialLicense = () => hasFeature("commercial_license")
  const canUseCustomAITraining = () => hasFeature("custom_ai_model_training")
  const hasAPIAccess = () => hasFeature("api_access")
  const hasWhiteLabel = () => hasFeature("white_label_solutions")
  const has24_7Support = () => hasFeature("24_7_neural_support")

  // AI tool restrictions (for upgrade modal)
  const getToolRestriction = (toolId) => {
    const toolRestrictions = {

      // Always free tools
    resize: {
      allowed: true,
      requiredPlan: PLAN_TYPES.FREE_USER,
      upgradeMessage: "Resize is available on all plans.",
    },
    crop: {
      allowed: true,
      requiredPlan: PLAN_TYPES.FREE_USER,
      upgradeMessage: "Crop is available on all plans.",
    },
    adjust: {
      allowed: true,
      requiredPlan: PLAN_TYPES.FREE_USER,
      upgradeMessage: "Adjust is available on all plans.",
    },
    text: {
      allowed: true,
      requiredPlan: PLAN_TYPES.FREE_USER,
      upgradeMessage: "Text is available on all plans.",
    },
      // Background removal tools
      background_removal: {
        allowed: canUseNeuralBackgroundRemoval(),
        requiredPlan: PLAN_TYPES.FREE_USER, // Available on free plan
        upgradeMessage: "Neural Background Removal is available on all plans.",
      },

      // AI Enhancement tools
      ai_enhance: {
        allowed: canUsePredictiveAI(),
        requiredPlan: PLAN_TYPES.CREATOR,
        upgradeMessage: "AI Enhancement requires Creator ($14.99/month) or Professional plan.",
      },

      // Advanced upscaling
      quantum_upscaling: {
        allowed: canUseAdvancedUpscaling(),
        requiredPlan: PLAN_TYPES.CREATOR,
        upgradeMessage: "Advanced Quantum Upscaling requires Creator ($14.99/month) or Professional plan.",
      },

      // Project creation
      projects: {
        allowed: true, // Always allowed to try, but limited
        requiredPlan: PLAN_TYPES.CREATOR,
        upgradeMessage: `Free plan is limited to ${currentPlan.maxProjects} projects. Upgrade to Creator for unlimited projects.`,
      },

      // API access
      api: {
        allowed: hasAPIAccess(),
        requiredPlan: PLAN_TYPES.PROFESSIONAL,
        upgradeMessage: "API Access is only available on the Professional plan ($49.99/month).",
      },

      // Custom AI training
      custom_ai: {
        allowed: canUseCustomAITraining(),
        requiredPlan: PLAN_TYPES.PROFESSIONAL,
        upgradeMessage: "Custom AI Model Training is only available on the Professional plan ($49.99/month).",
      },
    }

    return (
      toolRestrictions[toolId] || {
        allowed: isPaidPlan(),
        requiredPlan: PLAN_TYPES.CREATOR,
        upgradeMessage: "This feature requires a paid plan.",
      }
    )
  }

  // Usage tracking helpers
  const getRemainingProjects = (currentProjectCount = 0) => {
    if (isPaidPlan()) return Number.POSITIVE_INFINITY
    return Math.max(0, currentPlan.maxProjects - currentProjectCount)
  }

  const getRemainingEnhancements = (currentUsage = 0) => {
    if (isPaidPlan()) return Number.POSITIVE_INFINITY
    return Math.max(0, currentPlan.monthlyEnhancements - currentUsage)
  }

  // Plan comparison helpers
  const getUpgradeOptions = () => {
    if (isFreePlan()) {
      return [
        {
          plan: PLAN_TYPES.CREATOR,
          price: "$14.99",
          billing: "month",
          benefits: [
            "Unlimited projects",
            "Unlimited enhancements",
            "Advanced Quantum Upscaling",
            "Predictive Enhancement AI",
            "Priority Processing",
            "Commercial License",
          ],
        },
        {
          plan: PLAN_TYPES.PROFESSIONAL,
          price: "$49.99",
          billing: "month",
          benefits: [
            "Everything in Creator",
            "Custom AI Model Training",
            "Dedicated Processing Cores",
            "API Access",
            "White-label Solutions",
            "24/7 Neural Support",
          ],
        },
      ]
    }

    if (isCreatorPlan()) {
      return [
        {
          plan: PLAN_TYPES.PROFESSIONAL,
          price: "$49.99",
          billing: "month",
          benefits: [
            "Custom AI Model Training",
            "Dedicated Processing Cores",
            "API Access",
            "White-label Solutions",
            "24/7 Neural Support",
          ],
        },
      ]
    }

    return [] // Already on highest plan
  }

  // Check if user has a specific plan (for current plan detection)
  const hasPlan = (planType) => {
    return userPlan === planType
  }

  // Added functions
  const hasAccess = (toolId) => {
    const restriction = getToolRestriction(toolId)
    return restriction.allowed
  }

  const canExport = (currentExports = 0) => {
    return canUseEnhancements(currentExports)
  }

  return {
    // Plan info
    currentPlan: userPlan,
    planDisplayName: currentPlan.displayName,
    planLimits: currentPlan,

    // Plan type checks
    isFree: isFreePlan(),
    isCreator: isCreatorPlan(), // Fixed naming
    isProfessional: isProfessional(),
    isPaid: isPaidPlan(),

    // Plan checking function
    hasPlan,

    // Added functions
    hasAccess,
    canExport,

    // Project management
    canCreateProject,
    getRemainingProjects,
    maxProjects: currentPlan.maxProjects,

    // Enhancement management
    canUseEnhancements,
    getRemainingEnhancements,
    monthlyEnhancementLimit: currentPlan.monthlyEnhancements,

    // Feature access
    hasFeature,
    canUseNeuralBackgroundRemoval,
    canUseAdvancedUpscaling,
    canUsePredictiveAI,
    canUsePriorityProcessing,
    hasCommercialLicense,
    canUseCustomAITraining,
    hasAPIAccess,
    hasWhiteLabel,
    has24_7Support,

    // Tool restrictions
    getToolRestriction,

    // Upgrade helpers
    getUpgradeOptions,

    // Constants for components
    PLAN_TYPES,
  }
}