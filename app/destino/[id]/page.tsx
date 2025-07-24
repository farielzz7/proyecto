"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos simulados para los destinos
const destinosData = {
  "chichén-itzá": {
    id: "chichén-itzá",
    title: "Chichén Itzá",
    location: "Yucatán, México",
    price: 1200,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2067&auto=format&fit=crop",
    description:
      "Chichén Itzá es uno de los sitios arqueológicos más importantes y reconocidos de la civilización maya. Declarado Patrimonio de la Humanidad por la UNESCO y una de las Nuevas Siete Maravillas del Mundo, este impresionante complejo arqueológico fue uno de los centros políticos y religiosos más importantes de la cultura maya.",
    highlights: [
      "Visita guiada al Templo de Kukulcán (El Castillo)",
      "Recorrido por el Observatorio Astronómico",
      "Exploración del Juego de Pelota más grande de Mesoamérica",
      "Visita al Cenote Sagrado y el Templo de los Guerreros",
      "Experiencia de luz y sonido al atardecer",
    ],
    includes: [
      "Transporte de ida y vuelta desde hoteles seleccionados",
      "Guía certificado bilingüe (español e inglés)",
      "Entrada al sitio arqueológico",
      "Almuerzo buffet de comida regional",
      "Tiempo libre para explorar por cuenta propia",
      "Seguro de viaje",
    ],
    duration: "10 horas",
    groupSize: "Máximo 15 personas",
    startTime: "8:00 AM",
    languages: ["Español", "Inglés"],
    reviews: 128,
    reviewScore: 4.8,
  },
  tulum: {
    id: "tulum",
    title: "Tulum",
    location: "Quintana Roo, México",
    price: 950,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1504730030853-eff311f57d3c?q=80&w=2070&auto=format&fit=crop",
    description:
      "Tulum es un sitio arqueológico maya ubicado en la costa del Mar Caribe, en la Riviera Maya. Es uno de los destinos más fotogénicos de México, donde las ruinas mayas se alzan sobre acantilados frente al mar turquesa. Tulum fue una de las últimas ciudades construidas y habitadas por los mayas y funcionó como un importante centro comercial.",
    highlights: [
      "Visita guiada a las ruinas mayas frente al mar",
      "Tiempo para nadar en la playa paradisíaca bajo el sitio arqueológico",
      "Exploración del Templo de los Frescos y El Castillo",
      "Visita a cenotes cercanos para nadar en aguas cristalinas",
      "Tiempo libre en la zona hotelera de Tulum",
    ],
    includes: [
      "Transporte de ida y vuelta desde hoteles seleccionados",
      "Guía certificado bilingüe (español e inglés)",
      "Entrada al sitio arqueológico",
      "Visita a un cenote con tiempo para nadar",
      "Almuerzo ligero",
      "Seguro de viaje",
    ],
    duration: "8 horas",
    groupSize: "Máximo 12 personas",
    startTime: "9:00 AM",
    languages: ["Español", "Inglés", "Francés"],
    reviews: 96,
    reviewScore: 4.6,
  },
  tikal: {
    id: "tikal",
    title: "Tikal",
    location: "Petén, Guatemala",
    price: 1050,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1605217613423-0aea4fb9c518?q=80&w=2070&auto=format&fit=crop",
    description:
      "Tikal es uno de los mayores sitios arqueológicos de la civilización maya precolombina, ubicado en la región de Petén en Guatemala. Este impresionante complejo, declarado Patrimonio de la Humanidad por la UNESCO, se encuentra en medio de la selva tropical y alberga miles de estructuras antiguas, desde pequeñas plataformas hasta enormes templos y palacios.",
    highlights: [
      "Recorrido por la Gran Plaza y sus templos gemelos",
      "Visita al Templo IV, el más alto de Tikal (64 metros)",
      "Observación de fauna local en la selva del Parque Nacional",
      "Exploración de la Acrópolis Central y Norte",
      "Experiencia de amanecer o atardecer desde los templos (opcional)",
    ],
    includes: [
      "Transporte desde Flores o Ciudad de Guatemala",
      "Guía especializado en arqueología maya",
      "Entrada al Parque Nacional Tikal",
      "Almuerzo tipo picnic en la selva",
      "Tiempo para explorar por cuenta propia",
      "Seguro de viaje",
    ],
    duration: "1 día completo",
    groupSize: "Máximo 10 personas",
    startTime: "4:30 AM (amanecer) o 9:00 AM (regular)",
    languages: ["Español", "Inglés"],
    reviews: 84,
    reviewScore: 4.7,
  },
  default: {
    id: "default",
    title: "Destino Maya",
    location: "Mundo Maya",
    price: 1000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1562095241-8c6714fd4178?q=80&w=2076&auto=format&fit=crop",
    description:
      "Este destino maya ofrece una experiencia única para conocer la rica historia y cultura de esta fascinante civilización. Explora ruinas arqueológicas, aprende sobre tradiciones ancestrales y disfruta de la belleza natural de la región.",
    highlights: [
      "Visita guiada a sitios arqueológicos importantes",
      "Experiencias culturales auténticas",
      "Gastronomía local y tradicional",
      "Contacto con comunidades mayas actuales",
      "Actividades en entornos naturales únicos",
    ],
    includes: [
      "Transporte durante todo el recorrido",
      "Guía especializado bilingüe",
      "Entradas a sitios arqueológicos",
      "Comidas especificadas en el itinerario",
      "Actividades culturales",
      "Seguro de viaje",
    ],
    duration: "Variable",
    groupSize: "Grupos reducidos",
    startTime: "A confirmar",
    languages: ["Español", "Inglés"],
    reviews: 75,
    reviewScore: 4.5,
  },
}

