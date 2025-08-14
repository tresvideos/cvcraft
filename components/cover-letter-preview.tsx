"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { CoverLetterData } from "@/app/editor/cover-letter/page"

interface CoverLetterPreviewProps {
  coverLetterData: CoverLetterData
  template: string
}

export function CoverLetterPreview({ coverLetterData, template }: CoverLetterPreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return new Date().toLocaleDateString("es-ES")
    return new Date(dateString).toLocaleDateString("es-ES")
  }

  const renderProfessionalTemplate = () => (
    <div className="bg-white p-8 shadow-lg min-h-[600px]">
      {/* Header with personal info */}
      <div className="text-right mb-8">
        <h1 className="text-lg font-serif font-bold text-gray-900 mb-2">
          {coverLetterData.personalInfo.fullName || "Tu Nombre"}
        </h1>
        <div className="text-sm text-gray-600 space-y-1">
          {coverLetterData.personalInfo.address && <div>{coverLetterData.personalInfo.address}</div>}
          {coverLetterData.personalInfo.phone && <div>{coverLetterData.personalInfo.phone}</div>}
          {coverLetterData.personalInfo.email && <div>{coverLetterData.personalInfo.email}</div>}
        </div>
      </div>

      {/* Date */}
      <div className="mb-8">
        <p className="text-sm text-gray-700">{formatDate(coverLetterData.settings.date)}</p>
      </div>

      {/* Recipient info */}
      <div className="mb-8">
        {coverLetterData.recipientInfo.hiringManagerName && (
          <p className="text-sm text-gray-900 font-medium">{coverLetterData.recipientInfo.hiringManagerName}</p>
        )}
        {coverLetterData.recipientInfo.companyName && (
          <p className="text-sm text-gray-900 font-medium">{coverLetterData.recipientInfo.companyName}</p>
        )}
        {coverLetterData.recipientInfo.companyAddress && (
          <p className="text-sm text-gray-600">{coverLetterData.recipientInfo.companyAddress}</p>
        )}
      </div>

      {/* Subject */}
      {coverLetterData.recipientInfo.position && (
        <div className="mb-6">
          <p className="text-sm text-gray-900 font-medium">
            <strong>Asunto:</strong> Solicitud para el puesto de {coverLetterData.recipientInfo.position}
          </p>
        </div>
      )}

      {/* Content */}
      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
        {coverLetterData.content.opening && <p>{coverLetterData.content.opening}</p>}

        {coverLetterData.content.body && (
          <div className="space-y-4">
            {coverLetterData.content.body.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}

        {coverLetterData.content.closing && <p>{coverLetterData.content.closing}</p>}
      </div>

      {/* Signature */}
      <div className="mt-12">
        <p className="text-sm text-gray-700">Atentamente,</p>
        <div className="mt-8">
          <p className="text-sm text-gray-900 font-medium">
            {coverLetterData.settings.signature || coverLetterData.personalInfo.fullName || "Tu Nombre"}
          </p>
        </div>
      </div>
    </div>
  )

  const renderModernTemplate = () => (
    <div className="bg-white p-8 shadow-lg min-h-[600px]">
      {/* Header with personal info */}
      <div className="border-b-2 border-purple-600 pb-6 mb-8">
        <h1 className="text-2xl font-sans font-bold text-gray-900 mb-3">
          {coverLetterData.personalInfo.fullName || "Tu Nombre"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {coverLetterData.personalInfo.email && <span>{coverLetterData.personalInfo.email}</span>}
          {coverLetterData.personalInfo.phone && <span>{coverLetterData.personalInfo.phone}</span>}
          {coverLetterData.personalInfo.address && <span>{coverLetterData.personalInfo.address}</span>}
        </div>
      </div>

      {/* Date and recipient */}
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-4">{formatDate(coverLetterData.settings.date)}</p>
        <div className="space-y-1">
          {coverLetterData.recipientInfo.hiringManagerName && (
            <p className="text-sm text-gray-900 font-medium">{coverLetterData.recipientInfo.hiringManagerName}</p>
          )}
          {coverLetterData.recipientInfo.companyName && (
            <p className="text-sm text-purple-600 font-medium">{coverLetterData.recipientInfo.companyName}</p>
          )}
          {coverLetterData.recipientInfo.companyAddress && (
            <p className="text-sm text-gray-600">{coverLetterData.recipientInfo.companyAddress}</p>
          )}
        </div>
      </div>

      {/* Subject */}
      {coverLetterData.recipientInfo.position && (
        <div className="mb-6 p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-800 font-medium">
            Re: Solicitud para {coverLetterData.recipientInfo.position}
          </p>
        </div>
      )}

      {/* Content */}
      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
        {coverLetterData.content.opening && <p>{coverLetterData.content.opening}</p>}

        {coverLetterData.content.body && (
          <div className="space-y-4">
            {coverLetterData.content.body.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}

        {coverLetterData.content.closing && <p>{coverLetterData.content.closing}</p>}
      </div>

      {/* Signature */}
      <div className="mt-12">
        <p className="text-sm text-gray-700">Cordialmente,</p>
        <div className="mt-6 p-3 border-l-4 border-purple-600">
          <p className="text-sm text-gray-900 font-medium">
            {coverLetterData.settings.signature || coverLetterData.personalInfo.fullName || "Tu Nombre"}
          </p>
        </div>
      </div>
    </div>
  )

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return renderModernTemplate()
      case "creative":
        return renderModernTemplate() // For now, using modern template
      case "minimal":
        return renderProfessionalTemplate() // For now, using professional template
      default:
        return renderProfessionalTemplate()
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gray-100 p-4 border-b">
          <h3 className="font-sans font-semibold text-gray-900">Vista Previa</h3>
          <p className="text-sm text-gray-600">Plantilla: {template}</p>
        </div>
        <div className="max-h-[800px] overflow-y-auto">{renderTemplate()}</div>
      </CardContent>
    </Card>
  )
}
