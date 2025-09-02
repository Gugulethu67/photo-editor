"use client"
import { Crown, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PricingTable } from "@clerk/nextjs"
import { usePlanAccess } from "@/hooks/use-plan-access"

export function UpgradeModal({ isOpen, onClose, restrictedTool, reason }) {
  const { getUpgradeOptions } = usePlanAccess()

  const getToolName = (toolId) => {
    const toolNames = {
      background: "AI Background Tools",
      ai_extender: "AI Image Extender",
      ai_edit: "AI Editor",
      projects: "Project Creation",
      ai_enhance: "AI Enhancement",
      quantum_upscaling: "Advanced Quantum Upscaling",
      api: "API Access",
      custom_ai: "Custom AI Model Training",
    }
    return toolNames[toolId] || "Premium Feature"
  }

  // Get the upgrade options based on current plan
  const upgradeOptions = getUpgradeOptions()

  console.log("UpgradeModal render:", { isOpen, restrictedTool, reason }) // Debug log

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-slate-800 border-white/10 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-yellow-500" />
            <DialogTitle className="text-2xl font-bold text-white">Upgrade to Unlock More</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Restriction Message */}
          {restrictedTool && (
            <Alert className="bg-amber-500/10 border-amber-500/20">
              <Zap className="h-5 w-5 text-amber-400" />
              <AlertDescription className="text-amber-300/80">
                <div className="font-semibold text-amber-400 mb-1">{getToolName(restrictedTool)} - Premium Feature</div>
                {reason ||
                  `${getToolName(restrictedTool)} is only available on paid plans. Upgrade now to unlock this powerful feature and more.`}
              </AlertDescription>
            </Alert>
          )}

          {/* Custom Pricing Display (fallback if Clerk PricingTable fails) */}
          {upgradeOptions.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white text-center mb-6">Choose Your Plan</h3>

              <div className="grid md:grid-cols-2 gap-6">
                {upgradeOptions.map((option, index) => (
                  <div
                    key={option.plan}
                    className={`border-2 rounded-xl p-6 ${
                      index === 0 ? "border-cyan-400 bg-cyan-400/5" : "border-purple-400 bg-purple-400/5"
                    }`}
                  >
                    <div className="text-center mb-6">
                      <h4 className={`text-2xl font-bold mb-2 ${index === 0 ? "text-cyan-400" : "text-purple-400"}`}>
                        {option.plan === "creator_paid" ? "Creator Pro" : "Professional"}
                      </h4>
                      <div className="text-3xl font-bold text-white">
                        {option.price}
                        <span className="text-lg font-normal text-white/70">/{option.billing}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {option.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/90">
                          <div
                            className={`w-1.5 h-1.5 rounded-full mt-2 ${index === 0 ? "bg-cyan-400" : "bg-purple-400"}`}
                          />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={index === 0 ? "default" : "primary"}
                      className={`w-full ${
                        index === 0 ? "bg-cyan-500 hover:bg-cyan-600" : "bg-purple-500 hover:bg-purple-600"
                      }`}
                      onClick={() => {
                        // Handle upgrade logic here
                        console.log(`Upgrade to ${option.plan}`)
                        // You can redirect to your billing page or trigger Clerk upgrade
                      }}
                    >
                      Upgrade to {option.plan === "creator_paid" ? "Creator Pro" : "Professional"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clerk Pricing Table (if available) */}
          <div className="hidden">
            <PricingTable />
          </div>
        </div>

        <DialogFooter className="justify-center">
          <Button variant="ghost" onClick={onClose} className="text-white/70 hover:text-white">
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
