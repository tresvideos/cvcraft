import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Palette, Download, Shield, Zap, Globe, FileText, Brain, CheckCircle } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "IA Inteligente",
    description: "Nuestra IA genera contenido personalizado basado en tu experiencia y el puesto al que aplicas.",
  },
  {
    icon: Palette,
    title: "Plantillas Profesionales",
    description: "Más de 50 diseños creados por expertos en recursos humanos y diseño gráfico.",
  },
  {
    icon: Zap,
    title: "Editor Avanzado",
    description: "Modifica tipografía, espaciado y orden de secciones sin instalar ningún software.",
  },
  {
    icon: Download,
    title: "Múltiples Formatos",
    description: "Descarga en PDF, Word, o texto plano. Compatible con todos los sistemas ATS.",
  },
  {
    icon: FileText,
    title: "Cartas de Presentación",
    description: "Crea cartas personalizadas que complementen perfectamente tu CV.",
  },
  {
    icon: CheckCircle,
    title: "Corrección Automática",
    description: "Verificación ortográfica y gramatical en tiempo real para un CV perfecto.",
  },
  {
    icon: Shield,
    title: "Privacidad Total",
    description: "Tus datos están seguros. No compartimos información con terceros.",
  },
  {
    icon: Globe,
    title: "Multiidioma",
    description: "Crea CVs en español, inglés, francés y más idiomas con contenido nativo.",
  },
  {
    icon: Sparkles,
    title: "Sugerencias Inteligentes",
    description: "Recomendaciones de formato y contenido basadas en tu nivel de experiencia.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-32 bg-gradient-to-b from-background to-slate-50/50 dark:to-slate-950/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
            Herramientas que marcan la{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              diferencia
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-4 sm:px-0">
            Todo lo que necesitas para crear documentos profesionales que destaquen entre cientos de candidatos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 bg-gradient-to-br from-white/80 to-purple-50/30 dark:from-gray-900/80 dark:to-purple-950/30 backdrop-blur-sm hover:from-white/90 hover:to-purple-50/50 dark:hover:from-gray-900/90 dark:hover:to-purple-950/50 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-colors border border-purple-200/20">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
