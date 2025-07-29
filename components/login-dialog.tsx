"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Facebook } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Props para el componente LoginDialog
interface LoginDialogProps {
  open: boolean // Estado para controlar si el diálogo está abierto
  onOpenChange: (open: boolean) => void // Función para cambiar el estado de apertura
}

// Componente del diálogo de inicio de sesión
export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  // Estados para los campos del formulario
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Estados para el manejo de la carga y errores
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Manejador para el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Petición a la API de login
      const response = await fetch('https://uni-djzy.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (data.success && data.data?.token) {
        localStorage.setItem('token', data.data.token)
      }

      if (response.ok) {
        console.log("Login exitoso:", data)
        // Aquí puedes guardar el token y la información del usuario (ej. en localStorage o un contexto global)
        // localStorage.setItem('authToken', data.data.token);
        // localStorage.setItem('user', JSON.stringify(data.data.user));
        onOpenChange(false) // Cierra el diálogo al iniciar sesión exitosamente
      } else {
        // Manejar errores de validación o credenciales incorrectas
        if (data.errors) {
          setError(Object.values(data.errors).flat().join(', '))
        } else {
          setError(data.message || 'Error al iniciar sesión. Inténtalo de nuevo.')
        }
      }
    } catch (err) {
      console.error("Error de red o servidor:", err)
      setError('No se pudo conectar con el servidor. Por favor, verifica tu conexión.')
    } finally {
      setIsLoading(false)
    }
  }

  // Manejador para el inicio de sesión con redes sociales
  const handleSocialLogin = (provider: string) => {
    // En una implementación real, esto iniciaría el flujo de OAuth
    console.log(`Login con ${provider}`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Iniciar Sesión</DialogTitle>
          <DialogDescription className="text-center">
            Ingresa tus credenciales para acceder a tu cuenta
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Campo de correo electrónico */}
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Campo de contraseña */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-sm text-teal-700"
                onClick={() => onOpenChange(false)}
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Botón para mostrar/ocultar contraseña */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          {/* Muestra de errores */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {/* Botón de envío */}
          <Button type="submit" className="w-full bg-teal-700 hover:bg-teal-800" disabled={isLoading}>
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
          {/* Separador */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">O continúa con</span>
            </div>
          </div>
          {/* Botones de inicio de sesión con redes sociales */}
          <div className="grid grid-cols-2 gap-4">
            <Button type="button" variant="outline" onClick={() => handleSocialLogin("Google")} className="w-full">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button type="button" variant="outline" onClick={() => handleSocialLogin("Facebook")} className="w-full">
              <Facebook className="mr-2 h-4 w-4 text-blue-600" />
              Facebook
            </Button>
          </div>
          {/* Enlace para registrarse */}
          <div className="text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-teal-700"
              onClick={() => {
                onOpenChange(false)
                // Aquí se abriría el diálogo de registro
              }}
            >
              Regístrate
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

