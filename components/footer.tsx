"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

import { TermsModal } from "@/components/terms-modal"
import { useState } from "react"

export function Footer() {
  const [isTermsOpen, setIsTermsOpen] = useState(false)

  return (
    <footer className="bg-teal-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de la empresa */}
          <div>
            <h3 className="text-lg font-semibold mb-4">GoPlan</h3>
            <p className="text-teal-100 mb-4">
              Tu compañero perfecto para planificar viajes inolvidables. Descubre destinos únicos 
              y crea experiencias que durarán toda la vida.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-teal-100 hover:text-amber-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/destinos" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Destinos
                </Link>
              </li>
              <li>
                <Link href="/experiencias" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Experiencias
                </Link>
              </li>
              <li>
                <Link href="/planificador" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Planificador
                </Link>
              </li>
              <li>
                <Link href="/mapa" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Mapa Interactivo
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-teal-100 hover:text-amber-400 transition-colors">
                  Mi Cuenta
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-teal-100">
                <Mail className="h-4 w-4 mr-2" />
                <Link href="mailto:info@goplan.com" className="hover:text-amber-400 transition-colors">
                  info@goplan.com
                </Link>
              </li>
              <li className="flex items-center text-teal-100">
                <Phone className="h-4 w-4 mr-2" />
                <Link href="tel:+525512345678" className="hover:text-amber-400 transition-colors">
                  +52 55 1234 5678
                </Link>
              </li>
              <li className="flex items-center text-teal-100">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Ciudad de México, México</span>
              </li>
            </ul>
          </div>

          {/* Soporte */}
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
                <button 
                  onClick={() => setIsTermsOpen(true)}
                  className="text-teal-100 hover:text-amber-400 transition-colors text-left"
                >
                  Términos y Condiciones
                </button>
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

      {/* Modal de Términos y Condiciones */}
      <TermsModal open={isTermsOpen} onOpenChange={setIsTermsOpen} />
    </footer>
  )
}

