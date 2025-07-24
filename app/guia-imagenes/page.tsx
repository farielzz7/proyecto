import { ImageIntegration } from "@/components/image-integration"

export default function GuiaImagenesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-teal-900 mb-6">Guía de Imágenes para GoPlan</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Esta guía te ayudará a integrar imágenes en tu proyecto GoPlan de manera efectiva.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-teal-800">Estructura de carpetas</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`public/
└── images/
    ├── destinos/
    │   ├── chichen-itza.jpg
    │   ├── tulum.jpg
    │   └── tikal.jpg
    ├── experiencias/
    │   ├── ceremonia-maya.jpg
    │   └── cenotes-sagrados.jpg
    └── hero/
        ├── home-hero.jpg
        └── destinos-hero.jpg`}
          </pre>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-teal-800">Tamaños recomendados</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                •
              </span>
              <div>
                <p className="font-medium">Hero sections</p>
                <p className="text-sm text-muted-foreground">1920×1080px o mayor</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                •
              </span>
              <div>
                <p className="font-medium">Tarjetas de destino</p>
                <p className="text-sm text-muted-foreground">600×400px (3:2)</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                •
              </span>
              <div>
                <p className="font-medium">Páginas de detalle</p>
                <p className="text-sm text-muted-foreground">1200×800px (3:2)</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-teal-800">Fuentes de imágenes</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-amber-100 text-amber-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                •
              </span>
              <div>
                <p className="font-medium">Unsplash</p>
                <p className="text-sm text-muted-foreground">Fotos gratuitas de alta calidad</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-amber-100 text-amber-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                •
              </span>
              <div>
                <p className="font-medium">Pexels</p>
                <p className="text-sm text-muted-foreground">Excelentes imágenes de viajes</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-amber-100 text-amber-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                •
              </span>
              <div>
                <p className="font-medium">DALL-E / Midjourney</p>
                <p className="text-sm text-muted-foreground">Para imágenes personalizadas</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <ImageIntegration />
    </div>
  )
}

