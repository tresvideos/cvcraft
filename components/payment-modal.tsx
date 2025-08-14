"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Shield, Clock, Euro, Loader2, Check } from "lucide-react"
import { useSubscription } from "@/contexts/subscription-context"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { initiatePurchase } = useSubscription()

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: "price_cv_download", // ID del producto en Stripe
          mode: "subscription",
          trialPeriodDays: 2,
        }),
      })

      const { sessionId } = await response.json()

      const stripe = await stripePromise
      const { error } = await stripe!.redirectToCheckout({
        sessionId,
      })

      if (error) {
        console.error("Stripe error:", error)
      }
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-purple-600" />
            <span>Descargar CV Premium</span>
          </DialogTitle>
          <DialogDescription>Inicia tu período de prueba y descarga tu CV profesional</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pricing Card */}
          <div className="border rounded-lg p-6 bg-gradient-to-br from-purple-50 to-indigo-50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Descarga Premium</h3>
                <p className="text-sm text-gray-600">Acceso completo por 48 horas</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">0,50€</div>
                <Badge variant="secondary" className="mt-1">
                  Prueba 48h
                </Badge>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Descarga inmediata en todos los formatos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Acceso a todas las plantillas premium</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Generador de contenido con IA</span>
              </div>
            </div>
          </div>

          {/* Warning Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-900">Información importante</h4>
                <p className="text-sm text-amber-800 mt-1">
                  Después de 48 horas, tu suscripción se convertirá automáticamente en un plan mensual de
                  <strong> 19,99€/mes</strong>. Puedes cancelar en cualquier momento desde tu dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Security Info */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>Pago seguro procesado con encriptación SSL</span>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Procesando pago...
              </>
            ) : (
              <>
                <Euro className="h-4 w-4 mr-2" />
                Pagar 0,50€ y descargar
              </>
            )}
          </Button>

          <p className="text-xs text-center text-gray-500">
            Al continuar, aceptas nuestros términos de servicio y política de privacidad
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
