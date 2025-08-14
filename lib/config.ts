// Sistema de configuración dinámico para variables de entorno
class ConfigManager {
  private static instance: ConfigManager
  private config: Record<string, string> = {}

  private constructor() {
    this.loadFromEnvironment()
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  private loadFromEnvironment() {
    // Cargar variables de entorno del sistema
    this.config = {
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || "",
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "",
      NEXT_PUBLIC_STRIPE_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || "",
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
      FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || "",
      FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || "",
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "",
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "",
    }
  }

  public get(key: string): string {
    return this.config[key] || ""
  }

  public set(key: string, value: string): void {
    this.config[key] = value
    // En producción, también actualizar en la base de datos
  }

  public getAll(): Record<string, string> {
    return { ...this.config }
  }

  public updateMultiple(variables: Record<string, string>): void {
    this.config = { ...this.config, ...variables }
  }

  // Métodos específicos para obtener configuraciones comunes
  public getStripeConfig() {
    return {
      publishableKey: this.get("STRIPE_PUBLISHABLE_KEY"),
      secretKey: this.get("STRIPE_SECRET_KEY"),
      webhookSecret: this.get("STRIPE_WEBHOOK_SECRET"),
      priceId: this.get("NEXT_PUBLIC_STRIPE_PRICE_ID"),
    }
  }

  public getGoogleOAuthConfig() {
    return {
      clientId: this.get("GOOGLE_CLIENT_ID"),
      clientSecret: this.get("GOOGLE_CLIENT_SECRET"),
    }
  }

  public getFacebookOAuthConfig() {
    return {
      appId: this.get("FACEBOOK_APP_ID"),
      appSecret: this.get("FACEBOOK_APP_SECRET"),
    }
  }
}

export const config = ConfigManager.getInstance()
