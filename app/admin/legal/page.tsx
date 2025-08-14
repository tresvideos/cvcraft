"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, FileText, Shield, Clock, Edit } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useState } from "react"

interface LegalDocument {
  id: string
  title: string
  type: "terms" | "privacy" | "cookies" | "gdpr"
  content: string
  lastModified: string
  version: string
  isPublished: boolean
}

const mockDocuments: LegalDocument[] = [
  {
    id: "1",
    title: "Términos de Servicio",
    type: "terms",
    content: `# Términos de Servicio de CVCraft

## 1. Aceptación de los Términos

Al acceder y utilizar CVCraft, usted acepta estar sujeto a estos Términos de Servicio y todas las leyes y regulaciones aplicables.

## 2. Descripción del Servicio

CVCraft es una plataforma en línea que permite a los usuarios crear currículums vitae y cartas de presentación profesionales utilizando plantillas prediseñadas y herramientas de inteligencia artificial.

## 3. Registro de Cuenta

Para utilizar ciertas funciones del servicio, debe registrar una cuenta proporcionando información precisa y completa.

## 4. Suscripciones y Pagos

- **Plan Gratuito**: Acceso limitado con funciones básicas
- **Plan Premium**: Acceso completo por €19.99/mes
- **Descarga Individual**: €0.50 por descarga con período de prueba de 48 horas

## 5. Uso Aceptable

Los usuarios se comprometen a:
- Utilizar el servicio de manera legal y ética
- No compartir credenciales de cuenta
- No intentar acceder a sistemas no autorizados

## 6. Propiedad Intelectual

Todo el contenido, diseños y funcionalidades de CVCraft son propiedad de la empresa y están protegidos por derechos de autor.

## 7. Limitación de Responsabilidad

CVCraft no será responsable de daños indirectos, incidentales o consecuentes que surjan del uso del servicio.

## 8. Modificaciones

Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación.

## 9. Contacto

Para preguntas sobre estos términos, contacte: legal@cvcraft.com`,
    lastModified: "2024-12-15",
    version: "2.1",
    isPublished: true,
  },
  {
    id: "2",
    title: "Política de Privacidad",
    type: "privacy",
    content: `# Política de Privacidad de CVCraft

## 1. Información que Recopilamos

### Información Personal
- Nombre y dirección de correo electrónico
- Información de perfil profesional
- Datos de pago (procesados por terceros seguros)

### Información Técnica
- Dirección IP y datos de navegación
- Cookies y tecnologías similares
- Logs de uso del servicio

## 2. Cómo Utilizamos su Información

- Proporcionar y mejorar nuestros servicios
- Procesar pagos y suscripciones
- Comunicarnos con usted sobre su cuenta
- Personalizar su experiencia

## 3. Compartir Información

No vendemos ni alquilamos su información personal. Podemos compartir datos con:
- Proveedores de servicios de confianza
- Autoridades legales cuando sea requerido por ley

## 4. Seguridad de Datos

Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal.

## 5. Sus Derechos

Bajo el GDPR, usted tiene derecho a:
- Acceder a sus datos personales
- Rectificar información incorrecta
- Solicitar la eliminación de sus datos
- Portabilidad de datos

## 6. Retención de Datos

Conservamos su información personal solo durante el tiempo necesario para los fines descritos en esta política.

## 7. Contacto

Para ejercer sus derechos o hacer preguntas sobre privacidad: privacy@cvcraft.com`,
    lastModified: "2024-12-10",
    version: "1.8",
    isPublished: true,
  },
  {
    id: "3",
    title: "Política de Cookies",
    type: "cookies",
    content: `# Política de Cookies de CVCraft

## ¿Qué son las Cookies?

Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web.

## Tipos de Cookies que Utilizamos

### Cookies Esenciales
- Autenticación de usuario
- Preferencias de idioma y tema
- Funcionalidad del carrito de compras

### Cookies de Rendimiento
- Google Analytics para análisis de uso
- Métricas de rendimiento del sitio

### Cookies de Marketing
- Seguimiento de conversiones
- Personalización de anuncios

## Gestión de Cookies

Puede controlar las cookies a través de:
- Configuración de su navegador
- Nuestro centro de preferencias de cookies
- Herramientas de opt-out de terceros

## Más Información

Para preguntas sobre cookies: cookies@cvcraft.com`,
    lastModified: "2024-11-28",
    version: "1.3",
    isPublished: true,
  },
]

