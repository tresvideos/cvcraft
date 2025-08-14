import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

if (!stripeSecretKey) {
  console.warn("STRIPE_SECRET_KEY not found in environment variables")
}

if (!webhookSecret) {
  console.warn("STRIPE_WEBHOOK_SECRET not found in environment variables")
}

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2024-06-20",
    })
  : null

async function updateUserSubscription(customerId: string, status: string, subscriptionId?: string) {
  // Aquí integrarías con tu base de datos real
  console.log(`Updating user subscription: ${customerId} - Status: ${status}`)

  // Ejemplo de integración con Supabase:
  // const { data, error } = await supabase
  //   .from('users')
  //   .update({
  //     subscription_status: status,
  //     subscription_id: subscriptionId,
  //     updated_at: new Date().toISOString()
  //   })
  //   .eq('stripe_customer_id', customerId)
}

async function logWebhookEvent(eventType: string, eventId: string, data: any) {
  console.log(`Webhook Event: ${eventType} - ID: ${eventId}`, data)

  // Guardar en base de datos para auditoría
  // const { error } = await supabase
  //   .from('webhook_events')
  //   .insert({
  //     event_type: eventType,
  //     event_id: eventId,
  //     data: data,
  //     processed_at: new Date().toISOString()
  //   })
}

export async function POST(req: NextRequest) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      {
        error:
          "Stripe not configured. Please set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in environment variables.",
      },
      { status: 500 },
    )
  }

  const body = await req.text()
  const signature = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session
        await logWebhookEvent(event.type, event.id, session)

        if (session.customer && session.subscription) {
          await updateUserSubscription(session.customer as string, "active", session.subscription as string)
        }

        // Enviar email de confirmación
        console.log("Payment successful - sending confirmation email")
        break

      case "customer.subscription.created":
        const newSub = event.data.object as Stripe.Subscription
        await logWebhookEvent(event.type, event.id, newSub)

        await updateUserSubscription(newSub.customer as string, newSub.status, newSub.id)
        break

      case "customer.subscription.updated":
        const updatedSub = event.data.object as Stripe.Subscription
        await logWebhookEvent(event.type, event.id, updatedSub)

        await updateUserSubscription(updatedSub.customer as string, updatedSub.status, updatedSub.id)
        break

      case "customer.subscription.deleted":
        const deletedSub = event.data.object as Stripe.Subscription
        await logWebhookEvent(event.type, event.id, deletedSub)

        await updateUserSubscription(deletedSub.customer as string, "cancelled")

        // Enviar email de cancelación
        console.log("Subscription cancelled - sending notification email")
        break

      case "invoice.payment_succeeded":
        const successInvoice = event.data.object as Stripe.Invoice
        await logWebhookEvent(event.type, event.id, successInvoice)

        if (successInvoice.customer && successInvoice.subscription) {
          await updateUserSubscription(
            successInvoice.customer as string,
            "active",
            successInvoice.subscription as string,
          )
        }
        break

      case "invoice.payment_failed":
        const failedInvoice = event.data.object as Stripe.Invoice
        await logWebhookEvent(event.type, event.id, failedInvoice)

        if (failedInvoice.customer) {
          await updateUserSubscription(failedInvoice.customer as string, "past_due")
        }

        // Enviar email de pago fallido
        console.log("Payment failed - sending retry notification")
        break

      case "customer.subscription.trial_will_end":
        const trialSub = event.data.object as Stripe.Subscription
        await logWebhookEvent(event.type, event.id, trialSub)

        // Enviar email recordatorio de fin de prueba
        console.log("Trial ending soon - sending reminder email")
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
        await logWebhookEvent(event.type, event.id, event.data.object)
    }

    return NextResponse.json({ received: true, processed: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Processing failed" }, { status: 500 })
  }
}
