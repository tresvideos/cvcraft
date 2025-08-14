"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, CreditCard, Settings, Shield, BarChart3, Key } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Panel de Administración
            </h1>
            <p className="text-muted-foreground mt-2">Gestiona usuarios, plantillas, precios y contenido de CVCraft</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Gestión de Usuarios */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Gestión de Usuarios
                </CardTitle>
                <CardDescription>Administra cuentas activas, suscripciones y permisos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Usuarios activos:</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Suscripciones premium:</span>
                    <span className="font-semibold">342</span>
                  </div>
                </div>
                <Link href="/admin/users">
                  <Button className="w-full">Gestionar Usuarios</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Configuración de Stripe */}
            <Card className="hover:shadow-lg transition-shadow border-blue-200 bg-blue-50/50 dark:bg-blue-900/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-blue-600" />
                  Configuración Stripe
                </CardTitle>
                <CardDescription>Gestiona claves de API y cuentas de Stripe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Estado:</span>
                    <span className="font-semibold text-green-600">Conectado</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Entorno:</span>
                    <span className="font-semibold">Producción</span>
                  </div>
                </div>
                <Link href="/admin/stripe-config">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Configurar Stripe</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Gestión de Plantillas */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  Plantillas
                </CardTitle>
                <CardDescription>Añade, edita y gestiona plantillas de CV</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Plantillas totales:</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Premium:</span>
                    <span className="font-semibold">8</span>
                  </div>
                </div>
                <Link href="/admin/templates">
                  <Button className="w-full bg-transparent" variant="outline">
                    Gestionar Plantillas
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Gestión de Precios */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  Precios y Planes
                </CardTitle>
                <CardDescription>Modifica precios y sincroniza con Stripe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Precio descarga:</span>
                    <span className="font-semibold">€0.50</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Plan mensual:</span>
                    <span className="font-semibold">€19.99</span>
                  </div>
                </div>
                <Link href="/admin/pricing">
                  <Button className="w-full bg-transparent" variant="outline">
                    Gestionar Precios
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Editor Legal */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-600" />
                  Contenido Legal
                </CardTitle>
                <CardDescription>Edita términos de servicio y políticas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-muted-foreground">Última actualización: 15 Dic 2024</div>
                </div>
                <Link href="/admin/legal">
                  <Button className="w-full bg-transparent" variant="outline">
                    Editor Legal
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Configuración Premium */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-600" />
                  Funciones Premium
                </CardTitle>
                <CardDescription>Configura características exclusivas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Plantillas premium:</span>
                    <span className="font-semibold">Activas</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>IA avanzada:</span>
                    <span className="font-semibold">Activa</span>
                  </div>
                </div>
                <Link href="/admin/premium">
                  <Button className="w-full bg-transparent" variant="outline">
                    Configurar Premium
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Estadísticas */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Estadísticas
                </CardTitle>
                <CardDescription>Métricas y análisis de la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>CVs creados hoy:</span>
                    <span className="font-semibold">89</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ingresos del mes:</span>
                    <span className="font-semibold">€2,847</span>
                  </div>
                </div>
                <Link href="/admin/stats">
                  <Button className="w-full bg-transparent" variant="outline">
                    Ver Estadísticas
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Variables de Entorno */}
            <Card className="hover:shadow-lg transition-shadow border-green-200 bg-green-50/50 dark:bg-green-900/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-green-600" />
                  Variables de Entorno
                </CardTitle>
                <CardDescription>Configura claves de API y variables del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Stripe:</span>
                    <span className="font-semibold text-green-600">Configurado</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>OAuth:</span>
                    <span className="font-semibold text-orange-600">Pendiente</span>
                  </div>
                </div>
                <Link href="/admin/environment">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Configurar Variables</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminGuard>
  )
}
