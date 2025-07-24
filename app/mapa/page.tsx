"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Compass, Info, Layers, MapPin, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MapaPage() {
  // Asegurar que la página se cargue desde arriba
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [showInfo, setShowInfo] = useState(false)

  const handleLocationClick = (location: string) => {
    setSelectedLocation(location)
    setShowInfo(true)
  }

  const closeInfo = () => {
    setShowInfo(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-teal-900">Mapa Interactivo</h1>
        <p className="text-muted-foreground">Explora los sitios mayas más importantes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Panel lateral */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Sitios Mayas</CardTitle>
              <CardDescription>Explora los sitios arqueológicos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Buscar sitio..." className="pl-9" />
              </div>

              <Tabs defaultValue="archaeological">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="archaeological">Arqueológicos</TabsTrigger>
                  <TabsTrigger value="cultural">Culturales</TabsTrigger>
                </TabsList>
                <TabsContent value="archaeological" className="space-y-2 mt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => handleLocationClick("Chichén Itzá")}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-teal-700" />
                    Chichén Itzá
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => handleLocationClick("Tulum")}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-teal-700" />
                    Tulum
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => handleLocationClick("Tikal")}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-teal-700" />
                    Tikal
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => handleLocationClick("Copán")}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-teal-700" />
                    Copán
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => handleLocationClick("Palenque")}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-teal-700" />
                    Palenque
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => handleLocationClick("Uxmal")}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-teal-700" />
                    Uxmal
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => handleLocationClick("Calakmul")}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-teal-700" />
                    Calakmul
                  </Button>
                </TabsContent>
                <TabsContent value="cultural" className="space-y-2 mt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => handleLocationClick("Mérida")}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-amber-600" />
                    Mérida
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => handleLocationClick("Valladolid")}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-amber-600" />
                    Valladolid
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => handleLocationClick("Izamal")}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-amber-600" />
                    Izamal
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => handleLocationClick("Bacalar")}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-amber-600" />
                    Bacalar
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Leyenda</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-teal-700 mr-2"></div>
                    <span className="text-sm">Sitios arqueológicos</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-amber-600 mr-2"></div>
                    <span className="text-sm">Centros culturales</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Cenotes</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Filtros</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="archaeological" className="mr-2" defaultChecked />
                    <label htmlFor="archaeological">Sitios arqueológicos</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="cultural" className="mr-2" defaultChecked />
                    <label htmlFor="cultural">Centros culturales</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="cenotes" className="mr-2" defaultChecked />
                    <label htmlFor="cenotes">Cenotes</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="hotels" className="mr-2" />
                    <label htmlFor="hotels">Hoteles</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="restaurants" className="mr-2" />
                    <label htmlFor="restaurants">Restaurantes</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mapa */}
        <div className="lg:col-span-3">
          <div className="relative w-full h-[700px] bg-stone-100 rounded-xl overflow-hidden border">
            {/* Mapa simulado */}
            <div className="relative w-full h-full">
              <Image
                src="/placeholder.svg?height=1400&width=1400"
                alt="Mapa de sitios mayas"
                fill
                className="object-cover"
              />

              {/* Controles del mapa */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button variant="secondary" size="icon" className="bg-white shadow-md">
                  <Layers className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="bg-white shadow-md">
                  <Compass className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="bg-white shadow-md">
                  <Info className="h-4 w-4" />
                </Button>
              </div>

              {/* Marcadores simulados */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-teal-700 text-white hover:bg-teal-800"
                  onClick={() => handleLocationClick("Chichén Itzá")}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>

              <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-teal-700 text-white hover:bg-teal-800"
                  onClick={() => handleLocationClick("Tulum")}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>

              <div className="absolute bottom-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-teal-700 text-white hover:bg-teal-800"
                  onClick={() => handleLocationClick("Tikal")}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>

              <div className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-amber-600 text-white hover:bg-amber-700"
                  onClick={() => handleLocationClick("Mérida")}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Panel de información */}
            {showInfo && (
              <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{selectedLocation}</h3>
                  <Button variant="ghost" size="icon" onClick={closeInfo} className="h-6 w-6">
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="relative h-40 w-full mb-3 rounded overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt={selectedLocation || "Sitio maya"}
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-sm mb-3">
                  {selectedLocation === "Chichén Itzá" &&
                    "Uno de los sitios arqueológicos más importantes y reconocidos de la civilización maya. Famoso por su pirámide El Castillo."}
                  {selectedLocation === "Tulum" &&
                    "Sitio arqueológico maya ubicado frente al mar Caribe. Destaca por sus impresionantes vistas y su muralla defensiva."}
                  {selectedLocation === "Tikal" &&
                    "Antigua ciudad maya ubicada en Guatemala. Uno de los centros urbanos más importantes de la civilización maya precolombina."}
                  {selectedLocation === "Mérida" &&
                    "Capital del estado de Yucatán, conocida como la Ciudad Blanca. Centro cultural con fuerte influencia maya."}
                  {!selectedLocation && "Selecciona un sitio para ver más información."}
                </p>

                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Ver detalles
                  </Button>
                  <Button size="sm" className="bg-teal-700 hover:bg-teal-800">
                    Planificar visita
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Rutas Recomendadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Ruta del Mundo Maya</CardTitle>
                  <CardDescription>7 días • 5 sitios arqueológicos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">
                    Recorre los sitios más emblemáticos de la civilización maya en México y Guatemala.
                  </p>
                  <Button variant="outline" className="w-full">
                    Ver ruta
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Península de Yucatán</CardTitle>
                  <CardDescription>5 días • 4 sitios arqueológicos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">
                    Explora los tesoros mayas de la península de Yucatán, incluyendo cenotes sagrados.
                  </p>
                  <Button variant="outline" className="w-full">
                    Ver ruta
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

