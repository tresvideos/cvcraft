"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Save, TestTube, CheckCircle, XCircle, Key, CreditCard, Globe } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"

interface EnvironmentVariable {
  key: string
  value: string
  category: "stripe" | "oauth" | "general"
  description: string
  required: boolean
  isSecret: boolean
}

export default function EnvironmentPage() {
  const [variables, setVariables] = useState<EnvironmentVariable[]>([
    // Stripe Variables
    {
      key: "STRIPE_PUBLISHABLE_KEY",
      value: "",
      category: "stripe",
      description: "Clave pública de Stripe",
      required: true,
      isSecret: false,
    },
    {
      key: "STRIPE_SECRET_KEY",
      value: "",
      category: "stripe",
      description: "Clave secreta de Stripe",
      required: true,
      isSecret: true,
    },
    {
      key: "STRIPE_WEBHOOK_SECRET",
      value: "",
      category: "stripe",
      description: "Secret del webhook de Stripe",
      required: true,
      isSecret: true,
    },
    {
      key: "NEXT_PUBLIC_STRIPE_PRICE_ID",
      value: "",
      category: "stripe",
      description: "ID del precio de suscripción",
      required: true,
      isSecret: false,
    },

    // OAuth Variables
    {
      key: "GOOGLE_CLIENT_ID",
      value: "",
      category: "oauth",
      description: "Client ID de Google OAuth",
      required: true,
      isSecret: false,
    },
    {
      key: "GOOGLE_CLIENT_SECRET",
      value: "",
      category: "oauth",
      description: "Client Secret de Google OAuth",
      required: true,
      isSecret: true,
    },
    {
      key: "FACEBOOK_APP_ID",
      value: "",
      category: "oauth",
      description: "App ID de Facebook",
      required: true,
      isSecret: false,
    },
    {
      key: "FACEBOOK_APP_SECRET",
      value: "",
      category: "oauth",
      description: "App Secret de Facebook",
      required: true,
      isSecret: true,
    },

    // General Variables
    {
      key: "NEXTAUTH_URL",
      value: "",
      category: "general",
      description: "URL base de la aplicación",
      required: true,
      isSecret: false,
    },
    {
      key: "NEXTAUTH_SECRET",
      value: "",
      category: "general",
      description: "Secret para NextAuth",
      required: true,
      isSecret: true,
    },
  ])

  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
  const [testResults, setTestResults] = useState<Record<string, "success" | "error" | "testing">>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadVariables()
  }, [])

  const loadVariables = async () => {
    try {
      const response = await fetch("/api/admin/environment")
      if (response.ok) {
        const data = await response.json()
        setVariables((prev) =>
          prev.map((variable) => ({
            ...variable,
            value: data[variable.key] || "",
          })),
        )
      }
    } catch (error) {
      toast.error("Error al cargar las variables")
    }
  }

  const saveVariables = async () => {
    setLoading(true)
    try {
      const variableData = variables.reduce(
        (acc, variable) => {
          acc[variable.key] = variable.value
          return acc
        },
        {} as Record<string, string>,
      )

      const response = await fetch("/api/admin/environment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(variableData),
      })

      if (response.ok) {
        toast.success("Variables guardadas correctamente")
      } else {
        toast.error("Error al guardar las variables")
      }
    } catch (error) {
      toast.error("Error al guardar las variables")
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async (category: string) => {
    setTestResults((prev) => ({ ...prev, [category]: "testing" }))

    try {
      const response = await fetch(`/api/admin/test-connection`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      })

      const result = response.ok ? "success" : "error"
      setTestResults((prev) => ({ ...prev, [category]: result }))

      if (result === "success") {
        toast.success(`Conexión ${category} exitosa`)
      } else {
        toast.error(`Error en conexión ${category}`)
      }
    } catch (error) {
      setTestResults((prev) => ({ ...prev, [category]: "error" }))
      toast.error(`Error al probar conexión ${category}`)
    }
  }

  const updateVariable = (key: string, value: string) => {
    setVariables((prev) => prev.map((variable) => (variable.key === key ? { ...variable, value } : variable)))
  }

  const toggleSecretVisibility = (key: string) => {
    setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const getStatusIcon = (category: string) => {
    const status = testResults[category]
    if (status === "testing") return <TestTube className="h-4 w-4 animate-spin" />
    if (status === "success") return <CheckCircle className="h-4 w-4 text-green-600" />
    if (status === "error") return <XCircle className="h-4 w-4 text-red-600" />
    return null
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "stripe":
        return <CreditCard className="h-5 w-5" />
      case "oauth":
        return <Key className="h-5 w-5" />
      case "general":
        return <Globe className="h-5 w-5" />
      default:
        return <Key className="h-5 w-5" />
    }
  }

  const renderVariablesByCategory = (category: "stripe" | "oauth" | "general") => {
    const categoryVariables = variables.filter((v) => v.category === category)

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getCategoryIcon(category)}
            <h3 className="text-lg font-semibold capitalize">{category}</h3>
            {getStatusIcon(category)}
          </div>
          <Button
            onClick={() => testConnection(category)}
            variant="outline"
            size="sm"
            disabled={testResults[category] === "testing"}
          >
            <TestTube className="h-4 w-4 mr-2" />
            Probar Conexión
          </Button>
        </div>

        <div className="grid gap-4">
          {categoryVariables.map((variable) => (
            <div key={variable.key} className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor={variable.key}>{variable.key}</Label>
                {variable.required && (
                  <Badge variant="destructive" className="text-xs">
                    Requerido
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{variable.description}</p>
              <div className="relative">
                <Input
                  id={variable.key}
                  type={variable.isSecret && !showSecrets[variable.key] ? "password" : "text"}
                  value={variable.value}
                  onChange={(e) => updateVariable(variable.key, e.target.value)}
                  placeholder={`Ingresa ${variable.key}`}
                  className="pr-10"
                />
                {variable.isSecret && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => toggleSecretVisibility(variable.key)}
                  >
                    {showSecrets[variable.key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Variables de Entorno
            </h1>
            <p className="text-muted-foreground mt-2">Configura todas las claves de API y variables del sistema</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Configuración del Sistema</CardTitle>
              <CardDescription>
                Gestiona todas las variables de entorno necesarias para el funcionamiento de CVCraft
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stripe" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="stripe" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Stripe
                  </TabsTrigger>
                  <TabsTrigger value="oauth" className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    OAuth
                  </TabsTrigger>
                  <TabsTrigger value="general" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    General
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="stripe">{renderVariablesByCategory("stripe")}</TabsContent>

                <TabsContent value="oauth">{renderVariablesByCategory("oauth")}</TabsContent>

                <TabsContent value="general">{renderVariablesByCategory("general")}</TabsContent>
              </Tabs>

              <div className="flex justify-end mt-8">
                <Button
                  onClick={saveVariables}
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Guardando..." : "Guardar Variables"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminGuard>
  )
}
