"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Mail } from "lucide-react"

const templates = [
  { id: "professional", name: "Profesional", description: "Formato clásico y elegante" },
  { id: "modern", name: "Moderno", description: "Diseño contemporáneo" },
  { id: "creative", name: "Creativo", description: "Estilo dinámico y llamativo" },
  { id: "minimal", name: "Minimalista", description: "Simple y directo" },
]

interface CoverLetterTemplateSelectorProps {
  selectedTemplate: string
  onTemplateChange: (template: string) => void
}

export function CoverLetterTemplateSelector({ selectedTemplate, onTemplateChange }: CoverLetterTemplateSelectorProps) {
  const currentTemplate = templates.find((t) => t.id === selectedTemplate)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-transparent">
          <Mail className="h-4 w-4 mr-2" />
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
