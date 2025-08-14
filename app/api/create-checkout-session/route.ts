import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  console.warn("STRIPE_SECRET_KEY not found in environment variables")
}

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2024-06-20",
    })
  : null

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        {
          error: "Stripe not configured. Please set STRIPE_SECRET_KEY in environment variables.",
        },
        { status: 500 },
      )
    }

    const { priceId, mode, trialPeriodDays, metadata } = await req.json()

    let customer
    const userEmail = "user@example.com" // Obtener del contexto de auth

    const existingCustomers = await stripe.customers.list({
      email: userEmail,
      limit: 1,
    })

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]
    } else {
      customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          user_id: metadata?.user_id || "unknown",
          created_via: "cvcraft_web",
        },
      })
    }

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      mode: mode,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: trialPeriodDays
        ? {
            trial_period_days: trialPeriodDays,
            metadata: {
              ...metadata,
              trial_days: trialPeriodDays.toString(),
            },
          }
        : undefined,
      success_url: `${req.headers.get("origin")}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${req.headers.get("origin")}/dashboard?cancelled=true`,
      metadata: {
        ...metadata,
        customer_email: userEmail,
        checkout_created_at: new Date().toISOString(),
      },
      allow_promotion_codes: true,
      billing_address_collection: "required",
      tax_id_collection: {
        enabled: true,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 })
  }
}
