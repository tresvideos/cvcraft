import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap } from "lucide-react"

const plans = [
  {
    name: "Gratuito",
    price: "0€",
    description: "Para probar la plataforma",
    icon: Zap,
    features: ["Crear CVs ilimitados", "3 plantillas básicas", "Editor básico", "Vista previa", "Soporte por email"],
    cta: "Comenzar gratis",
    popular: false,
    note: "Descarga: 0,50€ por CV",
  },
  {
    name: "Premium",
    price: "19.99€",
    period: "/mes",
    description: "Acceso completo sin límites",
    icon: Crown,
    features: [
      "Descargas ilimitadas",
      "50+ plantillas premium",
      "Cartas de presentación",
      "IA para contenido avanzado",
      "Todos los formatos (PDF, Word, PNG)",
      "Sin marca de agua",
      "Soporte prioritario",
      "Análisis ATS",
    ],
    cta: "Prueba 48h por 0,50€",
    popular: true,
    note: "Cancela cuando quieras",
  },
]

export function PricingSection() {
  return (
    <section id="precios" className="py-20 sm:py-32 bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
            Precios{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              transparentes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Crea tu CV gratis. Paga solo cuando quieras descargarlo. Sin compromisos ocultos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-0 bg-gradient-to-br from-white/80 to-blue-50/50 dark:from-gray-900/80 dark:to-blue-950/50 backdrop-blur-sm hover:from-white/90 hover:to-blue-50/70 dark:hover:from-gray-900/90 dark:hover:to-blue-950/70 transition-all duration-300 shadow-lg hover:shadow-2xl ${plan.popular ? "ring-2 ring-purple-500 scale-105 from-purple-50/80 to-pink-50/50 dark:from-purple-950/80 dark:to-pink-950/50" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
                  Recomendado
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl mx-auto ${plan.popular ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20" : "bg-gradient-to-br from-blue-500/10 to-indigo-500/10"}`}
                >
                  <plan.icon
                    className={`h-6 w-6 ${plan.popular ? "text-purple-600 dark:text-purple-400" : "text-blue-600 dark:text-blue-400"}`}
                  />
                </div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                {plan.note && <p className="text-xs text-muted-foreground mt-2">{plan.note}</p>}
              </CardHeader>

              <CardContent className="pt-0">
                <Button
                  className={`w-full mb-6 ${plan.popular ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"}`}
                  variant={plan.popular ? "default" : "default"}
                >
                  {plan.cta}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check
                        className={`h-4 w-4 flex-shrink-0 ${plan.popular ? "text-purple-600" : "text-blue-600"}`}
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-lg p-6 max-w-2xl mx-auto border border-blue-200/30 shadow-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">¿Cómo funciona?</h3>
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <p>
                1. <strong>Crea tu CV gratis</strong> - Sin límites, todas las herramientas disponibles
              </p>
              <p>
                2. <strong>Paga solo para descargar</strong> - 0,50€ inicia tu prueba de 48 horas
              </p>
              <p>
                3. <strong>Decide si continuar</strong> - Cancela antes de 48h o continúa con 19,99€/mes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
