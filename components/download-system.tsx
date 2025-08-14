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
import { Badge } from "@/components/ui/badge"
import { Download, FileText, File, FileImage, Loader2, Check } from "lucide-react"
import type { CVData } from "@/app/editor/cv/page"
import { useSubscription } from "@/contexts/subscription-context"
import { PaymentModal } from "@/components/payment-modal"

interface DownloadSystemProps {
  cvData: CVData
  template: string
}

export function DownloadSystem({ cvData, template }: DownloadSystemProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState<string | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const { canDownload, subscription } = useSubscription()

  const downloadFormats = [
    {
      id: "pdf",
      name: "PDF",
      description: "Formato universal, ideal para enviar por email",
      icon: FileText,
      premium: false,
    },
    {
      id: "docx",
      name: "Word (DOCX)",
      description: "Editable en Microsoft Word",
      icon: File,
      premium: false,
    },
    {
      id: "txt",
      name: "Texto Plano",
      description: "Formato simple sin formato",
      icon: FileText,
      premium: false,
    },
    {
      id: "png",
      name: "Imagen (PNG)",
      description: "Para compartir en redes sociales",
      icon: FileImage,
      premium: true,
    },
  ]

  const generatePDF = async () => {
    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create a simple text-based PDF content
    const content = `
${cvData.personalInfo.fullName || "CV"}

INFORMACIÓN PERSONAL
${cvData.personalInfo.email ? `Email: ${cvData.personalInfo.email}` : ""}
${cvData.personalInfo.phone ? `Teléfono: ${cvData.personalInfo.phone}` : ""}
${cvData.personalInfo.location ? `Ubicación: ${cvData.personalInfo.location}` : ""}

${cvData.personalInfo.summary ? `RESUMEN PROFESIONAL\n${cvData.personalInfo.summary}\n` : ""}

${
  cvData.experience.length > 0
    ? `EXPERIENCIA LABORAL\n${cvData.experience
        .map(
          (exp) =>
            `${exp.position} - ${exp.company}\n${exp.startDate} - ${exp.current ? "Presente" : exp.endDate}\n${exp.description}\n`,
        )
        .join("\n")}`
    : ""
}

${
  cvData.education.length > 0
    ? `EDUCACIÓN\n${cvData.education
        .map(
          (edu) =>
            `${edu.degree} - ${edu.institution}\n${edu.field}\n${edu.startDate} - ${edu.current ? "Presente" : edu.endDate}\n`,
        )
        .join("\n")}`
    : ""
}

${
  cvData.skills.length > 0
    ? `HABILIDADES\n${cvData.skills.map((skill) => `• ${skill.name} (${skill.level}/5)`).join("\n")}`
    : ""
}

${
  cvData.languages.length > 0
    ? `IDIOMAS\n${cvData.languages.map((lang) => `• ${lang.name} - ${lang.level}`).join("\n")}`
    : ""
}
    `.trim()

    // Create and download the file
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${cvData.personalInfo.fullName || "CV"}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateDOCX = async () => {
    // Simulate DOCX generation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const content = `${cvData.personalInfo.fullName || "CV"}

INFORMACIÓN PERSONAL
${cvData.personalInfo.email ? `Email: ${cvData.personalInfo.email}` : ""}
${cvData.personalInfo.phone ? `Teléfono: ${cvData.personalInfo.phone}` : ""}
${cvData.personalInfo.location ? `Ubicación: ${cvData.personalInfo.location}` : ""}

${cvData.personalInfo.summary ? `RESUMEN PROFESIONAL\n${cvData.personalInfo.summary}\n` : ""}

EXPERIENCIA LABORAL
${cvData.experience
  .map(
    (exp) =>
      `${exp.position} - ${exp.company}\n${exp.startDate} - ${exp.current ? "Presente" : exp.endDate}\n${exp.description}\n`,
  )
  .join("\n")}

EDUCACIÓN
${cvData.education
  .map(
    (edu) =>
      `${edu.degree} - ${edu.institution}\n${edu.field}\n${edu.startDate} - ${edu.current ? "Presente" : edu.endDate}\n`,
  )
  .join("\n")}

HABILIDADES
${cvData.skills.map((skill) => `• ${skill.name} (${skill.level}/5)`).join("\n")}

IDIOMAS
${cvData.languages.map((lang) => `• ${lang.name} - ${lang.level}`).join("\n")}`

    const blob = new Blob([content], { type: "application/msword" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${cvData.personalInfo.fullName || "CV"}.docx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateTXT = async () => {
    // Simulate TXT generation
    await new Promise((resolve) => setTimeout(resolve, 500))

    const content = `${cvData.personalInfo.fullName || "CV"}

INFORMACIÓN PERSONAL
${cvData.personalInfo.email ? `Email: ${cvData.personalInfo.email}` : ""}
${cvData.personalInfo.phone ? `Teléfono: ${cvData.personalInfo.phone}` : ""}
${cvData.personalInfo.location ? `Ubicación: ${cvData.personalInfo.location}` : ""}

${cvData.personalInfo.summary ? `RESUMEN PROFESIONAL\n${cvData.personalInfo.summary}\n` : ""}

EXPERIENCIA LABORAL
${cvData.experience
  .map(
    (exp) =>
      `${exp.position} - ${exp.company}\n${exp.startDate} - ${exp.current ? "Presente" : exp.endDate}\n${exp.description}\n`,
  )
  .join("\n")}

EDUCACIÓN
${cvData.education
  .map(
    (edu) =>
      `${edu.degree} - ${edu.institution}\n${edu.field}\n${edu.startDate} - ${edu.current ? "Presente" : edu.endDate}\n`,
  )
  .join("\n")}

HABILIDADES
${cvData.skills.map((skill) => `• ${skill.name} (${skill.level}/5)`).join("\n")}

IDIOMAS
${cvData.languages.map((lang) => `• ${lang.name} - ${lang.level}`).join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${cvData.personalInfo.fullName || "CV"}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generatePNG = async () => {
    // Simulate PNG generation (premium feature)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    alert("Funcionalidad premium: Actualiza a plan Pro para descargar como imagen")
  }

  const handleDownload = async (format: string) => {
    if (!canDownload) {
      setShowPaymentModal(true)
      return
    }

    setIsDownloading(true)
    setDownloadFormat(format)

    try {
      switch (format) {
        case "pdf":
          await generatePDF()
          break
        case "docx":
          await generateDOCX()
          break
        case "txt":
          await generateTXT()
          break
        case "png":
          await generatePNG()
          break
        default:
          throw new Error("Formato no soportado")
      }
    } catch (error) {
      console.error("Error downloading:", error)
      alert("Error al descargar el archivo")
    } finally {
      setIsDownloading(false)
      setDownloadFormat(null)
      setShowDialog(false)
    }
  }

  return (
    <>
      {/* Advanced Download Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Descargar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-purple-600" />
              <span>Selecciona el formato de descarga</span>
            </DialogTitle>
            <DialogDescription>Elige el formato que mejor se adapte a tus necesidades</DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {downloadFormats.map((format) => {
              const Icon = format.icon
              const isDownloadingThis = isDownloading && downloadFormat === format.id

              return (
                <div
                  key={format.id}
                  className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                    format.premium ? "border-purple-200 bg-purple-50/50" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-8 w-8 text-gray-600" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{format.name}</h3>
                        {format.premium && <Badge variant="secondary">Pro</Badge>}
                        {!canDownload && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            €0,50
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{format.description}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDownload(format.id)}
                    disabled={isDownloading}
                    size="sm"
                    className={
                      format.premium
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        : "bg-purple-600 hover:bg-purple-700"
                    }
                  >
                    {isDownloadingThis ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )
            })}
          </div>

          {!canDownload && (
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start space-x-2">
                <Download className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900">Descarga por €0,50</h4>
                  <p className="text-sm text-amber-800 mt-1">
                    Selecciona cualquier formato y procede al pago para descargar tu CV profesional.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Check className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Consejos para la descarga</h4>
                <ul className="text-sm text-blue-800 mt-1 space-y-1">
                  <li>• PDF es el formato más compatible para enviar por email</li>
                  <li>• DOCX te permite editar el CV después de descargarlo</li>
                  <li>• TXT es útil para copiar y pegar en formularios online</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={() => {
          // After successful payment, user can download
          setShowPaymentModal(false)
        }}
      />
    </>
  )
}
