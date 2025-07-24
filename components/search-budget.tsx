"use client"

// Importaciones necesarias para el componente
import type React from "react"

import { useState } from "react" // Hook para manejar el estado
import { Search, Calendar as CalendarIcon } from "lucide-react" // Iconos
import { format } from "date-fns" // Utilidad para formatear fechas
import { es } from "date-fns/locale" // Configuración regional española

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

// Componente principal para la búsqueda por presupuesto
export function SearchBudget() {
  // Estados para manejar los diferentes campos del formulario
  const [budget, setBudget] = useState("") // Presupuesto del viaje
  const [origin, setOrigin] = useState("") // Ciudad de origen
  const [travelers, setTravelers] = useState({ adults: 1, children: 0 }) // Número de viajeros
  const [startDate, setStartDate] = useState<Date>() // Fecha de inicio del viaje
  const [endDate, setEndDate] = useState<Date>() // Fecha de fin del viaje

  // Manejador del evento de búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault() // Previene el comportamiento por defecto del formulario
    console.log("Búsqueda con:", { budget, origin, travelers, startDate, endDate }) // Muestra los datos de búsqueda en consola
  }

  // Función para actualizar el número de viajeros
  const handleTravelerChange = (type: 'adults' | 'children', change: number) => {
    setTravelers(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + change) // Asegura que el número no sea negativo
    }))
  }

  return (
    <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="space-y-2">
          <label htmlFor="budget" className="text-sm font-medium text-gray-700">
            Presupuesto ($)
          </label>
          <Input
            id="budget"
            type="text"
            placeholder="Ej. 1000"
            value={budget === "" ? "" : new Intl.NumberFormat('es-ES').format(Number(budget))}
            onChange={(e) => {
              let inputValue = e.target.value
              inputValue = inputValue.replace(/\./g, '')
              inputValue = inputValue.replace(/,/g, '.')
              if (inputValue === '' || /^-?\d*\.?\d*$/.test(inputValue)) {
                setBudget(inputValue)
              }
            }}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="origin" className="text-sm font-medium text-gray-700">
            ¿De dónde?
          </label>
          <Input
            id="origin"
            type="text"
            placeholder="Ej. Madrid"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="travelers" className="text-sm font-medium text-gray-700">
            Viajeros
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="travelers"
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                {travelers.adults} Adulto(s){travelers.children > 0 ? `, ${travelers.children} Niño(s)` : ''}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-4">
              <div className="flex items-center justify-between mb-2">
                <span>Adultos</span>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleTravelerChange('adults', -1)}
                    disabled={travelers.adults <= 1}
                  >
                    -
                  </Button>
                  <span>{travelers.adults}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleTravelerChange('adults', 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Niños</span>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleTravelerChange('children', -1)}
                    disabled={travelers.children <= 0}
                  >
                    -
                  </Button>
                  <span>{travelers.children}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleTravelerChange('children', 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label htmlFor="dates" className="text-sm font-medium text-gray-700">
            Fechas
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="dates"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? (
                  endDate ? (
                    `${format(startDate, "dd/MM/yyyy", { locale: es })} - ${format(endDate, "dd/MM/yyyy", { locale: es })}`
                  ) : (
                    format(startDate, "dd/MM/yyyy", { locale: es })
                  )
                ) : (
                  <span>Fechas</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={startDate}
                selected={{ from: startDate, to: endDate }}
                onSelect={(range) => {
                  setStartDate(range?.from)
                  setEndDate(range?.to)
                }}
                numberOfMonths={2}
                locale={es}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-end">
          <Button type="submit" className="w-full bg-teal-700 hover:bg-teal-800">
            <Search className="mr-2 h-4 w-4" /> Buscar
          </Button>
        </div>
      </div>
    </form>
  )
}