"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Componente que hace scroll al inicio de la página cuando cambia la ruta
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Cuando cambia la ruta, hacer scroll al inicio de la página
    window.scrollTo(0, 0)
  }, [pathname])

  // Este componente no renderiza nada en el DOM
  return null
}

