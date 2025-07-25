"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TermsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TermsModal({ open, onOpenChange }: TermsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-teal-900">
            Términos y Condiciones
          </DialogTitle>
          <DialogDescription>
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="text-lg font-semibold text-teal-800 mb-3">
                1. Aceptación de los Términos
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Al acceder y utilizar GoPlan, aceptas estar sujeto a estos términos y condiciones. 
                Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro servicio.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-teal-800 mb-3">
                2. Descripción del Servicio
              </h3>
              <p className="text-gray-700 leading-relaxed">
                GoPlan es una plataforma de planificación de viajes que te permite:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                <li>Explorar destinos turísticos y experiencias</li>
                <li>Planificar itinerarios personalizados</li>
                <li>Reservar servicios turísticos</li>
                <li>Acceder a mapas interactivos</li>
                <li>Gestionar tu perfil de viajero</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-teal-800 mb-3">
                3. Registro y Cuenta de Usuario
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Para utilizar ciertos servicios, debes crear una cuenta proporcionando información 
                precisa y actualizada. Eres responsable de mantener la confidencialidad de tu 
                contraseña y de todas las actividades que ocurran bajo tu cuenta.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-teal-800 mb-3">
                4. Uso Aceptable
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Te comprometes a utilizar GoPlan únicamente para fines legales y de acuerdo con 
                estos términos. No debes:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                <li>Usar el servicio para actividades ilegales</li>
                <li>Intentar acceder a cuentas de otros usuarios</li>
                <li>Interferir con el funcionamiento del servicio</li>
                <li>Transmitir contenido malicioso o spam</li>
                <li>Violar derechos de propiedad intelectual</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-teal-800 mb-3">
                5. Reservas y Pagos
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Las reservas realizadas a través de GoPlan están sujetas a:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                <li>Disponibilidad de los proveedores de servicios</li>
                <li>Políticas de cancelación específicas de cada servicio</li>
                <li>Precios sujetos a cambios sin previo aviso</li>
                <li>Confirmación por parte del proveedor del servicio</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-teal-800 mb-3">
                6. Privacidad y Datos Personales
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Tu privacidad es importante para nosotros. Recopilamos, utilizamos y protegemos 
                tu información personal de acuerdo con nuestra Política de Privacidad, que forma 
                parte de estos términos.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-teal-800 mb-3">
                7. Limitación de Responsabilidad
              </h3>
              <p className="text-gray-700 leading-relaxed">
                GoPlan actúa como intermediario entre usuarios y proveedores de servicios. 
                No somos responsables por la calidad de los servicios proporcionados por terceros, 
                aunque nos esforzamos por trabajar solo con proveedores confiables.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-teal-800 mb-3">
                8. Modificaciones de los Términos
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                Los cambios entrarán en vigor inmediatamente después de su publicación. 
                Te recomendamos revisar periódicamente estos términos.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-teal-800 mb-3">
                9. Contacto
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos a través de:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                <li>Email: legal@goplan.com</li>
                <li>Teléfono: +52 55 1234 5678</li>
                <li>Dirección: Av. Reforma 123, Ciudad de México, México</li>
              </ul>
            </section>
          </div>
        </ScrollArea>

        <div className="flex justify-end pt-4 border-t">
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-teal-700 hover:bg-teal-800"
          >
            Entendido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 