export default function DestinoDetailPage({ params }: { params: { id: string } }) {
  // Asegurar que la página se cargue desde arriba
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Obtener los datos del destino o usar datos predeterminados si no existe
  const destino = destinosData[params.id] || destinosData.default

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/destinos" className="flex items-center text-teal-700 hover:text-teal-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a destinos
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-teal-900">{destino.title}</h1>
        <div className="flex items-center mt-2">
          <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
          <span className="text-muted-foreground">{destino.location}</span>
          <div className="flex items-center ml-4">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
            <span>{destino.rating}</span>
            <span className="text-muted-foreground ml-1">({destino.reviews} reseñas)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-6">
            <Image
              src={destino.image || "/placeholder.svg"}
              alt={destino.title}
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="overview">Descripción</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerario</TabsTrigger>
              <TabsTrigger value="includes">Incluye</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Acerca de este destino</h2>
                  <p className="text-muted-foreground">{destino.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Destacados</h2>
                  <ul className="space-y-2">
                    {destino.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-teal-100 text-teal-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                          {index + 1}
                        </div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 bg-stone-50 rounded-lg">
                    <Clock className="h-5 w-5 text-teal-700 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duración</p>
                      <p className="font-medium">{destino.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-stone-50 rounded-lg">
                    <Users className="h-5 w-5 text-teal-700 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tamaño del grupo</p>
                      <p className="font-medium">{destino.groupSize}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-stone-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-teal-700 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Hora de inicio</p>
                      <p className="font-medium">{destino.startTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-stone-50 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-teal-700 mr-3"
                    >
                      <path d="M5 8l6 6" />
                      <path d="M4 14l6-6 2 2 6-6" />
                      <path d="M2 5h12" />
                      <path d="M7 2h1" />
                      <path d="M22 22H12" />
                      <path d="M17 22v-1" />
                      <path d="M22 17h-1" />
                    </svg>
                    <div>
                      <p className="text-sm text-muted-foreground">Idiomas</p>
                      <p className="font-medium">{destino.languages.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="itinerary" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-3">Itinerario</h2>

                <div className="space-y-4">
                  <div className="border-l-2 border-teal-700 pl-4 pb-6 relative">
                    <div className="absolute w-3 h-3 bg-teal-700 rounded-full -left-[7px] top-1"></div>
                    <h3 className="font-medium text-lg">Mañana</h3>
                    <p className="text-muted-foreground mb-3">
                      Recogida en su hotel y traslado al sitio arqueológico. A la llegada, nuestro guía especializado le
                      dará una introducción a la historia y significado cultural del sitio.
                    </p>
                    <div className="bg-stone-50 p-3 rounded-md">
                      <p className="text-sm font-medium">8:00 AM - 9:30 AM</p>
                      <p className="text-sm">Recogida en hotel y traslado</p>
                    </div>
                    <div className="bg-stone-50 p-3 rounded-md mt-2">
                      <p className="text-sm font-medium">9:30 AM - 12:30 PM</p>
                      <p className="text-sm">Visita guiada al sitio arqueológico</p>
                    </div>
                  </div>

                  <div className="border-l-2 border-teal-700 pl-4 pb-6 relative">
                    <div className="absolute w-3 h-3 bg-teal-700 rounded-full -left-[7px] top-1"></div>
                    <h3 className="font-medium text-lg">Mediodía</h3>
                    <p className="text-muted-foreground mb-3">
                      Disfrutará de un almuerzo tradicional con platos regionales. Después, tendrá tiempo libre para
                      explorar por su cuenta o descansar en un área sombreada.
                    </p>
                    <div className="bg-stone-50 p-3 rounded-md">
                      <p className="text-sm font-medium">12:30 PM - 2:00 PM</p>
                      <p className="text-sm">Almuerzo y tiempo libre</p>
                    </div>
                  </div>

                  <div className="border-l-2 border-teal-700 pl-4 relative">
                    <div className="absolute w-3 h-3 bg-teal-700 rounded-full -left-[7px] top-1"></div>
                    <h3 className="font-medium text-lg">Tarde</h3>
                    <p className="text-muted-foreground mb-3">
                      Continuaremos explorando otras secciones del sitio arqueológico. Finalizaremos con una visita a un
                      cenote cercano donde podrá refrescarse con un baño opcional.
                    </p>
                    <div className="bg-stone-50 p-3 rounded-md">
                      <p className="text-sm font-medium">2:00 PM - 4:00 PM</p>
                      <p className="text-sm">Exploración de áreas adicionales</p>
                    </div>
                    <div className="bg-stone-50 p-3 rounded-md mt-2">
                      <p className="text-sm font-medium">4:00 PM - 5:30 PM</p>
                      <p className="text-sm">Visita al cenote y tiempo para nadar</p>
                    </div>
                    <div className="bg-stone-50 p-3 rounded-md mt-2">
                      <p className="text-sm font-medium">5:30 PM - 6:30 PM</p>
                      <p className="text-sm">Regreso a su hotel</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="includes" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">¿Qué incluye?</h2>
                  <ul className="space-y-2">
                    {destino.includes.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-teal-700 mr-2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">¿Qué no incluye?</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500 mr-2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      <span>Propinas para guías y conductores</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500 mr-2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      <span>Gastos personales</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500 mr-2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      <span>Actividades opcionales no mencionadas</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500 mr-2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      <span>Bebidas alcohólicas</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Qué llevar</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-amber-600 mr-2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>Protector solar</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-amber-600 mr-2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>Sombrero o gorra</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-amber-600 mr-2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>Ropa cómoda</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-amber-600 mr-2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>Calzado cerrado</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-amber-600 mr-2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>Repelente de insectos</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-amber-600 mr-2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>Traje de baño y toalla</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Reseñas</h2>
                  <div className="flex items-center">
                    <div className="bg-teal-100 text-teal-800 px-2 py-1 rounded-md text-sm font-medium flex items-center mr-2">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                      {destino.reviewScore}
                    </div>
                    <span className="text-muted-foreground">({destino.reviews} reseñas)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <div>
                          <p className="font-medium">María González</p>
                          <p className="text-xs text-muted-foreground">Visitó en Marzo 2025</p>
                        </div>
                      </div>
                      <div className="flex">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      </div>
                    </div>
                    <p className="text-sm mb-2">
                      "Una experiencia increíble. El guía era muy conocedor y nos explicó la historia y significado de
                      cada estructura. El sitio es impresionante y las vistas son espectaculares. Definitivamente vale
                      la pena la visita."
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <div>
                          <p className="font-medium">Carlos Ramírez</p>
                          <p className="text-xs text-muted-foreground">Visitó en Febrero 2025</p>
                        </div>
                      </div>
                      <div className="flex">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      </div>
                    </div>
                    <p className="text-sm mb-2">
                      "Superó todas mis expectativas. La organización fue perfecta, desde la recogida en el hotel hasta
                      el regreso. El almuerzo estaba delicioso y el guía era muy amable y conocedor. Recomiendo llevar
                      protector solar y mucha agua."
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <div>
                          <p className="font-medium">Laura Méndez</p>
                          <p className="text-xs text-muted-foreground">Visitó en Enero 2025</p>
                        </div>
                      </div>
                      <div className="flex">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                    </div>
                    <p className="text-sm mb-2">
                      "Muy buena experiencia en general. El sitio es impresionante y el guía era muy informativo. Lo
                      único negativo fue que el grupo era un poco grande y a veces era difícil escuchar todas las
                      explicaciones. Recomendaría llevar zapatos cómodos."
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    Ver más reseñas
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Precio por persona desde</p>
                <p className="text-3xl font-bold text-teal-700">${destino.price}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">Fecha</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select className="w-full pl-9 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      <option>Seleccionar fecha</option>
                      <option>15 de Junio, 2025</option>
                      <option>22 de Junio, 2025</option>
                      <option>29 de Junio, 2025</option>
                      <option>6 de Julio, 2025</option>
                      <option>13 de Julio, 2025</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Número de personas</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select className="w-full pl-9 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      <option>1 persona</option>
                      <option>2 personas</option>
                      <option>3 personas</option>
                      <option>4 personas</option>
                      <option>5 personas</option>
                      <option>6+ personas</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Idioma del tour</label>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      <path d="M2 5h12" />
                      <path d="M7 2h1" />
                      <path d="M22 22H12" />
                      <path d="M17 22v-1" />
                      <path d="M22 17h-1" />
                      <path d="M14 8l-5 5" />
                      <path d="M9 8h5v5" />
                    </svg>
                    <select className="w-full pl-9 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      <option>Español</option>
                      <option>Inglés</option>
                      <option>Francés</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-b py-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span>Precio base</span>
                  <span>${destino.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Impuestos y tasas</span>
                  <span>${Math.round(destino.price * 0.16)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${destino.price + Math.round(destino.price * 0.16)}</span>
                </div>
              </div>

              <Link href={`/checkout?destino=${destino.id}&precio=${destino.price}`} className="w-full">
                <Button className="w-full bg-teal-700 hover:bg-teal-800 mb-3">Reservar ahora</Button>
              </Link>

              <p className="text-xs text-center text-muted-foreground">No se te cobrará nada en este momento</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

