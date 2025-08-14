"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Building, FileText, Settings } from "lucide-react"
import { AIGenerator } from "@/components/ai-generator"
import type { CoverLetterData } from "@/app/editor/cover-letter/page"

interface CoverLetterEditorProps {
  coverLetterData: CoverLetterData
  onDataChange: (data: CoverLetterData) => void
}

export function CoverLetterEditor({ coverLetterData, onDataChange }: CoverLetterEditorProps) {
  const updatePersonalInfo = (field: string, value: string) => {
    onDataChange({
      ...coverLetterData,
      personalInfo: {
        ...coverLetterData.personalInfo,
        [field]: value,
      },
    })
  }

  const updateRecipientInfo = (field: string, value: string) => {
    onDataChange({
      ...coverLetterData,
      recipientInfo: {
        ...coverLetterData.recipientInfo,
        [field]: value,
      },
    })
  }

  const updateContent = (field: string, value: string) => {
    onDataChange({
      ...coverLetterData,
      content: {
        ...coverLetterData.content,
        [field]: value,
      },
    })
  }

  const updateSettings = (field: string, value: string) => {
    onDataChange({
      ...coverLetterData,
      settings: {
        ...coverLetterData.settings,
        [field]: value,
      },
    })
  }

  const handleGenerateOpening = (content: string) => {
    updateContent("opening", content)
  }

  const handleGenerateBody = (content: string) => {
    updateContent("body", content)
  }

  const handleGenerateClosing = (content: string) => {
    updateContent("closing", content)
  }

  const handleGenerateFullLetter = (content: string) => {
    // Split the generated content into sections
    const sections = content.split("\n\n")
    if (sections.length >= 3) {
      updateContent("opening", sections[0])
      updateContent("body", sections.slice(1, -1).join("\n\n"))
      updateContent("closing", sections[sections.length - 1])
    } else {
      updateContent("body", content)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="recipient" className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Destinatario</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Contenido</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Configuración</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Tu Información</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre completo</Label>
                  <Input
                    id="fullName"
                    value={coverLetterData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={coverLetterData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={coverLetterData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    placeholder="+34 123 456 789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={coverLetterData.personalInfo.address}
                    onChange={(e) => updatePersonalInfo("address", e.target.value)}
                    placeholder="Tu dirección completa"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recipient" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Información del Destinatario</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nombre de la empresa</Label>
                  <Input
                    id="companyName"
                    value={coverLetterData.recipientInfo.companyName}
                    onChange={(e) => updateRecipientInfo("companyName", e.target.value)}
                    placeholder="Nombre de la empresa"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hiringManagerName">Responsable de contratación</Label>
                  <Input
                    id="hiringManagerName"
                    value={coverLetterData.recipientInfo.hiringManagerName}
                    onChange={(e) => updateRecipientInfo("hiringManagerName", e.target.value)}
                    placeholder="Nombre del responsable (opcional)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Posición</Label>
                  <Input
                    id="position"
                    value={coverLetterData.recipientInfo.position}
                    onChange={(e) => updateRecipientInfo("position", e.target.value)}
                    placeholder="Puesto al que aplicas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Dirección de la empresa</Label>
                  <Input
                    id="companyAddress"
                    value={coverLetterData.recipientInfo.companyAddress}
                    onChange={(e) => updateRecipientInfo("companyAddress", e.target.value)}
                    placeholder="Dirección de la empresa (opcional)"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-sans font-semibold">Contenido de la Carta</h3>
            <AIGenerator
              type="cover-letter"
              onGenerate={handleGenerateFullLetter}
              context={{
                position: coverLetterData.recipientInfo.position,
                company: coverLetterData.recipientInfo.companyName,
              }}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Párrafo de Apertura</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="opening">Introducción</Label>
                <AIGenerator
                  type="cover-letter"
                  onGenerate={handleGenerateOpening}
                  currentContent={coverLetterData.content.opening}
                  context={{
                    position: coverLetterData.recipientInfo.position,
                    company: coverLetterData.recipientInfo.companyName,
                  }}
                />
              </div>
              <Textarea
                id="opening"
                value={coverLetterData.content.opening}
                onChange={(e) => updateContent("opening", e.target.value)}
                placeholder="Estimado/a [Nombre], me dirijo a ustedes con gran interés en la posición de..."
                rows={3}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cuerpo Principal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="body">Desarrollo</Label>
                <AIGenerator
                  type="cover-letter"
                  onGenerate={handleGenerateBody}
                  currentContent={coverLetterData.content.body}
                  context={{
                    position: coverLetterData.recipientInfo.position,
                    company: coverLetterData.recipientInfo.companyName,
                  }}
                />
              </div>
              <Textarea
                id="body"
                value={coverLetterData.content.body}
                onChange={(e) => updateContent("body", e.target.value)}
                placeholder="Explica tu experiencia, habilidades y por qué eres el candidato ideal..."
                rows={8}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Párrafo de Cierre</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="closing">Cierre</Label>
                <AIGenerator
                  type="cover-letter"
                  onGenerate={handleGenerateClosing}
                  currentContent={coverLetterData.content.closing}
                  context={{
                    position: coverLetterData.recipientInfo.position,
                    company: coverLetterData.recipientInfo.companyName,
                  }}
                />
              </div>
              <Textarea
                id="closing"
                value={coverLetterData.content.closing}
                onChange={(e) => updateContent("closing", e.target.value)}
                placeholder="Agradezco su consideración y espero poder discutir cómo puedo contribuir..."
                rows={3}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Configuración</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha</Label>
                  <Input
                    id="date"
                    type="date"
                    value={coverLetterData.settings.date}
                    onChange={(e) => updateSettings("date", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signature">Firma</Label>
                  <Input
                    id="signature"
                    value={coverLetterData.settings.signature}
                    onChange={(e) => updateSettings("signature", e.target.value)}
                    placeholder="Tu nombre para la firma"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
