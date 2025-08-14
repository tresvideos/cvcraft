"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter, Award, BookOpen, Users, Trophy } from "lucide-react"
import type { CVData } from "@/app/editor/cv/page"

interface CVPreviewProps {
  cvData: CVData
  template: string
}

export function CVPreview({ cvData, template }: CVPreviewProps) {
  const [currentTemplate, setCurrentTemplate] = useState(template)

  useEffect(() => {
    setCurrentTemplate(template)
  }, [template])

  const renderEmptySection = (title: string, description: string) => (
    <div className="mb-6 opacity-50">
      <h2 className="text-xl font-sans font-semibold text-purple-600 mb-3">{title}</h2>
      <p className="text-gray-500 italic text-sm">{description}</p>
    </div>
  )

  const renderModernTemplate = () => (
    <div className="bg-white p-8 shadow-lg">
      {/* Header with Photo */}
      <div className="border-b-2 border-purple-600 pb-6 mb-6">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            {cvData.personalInfo.profileImage ? (
              <img
                src={cvData.personalInfo.profileImage || "/placeholder.svg"}
                alt="Foto de perfil"
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-purple-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs text-center">Sin foto</span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-sans font-bold text-gray-900 mb-2">
              {cvData.personalInfo.fullName || "Tu Nombre"}
            </h1>
            {cvData.personalInfo.title && (
              <p className="text-lg text-purple-600 font-medium mb-3">{cvData.personalInfo.title}</p>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {cvData.personalInfo.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {cvData.personalInfo.email}
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {cvData.personalInfo.phone}
                </div>
              )}
              {cvData.personalInfo.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {cvData.personalInfo.location}
                </div>
              )}
              {cvData.personalInfo.website && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  {cvData.personalInfo.website}
                </div>
              )}
              {cvData.personalInfo.linkedin && (
                <div className="flex items-center">
                  <Linkedin className="h-4 w-4 mr-1" />
                  {cvData.personalInfo.linkedin}
                </div>
              )}
              {cvData.personalInfo.github && (
                <div className="flex items-center">
                  <Github className="h-4 w-4 mr-1" />
                  {cvData.personalInfo.github}
                </div>
              )}
              {cvData.personalInfo.twitter && (
                <div className="flex items-center">
                  <Twitter className="h-4 w-4 mr-1" />
                  {cvData.personalInfo.twitter}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {cvData.personalInfo.summary ? (
        <div className="mb-6">
          <h2 className="text-xl font-sans font-semibold text-purple-600 mb-3">Resumen Profesional</h2>
          <p className="text-gray-700 leading-relaxed">{cvData.personalInfo.summary}</p>
        </div>
      ) : (
        renderEmptySection("Resumen Profesional", "Agrega un resumen profesional para destacar tu perfil")
      )}

      {/* Experience */}
      {cvData.experience && cvData.experience.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl font-sans font-semibold text-purple-600 mb-3">Experiencia Laboral</h2>
          <div className="space-y-4">
            {cvData.experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-purple-200 pl-4">
                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-purple-600 font-medium">{exp.company}</p>
                <div className="text-sm text-gray-600 mb-2">
                  <span>
                    {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                  </span>
                  {exp.location && <span> • {exp.location}</span>}
                  {exp.employmentType && <span> • {exp.employmentType}</span>}
                </div>
                {exp.description && <p className="text-gray-700 text-sm mb-2">{exp.description}</p>}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-800 mb-1">Logros:</p>
                    <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderEmptySection(
          "Experiencia Laboral",
          "Agrega tu experiencia laboral para mostrar tu trayectoria profesional",
        )
      )}

      {/* Education */}
      {cvData.education && cvData.education.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl font-sans font-semibold text-purple-600 mb-3">Educación</h2>
          <div className="space-y-4">
            {cvData.education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-purple-200 pl-4">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-purple-600 font-medium">{edu.institution}</p>
                <div className="text-sm text-gray-600 mb-2">
                  <span>
                    {edu.field} • {edu.startDate} - {edu.current ? "Presente" : edu.endDate}
                  </span>
                  {edu.gpa && <span> • GPA: {edu.gpa}</span>}
                </div>
                {edu.activities && (
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Actividades:</strong> {edu.activities}
                  </p>
                )}
                {edu.relevantCourses && (
                  <p className="text-sm text-gray-700">
                    <strong>Cursos relevantes:</strong> {edu.relevantCourses}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderEmptySection("Educación", "Agrega tu formación académica")
      )}

      {/* Certificaciones */}
      {cvData.certifications && cvData.certifications.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl font-sans font-semibold text-purple-600 mb-3 flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Certificaciones
          </h2>
          <div className="space-y-3">
            {cvData.certifications.map((cert) => (
              <div key={cert.id} className="border-l-2 border-purple-200 pl-4">
                <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                <p className="text-purple-600 font-medium">{cert.issuer}</p>
                <div className="text-sm text-gray-600">
                  <span>Obtenido: {cert.date}</span>
                  {cert.expiryDate && <span> • Expira: {cert.expiryDate}</span>}
                  {cert.credentialId && <span> • ID: {cert.credentialId}</span>}
                </div>
                {cert.url && (
                  <a href={cert.url} className="text-sm text-purple-600 hover:underline">
                    Ver certificado
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderEmptySection("Certificaciones", "Agrega tus certificaciones profesionales")
      )}

      {/* Proyectos */}
      {cvData.projects && cvData.projects.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl font-sans font-semibold text-purple-600 mb-3 flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Proyectos
          </h2>
          <div className="space-y-4">
            {cvData.projects.map((project) => (
              <div key={project.id} className="border-l-2 border-purple-200 pl-4">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <div className="text-sm text-gray-600 mb-2">
                  <span>
                    {project.startDate} - {project.current ? "En curso" : project.endDate}
                  </span>
                </div>
                {project.description && <p className="text-gray-700 text-sm mb-2">{project.description}</p>}
                {project.technologies && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.split(",").map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
                {project.url && (
                  <a href={project.url} className="text-sm text-purple-600 hover:underline">
                    Ver proyecto
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderEmptySection("Proyectos", "Agrega tus proyectos más relevantes")
      )}

      {/* Skills */}
      {cvData.skills && cvData.skills.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl font-sans font-semibold text-purple-600 mb-3">Habilidades</h2>
          <div className="space-y-2">
            {cvData.skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between">
                <span className="text-gray-700">{skill.name}</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-3 h-3 rounded-full ${level <= skill.level ? "bg-purple-600" : "bg-gray-200"}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderEmptySection("Habilidades", "Agrega tus habilidades técnicas y profesionales")
      )}

      {/* Languages */}
      {cvData.languages && cvData.languages.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl font-sans font-semibold text-purple-600 mb-3">Idiomas</h2>
          <div className="flex flex-wrap gap-2">
            {cvData.languages.map((language) => (
              <Badge key={language.id} variant="secondary" className="bg-purple-100 text-purple-700">
                {language.name} - {language.level}
              </Badge>
            ))}
          </div>
        </div>
      ) : (
        renderEmptySection("Idiomas", "Agrega los idiomas que dominas")
      )}

      {/* Voluntariado */}
      {cvData.volunteering && cvData.volunteering.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl font-sans font-semibold text-purple-600 mb-3 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Voluntariado
          </h2>
          <div className="space-y-3">
            {cvData.volunteering.map((vol) => (
              <div key={vol.id} className="border-l-2 border-purple-200 pl-4">
                <h3 className="font-semibold text-gray-900">{vol.role}</h3>
                <p className="text-purple-600 font-medium">{vol.organization}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {vol.startDate} - {vol.current ? "Presente" : vol.endDate}
                </p>
                {vol.description && <p className="text-gray-700 text-sm">{vol.description}</p>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderEmptySection("Voluntariado", "Agrega tu experiencia en voluntariado")
      )}

      {/* Logros y Premios */}
      {cvData.awards && cvData.awards.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl font-sans font-semibold text-purple-600 mb-3 flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            Logros y Premios
          </h2>
          <div className="space-y-3">
            {cvData.awards.map((award) => (
              <div key={award.id} className="border-l-2 border-purple-200 pl-4">
                <h3 className="font-semibold text-gray-900">{award.title}</h3>
                <p className="text-purple-600 font-medium">{award.issuer}</p>
                <p className="text-sm text-gray-600 mb-1">{award.date}</p>
                {award.description && <p className="text-gray-700 text-sm mb-1">{award.description}</p>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderEmptySection("Logros y Premios", "Agrega tus reconocimientos y premios")
      )}

      {/* Intereses */}
      {cvData.personalInfo.interests ? (
        <div>
          <h2 className="text-xl font-sans font-semibold text-purple-600 mb-3">Intereses</h2>
          <p className="text-gray-700">{cvData.personalInfo.interests}</p>
        </div>
      ) : (
        renderEmptySection("Intereses", "Agrega tus intereses personales")
      )}
    </div>
  )

  const renderProfessionalTemplate = () => (
    <div className="bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="text-center border-b pb-6 mb-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
          {cvData.personalInfo.fullName || "Tu Nombre"}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {cvData.personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              {cvData.personalInfo.email}
            </div>
          )}
          {cvData.personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              {cvData.personalInfo.phone}
            </div>
          )}
          {cvData.personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {cvData.personalInfo.location}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {cvData.personalInfo.summary ? (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            RESUMEN PROFESIONAL
          </h2>
          <p className="text-gray-700 leading-relaxed">{cvData.personalInfo.summary}</p>
        </div>
      ) : (
        renderEmptySection("RESUMEN PROFESIONAL", "Agrega un resumen profesional para destacar tu perfil")
      )}

      {/* Experience */}
      {cvData.experience && cvData.experience.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            EXPERIENCIA LABORAL
          </h2>
          <div className="space-y-4">
            {cvData.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                {exp.description && <p className="text-gray-700 text-sm">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderEmptySection(
          "EXPERIENCIA LABORAL",
          "Agrega tu experiencia laboral para mostrar tu trayectoria profesional",
        )
      )}

      {/* Education */}
      {cvData.education && cvData.education.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            EDUCACIÓN
          </h2>
          <div className="space-y-3">
            {cvData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-sm text-gray-600">{edu.field}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.current ? "Presente" : edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderEmptySection("EDUCACIÓN", "Agrega tu formación académica")
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Skills */}
        {cvData.skills && cvData.skills.length > 0 ? (
          <div>
            <h2 className="text-lg font-serif font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              HABILIDADES
            </h2>
            <div className="space-y-1">
              {cvData.skills.map((skill) => (
                <div key={skill.id} className="text-sm text-gray-700">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          renderEmptySection("HABILIDADES", "Agrega tus habilidades técnicas y profesionales")
        )}

        {/* Languages */}
        {cvData.languages && cvData.languages.length > 0 ? (
          <div>
            <h2 className="text-lg font-serif font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              IDIOMAS
            </h2>
            <div className="space-y-1">
              {cvData.languages.map((language) => (
                <div key={language.id} className="text-sm text-gray-700">
                  {language.name} - {language.level}
                </div>
              ))}
            </div>
          </div>
        ) : (
          renderEmptySection("IDIOMAS", "Agrega los idiomas que dominas")
        )}
      </div>

      {/* Certificaciones */}
      {cvData.certifications && cvData.certifications.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            CERTIFICACIONES
          </h2>
          <div className="space-y-3">
            {cvData.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                <p className="text-gray-700">{cert.issuer}</p>
                <p className="text-sm text-gray-600">
                  <span>Obtenido: {cert.date}</span>
                  {cert.expiryDate && <span> • Expira: {cert.expiryDate}</span>}
                  {cert.credentialId && <span> • ID: {cert.credentialId}</span>}
                </p>
                {cert.url && (
                  <a href={cert.url} className="text-sm text-purple-600 hover:underline">
                    Ver certificado
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderEmptySection("CERTIFICACIONES", "Agrega tus certificaciones profesionales")
      )}

      {/* Proyectos */}
      {cvData.projects && cvData.projects.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            PROYECTOS
          </h2>
          <div className="space-y-4">
            {cvData.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <div className="text-sm text-gray-600 mb-2">
                  <span>
                    {project.startDate} - {project.current ? "En curso" : project.endDate}
                  </span>
                </div>
                {project.description && <p className="text-gray-700 text-sm mb-2">{project.description}</p>}
                {project.technologies && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.split(",").map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
                {project.url && (
                  <a href={project.url} className="text-sm text-purple-600 hover:underline">
                    Ver proyecto
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderEmptySection("PROYECTOS", "Agrega tus proyectos más relevantes")
      )}

      {/* Voluntariado */}
      {cvData.volunteering && cvData.volunteering.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            VOLUNTARIADO
          </h2>
          <div className="space-y-3">
            {cvData.volunteering.map((vol) => (
              <div key={vol.id}>
                <h3 className="font-semibold text-gray-900">{vol.role}</h3>
                <p className="text-gray-700">{vol.organization}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {vol.startDate} - {vol.current ? "Presente" : vol.endDate}
                </p>
                {vol.description && <p className="text-gray-700 text-sm">{vol.description}</p>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderEmptySection("VOLUNTARIADO", "Agrega tu experiencia en voluntariado")
      )}

      {/* Logros y Premios */}
      {cvData.awards && cvData.awards.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            LOGROS Y PREMIOS
          </h2>
          <div className="space-y-3">
            {cvData.awards.map((award) => (
              <div key={award.id}>
                <h3 className="font-semibold text-gray-900">{award.title}</h3>
                <p className="text-gray-700">{award.issuer}</p>
                <p className="text-sm text-gray-600 mb-1">{award.date}</p>
                {award.description && <p className="text-gray-700 text-sm">{award.description}</p>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderEmptySection("LOGROS Y PREMIOS", "Agrega tus reconocimientos y premios")
      )}

      {/* Intereses */}
      {cvData.personalInfo.interests ? (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            INTERESES
          </h2>
          <p className="text-gray-700">{cvData.personalInfo.interests}</p>
        </div>
      ) : (
        renderEmptySection("INTERESES", "Agrega tus intereses personales")
      )}
    </div>
  )

  const renderCreativeTemplate = () => (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 shadow-lg">
      {/* Header creativo con diseño asimétrico */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="flex items-start gap-6 relative z-10">
          <div className="flex-shrink-0">
            {cvData.personalInfo.profileImage ? (
              <img
                src={cvData.personalInfo.profileImage || "/placeholder.svg"}
                alt="Foto de perfil"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 border-4 border-white flex items-center justify-center">
                <span className="text-white text-xs text-center">Sin foto</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-sans font-bold mb-2">{cvData.personalInfo.fullName || "Tu Nombre"}</h1>
            {cvData.personalInfo.title && (
              <p className="text-xl text-blue-100 font-medium mb-3">{cvData.personalInfo.title}</p>
            )}
            <div className="flex flex-wrap gap-4 text-sm">
              {cvData.personalInfo.email && (
                <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  <Mail className="h-4 w-4 mr-2" />
                  {cvData.personalInfo.email}
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  <Phone className="h-4 w-4 mr-2" />
                  {cvData.personalInfo.phone}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido en dos columnas */}
      <div className="grid grid-cols-3 gap-6">
        {/* Columna izquierda */}
        <div className="col-span-1 space-y-6">
          {/* Skills con barras de progreso coloridas */}
          {cvData.skills && cvData.skills.length > 0 ? (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-sans font-bold text-blue-600 mb-4 flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                Habilidades
              </h2>
              <div className="space-y-3">
                {cvData.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level * 20}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level * 20}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-sm opacity-50">
              <h2 className="text-lg font-sans font-bold text-blue-600 mb-2">Habilidades</h2>
              <p className="text-gray-500 italic text-sm">Agrega tus habilidades</p>
            </div>
          )}

          {/* Languages */}
          {cvData.languages && cvData.languages.length > 0 ? (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-sans font-bold text-purple-600 mb-4 flex items-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
                Idiomas
              </h2>
              <div className="space-y-2">
                {cvData.languages.map((language) => (
                  <div key={language.id} className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{language.name}</span>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">{language.level}</Badge>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-sm opacity-50">
              <h2 className="text-lg font-sans font-bold text-purple-600 mb-2">Idiomas</h2>
              <p className="text-gray-500 italic text-sm">Agrega los idiomas que dominas</p>
            </div>
          )}
        </div>

        {/* Columna derecha */}
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          {cvData.personalInfo.summary ? (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-sans font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
                Sobre Mí
              </h2>
              <p className="text-gray-700 leading-relaxed">{cvData.personalInfo.summary}</p>
            </div>
          ) : (
            renderEmptySection("Sobre Mí", "Agrega un resumen profesional")
          )}

          {/* Experience con timeline */}
          {cvData.experience && cvData.experience.length > 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-sans font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-3"></div>
                Experiencia
              </h2>
              <div className="space-y-6">
                {cvData.experience.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    {index !== cvData.experience.length - 1 && (
                      <div className="absolute left-4 top-8 w-0.5 h-full bg-gradient-to-b from-blue-300 to-purple-300"></div>
                    )}
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 relative z-10">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                        <p className="text-blue-600 font-semibold">{exp.company}</p>
                        <p className="text-sm text-gray-500 mb-2">
                          {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                        </p>
                        {exp.description && <p className="text-gray-700">{exp.description}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            renderEmptySection("Experiencia", "Agrega tu experiencia laboral")
          )}

          {/* Education */}
          {cvData.education && cvData.education.length > 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-sans font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-3"></div>
                Educación
              </h2>
              <div className="space-y-4">
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-gradient-to-b from-yellow-400 to-orange-400 pl-4">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-orange-600 font-semibold">{edu.institution}</p>
                    <p className="text-sm text-gray-600">
                      {edu.field} • {edu.startDate} - {edu.current ? "Presente" : edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            renderEmptySection("Educación", "Agrega tu formación académica")
          )}
        </div>
      </div>
    </div>
  )

  const renderMinimalTemplate = () => (
    <div className="bg-white p-12 shadow-lg max-w-4xl mx-auto">
      {/* Header minimalista */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-wide">
          {cvData.personalInfo.fullName || "Tu Nombre"}
        </h1>
        {cvData.personalInfo.title && (
          <p className="text-lg text-gray-600 font-light mb-6">{cvData.personalInfo.title}</p>
        )}
        <div className="flex justify-center space-x-8 text-sm text-gray-500">
          {cvData.personalInfo.email && (
            <span className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              {cvData.personalInfo.email}
            </span>
          )}
          {cvData.personalInfo.phone && (
            <span className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              {cvData.personalInfo.phone}
            </span>
          )}
          {cvData.personalInfo.location && (
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {cvData.personalInfo.location}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {cvData.personalInfo.summary ? (
        <div className="mb-12">
          <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto font-light text-lg">
            {cvData.personalInfo.summary}
          </p>
        </div>
      ) : (
        <div className="mb-12 opacity-50">
          <p className="text-gray-500 italic text-center">Agrega un resumen profesional</p>
        </div>
      )}

      {/* Experience */}
      {cvData.experience && cvData.experience.length > 0 ? (
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-wide">Experiencia</h2>
          <div className="space-y-8">
            {cvData.experience.map((exp) => (
              <div key={exp.id} className="text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-1">{exp.position}</h3>
                <p className="text-gray-600 font-light mb-2">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {exp.startDate} — {exp.current ? "Presente" : exp.endDate}
                </p>
                {exp.description && (
                  <p className="text-gray-700 font-light max-w-2xl mx-auto leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-12 opacity-50">
          <h2 className="text-2xl font-light text-gray-900 mb-4 text-center">Experiencia</h2>
          <p className="text-gray-500 italic text-center">Agrega tu experiencia laboral</p>
        </div>
      )}

      {/* Education */}
      {cvData.education && cvData.education.length > 0 ? (
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-wide">Educación</h2>
          <div className="space-y-6">
            {cvData.education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-1">{edu.degree}</h3>
                <p className="text-gray-600 font-light mb-1">{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {edu.field} • {edu.startDate} — {edu.current ? "Presente" : edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-12 opacity-50">
          <h2 className="text-2xl font-light text-gray-900 mb-4 text-center">Educación</h2>
          <p className="text-gray-500 italic text-center">Agrega tu formación académica</p>
        </div>
      )}

      {/* Skills y Languages en una fila */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        {/* Skills */}
        {cvData.skills && cvData.skills.length > 0 ? (
          <div className="text-center">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">Habilidades</h2>
            <div className="space-y-2">
              {cvData.skills.map((skill) => (
                <div key={skill.id} className="text-gray-700 font-light">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center opacity-50">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Habilidades</h2>
            <p className="text-gray-500 italic">Agrega tus habilidades</p>
          </div>
        )}

        {/* Languages */}
        {cvData.languages && cvData.languages.length > 0 ? (
          <div className="text-center">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">Idiomas</h2>
            <div className="space-y-2">
              {cvData.languages.map((language) => (
                <div key={language.id} className="text-gray-700 font-light">
                  {language.name} — {language.level}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center opacity-50">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Idiomas</h2>
            <p className="text-gray-500 italic">Agrega los idiomas que dominas</p>
          </div>
        )}
      </div>
    </div>
  )

  const renderTemplate = () => {
    switch (currentTemplate) {
      case "modern":
        return renderModernTemplate()
      case "professional":
        return renderProfessionalTemplate()
      case "creative":
        return renderCreativeTemplate()
      case "minimal":
        return renderMinimalTemplate()
      default:
        return renderModernTemplate()
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gray-100 p-4 border-b">
          <h3 className="font-sans font-semibold text-gray-900">Vista Previa</h3>
          <p className="text-sm text-gray-600">Plantilla: {currentTemplate}</p>
        </div>
        <div className="max-h-[800px] overflow-y-auto">
          <div key={`template-${currentTemplate}-${Date.now()}`}>{renderTemplate()}</div>
        </div>
      </CardContent>
    </Card>
  )
}
