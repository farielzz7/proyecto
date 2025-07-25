"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Check, CreditCard, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TermsModal } from "@/components/terms-modal"

// Datos simulados para los destinos
const destinosData = {
  "chichén-itzá": {
    id: "chichén-itzá",
    title: "Chichén Itzá",
    location: "Yucatán, México",
    price: 1200,
    image: "/placeholder.svg?height=400&width=600",
  },
  tulum: {
    id: "tulum",
    title: "Tulum",
    location: "Quintana Roo, México",
    price: 950,
    image: "/placeholder.svg?height=400&width=600",
  },
  tikal: {
    id: "tikal",
    title: "Tikal",
    location: "Petén, Guatemala",
    price: 1050,
    image: "/placeholder.svg?height=400&width=600",
  },
  default: {
    id: "default",
    title: "Destino Maya",
    location: "Mundo Maya",
    price: 1000,
    image: "/placeholder.svg?height=400&width=600",
  },
}

// Datos simulados para las experiencias
const experienciasData = {
  "nadar-con-delfines": {
    id: "nadar-con-delfines",
    title: "Nadar con Delfines",
    location: "Cancún, México",
    price: 1500,
    image: "/placeholder.svg?height=400&width=600",
  },
  "tour-en-cuatrimoto": {
    id: "tour-en-cuatrimoto",
    title: "Tour en Cuatrimoto",
    location: "Playa del Carmen, México",
    price: 800,
    image: "/placeholder.svg?height=400&width=600",
  },
  default: {
    id: "default",
    title: "Experiencia Maya",
    location: "Riviera Maya",
    price: 900,
    image: "/placeholder.svg?height=400&width=600",
  },
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const destinoId = searchParams.get("destino")
  const experienciaId = searchParams.get("experiencia")
  const precioParam = searchParams.get("precio")

  // Determinar si estamos comprando un destino o una experiencia
  const isExperiencia = !!experienciaId
  const itemId = isExperiencia ? experienciaId : destinoId || "default"

  // Obtener los datos del item o usar datos predeterminados si no existe
  const item = isExperiencia
    ? experienciasData[itemId] || experienciasData.default
    : destinosData[itemId] || destinosData.default

  const precio = precioParam ? Number.parseInt(precioParam) : item.price

  const [paymentStep, setPaymentStep] = useState(1)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    pais: "México",
  })

  const [participants, setParticipants] = useState(2)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (paymentStep === 1) {
      setPaymentStep(2)
    } else if (paymentStep === 2) {
      setPaymentStep(3)
    }
  }

  const impuestos = Math.round(precio * 0.16)
  const total = precio + impuestos

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/destino/${destinoId}`} className="flex items-center text-teal-700 hover:text-teal-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a detalles
        </Link>
        <h1 className="text-3xl font-bold text-teal-900">Completar reserva</h1>
      </div>

      {paymentStep < 3 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border p-6 mb-6">
              <div className="flex items-center mb-6">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= 1 ? "bg-teal-700 text-white" : "bg-gray-200 text-gray-500"} mr-2`}
                >
                  {paymentStep > 1 ? <Check className="h-4 w-4" /> : "1"}
                </div>
                <div className="h-0.5 flex-1 bg-gray-200 mx-2"></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= 2 ? "bg-teal-700 text-white" : "bg-gray-200 text-gray-500"} mr-2`}
                >
                  {paymentStep > 2 ? <Check className="h-4 w-4" /> : "2"}
                </div>
                <div className="h-0.5 flex-1 bg-gray-200 mx-2"></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= 3 ? "bg-teal-700 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  3
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {paymentStep === 1 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Información de contacto</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre completo</Label>
                        <Input
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-4">Detalles de la reserva</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Fecha seleccionada</Label>
                        <Input value="15 de Junio, 2025" disabled />
                      </div>
                      <div className="space-y-2">
                        <Label>Número de personas</Label>
                        <Input value="2 personas" disabled />
                      </div>
                      <div className="space-y-2">
                        <Label>Idioma del tour</Label>
                        <Input value="Español" disabled />
                      </div>
                    </div>
                  </div>
                )}

                {paymentStep === 2 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Método de pago</h2>

                    <Tabs defaultValue="card" className="mb-6">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="card">Tarjeta de crédito</TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                        <TabsTrigger value="transfer">Transferencia</TabsTrigger>
                      </TabsList>

                      <TabsContent value="card" className="mt-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Número de tarjeta</Label>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                              <Input
                                id="cardNumber"
                                name="cardNumber"
                                className="pl-9"
                                placeholder="1234 5678 9012 3456"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                            <Input
                              id="cardName"
                              name="cardName"
                              placeholder="NOMBRE APELLIDO"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Fecha de expiración</Label>
                              <Input
                                id="expiry"
                                name="expiry"
                                placeholder="MM/AA"
                                value={formData.expiry}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input
                                id="cvc"
                                name="cvc"
                                placeholder="123"
                                value={formData.cvc}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="paypal" className="mt-4">
                        <div className="text-center py-8">
                          <Image
                            src="/placeholder.svg?height=60&width=200"
                            alt="PayPal"
                            width={200}
                            height={60}
                            className="mx-auto mb-4"
                          />
                          <p className="text-muted-foreground mb-4">
                            Serás redirigido a PayPal para completar el pago de forma segura.
                          </p>
                          <Button className="bg-blue-600 hover:bg-blue-700">Pagar con PayPal</Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="transfer" className="mt-4">
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            Realiza una transferencia bancaria a la siguiente cuenta:
                          </p>
                          <div className="bg-stone-50 p-4 rounded-lg">
                            <p className="font-medium">Banco: Banco Nacional de México</p>
                            <p>Titular: GoPlan Viajes S.A. de C.V.</p>
                            <p>CLABE: 0123 4567 8901 2345 67</p>
                            <p>
                              Referencia: TUR-{destinoId.substring(0, 4).toUpperCase()}-
                              {Math.floor(Math.random() * 10000)}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Una vez realizada la transferencia, envía el comprobante a reservas@goplan.com
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <h2 className="text-xl font-semibold mb-4">Dirección de facturación</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="direccion">Dirección</Label>
                        <Input
                          id="direccion"
                          name="direccion"
                          value={formData.direccion}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ciudad">Ciudad</Label>
                          <Input
                            id="ciudad"
                            name="ciudad"
                            value={formData.ciudad}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="codigoPostal">Código Postal</Label>
                          <Input
                            id="codigoPostal"
                            name="codigoPostal"
                            value={formData.codigoPostal}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pais">País</Label>
                          <select
                            id="pais"
                            name="pais"
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            value={formData.pais}
                            onChange={(e) => setFormData((prev) => ({ ...prev, pais: e.target.value }))}
                            required
                          >
                            <option value="México">México</option>
                            <option value="Estados Unidos">Estados Unidos</option>
                            <option value="Canadá">Canadá</option>
                            <option value="España">España</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Argentina">Argentina</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  {paymentStep > 1 && (
                    <Button type="button" variant="outline" onClick={() => setPaymentStep((prev) => prev - 1)}>
                      Anterior
                    </Button>
                  )}
                  <Button type="submit" className="ml-auto bg-teal-700 hover:bg-teal-800">
                    {paymentStep === 1 ? "Continuar al pago" : "Completar reserva"}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Resumen de la reserva</h2>

                <div className="flex items-center mb-4">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden mr-3">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                    <p className="text-sm">
                      15 de Junio, 2025 • {isExperiencia ? participants + " personas" : "2 personas"}
                    </p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Precio base (2 personas)</span>
                    <span>${precio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impuestos y tasas</span>
                    <span>${impuestos}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>${total}</span>
                </div>

                <div className="bg-stone-50 p-3 rounded-md flex items-center text-sm mb-4">
                  <Lock className="h-4 w-4 text-teal-700 mr-2" />
                  <span>Pago seguro garantizado</span>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p className="mb-2">
                    Al completar esta reserva, aceptas nuestros{" "}
                    <Button
                      variant="link"
                      className="h-auto p-0 text-teal-700 hover:underline text-xs"
                      onClick={() => setIsTermsModalOpen(true)}
                    >
                      términos y condiciones
                    </Button>{" "}
                    y{" "}
                    <Link href="#" className="text-teal-700 hover:underline">
                      política de privacidad
                    </Link>
                    .
                  </p>
                  <p>Cancelación gratuita hasta 48 horas antes del inicio de la actividad.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-lg border p-8 text-center">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-teal-700" />
          </div>
          <h2 className="text-2xl font-bold text-teal-900 mb-4">¡Reserva confirmada!</h2>
          <p className="text-muted-foreground mb-6">
            Gracias por tu reserva. Hemos enviado un correo electrónico de confirmación a {formData.email} con todos los
            detalles.
          </p>

          <div className="bg-stone-50 rounded-lg p-6 mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Número de reserva:</span>
              <span>GPN-{Math.floor(Math.random() * 10000000)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Destino:</span>
              <span>{item.title}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Fecha:</span>
              <span>15 de Junio, 2025</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Personas:</span>
              <span>2</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total pagado:</span>
              <span className="font-bold">${total}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button className="bg-teal-700 hover:bg-teal-800">Ver mis reservas</Button>
            </Link>
            <Link href={isExperiencia ? "/experiencias" : "/destinos"}>
              <Button variant="outline">Volver a {isExperiencia ? "experiencias" : "destinos"}</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Modal de Términos y Condiciones */}
      <TermsModal open={isTermsModalOpen} onOpenChange={setIsTermsModalOpen} />
    </div>
  )
}

