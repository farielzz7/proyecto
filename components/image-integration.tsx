"use client"

// Este componente es un ejemplo de cómo podrías integrar imágenes en tu proyecto
export function ImageIntegration() {
  // Lista de imágenes para diferentes secciones
  const imageMap = {
    // Destinos principales
    "chichén-itzá": "/images/destinos/chichen-itza.jpg",
    tulum: "/images/destinos/tulum.jpg",
    tikal: "/images/destinos/tikal.jpg",

    // Experiencias
    "ceremonia-maya-ancestral": "/images/experiencias/ceremonia-maya.jpg",
    "cenotes-sagrados-tour-de-nado": "/images/experiencias/cenotes-sagrados.jpg",
    "clase-de-cocina-maya-tradicional": "/images/experiencias/cocina-maya.jpg",

    // Imágenes de hero sections
    "hero-home": "/images/hero/home-hero.jpg",
    "hero-experiencias": "/images/hero/experiencias-hero.jpg",
    "hero-destinos": "/images/hero/destinos-hero.jpg",
  }

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">Guía de integración de imágenes</h2>

      <div className="space-y-2">
        <p>Para integrar imágenes en tu proyecto, sigue estos pasos:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Crea una carpeta <code>/public/images/</code> en tu proyecto
          </li>
          <li>Organiza las imágenes en subcarpetas por categoría (destinos, experiencias, etc.)</li>
          <li>Usa el componente Image de Next.js para mostrarlas con optimización automática</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-lg">
          <h3 className="font-medium mb-2">Ejemplo de código:</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
            {`<Image
  src="/images/destinos/chichen-itza.jpg"
  alt="Chichén Itzá"
  width={600}
  height={400}
  className="rounded-lg object-cover"
/>`}
          </pre>
        </div>

        <div className="border p-4 rounded-lg">
          <h3 className="font-medium mb-2">Recomendaciones:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Usa imágenes de al menos 1200px de ancho para buena calidad</li>
            <li>Optimiza las imágenes antes de subirlas (con herramientas como TinyPNG)</li>
            <li>Usa formatos modernos como WebP cuando sea posible</li>
            <li>Mantén una relación de aspecto consistente por categoría</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

