"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FileText, Sparkles, Briefcase, Palette, Code, GraduationCap, Heart, Zap } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"

const templates = [
  {
    id: "modern-executive",
    name: "Ejecutivo Moderno",
    description: "Diseño limpio y profesional para ejecutivos",
    category: "Profesional",
    image: "/modern-executive-cv.png",
    color: "bg-blue-50 border-blue-200",
    icon: <Briefcase className="h-5 w-5 text-blue-600" />,
  },
  {
    id: "minimalist-artistic",
    name: "Artístico Minimalista",
    description: "Perfecto para creativos y diseñadores",
    category: "Creativo",
    image: "/minimalist-artistic-cv.png",
    color: "bg-purple-50 border-purple-200",
    icon: <Palette className="h-5 w-5 text-purple-600" />,
  },
  {
    id: "tech-professional",
    name: "Tecnológico",
    description: "Ideal para desarrolladores y profesionales IT",
    category: "Tecnología",
    image: "/tech-cv-template.png",
    color: "bg-green-50 border-green-200",
    icon: <Code className="h-5 w-5 text-green-600" />,
  },
  {
    id: "classic-elegant",
    name: "Clásico Elegante",
    description: "Tradicional y sofisticado para cualquier sector",
    category: "Clásico",
    image: "/classic-elegant-cv-template.png",
    color: "bg-gray-50 border-gray-200",
    icon: <FileText className="h-5 w-5 text-gray-600" />,
  },
  {
    id: "startup-dynamic",
    name: "Startup Dinámico",
    description: "Energético y moderno para startups",
    category: "Startup",
    image: "/startup-cv-template.png",
    color: "bg-orange-50 border-orange-200",
    icon: <Zap className="h-5 w-5 text-orange-600" />,
  },
  {
    id: "academic-research",
    name: "Académico",
    description: "Formal y detallado para el ámbito académico",
    category: "Académico",
    image: "/academic-cv-template.png",
    color: "bg-indigo-50 border-indigo-200",
    icon: <GraduationCap className="h-5 w-5 text-indigo-600" />,
  },
]

export default function CreateCVPage() {
  const { user, setRedirectAfterLogin } = useAuth()
  const router = useRouter()

  const handleUseTemplate = (templateId: string) => {
    if (user) {
      router.push(`/editor/cv?template=${templateId}`)
    } else {
      setRedirectAfterLogin(`/editor/cv?template=${templateId}`)
      router.push("/register")
    }
  }

  const handleStartBlank = () => {
    if (user) {
      router.push("/editor/cv")
    } else {
      setRedirectAfterLogin("/editor/cv")
      router.push("/register")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-sans font-bold text-gray-900 mb-4">Elige tu Plantilla de CV</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecciona una plantilla profesional o comienza desde cero para crear tu CV perfecto
          </p>
        </div>

        {/* Start from Blank Option */}
        <Card className="mb-12 border-2 border-dashed border-purple-300 bg-gradient-to-r from-purple-50 to-indigo-50 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-white rounded-full shadow-lg mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-sans font-bold text-gray-900 mb-2">Empezar en Blanco</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Crea tu CV desde cero con total libertad creativa y personalización completa
              </p>
              <Button
                onClick={handleStartBlank}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Empezar en Blanco
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-sans font-bold text-gray-900 mb-6 text-center">
            O Elige una Plantilla Profesional
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`${template.color} hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {template.icon}
                      <Badge variant="secondary" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-sans group-hover:text-purple-700 transition-colors">
                    {template.name}
                  </CardTitle>
                  <CardDescription className="text-sm">{template.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Template Preview */}
                  <div className="relative aspect-[3/4] bg-white rounded-lg shadow-md overflow-hidden border-2 border-white group-hover:border-purple-200 transition-colors">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={`Plantilla ${template.name}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-white/80 hover:bg-white border-gray-300 hover:border-purple-300 transition-colors"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Vista Previa
                    </Button>
                    <Button
                      onClick={() => handleUseTemplate(template.id)}
                      size="sm"
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Usar Plantilla
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">¿No encuentras lo que buscas?</p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-white/80"
          >
            <Link href="/templates">Ver Todas las Plantillas</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
