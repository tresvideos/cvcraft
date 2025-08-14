export async function GET(request: Request) {
  try {
    // TODO: Obtener user_id del token de autenticación
    const userId = "temp_user_id"

    // TODO: Conectar con Supabase para obtener cover letters reales
    const coverLetters = []

    return Response.json({ coverLetters })
  } catch (error) {
    return Response.json({ error: "Error al obtener cartas" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, data } = body

    // TODO: Obtener user_id del token de autenticación
    const userId = "temp_user_id"

    // TODO: Guardar en Supabase
    const newCoverLetter = {
      id: Date.now().toString(),
      user_id: userId,
      title,
      data,
      last_modified: new Date().toISOString(),
      status: "draft",
      created_at: new Date().toISOString(),
    }

    return Response.json({ coverLetter: newCoverLetter })
  } catch (error) {
    return Response.json({ error: "Error al crear carta" }, { status: 500 })
  }
}
