import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(request: NextRequest) {
  try {
    const { category } = await request.json()

    switch (category) {
      case "stripe":
        return await testStripeConnection()
      case "oauth":
        return await testOAuthConnection()
      case "general":
        return await testGeneralConnection()
      default:
        return NextResponse.json({ error: "Categoría no válida" }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Error en la prueba de conexión" }, { status: 500 })
  }
}

async function testStripeConnection() {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      return NextResponse.json({ error: "Clave secreta de Stripe no configurada" }, { status: 400 })
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" })

    // Probar conexión obteniendo información de la cuenta
    await stripe.accounts.retrieve()

    return NextResponse.json({ success: true, message: "Conexión con Stripe exitosa" })
  } catch (error) {
    return NextResponse.json({ error: "Error al conectar con Stripe" }, { status: 500 })
  }
}

async function testOAuthConnection() {
  try {
    const googleClientId = process.env.GOOGLE_CLIENT_ID
    const facebookAppId = process.env.FACEBOOK_APP_ID

    if (!googleClientId || !facebookAppId) {
      return NextResponse.json({ error: "Credenciales OAuth no configuradas" }, { status: 400 })
    }

    // Validar formato de las credenciales
    if (!googleClientId.includes(".googleusercontent.com")) {
      return NextResponse.json({ error: "Google Client ID inválido" }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "Credenciales OAuth válidas" })
  } catch (error) {
    return NextResponse.json({ error: "Error al validar OAuth" }, { status: 500 })
  }
}

async function testGeneralConnection() {
  try {
    const nextAuthUrl = process.env.NEXTAUTH_URL
    const nextAuthSecret = process.env.NEXTAUTH_SECRET

    if (!nextAuthUrl || !nextAuthSecret) {
      return NextResponse.json({ error: "Variables generales no configuradas" }, { status: 400 })
    }

    // Validar formato de URL
    try {
      new URL(nextAuthUrl)
    } catch {
      return NextResponse.json({ error: "NEXTAUTH_URL inválida" }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "Configuración general válida" })
  } catch (error) {
    return NextResponse.json({ error: "Error al validar configuración general" }, { status: 500 })
  }
}
