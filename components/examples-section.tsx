"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Star } from "lucide-react"
import Link from "next/link"

const examples = [
  {
    id: 1,
    name: "María González",
    profession: "Desarrolladora Frontend",
    experience: "3 años",
    image: "/modern-developer-cv.png",
    template: "Tech Innovador",
    rating: 4.9,
    description: "CV optimizado para posiciones tech con proyectos destacados",
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    profession: "Director de Marketing",
    experience: "8 años",
    image: "/executive-marketing-director-cv-template.png",
    template: "Ejecutivo Moderno",
    rating: 4.8,
    description: "Perfil ejecutivo con métricas de rendimiento y logros cuantificados",
  },
  {
    id: 3,
    name: "Ana Martín",
    profession: "Diseñadora UX/UI",
    experience: "5 años",
    image: "/minimalist-ux-ui-resume.png",
    template: "Creativo Minimalista",
    rating: 5.0,
    description: "Portfolio visual integrado con casos de estudio destacados",
  },
  {
    id: 4,
    name: "David López",
    profession: "Recién Graduado",
    experience: "0 años",
    image: "/fresh-graduate-cv.png",
    template: "Académico Formal",
    rating: 4.7,
    description: "Primer CV profesional destacando formación y proyectos académicos",
  },
  {
    id: 5,
    name: "Laura Sánchez",
    profession: "Product Manager",
    experience: "6 años",
    image: "/product-manager-cv-startup.png",
    template: "Startup Dinámico",
    rating: 4.9,
    description: "Enfoque en liderazgo de producto y crecimiento de startups",
  },
  {
    id: 6,
    name: "Roberto Fernández",
    profession: "Consultor Senior",
    experience: "12 años",
    image: "/senior-consultant-cv-template.png",
    template: "Clásico Elegante",
    rating: 4.8,
    description: "Perfil senior con experiencia internacional y certificaciones",
  },
]

export function ExamplesSection() {
  return (
    <section
      id="ejemplos"
      className="py-20 sm:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950/20 dark:via-blue-950/20 dark:to-indigo-950/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
            CVs reales que consiguieron{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              el trabajo
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Descubre cómo profesionales de diferentes sectores han usado nuestras plantillas para destacar y conseguir
            sus empleos soñados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example) => (
            <Card
              key={example.id}
              className="group overflow-hidden border-0 bg-gradient-to-br from-white/90 to-blue-50/50 dark:from-gray-900/90 dark:to-blue-950/50 backdrop-blur-sm hover:from-white/95 hover:to-blue-50/70 dark:hover:from-gray-900/95 dark:hover:to-blue-950/70 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <div className="relative">
                <img
                  src={example.image || `/placeholder.svg?height=300&width=400&query=${example.profession} CV example`}
                  alt={`CV de ${example.name}`}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                    ✓ Contratado
                  </Badge>
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {example.rating}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver ejemplo
                  </Button>
                  <Link href="/register">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Usar plantilla
                    </Button>
                  </Link>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{example.name}</h3>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{example.profession}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {example.experience} exp.
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{example.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Plantilla: {example.template}</span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {example.rating}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/templates">
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Crear mi CV ahora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
