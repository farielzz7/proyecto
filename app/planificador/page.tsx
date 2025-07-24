"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, MapPin, Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"

export default function PlanificadorPage() {
  // Asegurar que la página se cargue desde arriba
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [budget, setBudget] = useState(1000)
  const [destination, setDestination] = useState("")
  const [travelers, setTravelers] = useState("2")
  const [duration, setDuration] = useState("7")

  // Distribución del presupuesto
  const [accommodationPercent, setAccommodationPercent] = useState(40)
  const [transportPercent, setTransportPercent] = useState(25)
  const [foodPercent, setFoodPercent] = useState(20)
  const [activitiesPercent, setActivitiesPercent] = useState(10)
  const [otherPercent, setOtherPercent] = useState(5)

  const handleBudgetChange = (value: number[]) => {
    setBudget(value[0])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-teal-900">Planificador de Viaje</h1>
        <p className="text-muted-foreground">Crea tu plan de viaje perfecto según tu presupuesto</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Configura tu viaje</CardTitle>
              <CardDescription>Define los parámetros de tu viaje</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="destination">Destino</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="destination"
                    placeholder="¿A dónde quieres ir?"
                    className="pl-9"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Presupuesto: ${budget}</Label>
                <Slider
                  id="budget"
                  min={200}
                  max={5000}
                  step={100}
                  value={[budget]}
                  onValueChange={handleBudgetChange}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$200</span>
                  <span>$5,000</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelers">Número de viajeros</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Select value={travelers} onValueChange={setTravelers}>
                    <SelectTrigger id="travelers" className="pl-9">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Viajero</SelectItem>
                      <SelectItem value="2">2 Viajeros</SelectItem>
                      <SelectItem value="3">3 Viajeros</SelectItem>
                      <SelectItem value="4">4 Viajeros</SelectItem>
                      <SelectItem value="5+">5+ Viajeros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duración (días)</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger id="duration" className="pl-9">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 días</SelectItem>
                      <SelectItem value="5">5 días</SelectItem>
                      <SelectItem value="7">7 días</SelectItem>
                      <SelectItem value="10">10 días</SelectItem>
                      <SelectItem value="14">14 días</SelectItem>
                      <SelectItem value="21">21 días</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tipo de viaje</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <input type="checkbox" className="mr-2" />
                    Cultural
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <input type="checkbox" className="mr-2" />
                    Aventura
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <input type="checkbox" className="mr-2" />
                    Relax
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <input type="checkbox" className="mr-2" />
                    Gastronomía
                  </Button>
                </div>
              </div>

              <Button className="w-full bg-teal-700 hover:bg-teal-800">Generar Plan</Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Distribución del Presupuesto</CardTitle>
              <CardDescription>Ajusta cómo quieres distribuir tu presupuesto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Hospedaje (${((budget * accommodationPercent) / 100).toFixed(0)})</Label>
                  <span>{accommodationPercent}%</span>
                </div>
                <Slider
                  min={10}
                  max={70}
                  step={5}
                  value={[accommodationPercent]}
                  onValueChange={(value) => setAccommodationPercent(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Transporte (${((budget * transportPercent) / 100).toFixed(0)})</Label>
                  <span>{transportPercent}%</span>
                </div>
                <Slider
                  min={5}
                  max={50}
                  step={5}
                  value={[transportPercent]}
                  onValueChange={(value) => setTransportPercent(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Comida (${((budget * foodPercent) / 100).toFixed(0)})</Label>
                  <span>{foodPercent}%</span>
                </div>
                <Slider
                  min={5}
                  max={40}
                  step={5}
                  value={[foodPercent]}
                  onValueChange={(value) => setFoodPercent(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Actividades (${((budget * activitiesPercent) / 100).toFixed(0)})</Label>
                  <span>{activitiesPercent}%</span>
                </div>
                <Slider
                  min={5}
                  max={40}
                  step={5}
                  value={[activitiesPercent]}
                  onValueChange={(value) => setActivitiesPercent(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Otros (${((budget * otherPercent) / 100).toFixed(0)})</Label>
                  <span>{otherPercent}%</span>
                </div>
                <Slider
                  min={0}
                  max={20}
                  step={5}
                  value={[otherPercent]}
                  onValueChange={(value) => setOtherPercent(value[0])}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="plan" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="plan">Plan de Viaje</TabsTrigger>
              <TabsTrigger value="compare">Comparar Planes</TabsTrigger>
              <TabsTrigger value="saved">Planes Guardados</TabsTrigger>
            </TabsList>

            <TabsContent value="plan" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tu Plan de Viaje</CardTitle>
                  <CardDescription>
                    {destination ? destination : "Destino"} • {duration} días • {travelers} viajeros • ${budget}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative h-[200px] rounded-lg overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Destino"
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Resumen del Presupuesto</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Hospedaje</span>
                              <span>${((budget * accommodationPercent) / 100).toFixed(0)}</span>
                            </div>
                            <Progress value={accommodationPercent} className="h-2 mt-1" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Transporte</span>
                              <span>${((budget * transportPercent) / 100).toFixed(0)}</span>
                            </div>
                            <Progress value={transportPercent} className="h-2 mt-1" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Comida</span>
                              <span>${((budget * foodPercent) / 100).toFixed(0)}</span>
                            </div>
                            <Progress value={foodPercent} className="h-2 mt-1" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Actividades</span>
                              <span>${((budget * activitiesPercent) / 100).toFixed(0)}</span>
                            </div>
                            <Progress value={activitiesPercent} className="h-2 mt-1" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Otros</span>
                              <span>${((budget * otherPercent) / 100).toFixed(0)}</span>
                            </div>
                            <Progress value={otherPercent} className="h-2 mt-1" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Itinerario Sugerido</h3>
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium">Día 1</h4>
                          <ul className="mt-2 space-y-2">
                            <li className="flex items-start">
                              <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded mr-2">
                                09:00
                              </span>
                              <span>Llegada y check-in en el hotel</span>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded mr-2">
                                12:00
                              </span>
                              <span>Almuerzo en restaurante local</span>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded mr-2">
                                14:00
                              </span>
                              <span>Tour de orientación por la ciudad</span>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded mr-2">
                                19:00
                              </span>
                              <span>Cena de bienvenida</span>
                            </li>
                          </ul>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium">Día 2</h4>
                          <ul className="mt-2 space-y-2">
                            <li className="flex items-start">
                              <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded mr-2">
                                08:00
                              </span>
                              <span>Desayuno en el hotel</span>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded mr-2">
                                09:30
                              </span>
                              <span>Visita a sitio arqueológico</span>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded mr-2">
                                13:00
                              </span>
                              <span>Almuerzo típico</span>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded mr-2">
                                15:00
                              </span>
                              <span>Tiempo libre para explorar</span>
                            </li>
                          </ul>
                        </div>

                        <Button variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-2" /> Ver itinerario completo
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button className="flex-1 bg-teal-700 hover:bg-teal-800">Guardar Plan</Button>
                      <Button variant="outline" className="flex-1">
                        Modificar Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compare" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Comparar Planes</CardTitle>
                  <CardDescription>Compara diferentes opciones para tu viaje</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">Genera un plan primero para poder comparar opciones</p>
                    <Button>Generar Plan</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="saved" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Planes Guardados</CardTitle>
                  <CardDescription>Accede a tus planes guardados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No tienes planes guardados</p>
                    <Button>Crear Nuevo Plan</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

