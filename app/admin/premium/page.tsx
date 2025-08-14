"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Crown, Sparkles, FileText, Zap, Shield, Settings } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useState } from "react"

interface PremiumFeature {
  id: string
  name: string
  description: string
  isEnabled: boolean
  category: "templates" | "ai" | "export" | "support" | "analytics"
  icon: string
  limitations?: {
    free: string
    premium: string
  }
}

interface PremiumConfig {
  features: PremiumFeature[]
  aiLimits: {
    freeGenerationsPerDay: number
    premiumGenerationsPerDay: number
    freeWordsPerGeneration: number
    premiumWordsPerGeneration: number
  }
  templateAccess: {
    freeTemplatesCount: number
    premiumTemplatesOnly: string[]
  }
  exportLimits: {
    freeExportsPerMonth: number
    premiumUnlimited: boolean
    freeFormats: string[]
    premiumFormats: string[]
  }
}

export default function PremiumFeaturesControl() {
  const [config, setConfig] = useState<PremiumConfig>({
    features: [
      {
        id: "premium-templates",
        name: "Plantillas Premium",
        description: "Acceso a plantillas exclusivas y diseños avanzados",
        isEnabled: true,
        category: "templates",
        icon: "👑",
        limitations: {
          free: "3 plantillas básicas",
          premium: "Todas las plantillas (24+)",
        },
      },
      {
        id: "advanced-ai",
        name: "IA Avanzada",
        description: "Generación de contenido ilimitada con IA mejorada",
        isEnabled: true,
        category: "ai",
        icon: "🤖",
        limitations: {
          free: "5 generaciones/día, 100 palabras máx",
          premium: "Ilimitado, 500 palabras máx",
        },
      },
      {
        id: "multiple-formats",
        name: "Múltiples Formatos",
        description: "Descarga en PDF, Word, y otros formatos",
        isEnabled: true,
        category: "export",
        icon: "📄",
        limitations: {
          free: "Solo PDF",
          premium: "PDF, Word, TXT, HTML",
        },
      },
      {
        id: "cover-letters",
        name: "Cartas de Presentación",
        description: "Creador de cartas de presentación personalizadas",
        isEnabled: true,
        category: "templates",
        icon: "✉️",
        limitations: {
          free: "No disponible",
          premium: "Ilimitadas con plantillas",
        },
      },
      {
        id: "priority-support",
        name: "Soporte Prioritario",
        description: "Atención al cliente prioritaria y chat en vivo",
        isEnabled: true,
        category: "support",
        icon: "🎧",
        limitations: {
          free: "Email (48h respuesta)",
          premium: "Chat en vivo (1h respuesta)",
        },
      },
      {
        id: "cv-analytics",
        name: "Análisis de CV",
        description: "Análisis detallado y sugerencias de mejora",
        isEnabled: false,
        category: "analytics",
        icon: "📊",
        limitations: {
          free: "No disponible",
          premium: "Análisis completo con puntuación",
        },
      },
    ],
    aiLimits: {
      freeGenerationsPerDay: 5,
      premiumGenerationsPerDay: -1, // -1 = ilimitado
      freeWordsPerGeneration: 100,
      premiumWordsPerGeneration: 500,
    },
    templateAccess: {
      freeTemplatesCount: 3,
      premiumTemplatesOnly: ["tech-cv-template", "minimalist-artistic-cv", "startup-cv-template"],
    },
    exportLimits: {
      freeExportsPerMonth: 3,
      premiumUnlimited: true,
      freeFormats: ["pdf"],
      premiumFormats: ["pdf", "docx", "txt", "html"],
    },
  })

  const [hasChanges, setHasChanges] = useState(false)

  const updateFeature = (featureId: string, updates: Partial<PremiumFeature>) => {
    setConfig((prev) => ({
      ...prev,
      features: prev.features.map((feature) => (feature.id === featureId ? { ...feature, ...updates } : feature)),
    }))
    setHasChanges(true)
  }

  const updateAILimits = (updates: Partial<PremiumConfig["aiLimits"]>) => {
    setConfig((prev) => ({
      ...prev,
      aiLimits: { ...prev.aiLimits, ...updates },
    }))
    setHasChanges(true)
  }

  const updateTemplateAccess = (updates: Partial<PremiumConfig["templateAccess"]>) => {
    setConfig((prev) => ({
      ...prev,
      templateAccess: { ...prev.templateAccess, ...updates },
    }))
    setHasChanges(true)
  }

  const updateExportLimits = (updates: Partial<PremiumConfig["exportLimits"]>) => {
    setConfig((prev) => ({
      ...prev,
      exportLimits: { ...prev.exportLimits, ...updates },
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    console.log("Guardando configuración premium:", config)
    setHasChanges(false)
    // Aquí iría la lógica para guardar en la base de datos
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "templates":
        return <FileText className="h-4 w-4" />
      case "ai":
        return <Sparkles className="h-4 w-4" />
      case "export":
        return <FileText className="h-4 w-4" />
      case "support":
        return <Shield className="h-4 w-4" />
      case "analytics":
        return <Zap className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  const enabledFeatures = config.features.filter((f) => f.isEnabled).length
  const totalFeatures = config.features.length

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al Panel
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Control de Funciones Premium
                </h1>
                <p className="text-muted-foreground mt-2">
                  Configura características exclusivas y limitaciones por plan
                </p>
              </div>
            </div>
            <Button
              onClick={handleSave}
              disabled={!hasChanges}
              className="bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Funciones Activas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {enabledFeatures}/{totalFeatures}
                </div>
                <p className="text-xs text-green-600">
                  {Math.round((enabledFeatures / totalFeatures) * 100)}% habilitadas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Plantillas Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{config.templateAccess.premiumTemplatesOnly.length}</div>
                <p className="text-xs text-blue-600">Exclusivas para premium</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Límite IA Gratis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{config.aiLimits.freeGenerationsPerDay}</div>
                <p className="text-xs text-muted-foreground">generaciones/día</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Formatos Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{config.exportLimits.premiumFormats.length}</div>
                <p className="text-xs text-purple-600">vs {config.exportLimits.freeFormats.length} gratis</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="features">Funciones</TabsTrigger>
              <TabsTrigger value="ai-limits">Límites IA</TabsTrigger>
              <TabsTrigger value="templates">Plantillas</TabsTrigger>
              <TabsTrigger value="export">Exportación</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.features.map((feature) => (
                  <Card key={feature.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{feature.icon}</div>
                          <div>
                            <CardTitle className="text-lg">{feature.name}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              {getCategoryIcon(feature.category)}
                              <Badge variant="outline" className="text-xs">
                                {feature.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={feature.isEnabled}
                          onCheckedChange={(checked) => updateFeature(feature.id, { isEnabled: checked })}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                      {feature.limitations && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Plan Gratuito:</span>
                            <span className="font-medium">{feature.limitations.free}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-purple-600">Plan Premium:</span>
                            <span className="font-medium text-purple-600">{feature.limitations.premium}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ai-limits" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                      Límites de Generación
                    </CardTitle>
                    <CardDescription>Controla cuántas veces pueden usar la IA por día</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="freeGenerations">Generaciones Gratuitas por Día</Label>
                      <Input
                        id="freeGenerations"
                        type="number"
                        value={config.aiLimits.freeGenerationsPerDay}
                        onChange={(e) => updateAILimits({ freeGenerationsPerDay: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="premiumGenerations">Generaciones Premium por Día</Label>
                      <Input
                        id="premiumGenerations"
                        type="number"
                        value={
                          config.aiLimits.premiumGenerationsPerDay === -1
                            ? ""
                            : config.aiLimits.premiumGenerationsPerDay
                        }
                        onChange={(e) =>
                          updateAILimits({
                            premiumGenerationsPerDay: e.target.value === "" ? -1 : Number.parseInt(e.target.value),
                          })
                        }
                        placeholder="Vacío = Ilimitado"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Deja vacío para ilimitado</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-green-600" />
                      Límites de Palabras
                    </CardTitle>
                    <CardDescription>Controla la longitud del contenido generado</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="freeWords">Palabras Máximas (Gratis)</Label>
                      <Input
                        id="freeWords"
                        type="number"
                        value={config.aiLimits.freeWordsPerGeneration}
                        onChange={(e) => updateAILimits({ freeWordsPerGeneration: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="premiumWords">Palabras Máximas (Premium)</Label>
                      <Input
                        id="premiumWords"
                        type="number"
                        value={config.aiLimits.premiumWordsPerGeneration}
                        onChange={(e) => updateAILimits({ premiumWordsPerGeneration: Number.parseInt(e.target.value) })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-600" />
                      Acceso a Plantillas
                    </CardTitle>
                    <CardDescription>Configura qué plantillas están disponibles por plan</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="freeTemplatesCount">Plantillas Gratuitas Disponibles</Label>
                      <Input
                        id="freeTemplatesCount"
                        type="number"
                        value={config.templateAccess.freeTemplatesCount}
                        onChange={(e) => updateTemplateAccess({ freeTemplatesCount: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="premiumTemplates">Plantillas Solo Premium (IDs)</Label>
                      <Textarea
                        id="premiumTemplates"
                        value={config.templateAccess.premiumTemplatesOnly.join("\n")}
                        onChange={(e) =>
                          updateTemplateAccess({
                            premiumTemplatesOnly: e.target.value.split("\n").filter((id) => id.trim()),
                          })
                        }
                        placeholder="Un ID de plantilla por línea"
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Estas plantillas solo estarán disponibles para usuarios premium
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Vista Previa de Acceso</CardTitle>
                    <CardDescription>Cómo verán los usuarios el acceso a plantillas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Plan Gratuito</h4>
                        <p className="text-xs text-muted-foreground">
                          Acceso a {config.templateAccess.freeTemplatesCount} plantillas básicas
                        </p>
                        <Badge variant="secondary" className="mt-2">
                          Limitado
                        </Badge>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <h4 className="font-medium text-sm mb-2 text-purple-700 dark:text-purple-300">Plan Premium</h4>
                        <p className="text-xs text-purple-600 dark:text-purple-400">
                          Acceso a todas las plantillas ({config.templateAccess.premiumTemplatesOnly.length} exclusivas)
                        </p>
                        <Badge className="mt-2 bg-purple-600">
                          <Crown className="h-3 w-3 mr-1" />
                          Completo
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="export" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-indigo-600" />
                      Límites de Exportación
                    </CardTitle>
                    <CardDescription>Controla cuántas descargas pueden hacer los usuarios</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="freeExports">Exportaciones Gratuitas por Mes</Label>
                      <Input
                        id="freeExports"
                        type="number"
                        value={config.exportLimits.freeExportsPerMonth}
                        onChange={(e) => updateExportLimits({ freeExportsPerMonth: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="premiumUnlimited"
                        checked={config.exportLimits.premiumUnlimited}
                        onCheckedChange={(checked) => updateExportLimits({ premiumUnlimited: checked })}
                      />
                      <Label htmlFor="premiumUnlimited">Exportaciones Ilimitadas para Premium</Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-orange-600" />
                      Formatos Disponibles
                    </CardTitle>
                    <CardDescription>Configura qué formatos puede descargar cada plan</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="freeFormats">Formatos Gratuitos</Label>
                      <Input
                        id="freeFormats"
                        value={config.exportLimits.freeFormats.join(", ")}
                        onChange={(e) =>
                          updateExportLimits({
                            freeFormats: e.target.value.split(",").map((f) => f.trim()),
                          })
                        }
                        placeholder="pdf, txt"
                      />
                    </div>
                    <div>
                      <Label htmlFor="premiumFormats">Formatos Premium</Label>
                      <Input
                        id="premiumFormats"
                        value={config.exportLimits.premiumFormats.join(", ")}
                        onChange={(e) =>
                          updateExportLimits({
                            premiumFormats: e.target.value.split(",").map((f) => f.trim()),
                          })
                        }
                        placeholder="pdf, docx, txt, html"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminGuard>
  )
}
