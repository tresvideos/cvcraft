"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Users, Award } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/theme-context"

export function HeroSection() {
  const { setRedirectAfterLogin } = useAuth()
  const { t } = useTheme()

  const handleStartNow = () => {
    setRedirectAfterLogin("/editor/cv")
  }

  const featuredTemplates = [
    {
      id: "modern",
      name: "Moderno",
      image: "/modern-executive-cv.png",
      description: "Diseño limpio y profesional",
    },
    {
      id: "creative",
      name: "Creativo",
      image: "/minimalist-artistic-cv.png",
      description: "Perfecto para diseñadores",
    },
    {
      id: "classic",
      name: "Clásico",
      image: "/classic-elegant-cv-template.png",
      description: "Elegante y tradicional",
    },
  ]

  const handleUseTemplate = (templateId: string) => {
    setRedirectAfterLogin(`/editor/cv?template=${templateId}`)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-950/20 dark:via-indigo-950/20 dark:to-blue-950/20 py-12 sm:py-20 lg:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 sm:mb-8 inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-200/20 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-300 shadow-lg">
            <Sparkles className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-purple-600 dark:text-purple-400" />
            Más de 2 millones de CVs creados
          </div>

          {/* Main heading */}
          <h1 className="mb-4 sm:mb-6 text-2xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-tight">
            {t("hero.title").split(", ")[0]},{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              {t("hero.title").split(", ")[1]}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-8 sm:mb-10 text-base sm:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Link href="/register" onClick={handleStartNow} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t("hero.cta.start")}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link href="/templates" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-white/50 backdrop-blur-sm border-purple-200 hover:bg-white/80 hover:border-purple-300 transition-all duration-300"
              >
                {t("hero.cta.templates")}
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground px-4 sm:px-0">
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
              <span>+2M usuarios activos</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
              <span>4.8/5 estrellas</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600" />
              <span>Tecnología IA avanzada</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
