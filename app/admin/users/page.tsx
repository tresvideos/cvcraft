"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, UserCheck, UserX, Crown, Mail, ArrowLeft } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useState } from "react"

// Mock data para usuarios
const mockUsers = [
  {
    id: "1",
    name: "Ana García",
    email: "ana.garcia@email.com",
    plan: "premium" as const,
    status: "active" as const,
    joinDate: "2024-01-15",
    lastActive: "2024-12-15",
    cvsCreated: 5,
    provider: "email",
  },
  {
    id: "2",
    name: "Carlos López",
    email: "carlos.lopez@gmail.com",
    plan: "free" as const,
    status: "active" as const,
    joinDate: "2024-02-20",
    lastActive: "2024-12-14",
    cvsCreated: 2,
    provider: "google",
  },
  {
    id: "3",
    name: "María Rodríguez",
    email: "maria.rodriguez@email.com",
    plan: "premium" as const,
    status: "suspended" as const,
    joinDate: "2024-03-10",
    lastActive: "2024-12-10",
    cvsCreated: 8,
    provider: "email",
  },
  {
    id: "4",
    name: "David Martín",
    email: "david.martin@facebook.com",
    plan: "free" as const,
    status: "active" as const,
    joinDate: "2024-04-05",
    lastActive: "2024-12-13",
    cvsCreated: 1,
    provider: "facebook",
  },
  {
    id: "5",
    name: "Laura Sánchez",
    email: "laura.sanchez@email.com",
    plan: "premium" as const,
    status: "active" as const,
    joinDate: "2024-05-12",
    lastActive: "2024-12-15",
    cvsCreated: 12,
    provider: "email",
  },
]

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPlan, setFilterPlan] = useState<"all" | "free" | "premium">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "suspended">("all")

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlan = filterPlan === "all" || user.plan === filterPlan
    const matchesStatus = filterStatus === "all" || user.status === filterStatus

    return matchesSearch && matchesPlan && matchesStatus
  })

  const handleSuspendUser = (userId: string) => {
    console.log("Suspender usuario:", userId)
  }

  const handleActivateUser = (userId: string) => {
    console.log("Activar usuario:", userId)
  }

  const handleUpgradeToPremium = (userId: string) => {
    console.log("Actualizar a premium:", userId)
  }

  const handleSendEmail = (userEmail: string) => {
    console.log("Enviar email a:", userEmail)
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
                  Gestión de Usuarios
                </h1>
                <p className="text-muted-foreground mt-2">Administra cuentas, suscripciones y permisos de usuarios</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-green-600">+12% este mes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-green-600">+8% este mes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,189</div>
                <p className="text-xs text-muted-foreground">95.3% del total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Nuevos Hoy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-blue-600">+5 vs ayer</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filtros y Búsqueda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nombre o email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value as any)}
                    className="px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="all">Todos los planes</option>
                    <option value="free">Gratis</option>
                    <option value="premium">Premium</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="all">Todos los estados</option>
                    <option value="active">Activos</option>
                    <option value="suspended">Suspendidos</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Usuarios ({filteredUsers.length})</CardTitle>
              <CardDescription>Gestiona usuarios individuales y sus suscripciones</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>CVs Creados</TableHead>
                    <TableHead>Último Acceso</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">{user.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                            <div className="text-xs text-muted-foreground">
                              {user.provider === "google" && "🔗 Google"}
                              {user.provider === "facebook" && "🔗 Facebook"}
                              {user.provider === "email" && "📧 Email"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.plan === "premium" ? "default" : "secondary"}>
                          {user.plan === "premium" && <Crown className="h-3 w-3 mr-1" />}
                          {user.plan === "premium" ? "Premium" : "Gratis"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "default" : "destructive"}>
                          {user.status === "active" ? "Activo" : "Suspendido"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{user.cvsCreated}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{user.lastActive}</div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleSendEmail(user.email)}>
                              <Mail className="h-4 w-4 mr-2" />
                              Enviar Email
                            </DropdownMenuItem>
                            {user.plan === "free" && (
                              <DropdownMenuItem onClick={() => handleUpgradeToPremium(user.id)}>
                                <Crown className="h-4 w-4 mr-2" />
                                Actualizar a Premium
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {user.status === "active" ? (
                              <DropdownMenuItem onClick={() => handleSuspendUser(user.id)} className="text-red-600">
                                <UserX className="h-4 w-4 mr-2" />
                                Suspender Usuario
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleActivateUser(user.id)} className="text-green-600">
                                <UserCheck className="h-4 w-4 mr-2" />
                                Activar Usuario
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminGuard>
  )
}
