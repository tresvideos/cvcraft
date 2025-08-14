"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { useAuth } from "@/contexts/auth-context"
import { useSubscription } from "@/contexts/subscription-context"
import { Plus, FileText, Mail, Download, Edit, Trash2, Eye, Calendar, Star, Clock, CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock data for user's CVs and cover letters
const mockCVs = [
  {
    id: "1",
    title: "CV Desarrollador Frontend",
    template: "Moderno",
    lastModified: "2024-01-15",
    downloads: 12,
    status: "published",
  },
  {
    id: "2",
    title: "CV Marketing Digital",
    template: "Profesional",
    lastModified: "2024-01-10",
    downloads: 8,
    status: "draft",
  },
]

const mockCoverLetters = [
  {
    id: "1",
    title: "Carta para Google",
    lastModified: "2024-01-12",
    status: "published",
  },
]

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const { subscription, cancelSubscription } = useSubscription()
  const router = useRouter()

  const [cvs, setCvs] = useState(mockCVs)
  const [editingCv, setEditingCv] = useState(null)
  const [newTitle, setNewTitle] = useState("")
  const [previewCv, setPreviewCv] = useState(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  // Moved handleCancelSubscription function directly into component
  const handleCancelSubscription = async () => {
    if (confirm("¿Estás seguro de que quieres cancelar tu suscripción?")) {
      await cancelSubscription()
    }
  }

  const getTimeRemaining = () => {
    if (!subscription.trialEndsAt) return null
    const now = new Date()
    const end = new Date(subscription.trialEndsAt)
    const diff = end.getTime() - now.getTime()

    if (diff <= 0) return "Expirado"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
      return `${hours}h ${minutes}m restantes`
    }
    return `${minutes}m restantes`
  }

  const handleRenameCV = (cvId, newTitle) => {
    setCvs(cvs.map((cv) => (cv.id === cvId ? { ...cv, title: newTitle } : cv)))
    setEditingCv(null)
    setNewTitle("")
  }

  const handleDeleteCV = (cvId) => {
    if (confirm("¿Estás seguro de que quieres eliminar este CV?")) {
      setCvs(cvs.filter((cv) => cv.id !== cvId))
    }
  }

  const handleEditCV = (cvId) => {
    router.push(`/editor/cv?id=${cvId}`)
  }

  const handlePreviewCV = (cv) => {
    setPreviewCv(cv)
  }

  const handleDownloadCV = async (cv) => {
    if (subscription.plan === "free") {
      // Mostrar modal de pago
      alert("Para descargar tu CV, necesitas activar tu suscripción por solo 0,50€")
      return
    }

    // Simular descarga
    alert(`Descargando ${cv.title}...`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-sans font-bold text-gray-900 mb-2">Bienvenido, {user.name}</h1>
          <p className="text-gray-600">Gestiona tus CVs y cartas de presentación desde aquí</p>
        </div>

        {subscription.plan !== "free" && (
          <Card className="mb-8 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <CreditCard className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {subscription.plan === "trial" ? "Período de Prueba Activo" : "Suscripción Premium"}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      {subscription.plan === "trial" && subscription.trialEndsAt && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{getTimeRemaining()}</span>
                        </div>
                      )}
                      {subscription.nextBillingDate && (
                        <span>Próximo cobro: {subscription.nextBillingDate.toLocaleDateString()} (19,99€)</span>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelSubscription}
                  className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 bg-transparent"
                >
                  Cancelar Suscripción
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">CVs Creados</p>
                  <p className="text-2xl font-bold text-gray-900">{mockCVs.length}</p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cartas</p>
                  <p className="text-2xl font-bold text-gray-900">{mockCoverLetters.length}</p>
                </div>
                <Mail className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Descargas</p>
                  <p className="text-2xl font-bold text-gray-900">{subscription.plan === "free" ? "0" : "∞"}</p>
                </div>
                <Download className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Plan</p>
                  <p className="text-2xl font-bold text-gray-900 capitalize">
                    {subscription.plan === "free" ? "Gratuito" : subscription.plan === "trial" ? "Prueba" : "Premium"}
                  </p>
                </div>
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-2 border-dashed border-purple-200 hover:border-purple-300 transition-colors">
            <CardContent className="p-8 text-center">
              <Plus className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-sans font-semibold text-gray-900 mb-2">Crear Nuevo CV</h3>
              <p className="text-gray-600 mb-4">Comienza con una plantilla profesional</p>
              <Button
                onClick={() => {
                  router.push("/create-cv")
                }}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Crear CV
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-dashed border-purple-200 hover:border-purple-300 transition-colors">
            <CardContent className="p-8 text-center">
              <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-sans font-semibold text-gray-900 mb-2">Crear Carta de Presentación</h3>
              <p className="text-gray-600 mb-4">Complementa tu CV con una carta personalizada</p>
              <Button
                asChild
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
              >
                <Link href="/editor/cover-letter">Crear Carta</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* CVs Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-sans font-bold text-gray-900">Mis CVs</h2>
            <Button
              onClick={() => {
                router.push("/create-cv")
              }}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo CV
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv) => (
              <Card key={cv.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-sans truncate">{cv.title}</CardTitle>
                    <Badge variant={cv.status === "published" ? "default" : "secondary"}>
                      {cv.status === "published" ? "Publicado" : "Borrador"}
                    </Badge>
                  </div>
                  <CardDescription>Plantilla: {cv.template}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {cv.lastModified}
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {cv.downloads}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => handlePreviewCV(cv)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => handleEditCV(cv.id)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    </div>

                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => {
                              setEditingCv(cv.id)
                              setNewTitle(cv.title)
                            }}
                          >
                            Renombrar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Renombrar CV</DialogTitle>
                            <DialogDescription>Cambia el nombre de tu curriculum vitae</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="title" className="text-right">
                                Título
                              </Label>
                              <Input
                                id="title"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              onClick={() => handleRenameCV(cv.id, newTitle)}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              Guardar cambios
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleDownloadCV(cv)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                        onClick={() => handleDeleteCV(cv.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cover Letters Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-sans font-bold text-gray-900">Mis Cartas de Presentación</h2>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
            >
              <Link href="/editor/cover-letter">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Carta
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCoverLetters.map((letter) => (
              <Card key={letter.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-sans truncate">{letter.title}</CardTitle>
                    <Badge variant={letter.status === "published" ? "default" : "secondary"}>
                      {letter.status === "published" ? "Publicado" : "Borrador"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {letter.lastModified}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {previewCv && (
          <Dialog open={!!previewCv} onOpenChange={() => setPreviewCv(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Vista Previa: {previewCv.title}</DialogTitle>
                <DialogDescription>Plantilla: {previewCv.template}</DialogDescription>
              </DialogHeader>
              <div className="bg-white border rounded-lg p-8 min-h-[600px]">
                <div className="text-center text-gray-500 py-20">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">Vista previa del CV</p>
                  <p className="text-sm">Aquí se mostraría el contenido completo del CV</p>
                  <p className="text-xs mt-2 text-gray-400">Plantilla: {previewCv.template}</p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => handleEditCV(previewCv.id)} className="bg-purple-600 hover:bg-purple-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar CV
                </Button>
                <Button onClick={() => handleDownloadCV(previewCv)} className="bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  )
}
