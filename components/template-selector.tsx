"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Palette } from "lucide-react"

const templates = [
  { id: "modern", name: "Tech Innovador", description: "Diseño moderno para tecnología" },
  { id: "professional", name: "Ejecutivo Profesional", description: "Clásico y elegante para ejecutivos" },
  { id: "creative", name: "Creativo Dinámico", description: "Colorido y audaz para creativos" },
  { id: "minimal", name: "Minimalista", description: "Simple y efectivo" },
]

interface TemplateSelectorProps {
  selectedTemplate: string
  onTemplateChange: (template: string) => void
}

export function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  const currentTemplate = templates.find((t) => t.id === selectedTemplate)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-transparent">
          <Palette className="h-4 w-4 mr-2" />
          {currentTemplate?.name}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        {templates.map((template) => (
          <DropdownMenuItem
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={selectedTemplate === template.id ? "bg-purple-50" : ""}
          >
            <div>
              <div className="font-medium">{template.name}</div>
              <div className="text-sm text-gray-500">{template.description}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
