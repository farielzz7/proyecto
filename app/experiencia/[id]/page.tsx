"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos simulados para las experiencias
const experienciasData = {
  "ceremonia-maya-ancestral": {
    id: "ceremonia-maya-ancestral",
    title: "Ceremonia Maya Ancestral",
    location: "Chichén Itzá, México",
    price: 85,
    duration: "2 horas",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1607025952930-da2ac6748e7a?q=80&w=2070&auto=format&fit=crop",
    category: "Cultural",
    description:
      "Participa en una auténtica ceremonia maya dirigida por un chamán local. Esta experiencia única te conectará con las tradiciones ancestrales de la cultura maya, mientras aprendes sobre su cosmovisión, rituales y conexión con la naturaleza.",
    highlights: [
      "Ceremonia dirigida por un auténtico chamán maya",
      "Ritual de purificación con copal e inciensos naturales",
      "Ofrenda tradicional a los cuatro puntos cardinales",
      "Explicación detallada de los símbolos y significados",
      "Participación activa en cantos y rituales",
    ],
    includes: [
      "Guía bilingüe especializado en cultura maya",
      "Materiales para la ceremonia",
      "Ofrenda tradicional",
      "Bebida ceremonial de balché (opcional)",
      "Transporte desde puntos de encuentro designados",
    ],
    groupSize: "Máximo 12 personas",
    languages: ["Español", "Inglés", "Maya"],
    reviews: 64,
    reviewScore: 4.9,
  },
  "cenotes-sagrados-tour-de-nado": {
    id: "cenotes-sagrados-tour-de-nado",
    title: "Cenotes Sagrados: Tour de Nado",
    location: "Riviera Maya, México",
    price: 65,
    duration: "4 horas",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1544551763-92ab472cad5d?q=80&w=2070&auto=format&fit=crop",
    category: "Aventura",
    description:
      "Explora los místicos cenotes de la Riviera Maya, considerados por los antiguos mayas como entradas al inframundo. Este tour te llevará a nadar en las aguas cristalinas de tres cenotes diferentes, cada uno con características únicas y formaciones impresionantes.",
    highlights: [
      "Visita a tres cenotes diferentes: abierto, semiabierto y cueva",
      "Nado en aguas cristalinas con visibilidad excepcional",
      "Exploración de formaciones de estalactitas y estalagmitas",
      "Salto opcional desde plataformas naturales",
      "Explicación sobre la importancia de los cenotes en la cultura maya",
    ],
    includes: [
      "Transporte en vehículo con aire acondicionado",
      "Guía certificado en primeros auxilios",
      "Equipo de snorkel y chaleco salvavidas",
      "Refrigerio y agua purificada",
      "Fotos digitales de la experiencia",
    ],
    groupSize: "Máximo 10 personas",
    languages: ["Español", "Inglés"],
    reviews: 92,
    reviewScore: 4.7,
  },
  "clase-de-cocina-maya-tradicional": {
    id: "clase-de-cocina-maya-tradicional",
    title: "Clase de Cocina Maya Tradicional",
    location: "Mérida, México",
    price: 55,
    duration: "3 horas",
    rating: 4.8,
    image: "/placeholder.svg?height=800&width=1200",
    category: "Gastronomía",
    description:
      "Aprende los secretos de la cocina maya tradicional en esta clase práctica impartida por cocineras locales. Descubrirás técnicas ancestrales, ingredientes autóctonos y recetas transmitidas de generación en generación, culminando con una deliciosa comida compartida.",
    highlights: [
      "Preparación de platillos tradicionales como cochinita pibil, sopa de lima y papadzules",
      "Uso del metate y otros utensilios tradicionales",
      "Explicación sobre ingredientes endémicos como achiote, chaya y recado negro",
      "Técnicas de cocción en horno de tierra (pib)",
      "Degustación de los platillos preparados",
    ],
    includes: [
      "Todos los ingredientes y materiales",
      "Delantal para usar durante la clase",
      "Bebidas tradicionales (agua de jamaica, horchata, chaya)",
      "Recetario digital",
      "Comida completa con los platillos preparados",
    ],
    groupSize: "Máximo 8 personas",
    languages: ["Español", "Inglés"],
    reviews: 48,
    reviewScore: 4.8,
  },
  "tour-completo-ruta-maya": {
    id: "tour-completo-ruta-maya",
    title: "Tour Completo: Ruta Maya",
    location: "Múltiples ubicaciones",
    price: 1299,
    duration: "7 días",
    rating: 5.0,
    image: "/placeholder.svg?height=800&width=1200",
    category: "Cultural",
    description:
      "Un recorrido completo de 7 días por los sitios más emblemáticos de la cultura maya, incluyendo Chichén Itzá, Tulum, Cobá y más. Esta experiencia inmersiva te permitirá conocer a fondo la historia, arquitectura y legado de esta fascinante civilización.",
    highlights: [
      "Visita guiada a Chichén Itzá con acceso temprano para evitar multitudes",
      "Exploración de las ruinas costeras de Tulum al amanecer",
      "Recorrido por la selva hasta las pirámides de Cobá",
      "Nado en cenotes sagrados exclusivos",
      "Experiencia cultural con comunidades mayas actuales",
      "Observación astronómica con explicación del calendario maya",
    ],
    includes: [
      "6 noches de alojamiento en hoteles boutique",
      "Desayunos diarios y 4 comidas especiales",
      "Transporte privado con aire acondicionado",
      "Guía arqueológico especializado durante todo el recorrido",
      "Entradas a todos los sitios arqueológicos",
      "Ceremonias y experiencias culturales exclusivas",
    ],
    groupSize: "Máximo 12 personas",
    languages: ["Español", "Inglés"],
    reviews: 128,
    reviewScore: 5.0,
  },
  "retiro-espiritual-maya": {
    id: "retiro-espiritual-maya",
    title: "Retiro Espiritual Maya",
    location: "Tulum, México",
    price: 599,
    duration: "3 días",
    rating: 5.0,
    image: "/placeholder.svg?height=800&width=1200",
    category: "Bienestar",
    description:
      "Un retiro de 3 días para reconectar con la sabiduría ancestral maya a través de ceremonias, meditaciones y temazcales. Esta experiencia transformadora te permitirá desconectar del estrés cotidiano y sumergirte en prácticas espirituales milenarias.",
    highlights: [
      "Ceremonias de conexión con los elementos naturales",
      "Temazcal (baño de vapor ceremonial) para purificación",
      "Meditaciones guiadas en lugares de poder",
      "Talleres de herbolaria maya y medicina tradicional",
      "Ritual de cacao ceremonial",
      "Conexión con la comunidad maya local",
    ],
    includes: [
      "2 noches de alojamiento en eco-cabañas",
      "Alimentación completa vegetariana",
      "Todas las ceremonias y materiales",
      "Guías espirituales y facilitadores",
      "Transporte desde Tulum centro",
      "Diario de reflexión personal",
    ],
    groupSize: "Máximo 8 personas",
    languages: ["Español", "Inglés"],
    reviews: 96,
    reviewScore: 5.0,
  },
  default: {
    id: "default",
    title: "Experiencia Maya",
    location: "Mundo Maya",
    price: 75,
    duration: "Variable",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1533193773788-92826ee86674?q=80&w=2071&auto=format&fit=crop",
    category: "Cultural",
    description:
      "Una experiencia única para conectar con la cultura maya a través de actividades auténticas y significativas. Descubre las tradiciones, conocimientos y prácticas de esta fascinante civilización de la mano de guías locales expertos.",
    highlights: [
      "Actividades culturales auténticas",
      "Guías locales con profundo conocimiento",
      "Experiencias en pequeños grupos",
      "Conexión con comunidades mayas actuales",
      "Aprendizaje vivencial de tradiciones ancestrales",
    ],
    includes: [
      "Guía especializado",
      "Materiales necesarios para las actividades",
      "Refrigerios tradicionales",
      "Transporte local cuando sea necesario",
      "Contribución a proyectos comunitarios mayas",
    ],
    groupSize: "Grupos reducidos",
    languages: ["Español", "Inglés"],
    reviews: 75,
    reviewScore: 4.5,
  },
}

