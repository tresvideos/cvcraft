"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { AuthGuard } from "@/components/auth-guard"
import { CoverLetterEditor } from "@/components/cover-letter-editor"
import { CoverLetterPreview } from "@/components/cover-letter-preview"
import { CoverLetterTemplateSelector } from "@/components/cover-letter-template-selector"
import { CoverLetterDownloadSystem } from "@/components/cover-letter-download-system"
import { Button } from "@/components/ui/button"
import { Save, Eye, EyeOff } from "lucide-react"

export interface CoverLetterData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    address: string
  }
  recipientInfo: {
    companyName: string
    hiringManagerName: string
    position: string
    companyAddress: string
  }
  content: {
    opening: string
    body: string
    closing: string
  }
  settings: {
    date: string
    signature: string
  }
}

const initialCoverLetterData: CoverLetterData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
  },
  recipientInfo: {
    companyName: "",
    hiringManagerName: "",
    position: "",
    companyAddress: "",
  },
  content: {
    opening: "",
    body: "",
    closing: "",
  },
  settings: {
    date: new Date().toISOString().split("T")[0],
    signature: "",
  },
}

export default function CoverLetterEditorPage() {
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>(initialCoverLetterData)
  const [selectedTemplate, setSelectedTemplate] = useState("professional")
  const [showPreview, setShowPreview] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

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
                <h1 className="text-xl font-sans font-semibold text-gray-900">Editor de Carta de Presentación</h1>
                <CoverLetterTemplateSelector
                  selectedTemplate={selectedTemplate}
                  onTemplateChange={setSelectedTemplate}
                />
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
                <CoverLetterDownloadSystem coverLetterData={coverLetterData} template={selectedTemplate} />
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
              <CoverLetterEditor coverLetterData={coverLetterData} onDataChange={setCoverLetterData} />
            </div>

            {/* Preview Panel */}
            {showPreview && (
              <div className="lg:sticky lg:top-24 lg:h-fit">
                <CoverLetterPreview coverLetterData={coverLetterData} template={selectedTemplate} />
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
