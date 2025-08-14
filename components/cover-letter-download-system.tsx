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
import { Download, FileText, File, FileImage, ChevronDown, Loader2, Check } from "lucide-react"
import type { CoverLetterData } from "@/app/editor/cover-letter/page"

interface CoverLetterDownloadSystemProps {
  coverLetterData: CoverLetterData
  template: string
}

export function CoverLetterDownloadSystem({ coverLetterData, template }: CoverLetterDownloadSystemProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState<string | null>(null)
  const [showDialog, setShowDialog] = useState(false)

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

  const formatDate = (dateString: string) => {
    if (!dateString) return new Date().toLocaleDateString("es-ES")
    return new Date(dateString).toLocaleDateString("es-ES")
  }

  const generateContent = () => {
    const content = `${coverLetterData.personalInfo.fullName || ""}
${coverLetterData.personalInfo.address || ""}
${coverLetterData.personalInfo.phone || ""}
${coverLetterData.personalInfo.email || ""}

${formatDate(coverLetterData.settings.date)}

${coverLetterData.recipientInfo.hiringManagerName || ""}
${coverLetterData.recipientInfo.companyName || ""}
${coverLetterData.recipientInfo.companyAddress || ""}

${coverLetterData.recipientInfo.position ? `Asunto: Solicitud para el puesto de ${coverLetterData.recipientInfo.position}` : ""}

${coverLetterData.content.opening || ""}

${coverLetterData.content.body || ""}

${coverLetterData.content.closing || ""}

Atentamente,

${coverLetterData.settings.signature || coverLetterData.personalInfo.fullName || ""}`.trim()

    return content
  }

  const generatePDF = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const content = generateContent()
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Carta_${coverLetterData.recipientInfo.companyName || "Presentacion"}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateDOCX = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const content = generateContent()
    const blob = new Blob([content], { type: "application/msword" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Carta_${coverLetterData.recipientInfo.companyName || "Presentacion"}.docx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateTXT = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const content = generateContent()
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Carta_${coverLetterData.recipientInfo.companyName || "Presentacion"}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generatePNG = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    alert("Funcionalidad premium: Actualiza a plan Pro para descargar como imagen")
  }

  const handleDownload = async (format: string) => {
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

  const quickDownloadPDF = async () => {
    await handleDownload("pdf")
  }

  return (
    <>
      {/* Quick Download Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={quickDownloadPDF}
        disabled={isDownloading}
        className="bg-transparent"
      >
        {isDownloading && downloadFormat === "pdf" ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Download className="h-4 w-4 mr-2" />
        )}
        Descargar PDF
      </Button>

      {/* Advanced Download Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Más opciones
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-purple-600" />
              <span>Descargar Carta de Presentación</span>
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

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Check className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Consejos para la carta</h4>
                <ul className="text-sm text-blue-800 mt-1 space-y-1">
                  <li>• Personaliza cada carta para la empresa específica</li>
                  <li>• PDF es el formato más profesional para enviar</li>
                  <li>• Revisa la ortografía antes de descargar</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
