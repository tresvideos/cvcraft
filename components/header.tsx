"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles, User, LogOut, Shield } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/theme-context"
import { ThemeToggle, LanguageSelector } from "@/components/theme-controls"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { t } = useTheme()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const navigationItems = [
    { href: "/templates", label: t("nav.templates"), icon: "📋" },
    { href: "/#como-funciona", label: "Cómo funciona", icon: "⚡" },
    { href: "/#precios", label: t("nav.pricing"), icon: "💎" },
    { href: "/#ejemplos", label: "Ejemplos", icon: "✨" },
  ]

  const userNavigationItems = [
    { href: "/dashboard", label: t("nav.dashboard"), icon: "🏠" },
    { href: "/editor/cv", label: "Crear CV", icon: "📄" },
    { href: "/editor/cover-letter", label: "Crear Carta", icon: "✉️" },
    { href: "/templates", label: "Plantillas", icon: "📋" },
  ]

  const adminNavigationItems = [
    { href: "/admin", label: "Panel Admin", icon: "⚙️" },
    { href: "/admin/users", label: "Usuarios", icon: "👥" },
    { href: "/admin/templates", label: "Plantillas", icon: "📋" },
    { href: "/admin/pricing", label: "Precios", icon: "💰" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              CVCraft
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {user ? (
              <>
                {userNavigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-orange-50 dark:hover:bg-orange-950/20 text-orange-600 dark:text-orange-400 transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}
              </>
            ) : (
              <>
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative z-[60]">
              <LanguageSelector />
            </div>
            <ThemeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 ml-2 hover:bg-muted">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 z-[60]">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    <p>{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    {user.role === "admin" && (
                      <div className="flex items-center mt-1">
                        <Shield className="h-3 w-3 text-orange-500 mr-1" />
                        <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">Administrador</span>
                      </div>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  {userNavigationItems.map((item) => (
                    <DropdownMenuItem key={item.href} onClick={() => router.push(item.href)}>
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                  {user.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      {adminNavigationItems.map((item) => (
                        <DropdownMenuItem
                          key={item.href}
                          onClick={() => router.push(item.href)}
                          className="text-orange-600 dark:text-orange-400"
                        >
                          <span className="mr-2">{item.icon}</span>
                          {item.label}
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <span className="mr-2">⚙️</span>
                    Configuración
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("nav.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3 ml-2">
                <Button variant="ghost" size="sm" asChild className="hover:bg-muted">
                  <Link href="/login">{t("nav.login")}</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                  asChild
                >
                  <Link href="/register">{t("nav.register")}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex items-center justify-center space-x-4 px-3 py-3 border-b mb-2">
                <LanguageSelector />
                <ThemeToggle />
              </div>

              {user ? (
                <>
                  <div className="px-3 py-2 border-b mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        {user.role === "admin" && (
                          <div className="flex items-center mt-1">
                            <Shield className="h-3 w-3 text-orange-500 mr-1" />
                            <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">Admin</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {userNavigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-3 text-base font-medium rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  {user.role === "admin" && (
                    <>
                      <div className="px-3 py-1 text-xs font-medium text-orange-600 dark:text-orange-400 uppercase tracking-wider border-t pt-3">
                        Administración
                      </div>
                      {adminNavigationItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center space-x-3 px-3 py-3 text-base font-medium rounded-md hover:bg-orange-50 dark:hover:bg-orange-950/20 text-orange-600 dark:text-orange-400 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </>
                  )}
                  <div className="px-3 py-2 space-y-2 border-t mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t("nav.logout")}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-3 text-base font-medium rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <div className="px-3 py-2 space-y-2 border-t mt-2">
                    <Button variant="ghost" size="sm" className="w-full" asChild>
                      <Link href="/login">{t("nav.login")}</Link>
                    </Button>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      asChild
                    >
                      <Link href="/register">{t("nav.register")}</Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
