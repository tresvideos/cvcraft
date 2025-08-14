"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"
import type { CVData } from "@/app/editor/cv/page"

interface CVPreviewProps {
  cvData: CVData
  template: string
}

export function CVPreview({ cvData, template }: CVPreviewProps) {
  const [forceRender, setForceRender] = useState(0)

  useEffect(() => {
    console.log("🔄 CVPreview: template changed to:", template)
    setForceRender((prev) => prev + 1)
  }, [template])

  const renderEmptySection = (title: string, description: string) => (
    <div className="mb-6 opacity-50">
      <h2 className="text-xl font-sans font-semibold text-purple-600 mb-3">{title}</h2>
      <p className="text-gray-500 italic text-sm">{description}</p>
    </div>
  )

  const renderModernTemplate = () => (
    <div className="bg-white p-8 shadow-lg border-l-8 border-purple-600">
      <div className="bg-purple-600 text-white p-3 mb-6 rounded-lg">
        <p className="text-sm font-bold tracking-wide">🚀 TECH INNOVADOR - PLANTILLA MODERNA</p>
      </div>

      {/* Header with Photo */}
      <div className="border-b-4 border-purple-600 pb-6 mb-6">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            {cvData.personalInfo.profileImage ? (
              <img
                src={cvData.personalInfo.profileImage || "/placeholder.svg"}
                alt="Foto de perfil"
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-purple-100 border-4 border-purple-300 flex items-center justify-center">
                <span className="text-purple-600 text-xs text-center font-medium">Sin foto</span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-sans font-bold text-gray-900 mb-2">
              {cvData.personalInfo.fullName || "Tu Nombre"}
            </h1>
            {cvData.personalInfo.jobTitle && (
              <p className="text-xl text-purple-600 font-semibold mb-3">{cvData.personalInfo.jobTitle}</p>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {cvData.personalInfo.email && (
                <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                  <Mail className="h-4 w-4 mr-2 text-purple-600" />
                  {cvData.personalInfo.email}
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                  <Phone className="h-4 w-4 mr-2 text-purple-600" />
                  {cvData.personalInfo.phone}
                </div>
              )}
              {cvData.personalInfo.location && (
                <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                  <MapPin className="h-4 w-4 mr-2 text-purple-600" />
                  {cvData.personalInfo.location}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {cvData.personalInfo.summary ? (
        <div className="mb-6 bg-purple-50 p-6 rounded-lg">
          <h2 className="text-2xl font-sans font-bold text-purple-700 mb-4">💡 Resumen Profesional</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{cvData.personalInfo.summary}</p>
        </div>
      ) : (
        renderEmptySection("💡 Resumen Profesional", "Agrega un resumen profesional para destacar tu perfil")
      )}
    </div>
  )

  const renderProfessionalTemplate = () => (
    <div className="bg-white p-8 shadow-lg border-t-8 border-gray-800">
      <div className="bg-gray-800 text-white p-3 mb-6 text-center">
        <p className="text-sm font-bold tracking-widest">👔 EJECUTIVO PROFESIONAL - PLANTILLA CLÁSICA</p>
      </div>

      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-6 mb-6">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3">
          {cvData.personalInfo.fullName || "Tu Nombre"}
        </h1>
        {cvData.personalInfo.jobTitle && (
          <p className="text-xl text-gray-700 font-medium mb-4">{cvData.personalInfo.jobTitle}</p>
        )}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          {cvData.personalInfo.email && (
            <div className="flex items-center border-b border-gray-300 pb-1">
              <Mail className="h-4 w-4 mr-2" />
              {cvData.personalInfo.email}
            </div>
          )}
          {cvData.personalInfo.phone && (
            <div className="flex items-center border-b border-gray-300 pb-1">
              <Phone className="h-4 w-4 mr-2" />
              {cvData.personalInfo.phone}
            </div>
          )}
          {cvData.personalInfo.location && (
            <div className="flex items-center border-b border-gray-300 pb-1">
              <MapPin className="h-4 w-4 mr-2" />
              {cvData.personalInfo.location}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {cvData.personalInfo.summary ? (
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
            📋 RESUMEN EJECUTIVO
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{cvData.personalInfo.summary}</p>
        </div>
      ) : (
        renderEmptySection("📋 RESUMEN EJECUTIVO", "Agrega un resumen profesional para destacar tu perfil")
      )}
    </div>
  )

  const renderCreativeTemplate = () => (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 shadow-xl border-l-8 border-gradient-to-b from-blue-500 to-purple-500">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 mb-6 rounded-xl shadow-lg">
        <p className="text-sm font-bold tracking-wide text-center">🎨 CREATIVO DINÁMICO - PLANTILLA ARTÍSTICA</p>
      </div>

      {/* Header creativo con diseño asimétrico */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl mb-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-400 opacity-20 rounded-full -ml-12 -mb-12"></div>

        <div className="flex items-start gap-6 relative z-10">
          <div className="flex-shrink-0">
            {cvData.personalInfo.profileImage ? (
              <img
                src={cvData.personalInfo.profileImage || "/placeholder.svg"}
                alt="Foto de perfil"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-white bg-opacity-20 border-4 border-white flex items-center justify-center shadow-xl">
                <span className="text-white text-xs text-center font-bold">Sin foto</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-sans font-bold mb-3 text-shadow">
              {cvData.personalInfo.fullName || "Tu Nombre"}
            </h1>
            {cvData.personalInfo.jobTitle && (
              <p className="text-2xl text-blue-100 font-semibold mb-4">{cvData.personalInfo.jobTitle}</p>
            )}
            <div className="flex flex-wrap gap-3 text-sm">
              {cvData.personalInfo.email && (
                <div className="flex items-center bg-white bg-opacity-25 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Mail className="h-4 w-4 mr-2" />
                  {cvData.personalInfo.email}
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center bg-white bg-opacity-25 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Phone className="h-4 w-4 mr-2" />
                  {cvData.personalInfo.phone}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {cvData.personalInfo.summary ? (
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-6 border-l-4 border-gradient-to-b from-blue-500 to-purple-500">
          <h2 className="text-2xl font-sans font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4"></div>🌟 Sobre Mí
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">{cvData.personalInfo.summary}</p>
        </div>
      ) : (
        renderEmptySection("🌟 Sobre Mí", "Agrega un resumen profesional")
      )}
    </div>
  )

  const renderMinimalTemplate = () => (
    <div className="bg-white p-12 shadow-lg max-w-4xl mx-auto border-t-4 border-gray-400">
      <div className="text-center mb-6 pb-4 border-b border-gray-200">
        <p className="text-xs text-gray-500 font-light tracking-widest uppercase">✨ Minimalista - Plantilla Limpia</p>
      </div>

      {/* Header minimalista */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-wide">
          {cvData.personalInfo.fullName || "Tu Nombre"}
        </h1>
        {cvData.personalInfo.jobTitle && (
          <p className="text-2xl text-gray-600 font-light mb-8 tracking-wide">{cvData.personalInfo.jobTitle}</p>
        )}
        <div className="flex justify-center space-x-12 text-sm text-gray-500">
          {cvData.personalInfo.email && (
            <span className="flex items-center border-b border-gray-300 pb-1">
              <Mail className="h-4 w-4 mr-3" />
              {cvData.personalInfo.email}
            </span>
          )}
          {cvData.personalInfo.phone && (
            <span className="flex items-center border-b border-gray-300 pb-1">
              <Phone className="h-4 w-4 mr-3" />
              {cvData.personalInfo.phone}
            </span>
          )}
          {cvData.personalInfo.location && (
            <span className="flex items-center border-b border-gray-300 pb-1">
              <MapPin className="h-4 w-4 mr-3" />
              {cvData.personalInfo.location}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {cvData.personalInfo.summary ? (
        <div className="mb-16">
          <p className="text-gray-700 leading-relaxed text-center max-w-4xl mx-auto font-light text-xl tracking-wide">
            {cvData.personalInfo.summary}
          </p>
        </div>
      ) : (
        <div className="mb-16 opacity-50">
          <p className="text-gray-500 italic text-center text-lg">Agrega un resumen profesional</p>
        </div>
      )}
    </div>
  )

  const renderTemplate = () => {
    console.log("🎯 Renderizando plantilla:", template)

    switch (template) {
      case "modern":
        return renderModernTemplate()
      case "professional":
        return renderProfessionalTemplate()
      case "creative":
        return renderCreativeTemplate()
      case "minimal":
        return renderMinimalTemplate()
      default:
        console.log("⚠️ Plantilla no reconocida, usando modern por defecto")
        return renderModernTemplate()
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gray-100 p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="font-sans font-semibold text-gray-900">Vista Previa</h3>
            <p className="text-sm text-gray-600">
              Plantilla activa: <span className="font-semibold">{template}</span>
            </p>
          </div>
          <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded">Render #{forceRender}</div>
        </div>
        <div className="max-h-[800px] overflow-y-auto">
          <div key={`${template}-${forceRender}`}>{renderTemplate()}</div>
        </div>
      </CardContent>
    </Card>
  )
}
