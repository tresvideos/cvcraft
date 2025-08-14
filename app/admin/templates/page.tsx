"use client"

import type React from "react"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Crown, ArrowLeft, Upload } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

// Mock data para plantillas
const mockTemplates = [
  {
    id: "1",
    name: "Ejecutivo Moderno",
    description: "Plantilla profesional para ejecutivos y directivos",
    category: "Profesional",
    isPremium: false,
    isActive: true,
    usageCount: 1247,
    createdDate: "2024-01-15",
    image: "/modern-executive-cv.png",
  },
  {
    id: "2",
    name: "Artístico Minimalista",
    description: "Diseño creativo para profesionales del arte y diseño",
    category: "Creativo",
    isPremium: true,
    isActive: true,
    usageCount: 892,
    createdDate: "2024-02-20",
    image: "/minimalist-artistic-cv.png",
  },
  {
    id: "3",
    name: "Tech Innovador",
    description: "Plantilla moderna para desarrolladores y profesionales tech",
    category: "Tecnología",
    isPremium: true,
    isActive: true,
    usageCount: 1456,
    createdDate: "2024-03-10",
    image: "/tech-cv-template.png",
  },
  {
    id: "4",
    name: "Clásico Elegante",
    description: "Diseño tradicional y elegante para cualquier profesión",
    category: "Clásico",
    isPremium: false,
    isActive: true,
    usageCount: 2103,
    createdDate: "2024-04-05",
    image: "/classic-elegant-cv-template.png",
  },
  {
    id: "5",
    name: "Startup Dinámico",
    description: "Plantilla vibrante para emprendedores y startups",
    category: "Startup",
    isPremium: true,
    isActive: false,
    usageCount: 567,
    createdDate: "2024-05-12",
    image: "/startup-cv-template.png",
  },
]

export default function TemplatesManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterType, setFilterType] = useState<"all" | "free" | "premium">("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    category: "",
    isPremium: false,
    image: null as File | null,
  })

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || template.category === filterCategory
    const matchesType = filterType === "all" || (filterType === "premium" ? template.isPremium : !template.isPremium)

    return matchesSearch && matchesCategory && matchesType
  })

  const categories = ["Profesional", "Creativo", "Tecnología", "Clásico", "Startup", "Académico"]

  const handleAddTemplate = () => {
    console.log("Agregar plantilla:", newTemplate)
    setIsAddDialogOpen(false)
    setNewTemplate({ name: "", description: "", category: "", isPremium: false, image: null })
  }

  const handleTogglePremium = (templateId: string) => {
    console.log("Toggle premium:", templateId)
  }

  const handleToggleActive = (templateId: string) => {
    console.log("Toggle active:", templateId)
  }

  const handleDeleteTemplate = (templateId: string) => {
    console.log("Eliminar plantilla:", templateId)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewTemplate({ ...newTemplate, image: file })
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
                  Gestión de Plantillas
                </h1>
                <p className="text-muted-foreground mt-2">Administra plantillas de CV y cartas de presentación</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Plantilla
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Agregar Nueva Plantilla</DialogTitle>
                  <DialogDescription>Crea una nueva plantilla de CV para los usuarios</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre de la Plantilla</Label>
                    <Input
                      id="name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      placeholder="Ej: Ejecutivo Moderno"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                      placeholder="Describe el estilo y uso de la plantilla"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Categoría</Label>
                    <select
                      id="category"
                      value={newTemplate.category}
                      onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                      className="px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Imagen de Vista Previa</Label>
                    <div className="flex items-center gap-2">
                      <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="flex-1" />
                      <Upload className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="premium"
                      checked={newTemplate.isPremium}
                      onCheckedChange={(checked) => setNewTemplate({ ...newTemplate, isPremium: checked })}
                    />
                    <Label htmlFor="premium">Plantilla Premium</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddTemplate}>Crear Plantilla</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Plantillas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-green-600">+3 este mes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Plantillas Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">33% del total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Más Usada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,103</div>
                <p className="text-xs text-blue-600">Clásico Elegante</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Usos Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6,265</div>
                <p className="text-xs text-green-600">+15% este mes</p>
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
                      placeholder="Buscar plantillas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="all">Todas las categorías</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="all">Todos los tipos</option>
                    <option value="free">Gratis</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {template.isPremium && (
                        <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                          <Crown className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                      {!template.isActive && <Badge variant="destructive">Inactiva</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">{template.name}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Vista Previa
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleTogglePremium(template.id)}>
                            <Crown className="h-4 w-4 mr-2" />
                            {template.isPremium ? "Hacer Gratis" : "Hacer Premium"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleActive(template.id)}>
                            {template.isActive ? "Desactivar" : "Activar"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteTemplate(template.id)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="outline">{template.category}</Badge>
                      <span className="text-muted-foreground">{template.usageCount} usos</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AdminGuard>
  )
}
