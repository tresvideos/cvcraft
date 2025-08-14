export async function GET(request: Request) {
  try {
    // TODO: Obtener user_id del token de autenticación
    const userId = "temp_user_id" // Placeholder hasta implementar auth real

    // TODO: Conectar con Supabase para obtener CVs reales
    // Por ahora devolvemos datos mock pero con estructura de API real
    const cvs = [
      {
        id: "1",
        user_id: userId,
        title: "CV Desarrollador Frontend",
        template: "modern",
        data: {},
        last_modified: "2024-01-15T10:00:00Z",
        downloads: 12,
        status: "published",
        created_at: "2024-01-10T10:00:00Z",
      },
    ]

    return Response.json({ cvs })
  } catch (error) {
    return Response.json({ error: "Error al obtener CVs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, template, data } = body

    // TODO: Obtener user_id del token de autenticación
    const userId = "temp_user_id"

    // TODO: Guardar en Supabase
    const newCV = {
      id: Date.now().toString(),
      user_id: userId,
      title,
      template,
      data,
      last_modified: new Date().toISOString(),
      downloads: 0,
      status: "draft",
      created_at: new Date().toISOString(),
    }

    return Response.json({ cv: newCV })
  } catch (error) {
    return Response.json({ error: "Error al crear CV" }, { status: 500 })
  }
}
