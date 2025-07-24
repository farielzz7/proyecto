"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("all")
  const [recentSearches] = useState(["Chichén Itzá", "Tulum", "Tikal", "Copán", "Palenque"])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // En una implementación real, esto redireccionaría a la página de resultados
    console.log("Búsqueda:", { searchQuery, searchType })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Buscar</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch} className="space-y-6 pt-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="¿Qué estás buscando?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-[150px]">
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todo</SelectItem>
                  <SelectItem value="destinations">Destinos</SelectItem>
                  <SelectItem value="hotels">Hoteles</SelectItem>
                  <SelectItem value="activities">Actividades</SelectItem>
                  <SelectItem value="restaurants">Restaurantes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="bg-teal-700 hover:bg-teal-800">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {recentSearches.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Búsquedas recientes</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => {
                      setSearchQuery(search)
                    }}
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Destinos populares</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button
                variant="ghost"
                className="justify-start font-normal"
                onClick={() => {
                  setSearchQuery("Chichén Itzá")
                  setSearchType("destinations")
                }}
              >
                Chichén Itzá, México
              </Button>
              <Button
                variant="ghost"
                className="justify-start font-normal"
                onClick={() => {
                  setSearchQuery("Tulum")
                  setSearchType("destinations")
                }}
              >
                Tulum, México
              </Button>
              <Button
                variant="ghost"
                className="justify-start font-normal"
                onClick={() => {
                  setSearchQuery("Tikal")
                  setSearchType("destinations")
                }}
              >
                Tikal, Guatemala
              </Button>
              <Button
                variant="ghost"
                className="justify-start font-normal"
                onClick={() => {
                  setSearchQuery("Copán")
                  setSearchType("destinations")
                }}
              >
                Copán, Honduras
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

