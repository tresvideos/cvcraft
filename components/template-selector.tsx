"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

const templates = [
  { id: "modern", name: "Tech Innovador", description: "Diseño moderno para tecnología", color: "bg-purple-500" },
  {
    id: "professional",
    name: "Ejecutivo Profesional",
    description: "Clásico y elegante para ejecutivos",
    color: "bg-gray-800",
  },
  {
    id: "creative",
    name: "Creativo Dinámico",
    description: "Colorido y audaz para creativos",
    color: "bg-gradient-to-r from-blue-500 to-purple-500",
  },
  { id: "minimal", name: "Minimalista", description: "Simple y efectivo", color: "bg-gray-400" },
]

interface TemplateSelectorProps {
  selectedTemplate: string
  onTemplateChange: (template: string) => void
}

export function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentTemplate = templates.find((t) => t.id === selectedTemplate)

  const handleTemplateSelect = (templateId: string) => {
    console.log("🎨 Cambiando plantilla de", selectedTemplate, "a", templateId)
    onTemplateChange(templateId)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="bg-white border-2 hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`w-3 h-3 rounded-full mr-2 ${currentTemplate?.color || "bg-gray-400"}`}></div>
        {currentTemplate?.name || "Seleccionar plantilla"}
        <ChevronDown className="h-4 w-4 ml-2" />
      </Button>

      {isOpen && (
        <>
          {/* Overlay para cerrar */}
          <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div
            className="absolute top-full left-0 mt-2 w-80 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-[9999]"
            style={{
              position: "absolute",
              zIndex: 10000,
              backgroundColor: "white",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="p-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`w-full text-left p-4 rounded-md hover:bg-gray-50 transition-all duration-200 border-2 mb-2 ${
                    selectedTemplate === template.id
                      ? "bg-blue-50 border-blue-300 shadow-sm"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-4 h-4 rounded-full mr-3 ${template.color}`}></div>
                    <div className="font-semibold text-gray-900">{template.name}</div>
                    {selectedTemplate === template.id && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 ml-7">{template.description}</div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
