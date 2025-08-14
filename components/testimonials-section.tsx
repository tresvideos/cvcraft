import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "María González",
    role: "Marketing Manager",
    company: "Tech Solutions",
    content:
      "CVCraft me ayudó a conseguir mi trabajo soñado. La IA generó descripciones perfectas que destacaron mi experiencia.",
    rating: 5,
    avatar: "/professional-woman-avatar.png",
  },
  {
    name: "Carlos Rodríguez",
    role: "Desarrollador Senior",
    company: "StartupXYZ",
    content:
      "Las plantillas son increíbles y el proceso es súper rápido. En 15 minutos tenía un CV que parecía diseñado por un profesional.",
    rating: 5,
    avatar: "/professional-man-avatar.png",
  },
  {
    name: "Ana Martín",
    role: "Diseñadora UX",
    company: "Creative Agency",
    content: "La variedad de diseños es impresionante. Encontré la plantilla perfecta para mi perfil creativo.",
    rating: 5,
    avatar: "/creative-woman-avatar.png",
  },
  {
    name: "David López",
    role: "Consultor Financiero",
    company: "Finance Corp",
    content: "Excelente herramienta. Me permitió crear múltiples versiones de mi CV adaptadas a diferentes puestos.",
    rating: 5,
    avatar: "/business-man-avatar.png",
  },
  {
    name: "Laura Sánchez",
    role: "Project Manager",
    company: "Global Industries",
    content:
      "La función de IA es increíble. Generó contenido que yo nunca habría pensado incluir y que realmente marca la diferencia.",
    rating: 5,
    avatar: "/professional-woman-manager-avatar.png",
  },
  {
    name: "Miguel Torres",
    role: "Ingeniero de Software",
    company: "Tech Innovate",
    content: "Interfaz intuitiva y resultados profesionales. Recomiendo CVCraft a todos mis colegas.",
    rating: 5,
    avatar: "/engineer-man-avatar.png",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
            Lo que dicen nuestros{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">usuarios</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Más de 2 millones de profesionales han conseguido trabajo usando CVCraft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} en {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
