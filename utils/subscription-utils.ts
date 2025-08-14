export const handleCancelSubscription = async (user: any) => {
  if (confirm("¿Estás seguro de que quieres cancelar tu suscripción?")) {
    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      })

      if (response.ok) {
        alert("Suscripción cancelada exitosamente")
        // Recargar la página para actualizar el estado
        window.location.reload()
      } else {
        throw new Error("Error al cancelar suscripción")
      }
    } catch (error) {
      alert("Error al cancelar la suscripción. Inténtalo de nuevo.")
    }
  }
}
