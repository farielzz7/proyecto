import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Calendar, DollarSign, Compass } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TravelDestinationCard } from "@/components/travel-destination-card"
import { SearchBudget } from "@/components/search-budget"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sección Principal (Hero) */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-amber-900/80 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=2070&auto=format&fit=crop"
          alt="Ruinas mayas"
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Descubre el mundo con <span className="text-amber-400">GoPlan</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Planifica tu viaje perfecto según tu presupuesto y preferencias
            </p>
            <SearchBudget />
          </div>
        </div>
      </section>

      {/* Sección de Características */}
      <section className="py-16 bg-stone-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-teal-900">Planifica tu viaje con facilidad</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Tarjeta de Característica: Presupuesto Inteligente */}
            <Card className="border-none shadow-md bg-white">
              <CardContent className="pt-6">
                <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-teal-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Presupuesto Inteligente</h3>
                <p className="text-muted-foreground">
                  Optimiza tu viaje según tu presupuesto con opciones personalizadas
                </p>
              </CardContent>
            </Card>
            {/* Tarjeta de Característica: Destinos Únicos */}
            <Card className="border-none shadow-md bg-white">
              <CardContent className="pt-6">
                <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Destinos Únicos</h3>
                <p className="text-muted-foreground">Descubre lugares increíbles adaptados a tus preferencias</p>
              </CardContent>
            </Card>
            {/* Tarjeta de Característica: Planificación Detallada */}
            <Card className="border-none shadow-md bg-white">
              <CardContent className="pt-6">
                <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-teal-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Planificación Detallada</h3>
                <p className="text-muted-foreground">Organiza cada aspecto de tu viaje con nuestras herramientas</p>
              </CardContent>
            </Card>
            {/* Tarjeta de Característica: Experiencias Auténticas */}
            <Card className="border-none shadow-md bg-white">
              <CardContent className="pt-6">
                <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4">
                  <Compass className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Experiencias Auténticas</h3>
                <p className="text-muted-foreground">Vive la cultura local con recomendaciones personalizadas</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sección de Destinos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-teal-900">Destinos Recomendados</h2>
            <Link href="/destinos" className="text-amber-600 hover:text-amber-700 flex items-center">
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tarjeta de Destino */}
            <TravelDestinationCard
              title="Chichén Itzá"
              location="Yucatán, México"
              price={1200}
              image="https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2067&auto=format&fit=crop"
              rating={4.8}
              id="chichén-itzá"
            />
            {/* Tarjeta de Destino */}
            <TravelDestinationCard
              title="Tulum"
              location="Quintana Roo, México"
              price={950}
              image="https://images.unsplash.com/photo-1504730030853-eff311f57d3c?q=80&w=2070&auto=format&fit=crop"
              rating={4.6}
              id="tulum"
            />
            {/* Tarjeta de Destino */}
            <TravelDestinationCard
              title="Tikal"
              location="Petén, Guatemala"
              price={1050}
              image="https://images.unsplash.com/photo-1605217613423-0aea4fb9c518?q=80&w=2070&auto=format&fit=crop"
              rating={4.7}
              id="tikal"
            />
          </div>
        </div>
      </section>

      {/* Sección de Llamada a la Acción (CTA) */}
      <section className="py-16 bg-gradient-to-r from-teal-800 to-teal-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Comienza a planificar tu próxima aventura</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Regístrate ahora y descubre cómo GoPlan puede ayudarte a crear el viaje perfecto
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
              Registrarse
            </Button>
            <Button size="lg" variant="outline" className="bg-amber-500 hover:bg-amber-600 text-white">
              Saber más
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

