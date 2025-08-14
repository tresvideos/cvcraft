import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { SubscriptionProvider } from "@/contexts/subscription-context"
import { HelpChatbot } from "@/components/help-chatbot"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "CVCraft - Tu historia profesional, diseñada a la perfección",
  description: "Genera CVs y cartas de presentación con IA, personaliza plantillas y destaca en cada postulación.",
  generator: "CVCraft",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${workSans.variable} ${openSans.variable} antialiased`}>
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <AuthProvider>
            <SubscriptionProvider>
              {children}
              <HelpChatbot />
            </SubscriptionProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
