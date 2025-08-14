import { type NextRequest, NextResponse } from "next/server"

// Simulamos una base de datos de variables de entorno
let environmentVariables: Record<string, string> = {}

export async function GET() {
  try {
    // En producción, esto vendría de una base de datos segura
    return NextResponse.json(environmentVariables)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener variables" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const variables = await request.json()

    // Validar que las variables requeridas estén presentes
    const requiredVariables = [
      "STRIPE_PUBLISHABLE_KEY",
      "STRIPE_SECRET_KEY",
      "GOOGLE_CLIENT_ID",
      "GOOGLE_CLIENT_SECRET",
      "NEXTAUTH_URL",
    ]

    for (const required of requiredVariables) {
      if (!variables[required]) {
        return NextResponse.json({ error: `Variable requerida faltante: ${required}` }, { status: 400 })
      }
    }

    // Guardar variables (en producción, esto iría a una base de datos segura)
    environmentVariables = { ...environmentVariables, ...variables }

    // Actualizar variables de entorno del proceso (solo para desarrollo)
    Object.entries(variables).forEach(([key, value]) => {
      if (typeof value === "string") {
        process.env[key] = value
      }
    })

    return NextResponse.json({ success: true, message: "Variables guardadas correctamente" })
  } catch (error) {
    return NextResponse.json({ error: "Error al guardar variables" }, { status: 500 })
  }
}
