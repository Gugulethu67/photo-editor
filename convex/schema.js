import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table - synced with Clerk authentication
  users: defineTable({
    // Basic user info from Clerk
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()), // Profile picture

    // Updated plan types to match your pricing component (keeping old "free"/"pro" for backward compatibility)
    plan: v.union(
      v.literal("free_user"),     // Creator (Free) - $0/month
      v.literal("creator"),       // Creator (Paid) - $14.99/month
      v.literal("professional")   // Professional - $49.99/month
    ),

    // Clerk plan IDs for subscription management
    clerkPlanId: v.optional(v.string()), // Stores the actual Clerk plan ID

    // Usage tracking for plan limits
    projectsUsed: v.number(), // Current project count
    enhancementsUsedThisMonth: v.optional(v.number()), // Monthly enhancement limit tracking (optional for existing users)
    exportsThisMonth: v.number(), // Monthly export limit tracking

    // Plan-specific usage limits (based on current plan)
    monthlyEnhancementLimit: v.optional(v.number()), // null for unlimited
    monthlyExportLimit: v.optional(v.number()), // null for unlimited
    projectLimit: v.optional(v.number()), // null for unlimited

    // Feature access flags (optional for existing users)
    hasCommercialLicense: v.optional(v.boolean()),
    hasAdvancedUpscaling: v.optional(v.boolean()),
    hasPriorityProcessing: v.optional(v.boolean()),
    hasApiAccess: v.optional(v.boolean()),
    hasCustomTraining: v.optional(v.boolean()),
    hasWhiteLabel: v.optional(v.boolean()),

    // Activity timestamps
    createdAt: v.number(),
    lastActiveAt: v.number(),
    planUpdatedAt: v.optional(v.number()), // When plan was last changed

    // Billing cycle tracking
    billingCycleStart: v.optional(v.number()), // For usage reset
    billingCycleEnd: v.optional(v.number()),

  }).index("by_token", ["tokenIdentifier"])
   .index("by_email", ["email"]) // Email lookups
   .index("by_plan", ["plan"]) // Plan-based queries
   .index("by_clerk_plan_id", ["clerkPlanId"]) // Clerk subscription lookups
   .searchIndex("search_name", { searchField: "name" }) // User search
   .searchIndex("search_email", { searchField: "email" }),

  // Main projects table - stores editing sessions
  projects: defineTable({
    // Basic project info
    title: v.string(),
    userId: v.id("users"), // Owner reference

    // Canvas dimensions and state
    canvasState: v.any(), // Fabric.js canvas JSON (objects, layers, etc.)
    width: v.number(), // Canvas width in pixels
    height: v.number(), // Canvas height in pixels

    // Image pipeline - tracks image transformations
    originalImageUrl: v.optional(v.string()), // Initial uploaded image
    currentImageUrl: v.optional(v.string()), // Current processed image
    thumbnailUrl: v.optional(v.string()), // Small preview for dashboard

    // ImageKit transformation state
    activeTransformations: v.optional(v.string()), // Current ImageKit URL params

    // AI features state - tracks what AI processing has been applied
    backgroundRemoved: v.optional(v.boolean()), // Has background been removed
    enhancementsApplied: v.optional(v.number()), // Count of AI enhancements used (optional for existing projects)
    upscalingApplied: v.optional(v.boolean()), // Has quantum upscaling been used
    
    // Processing quality level (based on plan) - optional for existing projects
    processingTier: v.optional(v.union(
      v.literal("standard"), // Free plan
      v.literal("advanced"),  // Creator plan
      v.literal("premium")   // Professional plan
    )),

    // Organization
    folderId: v.optional(v.id("folders")), // Optional folder organization

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(), // Last edit time
  })
    .index("by_user", ["userId"]) // Get user's projects
    .index("by_user_updated", ["userId", "updatedAt"]) // Recent projects
    .index("by_folder", ["folderId"]), // Projects in folder

  // Simple folder organization
  folders: defineTable({
    name: v.string(), // Folder name
    userId: v.id("users"), // Owner
    createdAt: v.number(),
  }).index("by_user", ["userId"]), // User's folders

  // Usage tracking table for detailed analytics
  usageEvents: defineTable({
    userId: v.id("users"),
    eventType: v.union(
      v.literal("enhancement"), // AI enhancement used
      v.literal("export"), // Project exported
      v.literal("upscaling"), // Quantum upscaling used
      v.literal("background_removal"), // Background removal used
      v.literal("api_call") // API usage (professional plan)
    ),
    projectId: v.optional(v.id("projects")), // Associated project
    metadata: v.optional(v.any()), // Additional event data
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_type", ["userId", "eventType"])
    .index("by_user_date", ["userId", "createdAt"]),

  // Plan limits configuration (for easy updates)
  planLimits: defineTable({
    planType: v.union(
      v.literal("free_user"),
      v.literal("creator"),
      v.literal("professional")
    ),
    
    // Limits
    monthlyEnhancements: v.optional(v.number()), // null = unlimited
    monthlyExports: v.optional(v.number()), // null = unlimited
    maxProjects: v.optional(v.number()), // null = unlimited
    
    // Feature flags
    advancedUpscaling: v.boolean(),
    commercialLicense: v.boolean(),
    priorityProcessing: v.boolean(),
    apiAccess: v.boolean(),
    customTraining: v.boolean(),
    whiteLabel: v.boolean(),
    support24x7: v.boolean(),
    
    // Processing capabilities
    processingTier: v.union(
      v.literal("standard"),
      v.literal("advanced"),
      v.literal("premium")
    ),
    
    updatedAt: v.number(),
  }).index("by_plan_type", ["planType"]),
});

/* 
PLAN LIMITS BREAKDOWN:

FREE_USER (Creator Free - $0/month):
- 1000 monthly enhancements
- Basic quantum upscaling
- Standard processing speed
- Neural background removal
- Limited projects

CREATOR ($14.99/month):
- Unlimited enhancements
- Advanced quantum upscaling  
- Predictive enhancement AI
- Priority processing
- Commercial license
- Unlimited projects

PROFESSIONAL ($49.99/month):
- Everything in Creator
- Custom AI model training
- Dedicated processing cores
- API access
- White-label solutions
- 24/7 neural support
- Premium processing tier

CLERK PLAN IDS:
- Creator: "cplan_31XvoSWDiVazusAgu4j6LNyODNY"
- Professional: "cplan_31XwIYPtNT6iq1Aprwl3dDDsuGU"
*/