export default function ExperienciaDetailPage({ params }: { params: { id: string } }) {
  // Asegurar que la página se cargue desde arriba
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Obtener los datos de la experiencia o usar datos predeterminados si no existe
  const experiencia = experienciasData[params.id] || experienciasData.default
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [participants, setParticipants] = useState<string>("1")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/experiencias" className="flex items-center text-teal-700 hover:text-teal-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a experiencias
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-teal-900">{experiencia.title}</h1>
        <div className="flex items-center mt-2">
          <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
          <span className="text-muted-foreground">{experiencia.location}</span>
          <div className="flex items-center ml-4">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
            <span>{experiencia.rating}</span>
            <span className="text-muted-foreground ml-1">({experiencia.reviews} reseñas)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-6">
            <Image
              src={experiencia.image || "/placeholder.svg"}
              alt={experiencia.title}
              fill
              className="object-cover"
              unoptimized
              priority
            />
            <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-md text-sm font-medium">
              {experiencia.category}
            </div>
          </div>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="overview">Descripción</TabsTrigger>
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="includes">Incluye</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Acerca de esta experiencia</h2>
                  <p className="text-muted-foreground">{experiencia.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Destacados</h2>
                  <ul className="space-y-2">
                    {experiencia.highlights.map((highlight, index) => (
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
                      <p className="font-medium">{experiencia.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-stone-50 rounded-lg">
                    <Users className="h-5 w-5 text-teal-700 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tamaño del grupo</p>
                      <p className="font-medium">{experiencia.groupSize}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-stone-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-teal-700 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Disponibilidad</p>
                      <p className="font-medium">Todo el año</p>
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
                      <p className="font-medium">{experiencia.languages.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-3">Detalles de la experiencia</h2>

                <div className="space-y-4">
                  <div className="border-l-2 border-teal-700 pl-4 pb-6 relative">
                    <div className="absolute w-3 h-3 bg-teal-700 rounded-full -left-[7px] top-1"></div>
                    <h3 className="font-medium text-lg">Antes de la experiencia</h3>
                    <p className="text-muted-foreground mb-3">
                      Recibirás instrucciones detalladas sobre el punto de encuentro y qué llevar. Te recomendamos
                      vestir ropa cómoda y llevar una botella de agua reutilizable.
                    </p>
                  </div>

                  <div className="border-l-2 border-teal-700 pl-4 pb-6 relative">
                    <div className="absolute w-3 h-3 bg-teal-700 rounded-full -left-[7px] top-1"></div>
                    <h3 className="font-medium text-lg">Durante la experiencia</h3>
                    <p className="text-muted-foreground mb-3">
                      Nuestros guías expertos te acompañarán durante toda la actividad, asegurándose de que sea segura,
                      educativa y respetuosa con la cultura local. Tendrás oportunidad de hacer preguntas y participar
                      activamente.
                    </p>
                  </div>

                  <div className="border-l-2 border-teal-700 pl-4 relative">
                    <div className="absolute w-3 h-3 bg-teal-700 rounded-full -left-[7px] top-1"></div>
                    <h3 className="font-medium text-lg">Después de la experiencia</h3>
                    <p className="text-muted-foreground mb-3">
                      Te enviaremos un correo electrónico con recursos adicionales para seguir aprendiendo sobre la
                      cultura maya y, cuando aplique, fotos digitales de tu experiencia.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-3">Política de cancelación</h3>
                  <p className="text-muted-foreground mb-2">
                    Cancelación gratuita hasta 48 horas antes del inicio de la actividad. Después de ese tiempo, se
                    aplicará un cargo del 50% del valor de la reserva.
                  </p>
                  <p className="text-muted-foreground">
                    En caso de condiciones climáticas adversas, intentaremos reprogramar la actividad o ofreceremos un
                    reembolso completo.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="includes" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">¿Qué incluye?</h2>
                  <ul className="space-y-2">
                    {experiencia.includes.map((item, index) => (
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
                      <span>Propinas para guías</span>
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
                      <span>Transporte hasta el punto de encuentro (a menos que se especifique)</span>
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
                      <span>Calzado adecuado</span>
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
                      <span>Botella de agua reutilizable</span>
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
                      <span>Cámara (opcional)</span>
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
                      {experiencia.reviewScore}
                    </div>
                    <span className="text-muted-foreground">({experiencia.reviews} reseñas)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <div>
                          <p className="font-medium">Carlos Ramírez</p>
                          <p className="text-xs text-muted-foreground">Visitó en Marzo 2025</p>
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
                      "Una experiencia realmente auténtica y enriquecedora. Los guías eran muy conocedores y apasionados
                      por compartir su cultura. Aprendí mucho y me sentí completamente inmerso en las tradiciones mayas.
                      Altamente recomendable."
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <div>
                          <p className="font-medium">Laura Méndez</p>
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
                      "Superó todas mis expectativas. La organización fue perfecta y la experiencia fue profundamente
                      significativa. Me encantó aprender sobre la cultura maya de una manera tan interactiva y
                      respetuosa."
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <div>
                          <p className="font-medium">Miguel Ángel Torres</p>
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
                      "Muy buena experiencia en general. El contenido fue excelente y los guías muy amables. Lo único
                      que mejoraría sería la duración, se sintió un poco apresurado hacia el final. Aun así, lo
                      recomendaría a cualquier interesado en la cultura maya."
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
                <p className="text-3xl font-bold text-teal-700">${experiencia.price}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">Fecha</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                      className="w-full pl-9 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      <option value="">Seleccionar fecha</option>
                      <option value="2025-06-15">15 de Junio, 2025</option>
                      <option value="2025-06-22">22 de Junio, 2025</option>
                      <option value="2025-06-29">29 de Junio, 2025</option>
                      <option value="2025-07-06">6 de Julio, 2025</option>
                      <option value="2025-07-13">13 de Julio, 2025</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Número de personas</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                      className="w-full pl-9 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      value={participants}
                      onChange={(e) => setParticipants(e.target.value)}
                    >
                      <option value="1">1 persona</option>
                      <option value="2">2 personas</option>
                      <option value="3">3 personas</option>
                      <option value="4">4 personas</option>
                      <option value="5">5 personas</option>
                      <option value="6+">6+ personas</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Idioma</label>
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
                      {experiencia.languages.includes("Maya") && <option>Maya</option>}
                      {experiencia.languages.includes("Francés") && <option>Francés</option>}
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-b py-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span>Precio base</span>
                  <span>${experiencia.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Impuestos y tasas</span>
                  <span>${Math.round(experiencia.price * 0.16)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${experiencia.price + Math.round(experiencia.price * 0.16)}</span>
                </div>
              </div>

              <Link href={`/checkout?experiencia=${experiencia.id}&precio=${experiencia.price}`} className="w-full">
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