export default function LegalContentEditor() {
  const [documents, setDocuments] = useState<LegalDocument[]>(mockDocuments)
  const [activeDocument, setActiveDocument] = useState<LegalDocument>(documents[0])
  const [isEditing, setIsEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const handleContentChange = (content: string) => {
    setActiveDocument((prev) => ({ ...prev, content }))
    setHasChanges(true)
  }

  const handleSave = () => {
    const updatedDocument = {
      ...activeDocument,
      lastModified: new Date().toISOString().split("T")[0],
      version: incrementVersion(activeDocument.version),
    }

    setDocuments((prev) => prev.map((doc) => (doc.id === activeDocument.id ? updatedDocument : doc)))
    setActiveDocument(updatedDocument)
    setHasChanges(false)
    setIsEditing(false)
    console.log("Documento guardado:", updatedDocument)
  }

  const handlePublish = () => {
    const updatedDocument = { ...activeDocument, isPublished: !activeDocument.isPublished }
    setDocuments((prev) => prev.map((doc) => (doc.id === activeDocument.id ? updatedDocument : doc)))
    setActiveDocument(updatedDocument)
    console.log("Estado de publicación cambiado:", updatedDocument)
  }

  const incrementVersion = (version: string): string => {
    const parts = version.split(".")
    const minor = Number.parseInt(parts[1]) + 1
    return `${parts[0]}.${minor}`
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "terms":
        return <FileText className="h-4 w-4" />
      case "privacy":
        return <Shield className="h-4 w-4" />
      case "cookies":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
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
                  Editor de Contenido Legal
                </h1>
                <p className="text-muted-foreground mt-2">
                  Gestiona términos de servicio, políticas y documentos legales
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing && hasChanges && (
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
              )}
              {isEditing ? (
                <Button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </Button>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Lista de Documentos */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documentos Legales</CardTitle>
                  <CardDescription>Selecciona un documento para editar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        activeDocument.id === doc.id
                          ? "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => {
                        if (!isEditing || !hasChanges) {
                          setActiveDocument(doc)
                          setIsEditing(false)
                          setHasChanges(false)
                        }
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getDocumentIcon(doc.type)}
                          <span className="font-medium text-sm">{doc.title}</span>
                        </div>
                        <Badge variant={doc.isPublished ? "default" : "secondary"} className="text-xs">
                          {doc.isPublished ? "Publicado" : "Borrador"}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>v{doc.version}</span>
                        <span>•</span>
                        <span>{doc.lastModified}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content - Editor */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        {getDocumentIcon(activeDocument.type)}
                        <span>{activeDocument.title}</span>
                      </CardTitle>
                      <CardDescription>
                        Versión {activeDocument.version} • Última modificación: {activeDocument.lastModified}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={activeDocument.isPublished ? "default" : "secondary"}>
                        {activeDocument.isPublished ? "Publicado" : "Borrador"}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePublish}
                        className={activeDocument.isPublished ? "text-orange-600" : "text-green-600"}
                      >
                        {activeDocument.isPublished ? "Despublicar" : "Publicar"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="edit" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="edit">Editor</TabsTrigger>
                      <TabsTrigger value="preview">Vista Previa</TabsTrigger>
                    </TabsList>
                    <TabsContent value="edit" className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Título del Documento</Label>
                          <Input
                            id="title"
                            value={activeDocument.title}
                            onChange={(e) => {
                              setActiveDocument((prev) => ({ ...prev, title: e.target.value }))
                              setHasChanges(true)
                            }}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="content">Contenido (Markdown)</Label>
                          <Textarea
                            id="content"
                            value={activeDocument.content}
                            onChange={(e) => handleContentChange(e.target.value)}
                            disabled={!isEditing}
                            rows={20}
                            className="font-mono text-sm"
                            placeholder="Escribe el contenido del documento en formato Markdown..."
                          />
                        </div>
                        {isEditing && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Consejos de Markdown:</h4>
                            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                              <li>• Use # para títulos principales, ## para subtítulos</li>
                              <li>• Use **texto** para negrita, *texto* para cursiva</li>
                              <li>• Use - para listas con viñetas</li>
                              <li>• Use [texto](url) para enlaces</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="preview" className="mt-4">
                      <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 min-h-[500px]">
                        <div className="prose dark:prose-invert max-w-none">
                          {activeDocument.content.split("\n").map((line, index) => {
                            if (line.startsWith("# ")) {
                              return (
                                <h1 key={index} className="text-3xl font-bold mb-4">
                                  {line.substring(2)}
                                </h1>
                              )
                            }
                            if (line.startsWith("## ")) {
                              return (
                                <h2 key={index} className="text-2xl font-semibold mb-3 mt-6">
                                  {line.substring(3)}
                                </h2>
                              )
                            }
                            if (line.startsWith("### ")) {
                              return (
                                <h3 key={index} className="text-xl font-semibold mb-2 mt-4">
                                  {line.substring(4)}
                                </h3>
                              )
                            }
                            if (line.startsWith("- ")) {
                              return (
                                <li key={index} className="ml-4">
                                  {line.substring(2)}
                                </li>
                              )
                            }
                            if (line.trim() === "") {
                              return <br key={index} />
                            }
                            return (
                              <p key={index} className="mb-2">
                                {line}
                              </p>
                            )
                          })}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  )
}
