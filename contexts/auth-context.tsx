"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  plan: "free" | "premium"
  role: "user" | "admin"
  avatar?: string
  provider?: "email" | "google" | "facebook"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  loginWithFacebook: () => Promise<boolean>
  logout: () => void
  loading: boolean
  redirectAfterLogin: string | null
  setRedirectAfterLogin: (path: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("cvcraft_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const isAdmin = email === "sergisd39@gmail.com"
      const mockUser: User = {
        id: isAdmin ? "admin_1" : "1",
        email,
        name: isAdmin ? "Sergio - Administrador" : email.split("@")[0],
        plan: isAdmin ? "premium" : "free",
        role: isAdmin ? "admin" : "user",
        provider: "email",
      }

      setUser(mockUser)
      localStorage.setItem("cvcraft_user", JSON.stringify(mockUser))
      setLoading(false)
      return true
    } catch (error) {
      setLoading(false)
      return false
    }
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const isAdmin = email === "sergisd39@gmail.com"
      const mockUser: User = {
        id: isAdmin ? "admin_1" : "1",
        email,
        name: isAdmin ? "Sergio - Administrador" : name,
        plan: isAdmin ? "premium" : "free",
        role: isAdmin ? "admin" : "user",
        provider: "email",
      }

      setUser(mockUser)
      localStorage.setItem("cvcraft_user", JSON.stringify(mockUser))
      setLoading(false)
      return true
    } catch (error) {
      setLoading(false)
      return false
    }
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    setLoading(true)
    try {
      // Redirigir a la ruta de OAuth de Google
      window.location.href = "/api/auth/google"
      return true
    } catch (error) {
      console.error("Google OAuth error:", error)
      setLoading(false)
      return false
    }
  }

  const loginWithFacebook = async (): Promise<boolean> => {
    setLoading(true)
    try {
      // Redirigir a la ruta de OAuth de Facebook
      window.location.href = "/api/auth/facebook"
      return true
    } catch (error) {
      console.error("Facebook OAuth error:", error)
      setLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("cvcraft_user")
    localStorage.removeItem("cvcraft_subscription")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        loading,
        redirectAfterLogin,
        setRedirectAfterLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
