"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

const allTemplates = [
  {
    id: 1,
    name: "Ejecutivo Moderno",
    category: "Profesional",
    image: "/modern-executive-cv.png",
    popular: true,
    description: "Diseño limpio y profesional perfecto para ejecutivos y gerentes",
  },
  {
    id: 2,
    name: "Creativo Minimalista",
    category: "Creativo",
    image: "/minimalist-artistic-cv.png",
    popular: false,
    description: "Estilo minimalista ideal para profesionales creativos",
  },
  {
    id: 3,
    name: "Tech Innovador",
    category: "Tecnología",
    image: "/tech-cv-template.png",
    popular: true,
    description: "Diseño moderno optimizado para profesionales de tecnología",
  },
  {
    id: 4,
    name: "Clásico Elegante",
    category: "Tradicional",
    image: "/classic-elegant-cv-template.png",
    popular: false,
    description: "Formato tradicional y elegante para sectores conservadores",
  },
  {
    id: 5,
    name: "Startup Dinámico",
    category: "Startup",
    image: "/startup-cv-template.png",
    popular: true,
    description: "Diseño audaz y dinámico perfecto para startups y empresas jóvenes",
  },
  {
    id: 6,
    name: "Académico Formal",
    category: "Académico",
    image: "/academic-cv-template.png",
    popular: false,
    description: "Formato académico ideal para investigadores y profesores",
  },
  {
    id: 7,
    name: "Marketing Creativo",
    category: "Creativo",
    image: "/colorful-marketing-cv.png",
    popular: true,
    description: "Diseño vibrante perfecto para profesionales de marketing",
  },
  {
    id: 8,
    name: "Consultor Premium",
    category: "Profesional",
    image: "/premium-consultant-cv.png",
    popular: false,
    description: "Diseño premium para consultores y asesores de alto nivel",
  },
]

const categories = ["Todos", "Profesional", "Creativo", "Tecnología", "Tradicional", "Startup", "Académico"]

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [previewTemplate, setPreviewTemplate] = useState<(typeof allTemplates)[0] | null>(null)
  const { user, setRedirectAfterLogin } = useAuth()

  const filteredTemplates =
    selectedCategory === "Todos"
      ? allTemplates
      : allTemplates.filter((template) => template.category === selectedCategory)

  const handleUseTemplate = (templateId: number) => {
    if (!user) {
      setRedirectAfterLogin(`/editor/cv?template=${templateId}`)
      window.location.href = "/register"
    } else {
      window.location.href = `/editor/cv?template=${templateId}`
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Link>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Plantillas de CV Profesionales</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explora nuestra colección completa de plantillas diseñadas por expertos y optimizadas para sistemas ATS.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-primary hover:bg-primary/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Templates grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="group overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {template.popular && (
                    <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">Popular</Badge>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary" onClick={() => setPreviewTemplate(template)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Vista previa
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => handleUseTemplate(template.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Usar plantilla
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{template.category}</p>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Modal de vista previa */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{previewTemplate?.name} - Vista Previa</DialogTitle>
          </DialogHeader>
          {previewTemplate && (
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/2">
                  <img
                    src={previewTemplate.image || "/placeholder.svg"}
                    alt={previewTemplate.name}
                    className="w-full rounded-lg border shadow-lg"
                  />
                </div>
                <div className="lg:w-1/2 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{previewTemplate.name}</h3>
                    <Badge variant="secondary" className="mb-3">
                      {previewTemplate.category}
                    </Badge>
                    <p className="text-muted-foreground">{previewTemplate.description}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Características:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Optimizado para sistemas ATS</li>
                      <li>• Diseño profesional y moderno</li>
                      <li>• Fácil personalización</li>
                      <li>• Compatible con múltiples formatos</li>
                    </ul>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      className="flex-1"
                      onClick={() => {
                        setPreviewTemplate(null)
                        handleUseTemplate(previewTemplate.id)
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Usar esta plantilla
                    </Button>
                    <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
                      Cerrar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
