// Importaciones necesarias para el componente
import Image from "next/image" // Componente optimizado para imágenes
import Link from "next/link" // Componente para navegación
import { MapPin, Star } from "lucide-react" // Iconos

// Componentes de UI
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Interfaz que define las propiedades del componente
interface TravelDestinationCardProps {
  title: string      // Título del destino
  location: string   // Ubicación del destino
  price: number      // Precio del viaje
  image: string      // URL de la imagen del destino
  rating: number     // Calificación del destino
  id?: string        // ID opcional del destino
}

// Componente para mostrar una tarjeta de destino turístico
export function TravelDestinationCard({
  title,
  location,
  price,
  image,
  rating,
  id = "default", // ID por defecto si no se proporciona
}: TravelDestinationCardProps) {
  // Genera un ID basado en el título si no se proporciona uno específico
  // Convierte el título a minúsculas y reemplaza espacios por guiones
  const destinationId = id === "default" ? title.toLowerCase().replace(/\s+/g, "-") : id

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={image.startsWith("http") ? image : image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          unoptimized={image.startsWith("http")}
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-medium flex items-center">
          <Star className="h-4 w-4 text-amber-500 mr-1 fill-amber-500" />
          {rating}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
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
        <Link href={`/destino/${destinationId}`} className="w-full">
          <Button variant="outline" className="w-full border-teal-700 text-teal-700 hover:bg-teal-50">
            Ver detalles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

