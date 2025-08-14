"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Key, CreditCard, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface StripeConfig {
  publishableKey: string
  secretKey: string
  webhookSecret: string
  environment: "test" | "live"
  accountId: string
  accountName: string
}

export default function StripeConfiguration() {
  const [config, setConfig] = useState<StripeConfig>({
    publishableKey: "",
    secretKey: "",
    webhookSecret: "",
    environment: "test",
    accountId: "",
    accountName: "",
  })

  const [isConnected, setIsConnected] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Cargar configuración actual
    loadCurrentConfig()
  }, [])

  const loadCurrentConfig = async () => {
    try {
      const response = await fetch("/api/admin/stripe-config")
      if (response.ok) {
        const data = await response.json()
        setConfig(data)
        setIsConnected(data.publishableKey && data.secretKey)
      }
    } catch (error) {
      console.error("Error loading Stripe config:", error)
    }
  }

  const updateConfig = (updates: Partial<StripeConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/stripe-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })

      if (response.ok) {
        setHasChanges(false)
        setIsConnected(true)
        // Actualizar productos en Stripe
        await updateStripeProducts()
      }
    } catch (error) {
      console.error("Error saving Stripe config:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateStripeProducts = async () => {
    try {
      await fetch("/api/admin/sync-stripe-products", {
        method: "POST",
      })
    } catch (error) {
      console.error("Error syncing Stripe products:", error)
    }
  }

  const testConnection = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/test-stripe-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publishableKey: config.publishableKey,
          secretKey: config.secretKey,
        }),
      })

      const result = await response.json()
      setIsConnected(result.success)

      if (result.success && result.account) {
        updateConfig({
          accountId: result.account.id,
          accountName: result.account.display_name || result.account.email,
        })
      }
    } catch (error) {
      console.error("Error testing connection:", error)
      setIsConnected(false)
    } finally {
      setIsLoading(false)
    }
  }

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
                  Configuración de Stripe
                </h1>
                <p className="text-muted-foreground mt-2">Gestiona las claves y configuración de Stripe</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={testConnection} disabled={isLoading}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Probar Conexión
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isLoading}
                className="bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            {isConnected ? (
              <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Conectado a Stripe exitosamente
                  {config.accountName && ` - Cuenta: ${config.accountName}`}
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800 dark:text-orange-200">
                  No hay conexión activa con Stripe. Configura las claves para continuar.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuración de Claves */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-blue-600" />
                    Claves de API
                  </CardTitle>
                  <CardDescription>Configura las claves de Stripe para procesar pagos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="environment">Entorno</Label>
                    <select
                      id="environment"
                      value={config.environment}
                      onChange={(e) => updateConfig({ environment: e.target.value as "test" | "live" })}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="test">Pruebas (Test)</option>
                      <option value="live">Producción (Live)</option>
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">
                      {config.environment === "test"
                        ? "Usa claves de prueba para desarrollo"
                        : "Usa claves de producción para pagos reales"}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="publishableKey">Clave Pública (Publishable Key)</Label>
                    <Input
                      id="publishableKey"
                      type="text"
                      value={config.publishableKey}
                      onChange={(e) => updateConfig({ publishableKey: e.target.value })}
                      placeholder={config.environment === "test" ? "pk_test_..." : "pk_live_..."}
                    />
                  </div>

                  <div>
                    <Label htmlFor="secretKey">Clave Secreta (Secret Key)</Label>
                    <Input
                      id="secretKey"
                      type="password"
                      value={config.secretKey}
                      onChange={(e) => updateConfig({ secretKey: e.target.value })}
                      placeholder={config.environment === "test" ? "sk_test_..." : "sk_live_..."}
                    />
                  </div>

                  <div>
                    <Label htmlFor="webhookSecret">Webhook Secret</Label>
                    <Input
                      id="webhookSecret"
                      type="password"
                      value={config.webhookSecret}
                      onChange={(e) => updateConfig({ webhookSecret: e.target.value })}
                      placeholder="whsec_..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Endpoint: https://tudominio.com/api/webhooks/stripe
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Información de la Cuenta */}
              {isConnected && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      Información de la Cuenta
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">ID de Cuenta:</span>
                      <span className="text-sm font-mono">{config.accountId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Nombre:</span>
                      <span className="text-sm">{config.accountName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Entorno:</span>
                      <Badge variant={config.environment === "live" ? "default" : "secondary"}>
                        {config.environment === "live" ? "Producción" : "Pruebas"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Instrucciones y Ayuda */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Instrucciones de Configuración</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">1. Obtener las Claves de Stripe</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Ve a tu Dashboard de Stripe</li>
                      <li>• Navega a Developers → API keys</li>
                      <li>• Copia la Publishable key y Secret key</li>
                      <li>• Para producción, activa tu cuenta primero</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">2. Configurar Webhooks</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Ve a Developers → Webhooks</li>
                      <li>• Crea un nuevo endpoint</li>
                      <li>• URL: https://tudominio.com/api/webhooks/stripe</li>
                      <li>• Eventos: payment_intent.succeeded, customer.subscription.*</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">3. Cambiar de Cuenta</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Simplemente cambia las claves por las de la nueva cuenta</li>
                      <li>• Los productos se sincronizarán automáticamente</li>
                      <li>• Las suscripciones existentes no se verán afectadas</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600">⚠️ Importante</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Nunca compartas tus claves secretas</li>
                    <li>• Usa claves de prueba durante el desarrollo</li>
                    <li>• Verifica que tu cuenta esté activada para producción</li>
                    <li>• Los cambios se aplicarán inmediatamente</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  )
}
