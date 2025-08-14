"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, RotateCcw, TrendingUp, Euro, Crown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

interface PricingConfig {
  downloadPrice: number
  trialPeriodHours: number
  monthlyPrice: number
  yearlyPrice: number
  yearlyDiscount: number
  currency: string
  taxRate: number
  features: {
    freeFeatures: string[]
    premiumFeatures: string[]
  }
  promotions: {
    isActive: boolean
    discountPercentage: number
    validUntil: string
    description: string
  }
}

export default function PricingManagement() {
  const [config, setConfig] = useState<PricingConfig>({
    downloadPrice: 0.5,
    trialPeriodHours: 48,
    monthlyPrice: 19.99,
    yearlyPrice: 199.99,
    yearlyDiscount: 17,
    currency: "EUR",
    taxRate: 21,
    features: {
      freeFeatures: ["Crear CVs ilimitados", "3 plantillas básicas", "Exportar en PDF", "Soporte por email"],
      premiumFeatures: [
        "Todas las plantillas premium",
        "IA avanzada para contenido",
        "Múltiples formatos de descarga",
        "Cartas de presentación",
        "Soporte prioritario",
        "Análisis de CV",
      ],
    },
    promotions: {
      isActive: false,
      discountPercentage: 20,
      validUntil: "2024-12-31",
      description: "Oferta especial de fin de año",
    },
  })

  const [hasChanges, setHasChanges] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const updateConfig = (updates: Partial<PricingConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
    setHasChanges(true)
  }

  const updateFeatures = (type: "freeFeatures" | "premiumFeatures", features: string[]) => {
    setConfig((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [type]: features,
      },
    }))
    setHasChanges(true)
  }

  const updatePromotions = (updates: Partial<PricingConfig["promotions"]>) => {
    setConfig((prev) => ({
      ...prev,
      promotions: {
        ...prev.promotions,
        ...updates,
      },
    }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/pricing-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })

      if (response.ok) {
        // Actualizar productos en Stripe con los nuevos precios
        await fetch("/api/admin/update-stripe-prices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            downloadPrice: config.downloadPrice,
            monthlyPrice: config.monthlyPrice,
            yearlyPrice: config.yearlyPrice,
          }),
        })

        setHasChanges(false)
        // Mostrar notificación de éxito
      }
    } catch (error) {
      console.error("Error saving pricing config:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    // Resetear a valores por defecto
    setHasChanges(false)
  }

  const calculateYearlyDiscount = () => {
    const monthlyTotal = config.monthlyPrice * 12
    const savings = monthlyTotal - config.yearlyPrice
    const discountPercentage = (savings / monthlyTotal) * 100
    return Math.round(discountPercentage)
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
                  Gestión de Precios
                </h1>
                <p className="text-muted-foreground mt-2">Configura precios, planes y promociones</p>
              </div>
            </div>
            <div className="flex gap-2">
              {hasChanges && (
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Descartar
                </Button>
              )}
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isLoading}
                className="bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
            </div>
          </div>

          {/* Current Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos del Mes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€2,847</div>
                <p className="text-xs text-green-600">+23% vs mes anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Descargas Pagadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,456</div>
                <p className="text-xs text-blue-600">€{(1456 * config.downloadPrice).toFixed(2)} generados</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Conversión a Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23.4%</div>
                <p className="text-xs text-green-600">+2.1% este mes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Valor Promedio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€12.34</div>
                <p className="text-xs text-muted-foreground">Por usuario</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuración de Precios */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Euro className="h-5 w-5 text-green-600" />
                    Configuración de Precios
                  </CardTitle>
                  <CardDescription>Ajusta los precios principales del servicio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="downloadPrice">Precio de Descarga</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="downloadPrice"
                          type="number"
                          step="0.01"
                          value={config.downloadPrice}
                          onChange={(e) => updateConfig({ downloadPrice: Number.parseFloat(e.target.value) })}
                        />
                        <span className="text-sm text-muted-foreground">€</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="trialPeriod">Período de Prueba</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="trialPeriod"
                          type="number"
                          value={config.trialPeriodHours}
                          onChange={(e) => updateConfig({ trialPeriodHours: Number.parseInt(e.target.value) })}
                        />
                        <span className="text-sm text-muted-foreground">horas</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="monthlyPrice">Precio Mensual</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="monthlyPrice"
                          type="number"
                          step="0.01"
                          value={config.monthlyPrice}
                          onChange={(e) => updateConfig({ monthlyPrice: Number.parseFloat(e.target.value) })}
                        />
                        <span className="text-sm text-muted-foreground">€</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="yearlyPrice">Precio Anual</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="yearlyPrice"
                          type="number"
                          step="0.01"
                          value={config.yearlyPrice}
                          onChange={(e) => updateConfig({ yearlyPrice: Number.parseFloat(e.target.value) })}
                        />
                        <span className="text-sm text-muted-foreground">€</span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        Descuento: {calculateYearlyDiscount()}% (€
                        {(config.monthlyPrice * 12 - config.yearlyPrice).toFixed(2)} ahorro)
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currency">Moneda</Label>
                      <select
                        id="currency"
                        value={config.currency}
                        onChange={(e) => updateConfig({ currency: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                      >
                        <option value="EUR">Euro (€)</option>
                        <option value="USD">Dólar ($)</option>
                        <option value="GBP">Libra (£)</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="taxRate">Tasa de Impuestos</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="taxRate"
                          type="number"
                          value={config.taxRate}
                          onChange={(e) => updateConfig({ taxRate: Number.parseInt(e.target.value) })}
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Promociones */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    Promociones Activas
                  </CardTitle>
                  <CardDescription>Configura ofertas especiales y descuentos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="promotionActive"
                      checked={config.promotions.isActive}
                      onCheckedChange={(checked) => updatePromotions({ isActive: checked })}
                    />
                    <Label htmlFor="promotionActive">Activar promoción</Label>
                    {config.promotions.isActive && (
                      <Badge variant="default" className="bg-orange-500">
                        Activa
                      </Badge>
                    )}
                  </div>

                  {config.promotions.isActive && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="discountPercentage">Descuento</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id="discountPercentage"
                              type="number"
                              value={config.promotions.discountPercentage}
                              onChange={(e) =>
                                updatePromotions({ discountPercentage: Number.parseInt(e.target.value) })
                              }
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="validUntil">Válido hasta</Label>
                          <Input
                            id="validUntil"
                            type="date"
                            value={config.promotions.validUntil}
                            onChange={(e) => updatePromotions({ validUntil: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="promoDescription">Descripción de la Promoción</Label>
                        <Textarea
                          id="promoDescription"
                          value={config.promotions.description}
                          onChange={(e) => updatePromotions({ description: e.target.value })}
                          placeholder="Describe la promoción para mostrar a los usuarios"
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Vista Previa y Características */}
            <div className="space-y-6">
              {/* Vista Previa de Precios */}
              <Card>
                <CardHeader>
                  <CardTitle>Vista Previa de Planes</CardTitle>
                  <CardDescription>Cómo verán los usuarios los precios actuales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Plan Gratuito */}
                    <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                      <div className="text-center mb-4">
                        <h3 className="font-semibold text-lg">Gratuito</h3>
                        <div className="text-2xl font-bold">€{config.downloadPrice}</div>
                        <p className="text-sm text-muted-foreground">por descarga</p>
                      </div>
                      <ul className="space-y-2 text-sm">
                        {config.features.freeFeatures.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Plan Premium */}
                    <div className="border rounded-lg p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 relative">
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600">
                          <Crown className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                      <div className="text-center mb-4 mt-2">
                        <h3 className="font-semibold text-lg">Premium</h3>
                        <div className="text-2xl font-bold">€{config.monthlyPrice}</div>
                        <p className="text-sm text-muted-foreground">por mes</p>
                        {config.promotions.isActive && (
                          <div className="text-xs text-orange-600 font-medium">
                            {config.promotions.discountPercentage}% descuento
                          </div>
                        )}
                      </div>
                      <ul className="space-y-2 text-sm">
                        {config.features.premiumFeatures.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="text-purple-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gestión de Características */}
              <Card>
                <CardHeader>
                  <CardTitle>Características de los Planes</CardTitle>
                  <CardDescription>Configura qué incluye cada plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="freeFeatures">Características Gratuitas</Label>
                    <Textarea
                      id="freeFeatures"
                      value={config.features.freeFeatures.join("\n")}
                      onChange={(e) =>
                        updateFeatures(
                          "freeFeatures",
                          e.target.value.split("\n").filter((f) => f.trim()),
                        )
                      }
                      placeholder="Una característica por línea"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="premiumFeatures">Características Premium</Label>
                    <Textarea
                      id="premiumFeatures"
                      value={config.features.premiumFeatures.join("\n")}
                      onChange={(e) =>
                        updateFeatures(
                          "premiumFeatures",
                          e.target.value.split("\n").filter((f) => f.trim()),
                        )
                      }
                      placeholder="Una característica por línea"
                      rows={6}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  )
}
