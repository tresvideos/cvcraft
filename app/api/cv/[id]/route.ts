export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { title, template, data } = body

    // TODO: Actualizar en Supabase
    const updatedCV = {
      id: params.id,
      title,
      template,
      data,
      last_modified: new Date().toISOString(),
    }

    return Response.json({ cv: updatedCV })
  } catch (error) {
    return Response.json({ error: "Error al actualizar CV" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // TODO: Eliminar de Supabase
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: "Error al eliminar CV" }, { status: 500 })
  }
}
