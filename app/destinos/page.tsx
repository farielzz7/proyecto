"use client"

import { useEffect } from "react"
import { Filter, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TravelDestinationCard } from "@/components/travel-destination-card"

export default function DestinosPage() {
  // Asegurar que la página se cargue desde arriba
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-teal-900">Destinos</h1>
          <p className="text-muted-foreground">Descubre los mejores destinos para tu próxima aventura</p>
        </div>

        <div className="w-full md:w-auto flex gap-2">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Buscar destinos..." className="pl-9" />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtros */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border p-4 sticky top-24">
            <h2 className="font-semibold text-lg mb-4 flex items-center">
              <Filter className="h-4 w-4 mr-2" /> Filtros
            </h2>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Región</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las regiones" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las regiones</SelectItem>
                    <SelectItem value="mexico">México</SelectItem>
                    <SelectItem value="guatemala">Guatemala</SelectItem>
                    <SelectItem value="belize">Belice</SelectItem>
                    <SelectItem value="honduras">Honduras</SelectItem>
                    <SelectItem value="el-salvador">El Salvador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Presupuesto</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Cualquier precio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Cualquier precio</SelectItem>
                    <SelectItem value="economic">Económico (menos de $500)</SelectItem>
                    <SelectItem value="mid">Medio ($500 - $1000)</SelectItem>
                    <SelectItem value="premium">Premium ($1000 - $2000)</SelectItem>
                    <SelectItem value="luxury">Lujo (más de $2000)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Duración</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Cualquier duración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Cualquier duración</SelectItem>
                    <SelectItem value="weekend">Fin de semana (1-3 días)</SelectItem>
                    <SelectItem value="short">Corto (4-7 días)</SelectItem>
                    <SelectItem value="medium">Medio (8-14 días)</SelectItem>
                    <SelectItem value="long">Largo (más de 14 días)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tipo de viaje</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="cultural" className="mr-2" />
                    <label htmlFor="cultural">Cultural</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="adventure" className="mr-2" />
                    <label htmlFor="adventure">Aventura</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="relax" className="mr-2" />
                    <label htmlFor="relax">Relax</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="gastronomy" className="mr-2" />
                    <label htmlFor="gastronomy">Gastronomía</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="nature" className="mr-2" />
                    <label htmlFor="nature">Naturaleza</label>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-teal-700 hover:bg-teal-800">Aplicar filtros</Button>
            </div>
          </div>
        </div>

        {/* Listado de destinos */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="w-full md:w-auto grid grid-cols-2 md:flex">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="popular">Populares</TabsTrigger>
              <TabsTrigger value="cultural">Culturales</TabsTrigger>
              <TabsTrigger value="beach">Playas</TabsTrigger>
              <TabsTrigger value="nature">Naturaleza</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TravelDestinationCard
                  title="Chichén Itzá"
                  location="Yucatán, México"
                  price={1200}
                  image="https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2067&auto=format&fit=crop"
                  rating={4.8}
                  id="chichén-itzá"
                />
                <TravelDestinationCard
                  title="Tulum"
                  location="Quintana Roo, México"
                  price={950}
                  image="https://images.unsplash.com/photo-1504730030853-eff311f57d3c?q=80&w=2070&auto=format&fit=crop"
                  rating={4.6}
                  id="tulum"
                />
                <TravelDestinationCard
                  title="Tikal"
                  location="Petén, Guatemala"
                  price={1050}
                  image="https://images.unsplash.com/photo-1605217613423-0aea4fb9c518?q=80&w=2070&auto=format&fit=crop"
                  rating={4.7}
                  id="tikal"
                />
                <TravelDestinationCard
                  title="Copán"
                  location="Copán, Honduras"
                  price={850}
                  image="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop"
                  rating={4.5}
                  id="copán"
                />
                <TravelDestinationCard
                  title="Palenque"
                  location="Chiapas, México"
                  price={780}
                  image="https://images.unsplash.com/photo-1533193773788-92826ee86674?q=80&w=2071&auto=format&fit=crop"
                  rating={4.4}
                  id="palenque"
                />
                <TravelDestinationCard
                  title="Uxmal"
                  location="Yucatán, México"
                  price={920}
                  image="https://images.unsplash.com/photo-1559493909-8d1c8792774a?q=80&w=2070&auto=format&fit=crop"
                  rating={4.6}
                  id="uxmal"
                />
                <TravelDestinationCard
                  title="Calakmul"
                  location="Campeche, México"
                  price={1100}
                  image="/placeholder.svg?height=400&width=600"
                  rating={4.7}
                  id="calakmul"
                />
                <TravelDestinationCard
                  title="Caracol"
                  location="Distrito de Cayo, Belice"
                  price={980}
                  image="/placeholder.svg?height=400&width=600"
                  rating={4.5}
                  id="caracol"
                />
                <TravelDestinationCard
                  title="Joya de Cerén"
                  location="La Libertad, El Salvador"
                  price={750}
                  image="/placeholder.svg?height=400&width=600"
                  rating={4.3}
                  id="joya-de-cerén"
                />
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TravelDestinationCard
                  title="Chichén Itzá"
                  location="Yucatán, México"
                  price={1200}
                  image="https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2067&auto=format&fit=crop"
                  rating={4.8}
                  id="chichén-itzá"
                />
                <TravelDestinationCard
                  title="Tulum"
                  location="Quintana Roo, México"
                  price={950}
                  image="https://images.unsplash.com/photo-1504730030853-eff311f57d3c?q=80&w=2070&auto=format&fit=crop"
                  rating={4.6}
                  id="tulum"
                />
                <TravelDestinationCard
                  title="Tikal"
                  location="Petén, Guatemala"
                  price={1050}
                  image="https://images.unsplash.com/photo-1605217613423-0aea4fb9c518?q=80&w=2070&auto=format&fit=crop"
                  rating={4.7}
                  id="tikal"
                />
              </div>
            </TabsContent>

            {/* Otros tabs tendrían contenido similar */}
            <TabsContent value="cultural" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TravelDestinationCard
                  title="Chichén Itzá"
                  location="Yucatán, México"
                  price={1200}
                  image="https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2067&auto=format&fit=crop"
                  rating={4.8}
                  id="chichén-itzá"
                />
                <TravelDestinationCard
                  title="Palenque"
                  location="Chiapas, México"
                  price={780}
                  image="https://images.unsplash.com/photo-1533193773788-92826ee86674?q=80&w=2071&auto=format&fit=crop"
                  rating={4.4}
                  id="palenque"
                />
                <TravelDestinationCard
                  title="Copán"
                  location="Copán, Honduras"
                  price={850}
                  image="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop"
                  rating={4.5}
                  id="copán"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mt-8">
            <Button variant="outline">Cargar más destinos</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

