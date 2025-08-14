"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface SubscriptionData {
  isActive: boolean
  plan: "free" | "trial" | "premium"
  trialEndsAt: Date | null
  nextBillingDate: Date | null
  downloadsUsed: number
  maxDownloads: number
  stripeCustomerId?: string
  stripeSubscriptionId?: string
}

interface SubscriptionContextType {
  subscription: SubscriptionData
  startTrial: () => Promise<boolean>
  cancelSubscription: () => Promise<boolean>
  reactivateSubscription: () => Promise<boolean>
  canDownload: boolean
  initiatePurchase: () => Promise<boolean>
  updateSubscriptionFromStripe: (data: any) => void
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<SubscriptionData>({
    isActive: false,
    plan: "free",
    trialEndsAt: null,
    nextBillingDate: null,
    downloadsUsed: 0,
    maxDownloads: 0,
  })

  const canDownload = subscription.plan !== "free" || subscription.downloadsUsed < subscription.maxDownloads

  const initiatePurchase = async (): Promise<boolean> => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || "price_cv_download",
          mode: "subscription",
          trialPeriodDays: 2,
          metadata: {
            user_id: "current_user_id", // Obtener del contexto de auth
            product_type: "cv_download",
            timestamp: new Date().toISOString(),
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { sessionId } = await response.json()

      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe not loaded")
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (error) {
        console.error("Stripe checkout error:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Payment initiation failed:", error)
      return false
    }
  }

  const startTrial = async (): Promise<boolean> => {
    return initiatePurchase()
  }

  const cancelSubscription = async (): Promise<boolean> => {
    if (!subscription.stripeSubscriptionId) {
      return false
    }

    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: subscription.stripeSubscriptionId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to cancel subscription")
      }

      const result = await response.json()

      // Actualizar estado local
      setSubscription((prev) => ({
        ...prev,
        isActive: false,
        plan: "free",
        nextBillingDate: null,
      }))

      return result.success
    } catch (error) {
      console.error("Subscription cancellation failed:", error)
      return false
    }
  }

  const reactivateSubscription = async (): Promise<boolean> => {
    if (!subscription.stripeSubscriptionId) {
      return false
    }

    try {
      const response = await fetch("/api/subscription/reactivate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: subscription.stripeSubscriptionId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to reactivate subscription")
      }

      const result = await response.json()

      // Actualizar estado local
      setSubscription((prev) => ({
        ...prev,
        isActive: true,
        plan: "premium",
      }))

      return result.success
    } catch (error) {
      console.error("Subscription reactivation failed:", error)
      return false
    }
  }

  const updateSubscriptionFromStripe = (stripeData: any) => {
    const now = new Date()
    let plan: "free" | "trial" | "premium" = "free"
    let isActive = false
    let nextBillingDate: Date | null = null
    let trialEndsAt: Date | null = null

    if (stripeData.status === "active") {
      isActive = true
      plan = stripeData.trial_end && new Date(stripeData.trial_end * 1000) > now ? "trial" : "premium"
      nextBillingDate = new Date(stripeData.current_period_end * 1000)

      if (plan === "trial") {
        trialEndsAt = new Date(stripeData.trial_end * 1000)
      }
    }

    setSubscription((prev) => ({
      ...prev,
      isActive,
      plan,
      trialEndsAt,
      nextBillingDate,
      stripeCustomerId: stripeData.customer,
      stripeSubscriptionId: stripeData.id,
      maxDownloads: isActive ? 999 : 0,
    }))

    // Guardar en localStorage
    localStorage.setItem(
      "cvcraft_subscription",
      JSON.stringify({
        isActive,
        plan,
        trialEndsAt: trialEndsAt?.toISOString(),
        nextBillingDate: nextBillingDate?.toISOString(),
        stripeCustomerId: stripeData.customer,
        stripeSubscriptionId: stripeData.id,
        downloadsUsed: subscription.downloadsUsed,
        maxDownloads: isActive ? 999 : 0,
      }),
    )
  }

  // Load subscription from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cvcraft_subscription")
    if (saved) {
      try {
        const data = JSON.parse(saved)
        const now = new Date()

        // Check if trial has expired
        if (data.trialEndsAt && new Date(data.trialEndsAt) < now && data.plan === "trial") {
          // Convert to premium subscription or cancel
          const nextBilling = data.nextBillingDate ? new Date(data.nextBillingDate) : null

          setSubscription({
            ...data,
            plan: nextBilling && nextBilling > now ? "premium" : "free",
            isActive: nextBilling && nextBilling > now,
            trialEndsAt: null,
            nextBillingDate: nextBilling,
          })
        } else {
          setSubscription({
            ...data,
            trialEndsAt: data.trialEndsAt ? new Date(data.trialEndsAt) : null,
            nextBillingDate: data.nextBillingDate ? new Date(data.nextBillingDate) : null,
          })
        }
      } catch (error) {
        console.error("Error loading subscription:", error)
      }
    }
  }, [])

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        startTrial,
        cancelSubscription,
        reactivateSubscription,
        canDownload,
        initiatePurchase,
        updateSubscriptionFromStripe,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider")
  }
  return context
}
