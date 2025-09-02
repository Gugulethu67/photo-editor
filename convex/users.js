import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if we've already stored this identity before
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { 
          name: identity.name,
          lastActiveAt: Date.now(),
        });
      }
      return user._id;
    }

    // If it's a new identity, create a new `User`.
    const now = Date.now();
    const billingCycleEnd = now + (30 * 24 * 60 * 60 * 1000); // 30 days from now

    return await ctx.db.insert("users", {
      name: identity.name ?? "Anonymous",
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email ?? "",
      imageUrl: identity.pictureUrl,
      plan: "free_user", // Fixed: Use correct plan value from schema
      projectsUsed: 0,
      exportsThisMonth: 0,
      enhancementsUsedThisMonth: 0,
      
      // Plan limits for free users
      monthlyEnhancementLimit: 1000,
      monthlyExportLimit: 100,
      projectLimit: 3,
      
      // Feature flags for free plan
      hasCommercialLicense: false,
      hasAdvancedUpscaling: false,
      hasPriorityProcessing: false,
      hasApiAccess: false,
      hasCustomTraining: false,
      hasWhiteLabel: false,
      
      // Timestamps
      createdAt: now,
      lastActiveAt: now,
      planUpdatedAt: now,
      billingCycleStart: now,
      billingCycleEnd: billingCycleEnd,
    });
  },
});

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
});

// Update user plan (for webhook or manual updates)
export const updatePlan = mutation({
  args: {
    tokenIdentifier: v.string(),
    plan: v.union(
      v.literal("free_user"),
      v.literal("creator"), 
      v.literal("professional")
    ),
    clerkPlanId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", args.tokenIdentifier))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    // Define plan-specific limits and features
    const planConfigs = {
      "free_user": {
        monthlyEnhancementLimit: 1000,
        monthlyExportLimit: 100,
        projectLimit: 3,
        hasCommercialLicense: false,
        hasAdvancedUpscaling: false,
        hasPriorityProcessing: false,
        hasApiAccess: false,
        hasCustomTraining: false,
        hasWhiteLabel: false,
      },
      "creator": {
        monthlyEnhancementLimit: null, // unlimited
        monthlyExportLimit: null, // unlimited
        projectLimit: null, // unlimited
        hasCommercialLicense: true,
        hasAdvancedUpscaling: true,
        hasPriorityProcessing: true,
        hasApiAccess: false,
        hasCustomTraining: false,
        hasWhiteLabel: false,
      },
      "professional": {
        monthlyEnhancementLimit: null, // unlimited
        monthlyExportLimit: null, // unlimited
        projectLimit: null, // unlimited
        hasCommercialLicense: true,
        hasAdvancedUpscaling: true,
        hasPriorityProcessing: true,
        hasApiAccess: true,
        hasCustomTraining: true,
        hasWhiteLabel: true,
      },
    };

    const config = planConfigs[args.plan];
    const now = Date.now();

    await ctx.db.patch(user._id, {
      plan: args.plan,
      clerkPlanId: args.clerkPlanId || null,
      planUpdatedAt: now,
      lastActiveAt: now,
      // Reset billing cycle
      billingCycleStart: now,
      billingCycleEnd: now + (30 * 24 * 60 * 60 * 1000),
      // Reset usage counters
      enhancementsUsedThisMonth: 0,
      exportsThisMonth: 0,
      // Apply plan configuration
      ...config,
    });

    return user._id;
  },
});

// Fix existing user plans (run once to migrate old "free"/"pro" plans)
export const migrateUserPlans = mutation({
  args: {},
  handler: async (ctx) => {
    // Get all users with old plan values
    const usersToMigrate = await ctx.db
      .query("users")
      .filter((q) => 
        q.or(
          q.eq(q.field("plan"), "free"),
          q.eq(q.field("plan"), "pro")
        )
      )
      .collect();

    const results = [];

    for (const user of usersToMigrate) {
      let newPlan = "free_user";
      
      // Map old plan values to new ones
      if (user.plan === "free") {
        newPlan = "free_user";
      } else if (user.plan === "pro") {
        newPlan = "creator"; // Assume "pro" was the paid plan
      }

      const planConfigs = {
        "free_user": {
          monthlyEnhancementLimit: 1000,
          monthlyExportLimit: 100,
          projectLimit: 3,
          hasCommercialLicense: false,
          hasAdvancedUpscaling: false,
          hasPriorityProcessing: false,
          hasApiAccess: false,
          hasCustomTraining: false,
          hasWhiteLabel: false,
        },
        "creator": {
          monthlyEnhancementLimit: null,
          monthlyExportLimit: null,
          projectLimit: null,
          hasCommercialLicense: true,
          hasAdvancedUpscaling: true,
          hasPriorityProcessing: true,
          hasApiAccess: false,
          hasCustomTraining: false,
          hasWhiteLabel: false,
        },
      };

      const config = planConfigs[newPlan];
      const now = Date.now();

      await ctx.db.patch(user._id, {
        plan: newPlan,
        planUpdatedAt: now,
        lastActiveAt: now,
        billingCycleStart: now,
        billingCycleEnd: now + (30 * 24 * 60 * 60 * 1000),
        enhancementsUsedThisMonth: user.enhancementsUsedThisMonth || 0,
        ...config,
      });

      results.push({
        userId: user._id,
        oldPlan: user.plan,
        newPlan: newPlan,
      });
    }

    return results;
  },
});

// Get user by email (helpful for admin tasks)
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Manual plan update (for admin use)
export const updateUserPlanById = mutation({
  args: {
    userId: v.id("users"),
    plan: v.union(
      v.literal("free_user"),
      v.literal("creator"),
      v.literal("professional")
    ),
    clerkPlanId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const planConfigs = {
      "free_user": {
        monthlyEnhancementLimit: 1000,
        monthlyExportLimit: 100,
        projectLimit: 3,
        hasCommercialLicense: false,
        hasAdvancedUpscaling: false,
        hasPriorityProcessing: false,
        hasApiAccess: false,
        hasCustomTraining: false,
        hasWhiteLabel: false,
      },
      "creator": {
        monthlyEnhancementLimit: null,
        monthlyExportLimit: null,
        projectLimit: null,
        hasCommercialLicense: true,
        hasAdvancedUpscaling: true,
        hasPriorityProcessing: true,
        hasApiAccess: false,
        hasCustomTraining: false,
        hasWhiteLabel: false,
      },
      "professional": {
        monthlyEnhancementLimit: null,
        monthlyExportLimit: null,
        projectLimit: null,
        hasCommercialLicense: true,
        hasAdvancedUpscaling: true,
        hasPriorityProcessing: true,
        hasApiAccess: true,
        hasCustomTraining: true,
        hasWhiteLabel: true,
      },
    };

    const config = planConfigs[args.plan];
    const now = Date.now();

    await ctx.db.patch(args.userId, {
      plan: args.plan,
      clerkPlanId: args.clerkPlanId || null,
      planUpdatedAt: now,
      lastActiveAt: now,
      billingCycleStart: now,
      billingCycleEnd: now + (30 * 24 * 60 * 60 * 1000),
      enhancementsUsedThisMonth: 0,
      exportsThisMonth: 0,
      ...config,
    });

    return { success: true };
  },
});