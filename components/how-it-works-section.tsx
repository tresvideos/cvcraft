import { Card, CardContent } from "@/components/ui/card"
import { Upload, Sparkles, Download, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Sube tu información",
    description: "Completa tus datos profesionales o importa desde LinkedIn. Nuestro sistema se encarga del resto.",
    step: "01",
  },
  {
    icon: Sparkles,
    title: "IA genera contenido",
    description: "Nuestra inteligencia artificial crea descripciones profesionales adaptadas a tu sector.",
    step: "02",
  },
  {
    icon: Download,
    title: "Descarga y aplica",
    description: "Obtén tu CV en PDF, Word o texto. Listo para enviar a cualquier empresa.",
    step: "03",
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
            Crea tu CV en{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              3 simples pasos
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nuestro proceso optimizado te permite crear un CV profesional en menos de 10 minutos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group h-full">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 relative">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>

              {/* Arrow connector for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
