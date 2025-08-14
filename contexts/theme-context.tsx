"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type Language = "es" | "en" | "fr" | "de" | "it" | "pt"

interface ThemeContextType {
  theme: Theme
  language: Language
  toggleTheme: () => void
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const translations = {
  es: {
    // Header
    "nav.templates": "Plantillas",
    "nav.pricing": "Precios",
    "nav.login": "Iniciar Sesión",
    "nav.register": "Registrarse",
    "nav.dashboard": "Dashboard",
    "nav.logout": "Cerrar Sesión",

    // Hero Section
    "hero.title": "Tu historia profesional, diseñada a la perfección",
    "hero.subtitle":
      "Crea CVs y cartas de presentación profesionales con IA. Múltiples plantillas, editor avanzado y descarga en varios formatos.",
    "hero.cta.start": "Comenzar Ahora",
    "hero.cta.templates": "Ver Plantillas",

    // Features
    "features.title": "Todo lo que necesitas para destacar",
    "features.ai.title": "Generación con IA",
    "features.ai.desc": "Crea contenido profesional automáticamente",
    "features.templates.title": "Plantillas Profesionales",
    "features.templates.desc": "Diseños modernos y elegantes",
    "features.download.title": "Múltiples Formatos",
    "features.download.desc": "Descarga en PDF, Word o texto",

    // Common
    "common.loading": "Cargando...",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
  },
  en: {
    // Header
    "nav.templates": "Templates",
    "nav.pricing": "Pricing",
    "nav.login": "Login",
    "nav.register": "Sign Up",
    "nav.dashboard": "Dashboard",
    "nav.logout": "Logout",

    // Hero Section
    "hero.title": "Your professional story, perfectly designed",
    "hero.subtitle":
      "Create professional CVs and cover letters with AI. Multiple templates, advanced editor and download in various formats.",
    "hero.cta.start": "Get Started",
    "hero.cta.templates": "View Templates",

    // Features
    "features.title": "Everything you need to stand out",
    "features.ai.title": "AI Generation",
    "features.ai.desc": "Create professional content automatically",
    "features.templates.title": "Professional Templates",
    "features.templates.desc": "Modern and elegant designs",
    "features.download.title": "Multiple Formats",
    "features.download.desc": "Download in PDF, Word or text",

    // Common
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
  },
  fr: {
    // Header
    "nav.templates": "Modèles",
    "nav.pricing": "Tarifs",
    "nav.login": "Connexion",
    "nav.register": "S'inscrire",
    "nav.dashboard": "Tableau de bord",
    "nav.logout": "Déconnexion",

    // Hero Section
    "hero.title": "Votre histoire professionnelle, parfaitement conçue",
    "hero.subtitle":
      "Créez des CV et lettres de motivation professionnels avec l'IA. Modèles multiples, éditeur avancé et téléchargement en plusieurs formats.",
    "hero.cta.start": "Commencer",
    "hero.cta.templates": "Voir les Modèles",

    // Features
    "features.title": "Tout ce dont vous avez besoin pour vous démarquer",
    "features.ai.title": "Génération IA",
    "features.ai.desc": "Créez du contenu professionnel automatiquement",
    "features.templates.title": "Modèles Professionnels",
    "features.templates.desc": "Designs modernes et élégants",
    "features.download.title": "Formats Multiples",
    "features.download.desc": "Téléchargez en PDF, Word ou texte",

    // Common
    "common.loading": "Chargement...",
    "common.save": "Sauvegarder",
    "common.cancel": "Annuler",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
  },
  de: {
    // Header
    "nav.templates": "Vorlagen",
    "nav.pricing": "Preise",
    "nav.login": "Anmelden",
    "nav.register": "Registrieren",
    "nav.dashboard": "Dashboard",
    "nav.logout": "Abmelden",

    // Hero Section
    "hero.title": "Ihre Berufsgeschichte, perfekt gestaltet",
    "hero.subtitle":
      "Erstellen Sie professionelle Lebensläufe und Anschreiben mit KI. Mehrere Vorlagen, erweiterte Bearbeitung und Download in verschiedenen Formaten.",
    "hero.cta.start": "Jetzt Starten",
    "hero.cta.templates": "Vorlagen Ansehen",

    // Features
    "features.title": "Alles was Sie brauchen, um sich abzuheben",
    "features.ai.title": "KI-Generierung",
    "features.ai.desc": "Erstellen Sie automatisch professionelle Inhalte",
    "features.templates.title": "Professionelle Vorlagen",
    "features.templates.desc": "Moderne und elegante Designs",
    "features.download.title": "Mehrere Formate",
    "features.download.desc": "Download als PDF, Word oder Text",

    // Common
    "common.loading": "Laden...",
    "common.save": "Speichern",
    "common.cancel": "Abbrechen",
    "common.delete": "Löschen",
    "common.edit": "Bearbeiten",
  },
  it: {
    // Header
    "nav.templates": "Modelli",
    "nav.pricing": "Prezzi",
    "nav.login": "Accedi",
    "nav.register": "Registrati",
    "nav.dashboard": "Dashboard",
    "nav.logout": "Esci",

    // Hero Section
    "hero.title": "La tua storia professionale, perfettamente progettata",
    "hero.subtitle":
      "Crea CV e lettere di presentazione professionali con l'IA. Modelli multipli, editor avanzato e download in vari formati.",
    "hero.cta.start": "Inizia Ora",
    "hero.cta.templates": "Vedi Modelli",

    // Features
    "features.title": "Tutto ciò di cui hai bisogno per distinguerti",
    "features.ai.title": "Generazione IA",
    "features.ai.desc": "Crea contenuti professionali automaticamente",
    "features.templates.title": "Modelli Professionali",
    "features.templates.desc": "Design moderni ed eleganti",
    "features.download.title": "Formati Multipli",
    "features.download.desc": "Scarica in PDF, Word o testo",

    // Common
    "common.loading": "Caricamento...",
    "common.save": "Salva",
    "common.cancel": "Annulla",
    "common.delete": "Elimina",
    "common.edit": "Modifica",
  },
  pt: {
    // Header
    "nav.templates": "Modelos",
    "nav.pricing": "Preços",
    "nav.login": "Entrar",
    "nav.register": "Cadastrar",
    "nav.dashboard": "Dashboard",
    "nav.logout": "Sair",

    // Hero Section
    "hero.title": "Sua história profissional, perfeitamente projetada",
    "hero.subtitle":
      "Crie CVs e cartas de apresentação profissionais com IA. Múltiplos modelos, editor avançado e download em vários formatos.",
    "hero.cta.start": "Começar Agora",
    "hero.cta.templates": "Ver Modelos",

    // Features
    "features.title": "Tudo que você precisa para se destacar",
    "features.ai.title": "Geração com IA",
    "features.ai.desc": "Crie conteúdo profissional automaticamente",
    "features.templates.title": "Modelos Profissionais",
    "features.templates.desc": "Designs modernos e elegantes",
    "features.download.title": "Múltiplos Formatos",
    "features.download.desc": "Baixe em PDF, Word ou texto",

    // Common
    "common.loading": "Carregando...",
    "common.save": "Salvar",
    "common.cancel": "Cancelar",
    "common.delete": "Excluir",
    "common.edit": "Editar",
  },
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme
    const savedLanguage = localStorage.getItem("language") as Language

    if (savedTheme) setTheme(savedTheme)
    if (savedLanguage) setLanguage(savedLanguage)
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.lang = language
  }, [language])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <ThemeContext.Provider value={{ theme, language, toggleTheme, setLanguage, t }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
