import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { downloadPrice, monthlyPrice, yearlyPrice } = await request.json()

    // Actualizar o crear productos en Stripe
    const downloadProduct = await stripe.products.create({
      name: "Descarga de CV",
      description: "Descarga tu CV en formato PDF",
    })

    const downloadPriceObj = await stripe.prices.create({
      product: downloadProduct.id,
      unit_amount: Math.round(downloadPrice * 100), // Convertir a centavos
      currency: "eur",
    })

    const subscriptionProduct = await stripe.products.create({
      name: "CVCraft Premium",
      description: "Acceso completo a todas las funciones premium",
    })

    const monthlyPriceObj = await stripe.prices.create({
      product: subscriptionProduct.id,
      unit_amount: Math.round(monthlyPrice * 100),
      currency: "eur",
      recurring: { interval: "month" },
    })

    const yearlyPriceObj = await stripe.prices.create({
      product: subscriptionProduct.id,
      unit_amount: Math.round(yearlyPrice * 100),
      currency: "eur",
      recurring: { interval: "year" },
    })

    // Actualizar variables de entorno con los nuevos price IDs
    // En producción, esto se haría a través de tu sistema de configuración

    return NextResponse.json({
      success: true,
      priceIds: {
        download: downloadPriceObj.id,
        monthly: monthlyPriceObj.id,
        yearly: yearlyPriceObj.id,
      },
    })
  } catch (error) {
    console.error("Error updating Stripe prices:", error)
    return NextResponse.json({ error: "Error updating prices" }, { status: 500 })
  }
}
