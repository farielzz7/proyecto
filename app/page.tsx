import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Calendar, DollarSign, Compass } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TravelDestinationCard } from "@/components/travel-destination-card"
import { SearchBudget } from "@/components/search-budget"
import { RegisterSection } from "@/components/register-section"

const accentStyles = {
  teal: {
    background: "bg-teal-100",
    icon: "text-teal-700",
  },
  amber: {
    background: "bg-amber-100",
    icon: "text-amber-700",
  },
} as const

type Accent = keyof typeof accentStyles

type FeatureCard = {
  title: string
  description: string
  icon: typeof DollarSign
  accent: Accent
}

const featureCards: FeatureCard[] = [
  {
    title: "Presupuesto Inteligente",
    description: "Optimiza tu viaje según tu presupuesto con opciones personalizadas",
    icon: DollarSign,
    accent: "teal",
  },
  {
    title: "Destinos Únicos",
    description: "Descubre lugares increíbles adaptados a tus preferencias",
    icon: MapPin,
    accent: "amber",
  },
  {
    title: "Planificación Detallada",
    description: "Organiza cada aspecto de tu viaje con nuestras herramientas",
    icon: Calendar,
    accent: "teal",
  },
  {
    title: "Experiencias Auténticas",
    description: "Vive la cultura local con recomendaciones personalizadas",
    icon: Compass,
    accent: "amber",
  },
]

type DestinationCard = {
  title: string
  location: string
  price: number
  image: string
  rating: number
  id: string
}

const destinations: DestinationCard[] = [
  {
    title: "Chichén Itzá",
    location: "Yucatán, México",
    price: 1200,
    image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2067&auto=format&fit=crop",
    rating: 4.8,
    id: "chichén-itzá",
  },
  {
    title: "Tulum",
    location: "Quintana Roo, México",
    price: 950,
    image: "https://images.unsplash.com/photo-1504730030853-eff311f57d3c?q=80&w=2070&auto=format&fit=crop",
    rating: 4.6,
    id: "tulum",
  },
  {
    title: "Tikal",
    location: "Petén, Guatemala",
    price: 1050,
    image: "https://images.unsplash.com/photo-1605217613423-0aea4fb9c518?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7,
    id: "tikal",
  },
]

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
            {featureCards.map((feature) => {
              const Icon = feature.icon
              const accent = accentStyles[feature.accent]

              return (
                <Card key={feature.title} className="border-none shadow-md bg-white">
                  <CardContent className="pt-6">
                    <div
                      className={`rounded-full ${accent.background} w-12 h-12 flex items-center justify-center mb-4`}
                    >
                      <Icon className={`h-6 w-6 ${accent.icon}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
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
            {destinations.map((destination) => (
              <TravelDestinationCard key={destination.id} {...destination} />
            ))}
          </div>
        </div>
      </section>

      <RegisterSection />

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
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white/10"
            >
              Saber más
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

