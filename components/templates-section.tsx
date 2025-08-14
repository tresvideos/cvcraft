"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Download } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

const templates = [
  {
    id: 1,
    name: "Ejecutivo Moderno",
    category: "Profesional",
    image: "/modern-executive-cv.png",
    popular: true,
  },
  {
    id: 2,
    name: "Creativo Minimalista",
    category: "Creativo",
    image: "/minimalist-artistic-cv.png",
    popular: false,
  },
  {
    id: 3,
    name: "Tech Innovador",
    category: "Tecnología",
    image: "/tech-cv-template.png",
    popular: true,
  },
  {
    id: 4,
    name: "Clásico Elegante",
    category: "Tradicional",
    image: "/classic-elegant-cv-template.png",
    popular: false,
  },
  {
    id: 5,
    name: "Startup Dinámico",
    category: "Startup",
    image: "/startup-cv-template.png",
    popular: true,
  },
  {
    id: 6,
    name: "Académico Formal",
    category: "Académico",
    image: "/academic-cv-template.png",
    popular: false,
  },
]

const categories = ["Todos", "Profesional", "Creativo", "Tecnología", "Tradicional", "Startup", "Académico"]

export function TemplatesSection() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const { setRedirectAfterLogin } = useAuth()

  const filteredTemplates =
    selectedCategory === "Todos" ? templates : templates.filter((template) => template.category === selectedCategory)

  const handleUseTemplate = (templateId: number) => {
    setRedirectAfterLogin(`/editor/cv?template=${templateId}`)
  }

  const handleViewAllTemplates = () => {}

  return (
    <section
      id="plantillas"
      className="py-20 sm:py-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
            Plantillas diseñadas por{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              expertos
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Más de 50 diseños profesionales creados por especialistas en recursos humanos y optimizados para sistemas
            ATS.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                  : "bg-white/50 backdrop-blur-sm border-purple-200 hover:bg-white/80"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="group overflow-hidden border-0 bg-gradient-to-br from-white/80 to-purple-50/50 dark:from-gray-900/80 dark:to-purple-950/50 backdrop-blur-sm hover:from-white/90 hover:to-purple-50/70 dark:hover:from-gray-900/90 dark:hover:to-purple-950/70 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <div className="relative">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {template.popular && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
                    Popular
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Vista previa
                  </Button>
                  <Link href="/register" onClick={() => handleUseTemplate(template.id)}>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Usar plantilla
                    </Button>
                  </Link>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/templates" onClick={handleViewAllTemplates}>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 bg-white/50 backdrop-blur-sm border-2 border-purple-300 hover:bg-white/80 hover:border-purple-400 transition-all duration-300 shadow-lg"
            >
              Ver todas las plantillas
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
