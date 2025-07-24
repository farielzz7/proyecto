"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, MapPin, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ExperienceCardProps {
  title: string
  location: string
  price: number
  duration: string
  rating: number
  image: string
  category: string
}

function ExperienceCard({ title, location, price, duration, rating, image, category }: ExperienceCardProps) {
  // Generar un ID basado en el título
  const experienceId = title.toLowerCase().replace(/\s+/g, "-")

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full">
        <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-md text-xs font-medium z-10">
          {category}
        </div>
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-medium flex items-center">
          <Star className="h-4 w-4 text-amber-500 mr-1 fill-amber-500" />
          {rating}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center text-muted-foreground mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">{duration}</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-muted-foreground">Desde</span>
            <p className="text-lg font-bold text-teal-700">${price}</p>
          </div>
          <div className="text-sm text-muted-foreground">por persona</div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/experiencia/${experienceId}`} className="w-full">
          <Button variant="outline" className="w-full border-teal-700 text-teal-700 hover:bg-teal-50">
            Ver detalles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default function ExperienciasPage() {
  // Asegurar que la página se cargue desde arriba
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-teal-900">Experiencias</h1>
        <p className="text-muted-foreground">Descubre experiencias únicas en el mundo maya</p>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-12">
        <Image src="/placeholder.svg?height=800&width=1600" alt="Experiencias mayas" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-transparent flex items-center">
          <div className="p-8 max-w-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Vive la Cultura Maya</h2>
            <p className="text-white/90 mb-6">
              Sumérgete en experiencias auténticas que te conectarán con la rica historia y tradiciones de la
              civilización maya.
            </p>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white">Explorar Experiencias</Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="w-full md:w-auto grid grid-cols-2 md:flex">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="cultural">Culturales</TabsTrigger>
          <TabsTrigger value="adventure">Aventura</TabsTrigger>
          <TabsTrigger value="gastronomy">Gastronomía</TabsTrigger>
          <TabsTrigger value="wellness">Bienestar</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ExperienceCard
              title="Ceremonia Maya Ancestral"
              location="Chichén Itzá, México"
              price={85}
              duration="2 horas"
              rating={4.9}
              image="https://images.unsplash.com/photo-1607025952930-da2ac6748e7a?q=80&w=2070&auto=format&fit=crop"
              category="Cultural"
            />
            <ExperienceCard
              title="Cenotes Sagrados: Tour de Nado"
              location="Riviera Maya, México"
              price={65}
              duration="4 horas"
              rating={4.7}
              image="https://images.unsplash.com/photo-1544551763-92ab472cad5d?q=80&w=2070&auto=format&fit=crop"
              category="Aventura"
            />
            <ExperienceCard
              title="Clase de Cocina Maya Tradicional"
              location="Mérida, México"
              price={55}
              duration="3 horas"
              rating={4.8}
              image="https://images.unsplash.com/photo-1605197161470-5d2a9af0ac7e?q=80&w=2070&auto=format&fit=crop"
              category="Gastronomía"
            />
            <ExperienceCard
              title="Temazcal: Baño de Purificación"
              location="Tulum, México"
              price={75}
              duration="1.5 horas"
              rating={4.6}
              image="/placeholder.svg?height=400&width=600"
              category="Bienestar"
            />
            <ExperienceCard
              title="Observación de Estrellas Maya"
              location="Tikal, Guatemala"
              price={45}
              duration="2 horas"
              rating={4.5}
              image="/placeholder.svg?height=400&width=600"
              category="Cultural"
            />
            <ExperienceCard
              title="Senderismo en Ruinas Mayas"
              location="Copán, Honduras"
              price={40}
              duration="5 horas"
              rating={4.7}
              image="/placeholder.svg?height=400&width=600"
              category="Aventura"
            />
            <ExperienceCard
              title="Taller de Tejido Maya"
              location="San Cristóbal, México"
              price={35}
              duration="2 horas"
              rating={4.8}
              image="/placeholder.svg?height=400&width=600"
              category="Cultural"
            />
            <ExperienceCard
              title="Degustación de Chocolate Maya"
              location="Antigua, Guatemala"
              price={30}
              duration="1.5 horas"
              rating={4.9}
              image="/placeholder.svg?height=400&width=600"
              category="Gastronomía"
            />
            <ExperienceCard
              title="Ritual de Sanación Maya"
              location="Bacalar, México"
              price={90}
              duration="2 horas"
              rating={4.6}
              image="/placeholder.svg?height=400&width=600"
              category="Bienestar"
            />
          </div>
        </TabsContent>

        {/* Otros tabs tendrían contenido similar filtrado por categoría */}
        <TabsContent value="cultural" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ExperienceCard
              title="Ceremonia Maya Ancestral"
              location="Chichén Itzá, México"
              price={85}
              duration="2 horas"
              rating={4.9}
              image="https://images.unsplash.com/photo-1607025952930-da2ac6748e7a?q=80&w=2070&auto=format&fit=crop"
              category="Cultural"
            />
            <ExperienceCard
              title="Observación de Estrellas Maya"
              location="Tikal, Guatemala"
              price={45}
              duration="2 horas"
              rating={4.5}
              image="/placeholder.svg?height=400&width=600"
              category="Cultural"
            />
            <ExperienceCard
              title="Taller de Tejido Maya"
              location="San Cristóbal, México"
              price={35}
              duration="2 horas"
              rating={4.8}
              image="/placeholder.svg?height=400&width=600"
              category="Cultural"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-8 mb-12">
        <Button variant="outline">Cargar más experiencias</Button>
      </div>

      {/* Experiencias Destacadas */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-teal-900">Experiencias Destacadas</h2>
          <Link href="#" className="text-teal-700 hover:text-teal-800 flex items-center">
            Ver todas <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="flex flex-col md:flex-row overflow-hidden">
            <div className="relative w-full md:w-2/5 h-48 md:h-auto">
              <Image
                src="/placeholder.svg?height=400&width=300"
                alt="Experiencia destacada"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 p-6">
              <CardTitle className="mb-2">Tour Completo: Ruta Maya</CardTitle>
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span className="text-sm ml-2">(128 reseñas)</span>
              </div>
              <CardDescription className="mb-4">
                Un recorrido de 7 días por los sitios más emblemáticos de la cultura maya, incluyendo Chichén Itzá,
                Tulum, Cobá y más.
              </CardDescription>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1 text-teal-700" />7 días
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-1 text-teal-700" />
                  Máx. 12 personas
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1 text-teal-700" />
                  Múltiples ubicaciones
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-muted-foreground">Desde</span>
                  <p className="text-xl font-bold text-teal-700">$1,299</p>
                </div>
                <Link href="/experiencia/tour-completo-ruta-maya">
                  <Button className="bg-teal-700 hover:bg-teal-800">Reservar ahora</Button>
                </Link>
              </div>
            </div>
          </Card>

          <Card className="flex flex-col md:flex-row overflow-hidden">
            <div className="relative w-full md:w-2/5 h-48 md:h-auto">
              <Image
                src="/placeholder.svg?height=400&width=300"
                alt="Experiencia destacada"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 p-6">
              <CardTitle className="mb-2">Retiro Espiritual Maya</CardTitle>
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span className="text-sm ml-2">(96 reseñas)</span>
              </div>
              <CardDescription className="mb-4">
                Un retiro de 3 días para reconectar con la sabiduría ancestral maya a través de ceremonias, meditaciones
                y temazcales.
              </CardDescription>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1 text-teal-700" />3 días
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-1 text-teal-700" />
                  Máx. 8 personas
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1 text-teal-700" />
                  Tulum, México
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-muted-foreground">Desde</span>
                  <p className="text-xl font-bold text-teal-700">$599</p>
                </div>
                <Link href="/experiencia/retiro-espiritual-maya">
                  <Button className="bg-teal-700 hover:bg-teal-800">Reservar ahora</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Testimonios */}
      <div className="bg-stone-50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-teal-900 text-center mb-8">Lo que dicen nuestros viajeros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              </div>
              <p className="italic mb-4">
                "La ceremonia maya fue una experiencia transformadora. El guía compartió conocimientos ancestrales de
                una manera auténtica y respetuosa."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <p className="font-medium">María González</p>
                  <p className="text-sm text-muted-foreground">Chichén Itzá, México</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              </div>
              <p className="italic mb-4">
                "El tour de cenotes fue increíble. Nadamos en aguas cristalinas mientras aprendíamos sobre su
                importancia en la cultura maya."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <p className="font-medium">Carlos Ramírez</p>
                  <p className="text-sm text-muted-foreground">Riviera Maya, México</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              </div>
              <p className="italic mb-4">
                "La clase de cocina maya fue una delicia. Aprendimos a preparar platillos tradicionales con ingredientes
                locales y técnicas ancestrales."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <p className="font-medium">Laura Méndez</p>
                  <p className="text-sm text-muted-foreground">Mérida, México</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

