// Importaciones necesarias para el componente
import Link from "next/link" // Componente para navegación
import { Facebook, Instagram, Twitter } from "lucide-react" // Iconos de redes sociales

/**
 * Componente del pie de página
 * Contiene:
 * - Información de la marca
 * - Enlaces a redes sociales
 * - Enlaces a destinos principales
 * - Enlaces útiles y de navegación
 * - Información de contacto
 */
export function Footer() {
  return (
    <footer className="bg-teal-900 text-white">
      {/* Contenedor principal con diseño responsive */}
      <div className="container mx-auto px-4 py-12">
        {/* Grid de 4 columnas en desktop, 1 columna en móvil */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sección de la marca y redes sociales */}
          <div>
            <h3 className="text-xl font-bold mb-4">GoPlan</h3>
            <p className="text-teal-100 mb-4">Planifica tu viaje perfecto según tu presupuesto y preferencias</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-amber-400 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white hover:text-amber-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white hover:text-amber-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          {/* Sección de enlaces a destinos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Destinos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                  México
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Guatemala
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Belice
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Honduras
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                  El Salvador
                </Link>
              </li>
            </ul>
          </div>
          {/* Sección de enlaces a servicios */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Planificador de Viajes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Comparador de Precios
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Guías de Viaje
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Experiencias Locales
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Asistencia al Viajero
                </Link>
              </li>
            </ul>
          </div>
          {/* Sección de enlaces de soporte */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Sección de copyright */}
        <div className="border-t border-teal-800 mt-8 pt-8 text-center text-teal-100">
          <p>© {new Date().getFullYear()} GoPlan. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

