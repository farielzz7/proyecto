"use client"

/**
 * Custom hooks para usar los servicios de API de manera reactiva
 */

import { useState, useEffect, useCallback } from "react"
import {
  destinosService,
  paquetesService,
  reservasService,
  authService,
  turistasService,
  comentariosService,
  dashboardService,
  type Destino,
  type Paquete,
  type Reserva,
  type User,
  type Turista,
  type Comentario,
  ApiError,
} from "@/lib/api"

// Hook genérico para manejar estados de carga
export function useApiState<T>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiCall()
      setData(result)
      return result
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : "Error desconocido"
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return { data, loading, error, execute, reset, setData }
}

// Hook para autenticación
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Verificar si hay un usuario autenticado al cargar
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.login(email, password)
      setUser(response.user)
      return response
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : "Error al iniciar sesión"
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.register(userData)
      setUser(response.user)
      return response
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : "Error al registrarse"
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await authService.logout()
      setUser(null)
    } catch (err) {
      console.error("Error al cerrar sesión:", err)
    } finally {
      setLoading(false)
    }
  }

  const refreshUser = async () => {
    if (!authService.isAuthenticated()) return

    setLoading(true)
    try {
      const userData = await authService.me()
      setUser(userData)
    } catch (err) {
      console.error("Error al actualizar usuario:", err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    refreshUser,
    isAuthenticated: !!user,
  }
}

// Hook para destinos
export function useDestinos(params?: {
  search?: string
  categoria_id?: number
  precio_min?: number
  precio_max?: number
}) {
  const { data, loading, error, execute } = useApiState<{ data: Destino[]; meta: any }>()

  const fetchDestinos = useCallback(() => {
    return execute(() => destinosService.getAll(params))
  }, [execute, params])

  useEffect(() => {
    fetchDestinos()
  }, [fetchDestinos])

  return {
    destinos: data?.data || [],
    meta: data?.meta,
    loading,
    error,
    refetch: fetchDestinos,
  }
}

// Hook para un destino específico
export function useDestino(id: number | null) {
  const { data, loading, error, execute } = useApiState<Destino>()

  const fetchDestino = useCallback(() => {
    if (!id) return Promise.resolve(null)
    return execute(() => destinosService.getById(id))
  }, [execute, id])

  useEffect(() => {
    if (id) {
      fetchDestino()
    }
  }, [fetchDestino, id])

  return {
    destino: data,
    loading,
    error,
    refetch: fetchDestino,
  }
}

// Hook para paquetes
export function usePaquetes(params?: {
  search?: string
  tipo_paquete_id?: number
  precio_min?: number
  precio_max?: number
  duracion_min?: number
  duracion_max?: number
}) {
  const { data, loading, error, execute } = useApiState<{ data: Paquete[]; meta: any }>()

  const fetchPaquetes = useCallback(() => {
    return execute(() => paquetesService.getAll(params))
  }, [execute, params])

  useEffect(() => {
    fetchPaquetes()
  }, [fetchPaquetes])

  return {
    paquetes: data?.data || [],
    meta: data?.meta,
    loading,
    error,
    refetch: fetchPaquetes,
  }
}

// Hook para un paquete específico
export function usePaquete(id: number | null) {
  const { data, loading, error, execute } = useApiState<Paquete>()

  const fetchPaquete = useCallback(() => {
    if (!id) return Promise.resolve(null)
    return execute(() => paquetesService.getById(id))
  }, [execute, id])

  useEffect(() => {
    if (id) {
      fetchPaquete()
    }
  }, [fetchPaquete, id])

  return {
    paquete: data,
    loading,
    error,
    refetch: fetchPaquete,
  }
}

// Hook para reservas
export function useReservas(params?: {
  turista_id?: number
  estado?: string
  fecha_inicio?: string
  fecha_fin?: string
}) {
  const { data, loading, error, execute } = useApiState<{ data: Reserva[]; meta: any }>()

  const fetchReservas = useCallback(() => {
    return execute(() => reservasService.getAll(params))
  }, [execute, params])

  useEffect(() => {
    fetchReservas()
  }, [fetchReservas])

  const createReserva = async (reservaData: {
    turista_id: number
    paquete_id: number
    fecha_inicio: string
    fecha_fin: string
    numero_personas: number
    notas?: string
  }) => {
    const nuevaReserva = await reservasService.create(reservaData)
    // Actualizar la lista local
    if (data) {
      const updatedData = {
        ...data,
        data: [nuevaReserva, ...data.data],
      }
      // Aquí podrías usar setData si lo expusieras desde useApiState
    }
    return nuevaReserva
  }

  return {
    reservas: data?.data || [],
    meta: data?.meta,
    loading,
    error,
    refetch: fetchReservas,
    createReserva,
  }
}

// Hook para comentarios
export function useComentarios(params?: {
  destino_id?: number
  paquete_id?: number
  turista_id?: number
}) {
  const { data, loading, error, execute } = useApiState<{ data: Comentario[]; meta: any }>()

  const fetchComentarios = useCallback(() => {
    return execute(() => comentariosService.getAll(params))
  }, [execute, params])

  useEffect(() => {
    fetchComentarios()
  }, [fetchComentarios])

  const createComentario = async (comentarioData: {
    turista_id: number
    destino_id?: number
    paquete_id?: number
    calificacion: number
    comentario: string
  }) => {
    const nuevoComentario = await comentariosService.create(comentarioData)
    fetchComentarios() // Refrescar la lista
    return nuevoComentario
  }

  return {
    comentarios: data?.data || [],
    meta: data?.meta,
    loading,
    error,
    refetch: fetchComentarios,
    createComentario,
  }
}

// Hook para dashboard
export function useDashboard() {
  const { data, loading, error, execute } = useApiState<{
    total_reservas: number
    total_turistas: number
    total_destinos: number
    total_paquetes: number
    ingresos_mes: number
    reservas_pendientes: number
    reservas_recientes: Reserva[]
    destinos_populares: Destino[]
    comentarios_recientes: Comentario[]
  }>()

  const fetchStats = useCallback(() => {
    return execute(() => dashboardService.getStats())
  }, [execute])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return {
    stats: data,
    loading,
    error,
    refetch: fetchStats,
  }
}

// Hook para búsqueda
export function useSearch() {
  const [results, setResults] = useState<{
    destinos: Destino[]
    paquetes: Paquete[]
    hoteles: any[]
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (params: {
    destino?: string
    fecha_inicio?: string
    fecha_fin?: string
    numero_personas?: number
    presupuesto_min?: number
    presupuesto_max?: number
    tipo_experiencia?: string[]
    duracion?: string
  }) => {
    setLoading(true)
    setError(null)
    try {
      const { buscadorService } = await import("@/lib/api")
      const searchResults = await buscadorService.buscar(params)
      setResults(searchResults)
      return searchResults
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : "Error en la búsqueda"
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearResults = () => {
    setResults(null)
    setError(null)
  }

  return {
    results,
    loading,
    error,
    search,
    clearResults,
  }
}

// Hook para turistas (para administradores)
export function useTuristas(params?: {
  search?: string
}) {
  const { data, loading, error, execute } = useApiState<{ data: Turista[]; meta: any }>()

  const fetchTuristas = useCallback(() => {
    return execute(() => turistasService.getAll(params))
  }, [execute, params])

  useEffect(() => {
    fetchTuristas()
  }, [fetchTuristas])

  return {
    turistas: data?.data || [],
    meta: data?.meta,
    loading,
    error,
    refetch: fetchTuristas,
  }
}
