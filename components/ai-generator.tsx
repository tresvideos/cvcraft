"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Loader2 } from "lucide-react"

interface AIGeneratorProps {
  type: "summary" | "experience" | "skills" | "cover-letter"
  onGenerate: (content: string) => void
  currentContent?: string
  context?: {
    position?: string
    company?: string
    industry?: string
    experience?: string
  }
}

export function AIGenerator({ type, onGenerate, currentContent, context }: AIGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [tone, setTone] = useState("professional")
  const [length, setLength] = useState("medium")
  const [generationProgress, setGenerationProgress] = useState(0)

  const getTitle = () => {
    switch (type) {
      case "summary":
        return "Generar Resumen Profesional"
      case "experience":
        return "Generar Descripción de Experiencia"
      case "skills":
        return "Sugerir Habilidades"
      case "cover-letter":
        return "Generar Carta de Presentación"
      default:
        return "Generar Contenido"
    }
  }

  const getDescription = () => {
    switch (type) {
      case "summary":
        return "La IA creará un resumen profesional personalizado basado en tu información"
      case "experience":
        return "Describe tus responsabilidades y logros para generar una descripción profesional"
      case "skills":
        return "La IA sugerirá habilidades relevantes para tu perfil profesional"
      case "cover-letter":
        return "Genera una carta de presentación personalizada para la posición"
      default:
        return "Genera contenido personalizado con IA"
    }
  }

  const getPlaceholder = () => {
    switch (type) {
      case "summary":
        return "Ej: Desarrollador frontend con 5 años de experiencia en React y TypeScript..."
      case "experience":
        return "Ej: Desarrollé aplicaciones web, lideré un equipo de 3 personas, implementé nuevas funcionalidades..."
      case "skills":
        return "Ej: Trabajo en desarrollo web frontend, uso principalmente React y JavaScript..."
      case "cover-letter":
        return "Ej: Quiero aplicar para el puesto de desarrollador frontend en una startup tecnológica..."
      default:
        return "Describe lo que necesitas generar..."
    }
  }

  const generateContent = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + Math.random() * 20
        })
      }, 200)

      // Simulate AI generation with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      clearInterval(progressInterval)
      setGenerationProgress(100)

      let generatedContent = ""

      switch (type) {
        case "summary":
          generatedContent = `Profesional ${tone === "creative" ? "innovador y creativo" : "experimentado y orientado a resultados"} con sólida experiencia en ${prompt.includes("desarrollo") ? "desarrollo de software" : "su campo profesional"}. Demostrada capacidad para ${tone === "professional" ? "liderar proyectos complejos y entregar soluciones de alta calidad" : "pensar fuera de la caja y crear soluciones innovadoras"}. ${length === "long" ? "Especializado en tecnologías modernas y metodologías ágiles, con un historial comprobado de mejora de procesos y optimización de rendimiento. Apasionado por el aprendizaje continuo y la colaboración en equipos multidisciplinarios." : "Comprometido con la excelencia y el crecimiento profesional continuo."}`
          break
        case "experience":
          generatedContent = `• ${tone === "professional" ? "Desarrollé e implementé" : "Creé de manera innovadora"} soluciones ${prompt.includes("web") ? "web" : "tecnológicas"} que mejoraron la eficiencia operativa en un 30%
• ${tone === "professional" ? "Lideré" : "Dirigí creativamente"} un equipo de ${Math.floor(Math.random() * 5) + 2} profesionales en proyectos de alto impacto
• ${tone === "professional" ? "Colaboré estrechamente" : "Trabajé de manera dinámica"} con stakeholders para definir requisitos y entregar productos de calidad
• ${tone === "professional" ? "Implementé" : "Introduje innovadoramente"} mejores prácticas que resultaron en una reducción del 25% en tiempo de desarrollo${length === "long" ? "\n• Mentoré a desarrolladores junior y contribuí a la cultura de aprendizaje del equipo\n• Participé activamente en la planificación estratégica y toma de decisiones técnicas" : ""}`
          break
        case "skills":
          generatedContent =
            "JavaScript, TypeScript, React, Node.js, HTML5, CSS3, Git, Agile/Scrum, Problem Solving, Team Leadership"
          break
        case "cover-letter":
          generatedContent = `Estimado/a responsable de contratación,

Me dirijo a ustedes con gran interés en la posición ${context?.position || "disponible"} en ${context?.company || "su empresa"}. ${tone === "professional" ? "Mi experiencia profesional y habilidades técnicas" : "Mi pasión por la innovación y experiencia diversa"} me convierten en un candidato ideal para este rol.

${prompt.includes("desarrollo") ? "Como desarrollador con experiencia comprobada" : "Con mi background profesional"}, he ${tone === "professional" ? "demostrado consistentemente" : "mostrado de manera creativa"} mi capacidad para entregar resultados excepcionales. ${length === "long" ? "Mi enfoque en la colaboración, la innovación y la excelencia técnica me ha permitido contribuir significativamente al éxito de los equipos y proyectos en los que he participado." : ""}

Estoy ${tone === "professional" ? "entusiasmado" : "emocionado"} por la oportunidad de contribuir al crecimiento y éxito de ${context?.company || "su organización"}. Agradezco su consideración y espero poder discutir cómo mis habilidades pueden beneficiar a su equipo.

Atentamente,
[Tu nombre]`
          break
      }

      onGenerate(generatedContent)
      setIsOpen(false)
      setPrompt("")
      setGenerationProgress(0)
    } catch (error) {
      console.error("Error generating content:", error)
    } finally {
      setIsGenerating(false)
      setGenerationProgress(0)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generar con IA
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span>{getTitle()}</span>
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">{getDescription()}</DialogDescription>
        </DialogHeader>

        {isGenerating && (
          <div className="space-y-4 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
                  <div className="absolute inset-0 rounded-full border-2 border-purple-200 animate-pulse" />
                </div>
                <div>
                  <p className="font-medium text-purple-900 dark:text-purple-100">IA generando contenido...</p>
                  <p className="text-sm text-purple-600 dark:text-purple-300">
                    Analizando tu información y creando contenido personalizado
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">{Math.round(generationProgress)}%</p>
              </div>
            </div>
            <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="h-4 bg-purple-200 dark:bg-purple-800 rounded animate-pulse" />
                <div className="h-4 bg-purple-200 dark:bg-purple-800 rounded animate-pulse w-3/4" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-indigo-200 dark:bg-indigo-800 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-indigo-200 dark:bg-indigo-800 rounded animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {!isGenerating && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="prompt" className="text-base font-medium">
                Información adicional
              </Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={getPlaceholder()}
                rows={4}
                className="resize-none text-base"
              />
              <p className="text-sm text-muted-foreground">
                Proporciona detalles específicos para obtener mejores resultados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="tone" className="text-base font-medium">
                  Tono del contenido
                </Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">🎯 Profesional</SelectItem>
                    <SelectItem value="creative">🎨 Creativo</SelectItem>
                    <SelectItem value="casual">😊 Casual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="length" className="text-base font-medium">
                  Longitud del texto
                </Label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger className="text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">📝 Corto (2-3 líneas)</SelectItem>
                    <SelectItem value="medium">📄 Medio (1 párrafo)</SelectItem>
                    <SelectItem value="long">📋 Largo (2+ párrafos)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {currentContent && (
              <div className="space-y-3">
                <Label className="text-base font-medium">Contenido actual</Label>
                <div className="p-4 bg-muted rounded-lg text-sm max-h-32 overflow-y-auto border">{currentContent}</div>
                <p className="text-sm text-muted-foreground">El nuevo contenido reemplazará el texto actual</p>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsOpen(false)} className="px-6">
                Cancelar
              </Button>
              <Button
                onClick={generateContent}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generar con IA
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
