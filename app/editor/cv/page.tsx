"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { AuthGuard } from "@/components/auth-guard"
import { CVEditor } from "@/components/cv-editor"
import { CVPreview } from "@/components/cv-preview"
import { TemplateSelector } from "@/components/template-selector"
import { DownloadSystem } from "@/components/download-system"
import { Button } from "@/components/ui/button"
import { Save, Eye, EyeOff } from "lucide-react"

export interface CVData {
  personalInfo: {
    profileImage?: string
    fullName: string
    email: string
    phone: string
    location: string
    website: string
    linkedin: string
    github?: string
    twitter?: string
    summary: string
    jobTitle?: string
    interests?: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    location?: string
    employmentType?: string
    startDate: string
    endDate: string
    current: boolean
    description: string
    achievements?: string[]
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    current: boolean
    gpa?: string
    activities?: string
    relevantCourses?: string
  }>
  skills: Array<{
    id: string
    name: string
    level: number
  }>
  languages: Array<{
    id: string
    name: string
    level: string
  }>
  certifications: Array<{
    id: string
    name: string
    issuer: string
    date: string
    expiryDate?: string
    credentialId?: string
  }>
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string[]
    startDate: string
    endDate?: string
    url?: string
    github?: string
  }>
  volunteering: Array<{
    id: string
    organization: string
    role: string
    startDate: string
    endDate?: string
    current: boolean
    description: string
  }>
  publications: Array<{
    id: string
    title: string
    publisher: string
    date: string
    url?: string
    description?: string
  }>
  references: Array<{
    id: string
    name: string
    position: string
    company: string
    email: string
    phone?: string
  }>
  awards: Array<{
    id: string
    title: string
    issuer: string
    date: string
    description?: string
  }>
}

const initialCVData: CVData = {
  personalInfo: {
    profileImage: undefined,
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    twitter: "",
    summary: "",
    jobTitle: "",
    interests: "",
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
  volunteering: [],
  publications: [],
  references: [],
  awards: [],
}

const templateMapping: Record<string, string> = {
  "1": "professional", // Ejecutivo Moderno
  "2": "minimal", // Creativo Minimalista
  "3": "modern", // Tech Innovador
  "4": "professional", // Clásico Elegante
  "5": "creative", // Startup Dinámico
  "6": "professional", // Académico Formal
  "7": "creative", // Marketing Creativo
  "8": "professional", // Consultor Premium
}

export default function CVEditorPage() {
  const searchParams = useSearchParams()
  const [cvData, setCVData] = useState<CVData>(initialCVData)
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const templateId = urlParams.get("template")
      return templateId && templateMapping[templateId] ? templateMapping[templateId] : "modern"
    }
    return "modern"
  })
  const [showPreview, setShowPreview] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const templateId = searchParams.get("template")
    if (templateId && templateMapping[templateId]) {
      setSelectedTemplate(templateMapping[templateId])
    }
  }, [searchParams])

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Top Bar */}
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-sans font-semibold text-gray-900">Editor de CV</h1>
                <TemplateSelector selectedTemplate={selectedTemplate} onTemplateChange={setSelectedTemplate} />
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="hidden lg:flex bg-transparent"
                >
                  {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showPreview ? "Ocultar vista previa" : "Mostrar vista previa"}
                </Button>
                <DownloadSystem cvData={cvData} template={selectedTemplate} />
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Guardando..." : "Guardar"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`grid gap-6 ${showPreview ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
            {/* Editor Panel */}
            <div className="space-y-6">
              <CVEditor cvData={cvData} onDataChange={setCVData} />
            </div>

            {/* Preview Panel */}
            {showPreview && (
              <div className="lg:sticky lg:top-24 lg:h-fit">
                <CVPreview cvData={cvData} template={selectedTemplate} />
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
