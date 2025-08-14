"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"

interface DownloadButtonProps {
  onDownload: () => Promise<void>
  children: React.ReactNode
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function DownloadButton({
  onDownload,
  children,
  variant = "outline",
  size = "sm",
  className,
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleClick = async () => {
    setIsDownloading(true)
    try {
      await onDownload()
    } catch (error) {
      console.error("Download error:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleClick} disabled={isDownloading} className={className}>
      {isDownloading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
      {children}
    </Button>
  )
}
