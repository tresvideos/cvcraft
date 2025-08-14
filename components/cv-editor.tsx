"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Zap,
  Globe,
  Camera,
  X,
  Award,
  FolderOpen,
  Heart,
  BookOpen,
  Users,
  Trophy,
} from "lucide-react"
import { AIGenerator } from "@/components/ai-generator"
import type { CVData } from "@/app/editor/cv/page"
import { useRef } from "react"

interface CVEditorProps {
  cvData: CVData
  onDataChange: (data: CVData) => void
}

export function CVEditor({ cvData, onDataChange }: CVEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updatePersonalInfo = (field: string, value: string) => {
    onDataChange({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        [field]: value,
      },
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        updatePersonalInfo("profileImage", imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeProfileImage = () => {
    updatePersonalInfo("profileImage", "")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const addCertification = () => {
    const newCertification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialId: "",
      url: "",
    }
    onDataChange({
      ...cvData,
      certifications: [...(cvData.certifications || []), newCertification],
    })
  }

  const updateCertification = (id: string, field: string, value: string) => {
    onDataChange({
      ...cvData,
      certifications: (cvData.certifications || []).map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert,
      ),
    })
  }

  const removeCertification = (id: string) => {
    onDataChange({
      ...cvData,
      certifications: (cvData.certifications || []).filter((cert) => cert.id !== id),
    })
  }

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: "",
      url: "",
      github: "",
      startDate: "",
      endDate: "",
      current: false,
    }
    onDataChange({
      ...cvData,
      projects: [...(cvData.projects || []), newProject],
    })
  }

  const updateProject = (id: string, field: string, value: string | boolean) => {
    onDataChange({
      ...cvData,
      projects: (cvData.projects || []).map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    })
  }

  const removeProject = (id: string) => {
    onDataChange({
      ...cvData,
      projects: (cvData.projects || []).filter((project) => project.id !== id),
    })
  }

  const addVolunteer = () => {
    const newVolunteer = {
      id: Date.now().toString(),
      organization: "",
      role: "",
      description: "",
      startDate: "",
      endDate: "",
      current: false,
    }
    onDataChange({
      ...cvData,
      volunteer: [...(cvData.volunteer || []), newVolunteer],
    })
  }

  const updateVolunteer = (id: string, field: string, value: string | boolean) => {
    onDataChange({
      ...cvData,
      volunteer: (cvData.volunteer || []).map((vol) => (vol.id === id ? { ...vol, [field]: value } : vol)),
    })
  }

  const removeVolunteer = (id: string) => {
    onDataChange({
      ...cvData,
      volunteer: (cvData.volunteer || []).filter((vol) => vol.id !== id),
    })
  }

  const addPublication = () => {
    const newPublication = {
      id: Date.now().toString(),
      title: "",
      publisher: "",
      date: "",
      url: "",
      description: "",
    }
    onDataChange({
      ...cvData,
      publications: [...(cvData.publications || []), newPublication],
    })
  }

  const updatePublication = (id: string, field: string, value: string) => {
    onDataChange({
      ...cvData,
      publications: (cvData.publications || []).map((pub) => (pub.id === id ? { ...pub, [field]: value } : pub)),
    })
  }

  const removePublication = (id: string) => {
    onDataChange({
      ...cvData,
      publications: (cvData.publications || []).filter((pub) => pub.id !== id),
    })
  }

  const addReference = () => {
    const newReference = {
      id: Date.now().toString(),
      name: "",
      position: "",
      company: "",
      email: "",
      phone: "",
      relationship: "",
    }
    onDataChange({
      ...cvData,
      references: [...(cvData.references || []), newReference],
    })
  }

  const updateReference = (id: string, field: string, value: string) => {
    onDataChange({
      ...cvData,
      references: (cvData.references || []).map((ref) => (ref.id === id ? { ...ref, [field]: value } : ref)),
    })
  }

  const removeReference = (id: string) => {
    onDataChange({
      ...cvData,
      references: (cvData.references || []).filter((ref) => ref.id !== id),
    })
  }

  const addAchievement = () => {
    const newAchievement = {
      id: Date.now().toString(),
      title: "",
      description: "",
      date: "",
      issuer: "",
    }
    onDataChange({
      ...cvData,
      achievements: [...(cvData.achievements || []), newAchievement],
    })
  }

  const updateAchievement = (id: string, field: string, value: string) => {
    onDataChange({
      ...cvData,
      achievements: (cvData.achievements || []).map((ach) => (ach.id === id ? { ...ach, [field]: value } : ach)),
    })
  }

  const removeAchievement = (id: string) => {
    onDataChange({
      ...cvData,
      achievements: (cvData.achievements || []).filter((ach) => ach.id !== id),
    })
  }

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    onDataChange({
      ...cvData,
      experience: [...cvData.experience, newExperience],
    })
  }

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    onDataChange({
      ...cvData,
      experience: cvData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    onDataChange({
      ...cvData,
      experience: cvData.experience.filter((exp) => exp.id !== id),
    })
  }

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      activities: "",
      coursework: "",
    }
    onDataChange({
      ...cvData,
      education: [...cvData.education, newEducation],
    })
  }

  const updateEducation = (id: string, field: string, value: string | boolean) => {
    onDataChange({
      ...cvData,
      education: cvData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    onDataChange({
      ...cvData,
      education: cvData.education.filter((edu) => edu.id !== id),
    })
  }

  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: "",
      level: 3,
    }
    onDataChange({
      ...cvData,
      skills: [...cvData.skills, newSkill],
    })
  }

  const updateSkill = (id: string, field: string, value: string | number) => {
    onDataChange({
      ...cvData,
      skills: cvData.skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)),
    })
  }

  const removeSkill = (id: string) => {
    onDataChange({
      ...cvData,
      skills: cvData.skills.filter((skill) => skill.id !== id),
    })
  }

  const addLanguage = () => {
    const newLanguage = {
      id: Date.now().toString(),
      name: "",
      level: "Intermedio",
    }
    onDataChange({
      ...cvData,
      languages: [...cvData.languages, newLanguage],
    })
  }

  const updateLanguage = (id: string, field: string, value: string) => {
    onDataChange({
      ...cvData,
      languages: cvData.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    })
  }

  const removeLanguage = (id: string) => {
    onDataChange({
      ...cvData,
      languages: cvData.languages.filter((lang) => lang.id !== id),
    })
  }

  const handleGenerateSummary = (content: string) => {
    updatePersonalInfo("summary", content)
  }

  const handleGenerateExperienceDescription = (id: string, content: string) => {
    updateExperience(id, "description", content)
  }

  const handleGenerateSkills = (content: string) => {
    const skillNames = content
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0)
    const newSkills = skillNames.map((name) => ({
      id: Date.now().toString() + Math.random(),
      name,
      level: 3,
    }))
    onDataChange({
      ...cvData,
      skills: [...cvData.skills, ...newSkills],
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="flex w-full overflow-x-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1 gap-1 scrollbar-hide">
          <TabsTrigger
            value="personal"
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 text-xs font-medium transition-all data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900 dark:data-[state=active]:text-purple-300 min-w-[70px] h-[60px] whitespace-nowrap flex-shrink-0"
          >
            <User className="h-4 w-4 flex-shrink-0" />
            <span className="text-[10px] leading-tight">Personal</span>
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 text-xs font-medium transition-all data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900 dark:data-[state=active]:text-purple-300 min-w-[80px] h-[60px] whitespace-nowrap flex-shrink-0"
          >
            <Briefcase className="h-4 w-4 flex-shrink-0" />
            <span className="text-[10px] leading-tight">Experiencia</span>
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 text-xs font-medium transition-all data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900 dark:data-[state=active]:text-purple-300 min-w-[75px] h-[60px] whitespace-nowrap flex-shrink-0"
          >
            <GraduationCap className="h-4 w-4 flex-shrink-0" />
            <span className="text-[10px] leading-tight">Educación</span>
          </TabsTrigger>
          <TabsTrigger
            value="skills"
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 text-xs font-medium transition-all data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900 dark:data-[state=active]:text-purple-300 min-w-[80px] h-[60px] whitespace-nowrap flex-shrink-0"
          >
            <Zap className="h-4 w-4 flex-shrink-0" />
            <span className="text-[10px] leading-tight">Habilidades</span>
          </TabsTrigger>
          <TabsTrigger
            value="certifications"
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 text-xs font-medium transition-all data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900 dark:data-[state=active]:text-purple-300 min-w-[90px] h-[60px] whitespace-nowrap flex-shrink-0"
          >
            <Award className="h-4 w-4 flex-shrink-0" />
            <span className="text-[10px] leading-tight">Certificaciones</span>
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 text-xs font-medium transition-all data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900 dark:data-[state=active]:text-purple-300 min-w-[75px] h-[60px] whitespace-nowrap flex-shrink-0"
          >
            <FolderOpen className="h-4 w-4 flex-shrink-0" />
            <span className="text-[10px] leading-tight">Proyectos</span>
          </TabsTrigger>
          <TabsTrigger
            value="languages"
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 text-xs font-medium transition-all data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900 dark:data-[state=active]:text-purple-300 min-w-[70px] h-[60px] whitespace-nowrap flex-shrink-0"
          >
            <Globe className="h-4 w-4 flex-shrink-0" />
            <span className="text-[10px] leading-tight">Idiomas</span>
          </TabsTrigger>
          <TabsTrigger
            value="more"
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 text-xs font-medium transition-all data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900 dark:data-[state=active]:text-purple-300 min-w-[60px] h-[60px] whitespace-nowrap flex-shrink-0"
          >
            <Trophy className="h-4 w-4 flex-shrink-0" />
            <span className="text-[10px] leading-tight">Más</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Información Personal</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Foto de perfil (opcional)</Label>
                <div className="flex items-center space-x-4">
                  {cvData.personalInfo.profileImage ? (
                    <div className="relative">
                      <img
                        src={cvData.personalInfo.profileImage || "/placeholder.svg"}
                        alt="Foto de perfil"
                        className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeProfileImage}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-red-100 hover:bg-red-200 text-red-600 border-red-300"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {cvData.personalInfo.profileImage ? "Cambiar foto" : "Subir foto"}
                    </Button>
                    <p className="text-sm text-gray-500">Recomendado: 400x400px, formato JPG o PNG</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre completo</Label>
                  <Input
                    id="fullName"
                    value={cvData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={cvData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={cvData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    placeholder="+34 123 456 789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    value={cvData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo("location", e.target.value)}
                    placeholder="Madrid, España"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Sitio web</Label>
                  <Input
                    id="website"
                    value={cvData.personalInfo.website}
                    onChange={(e) => updatePersonalInfo("website", e.target.value)}
                    placeholder="https://tuweb.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={cvData.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/tuperfil"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={cvData.personalInfo.github || ""}
                    onChange={(e) => updatePersonalInfo("github", e.target.value)}
                    placeholder="github.com/tuusuario"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={cvData.personalInfo.twitter || ""}
                    onChange={(e) => updatePersonalInfo("twitter", e.target.value)}
                    placeholder="@tuusuario"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="summary">Resumen profesional</Label>
                  <AIGenerator
                    type="summary"
                    onGenerate={handleGenerateSummary}
                    currentContent={cvData.personalInfo.summary}
                  />
                </div>
                <Textarea
                  id="summary"
                  value={cvData.personalInfo.summary}
                  onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                  placeholder="Describe brevemente tu perfil profesional..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Intereses y hobbies</Label>
                <Textarea
                  id="interests"
                  value={cvData.personalInfo.interests || ""}
                  onChange={(e) => updatePersonalInfo("interests", e.target.value)}
                  placeholder="Fotografía, viajes, lectura, deportes..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-sans font-semibold">Experiencia Laboral</h3>
            <Button onClick={addExperience} size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Agregar
            </Button>
          </div>

          {cvData.experience.map((exp, index) => (
            <Card key={exp.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Experiencia {index + 1}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Empresa</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                      placeholder="Nombre de la empresa"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cargo</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                      placeholder="Tu cargo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de inicio</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de fin</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                      disabled={exp.current}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ubicación</Label>
                    <Input
                      value={exp.location || ""}
                      onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                      placeholder="Madrid, España"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de empleo</Label>
                    <select
                      value={exp.employmentType || ""}
                      onChange={(e) => updateExperience(exp.id, "employmentType", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Seleccionar</option>
                      <option value="Tiempo completo">Tiempo completo</option>
                      <option value="Medio tiempo">Medio tiempo</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Prácticas">Prácticas</option>
                      <option value="Contrato">Contrato</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={exp.current}
                    onCheckedChange={(checked) => updateExperience(exp.id, "current", checked)}
                  />
                  <Label>Trabajo actual</Label>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Descripción</Label>
                    <AIGenerator
                      type="experience"
                      onGenerate={(content) => handleGenerateExperienceDescription(exp.id, content)}
                      currentContent={exp.description}
                      context={{
                        position: exp.position,
                        company: exp.company,
                      }}
                    />
                  </div>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                    placeholder="Describe tus responsabilidades y logros..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Logros clave</Label>
                  <Textarea
                    value={exp.achievements || ""}
                    onChange={(e) => updateExperience(exp.id, "achievements", e.target.value)}
                    placeholder="• Aumenté las ventas en un 25%&#10;• Lideré un equipo de 5 personas&#10;• Implementé nuevo sistema que redujo costos en 15%"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {cvData.experience.length === 0 && (
            <Card className="border-2 border-dashed border-gray-200">
              <CardContent className="p-8 text-center">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No has agregado experiencia laboral</p>
                <Button onClick={addExperience} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar primera experiencia
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-sans font-semibold">Educación</h3>
            <Button onClick={addEducation} size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Agregar
            </Button>
          </div>

          {cvData.education.map((edu, index) => (
            <Card key={edu.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Educación {index + 1}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Institución</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                      placeholder="Universidad o institución"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Título</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                      placeholder="Grado, Máster, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Campo de estudio</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                      placeholder="Ingeniería, Marketing, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>GPA/Nota media</Label>
                    <Input
                      value={edu.gpa || ""}
                      onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                      placeholder="8.5/10 o 3.8/4.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de inicio</Label>
                    <Input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de fin</Label>
                    <Input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                      disabled={edu.current}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={edu.current}
                    onCheckedChange={(checked) => updateEducation(edu.id, "current", checked)}
                  />
                  <Label>Estudiando actualmente</Label>
                </div>
                <div className="space-y-2">
                  <Label>Actividades extracurriculares</Label>
                  <Textarea
                    value={edu.activities || ""}
                    onChange={(e) => updateEducation(edu.id, "activities", e.target.value)}
                    placeholder="Clubs, deportes, organizaciones estudiantiles..."
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cursos relevantes</Label>
                  <Textarea
                    value={edu.coursework || ""}
                    onChange={(e) => updateEducation(edu.id, "coursework", e.target.value)}
                    placeholder="Algoritmos, Bases de Datos, Marketing Digital..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {cvData.education.length === 0 && (
            <Card className="border-2 border-dashed border-gray-200">
              <CardContent className="p-8 text-center">
                <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No has agregado información educativa</p>
                <Button onClick={addEducation} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar primera educación
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-sans font-semibold">Habilidades</h3>
            <div className="flex space-x-2">
              <AIGenerator type="skills" onGenerate={handleGenerateSkills} />
              <Button onClick={addSkill} size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cvData.skills.map((skill) => (
              <Card key={skill.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Input
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                      placeholder="Nombre de la habilidad"
                      className="flex-1 mr-2"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSkill(skill.id)}
                      className="text-red-600 hover:text-red-700 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Nivel: {skill.level}/5</Label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={skill.level}
                      onChange={(e) => updateSkill(skill.id, "level", Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {cvData.skills.length === 0 && (
            <Card className="border-2 border-dashed border-gray-200">
              <CardContent className="p-8 text-center">
                <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No has agregado habilidades</p>
                <div className="flex justify-center space-x-2">
                  <AIGenerator type="skills" onGenerate={handleGenerateSkills} />
                  <Button onClick={addSkill} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar primera habilidad
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-sans font-semibold">Certificaciones</h3>
            <Button onClick={addCertification} size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Agregar
            </Button>
          </div>

          {(cvData.certifications || []).map((cert, index) => (
            <Card key={cert.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Certificación {index + 1}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCertification(cert.id)}
                    className="text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre de la certificación</Label>
                    <Input
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                      placeholder="AWS Solutions Architect"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Organización emisora</Label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                      placeholder="Amazon Web Services"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de emisión</Label>
                    <Input
                      type="month"
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de expiración</Label>
                    <Input
                      type="month"
                      value={cert.expiryDate}
                      onChange={(e) => updateCertification(cert.id, "expiryDate", e.target.value)}
                      placeholder="Opcional"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ID de credencial</Label>
                    <Input
                      value={cert.credentialId}
                      onChange={(e) => updateCertification(cert.id, "credentialId", e.target.value)}
                      placeholder="Opcional"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL de verificación</Label>
                    <Input
                      value={cert.url}
                      onChange={(e) => updateCertification(cert.id, "url", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {(cvData.certifications || []).length === 0 && (
            <Card className="border-2 border-dashed border-gray-200">
              <CardContent className="p-8 text-center">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No has agregado certificaciones</p>
                <Button onClick={addCertification} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar primera certificación
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-sans font-semibold">Proyectos</h3>
            <Button onClick={addProject} size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Agregar
            </Button>
          </div>

          {(cvData.projects || []).map((project, index) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Proyecto {index + 1}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeProject(project.id)}
                    className="text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre del proyecto</Label>
                    <Input
                      value={project.name}
                      onChange={(e) => updateProject(project.id, "name", e.target.value)}
                      placeholder="Mi App Web"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tecnologías utilizadas</Label>
                    <Input
                      value={project.technologies}
                      onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL del proyecto</Label>
                    <Input
                      value={project.url}
                      onChange={(e) => updateProject(project.id, "url", e.target.value)}
                      placeholder="https://miproyecto.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>GitHub</Label>
                    <Input
                      value={project.github}
                      onChange={(e) => updateProject(project.id, "github", e.target.value)}
                      placeholder="https://github.com/usuario/proyecto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de inicio</Label>
                    <Input
                      type="month"
                      value={project.startDate}
                      onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de fin</Label>
                    <Input
                      type="month"
                      value={project.endDate}
                      onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                      disabled={project.current}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={project.current}
                    onChange={(checked) => updateProject(project.id, "current", checked)}
                  />
                  <Label>Proyecto en curso</Label>
                </div>
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, "description", e.target.value)}
                    placeholder="Describe el proyecto, sus objetivos y tu rol..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {(cvData.projects || []).length === 0 && (
            <Card className="border-2 border-dashed border-gray-200">
              <CardContent className="p-8 text-center">
                <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No has agregado proyectos</p>
                <Button onClick={addProject} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar primer proyecto
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="languages" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-sans font-semibold">Idiomas</h3>
            <Button onClick={addLanguage} size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Agregar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cvData.languages.map((language) => (
              <Card key={language.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Input
                      value={language.name}
                      onChange={(e) => updateLanguage(language.id, "name", e.target.value)}
                      placeholder="Idioma"
                      className="flex-1 mr-2"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeLanguage(language.id)}
                      className="text-red-600 hover:text-red-700 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Nivel</Label>
                    <select
                      value={language.level}
                      onChange={(e) => updateLanguage(language.id, "level", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Básico">Básico (A1-A2)</option>
                      <option value="Intermedio">Intermedio (B1-B2)</option>
                      <option value="Avanzado">Avanzado (C1-C2)</option>
                      <option value="Nativo">Nativo</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {cvData.languages.length === 0 && (
            <Card className="border-2 border-dashed border-gray-200">
              <CardContent className="p-8 text-center">
                <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No has agregado idiomas</p>
                <Button onClick={addLanguage} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar primer idioma
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="more" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Voluntariado */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Voluntariado</span>
                  <Button onClick={addVolunteer} size="sm" className="ml-auto bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(cvData.volunteer || []).map((vol, index) => (
                  <div key={vol.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Voluntariado {index + 1}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeVolunteer(vol.id)}
                        className="text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Input
                        value={vol.organization}
                        onChange={(e) => updateVolunteer(vol.id, "organization", e.target.value)}
                        placeholder="Organización"
                      />
                      <Input
                        value={vol.role}
                        onChange={(e) => updateVolunteer(vol.id, "role", e.target.value)}
                        placeholder="Rol"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="month"
                          value={vol.startDate}
                          onChange={(e) => updateVolunteer(vol.id, "startDate", e.target.value)}
                          placeholder="Inicio"
                        />
                        <Input
                          type="month"
                          value={vol.endDate}
                          onChange={(e) => updateVolunteer(vol.id, "endDate", e.target.value)}
                          disabled={vol.current}
                          placeholder="Fin"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={vol.current}
                          onChange={(checked) => updateVolunteer(vol.id, "current", checked)}
                        />
                        <Label className="text-sm">Actual</Label>
                      </div>
                      <Textarea
                        value={vol.description}
                        onChange={(e) => updateVolunteer(vol.id, "description", e.target.value)}
                        placeholder="Descripción de actividades..."
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
                {(cvData.volunteer || []).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No hay voluntariado agregado</p>
                )}
              </CardContent>
            </Card>

            {/* Publicaciones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Publicaciones</span>
                  <Button onClick={addPublication} size="sm" className="ml-auto bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(cvData.publications || []).map((pub, index) => (
                  <div key={pub.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Publicación {index + 1}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removePublication(pub.id)}
                        className="text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Input
                        value={pub.title}
                        onChange={(e) => updatePublication(pub.id, "title", e.target.value)}
                        placeholder="Título de la publicación"
                      />
                      <Input
                        value={pub.publisher}
                        onChange={(e) => updatePublication(pub.id, "publisher", e.target.value)}
                        placeholder="Editorial/Revista"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="month"
                          value={pub.date}
                          onChange={(e) => updatePublication(pub.id, "date", e.target.value)}
                          placeholder="Fecha"
                        />
                        <Input
                          value={pub.url}
                          onChange={(e) => updatePublication(pub.id, "url", e.target.value)}
                          placeholder="URL"
                        />
                      </div>
                      <Textarea
                        value={pub.description}
                        onChange={(e) => updatePublication(pub.id, "description", e.target.value)}
                        placeholder="Descripción breve..."
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
                {(cvData.publications || []).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No hay publicaciones agregadas</p>
                )}
              </CardContent>
            </Card>

            {/* Referencias */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Referencias</span>
                  <Button onClick={addReference} size="sm" className="ml-auto bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(cvData.references || []).map((ref, index) => (
                  <div key={ref.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Referencia {index + 1}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeReference(ref.id)}
                        className="text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Input
                        value={ref.name}
                        onChange={(e) => updateReference(ref.id, "name", e.target.value)}
                        placeholder="Nombre completo"
                      />
                      <Input
                        value={ref.position}
                        onChange={(e) => updateReference(ref.id, "position", e.target.value)}
                        placeholder="Cargo"
                      />
                      <Input
                        value={ref.company}
                        onChange={(e) => updateReference(ref.id, "company", e.target.value)}
                        placeholder="Empresa"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={ref.email}
                          onChange={(e) => updateReference(ref.id, "email", e.target.value)}
                          placeholder="Email"
                        />
                        <Input
                          value={ref.phone}
                          onChange={(e) => updateReference(ref.id, "phone", e.target.value)}
                          placeholder="Teléfono"
                        />
                      </div>
                      <Input
                        value={ref.relationship}
                        onChange={(e) => updateReference(ref.id, "relationship", e.target.value)}
                        placeholder="Relación (ej: Ex-supervisor)"
                      />
                    </div>
                  </div>
                ))}
                {(cvData.references || []).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No hay referencias agregadas</p>
                )}
              </CardContent>
            </Card>

            {/* Logros y Premios */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Logros y Premios</span>
                  <Button onClick={addAchievement} size="sm" className="ml-auto bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(cvData.achievements || []).map((ach, index) => (
                  <div key={ach.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Logro {index + 1}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeAchievement(ach.id)}
                        className="text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Input
                        value={ach.title}
                        onChange={(e) => updateAchievement(ach.id, "title", e.target.value)}
                        placeholder="Título del logro/premio"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={ach.issuer}
                          onChange={(e) => updateAchievement(ach.id, "issuer", e.target.value)}
                          placeholder="Otorgado por"
                        />
                        <Input
                          type="month"
                          value={ach.date}
                          onChange={(e) => updateAchievement(ach.id, "date", e.target.value)}
                          placeholder="Fecha"
                        />
                      </div>
                      <Textarea
                        value={ach.description}
                        onChange={(e) => updateAchievement(ach.id, "description", e.target.value)}
                        placeholder="Descripción del logro..."
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
                {(cvData.achievements || []).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No hay logros agregados</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
