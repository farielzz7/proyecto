"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"

interface ApiContextType {
  baseUrl: string
  isOnline: boolean
  retryCount: number
  maxRetries: number
}

const ApiContext = createContext<ApiContextType | undefined>(undefined)

interface ApiProviderProps {
  children: React.ReactNode
  baseUrl?: string
  maxRetries?: number
}

export function ApiProvider({ children, baseUrl = "/api", maxRetries = 3 }: ApiProviderProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setRetryCount(0)
      toast({
        title: "Conexión restaurada",
        description: "La conexión a internet se ha restablecido",
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast({
        title: "Sin conexión",
        description: "Verifica tu conexión a internet",
        variant: "destructive",
      })
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Verificar estado inicial
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const value = {
    baseUrl,
    isOnline,
    retryCount,
    maxRetries,
  }

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export function useApiContext() {
  const context = useContext(ApiContext)
  if (context === undefined) {
    throw new Error("useApiContext must be used within an ApiProvider")
  }
  return context
}
