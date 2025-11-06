"use client"

import { useState } from "react"
import { Facebook } from "lucide-react"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const countries = [
  { code: "mx", name: "México" },
  { code: "co", name: "Colombia" },
  { code: "ar", name: "Argentina" },
  { code: "pe", name: "Perú" },
  { code: "cl", name: "Chile" },
]

const travelStyles = [
  "Aventura",
  "Cultural",
  "Playa",
  "Gastronómico",
  "Familiar",
]

export function RegisterSection() {
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    console.log("Registro enviado", payload)
  }

  return (
    <section className="py-16 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-900">Crea tu cuenta en minutos</h2>
          <p className="mt-4 text-muted-foreground">
            Elige tu método de registro favorito o completa el formulario para personalizar tu experiencia.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl text-teal-900">Regístrate con tus datos</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nombre completo</Label>
                    <Input id="fullName" name="fullName" autoComplete="name" required placeholder="Mariana Pérez" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">País de residencia</Label>
                    <div className="relative">
                      <select
                        id="country"
                        name="country"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        defaultValue="mx"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+52 55 1234 5678"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                    <Input id="birthdate" name="birthdate" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="travelStyle">Estilo de viaje favorito</Label>
                    <div className="relative">
                      <select
                        id="travelStyle"
                        name="travelStyle"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        defaultValue="Aventura"
                      >
                        {travelStyles.map((style) => (
                          <option key={style} value={style}>
                            {style}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rounded-lg border border-border bg-muted/20 p-4">
                  <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={(value) => setAcceptedTerms(value === true)} />
                  <div className="space-y-1 text-sm">
                    <Label htmlFor="terms" className="font-medium">
                      Acepto los términos y condiciones
                    </Label>
                    <p className="text-muted-foreground">
                      Al registrarte confirmas que has leído y aceptas nuestras políticas de privacidad y uso de datos.
                    </p>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-teal-700 hover:bg-teal-800" disabled={!acceptedTerms}>
                  Crear cuenta
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-gradient-to-br from-teal-700 to-teal-900 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Regístrate con un clic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white/80">
                Conecta tus redes favoritas para crear tu cuenta rápidamente y sincronizar tus preferencias de viaje.
              </p>
              <div className="space-y-4">
                <Button asChild variant="secondary" className="w-full bg-white text-teal-900 hover:bg-white/90">
                  <Link
                    href="https://accounts.google.com/signup"
                    prefetch={false}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Registrarse con una cuenta de Google"
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.7 3.28-8.09z"
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
                    Continuar con Gmail
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="w-full bg-[#1877F2] text-white hover:bg-[#0f5ec4]"
                >
                  <Link
                    href="https://www.facebook.com/reg/"
                    prefetch={false}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Registrarse con una cuenta de Facebook"
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Continuar con Facebook
                  </Link>
                </Button>
              </div>
              <div className="rounded-lg bg-white/10 p-4 text-sm text-white/80">
                <p className="font-medium text-white">¿Por qué registrarte?</p>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  <li>Guarda tus itinerarios y presupuestos personalizados.</li>
                  <li>Recibe recomendaciones según tu estilo de viaje.</li>
                  <li>Accede a ofertas exclusivas y alertas de precio.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
