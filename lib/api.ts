/**
 * API Service para GoPlan - Conexión con Laravel Backend
 * Actualizado para coincidir con el esquema de base de datos proporcionado
 */

// Configuración de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// ============================================================================
// TIPOS DE DATOS BASADOS EN EL ESQUEMA DE BD
// ============================================================================

export interface User {
  id: number
  email: string
  password?: string
  created_at: string
  updated_at: string
  turista?: Turista
  roles?: Role[]
  sesiones?: Sesion[]
  suscripciones?: Suscripcion[]
}

export interface Sesion {
  id: number
  id_usuario: number
  token: string
  ip: string
  navegador: string
  sistema_operativo: string
  fecha_inicio: string
  fecha_expiracion: string
  usuario?: User
}

export interface Suscripcion {
  id: number
  id_usuario: number
  tipo_suscripcion: string
  fecha_inicio: string
  fecha_fin: string
  estado: string
  created_at: string
  updated_at: string
  usuario?: User
}

export interface Role {
  id: number
  nombre: string
  clave_rol: string
  permisos?: Permiso[]
}

export interface Permiso {
  id: number
  nombre: string
  clave_permiso: string
}

export interface Turista {
  id: number
  nombre: string
  apellido: string
  nacionalidad: string
  edad: number
  telefono: string
  id_usuario: number
  usuario?: User
  comentarios?: Comentario[]
  reservas?: Reserva[]
  pagos?: Pago[]
}

export interface Destino {
  id: number
  nombre: string
  descripcion: string
  eventos: string
  atractivos: string
  created_at: string
  updated_at: string
  categorias?: CategoriaDestino[]
  comentarios?: Comentario[]
  imagenes?: ImagenDestino[]
  hoteles?: Hotel[]
}

export interface CategoriaDestino {
  id: number
  nombre: string
  descripcion: string
}

export interface Comentario {
  id: number
  id_turista: number
  id_destino: number
  texto: string
  calificacion: number
  fecha: string
  turista?: Turista
  destino?: Destino
}

export interface ImagenDestino {
  id: number
  id_destino: number
  url_imagen: string
  es_principal: boolean
  descripcion: string
  destino?: Destino
}

export interface Hotel {
  id: number
  nombre: string
  direccion: string
  telefono: string
  email: string
  id_destino: number
  destino?: Destino
  reservas?: Reserva[]
}

export interface Reserva {
  id: number
  id_turista: number
  id_hotel: number
  fecha_entrada: string
  fecha_salida: string
  numero_personas: number
  estado: string
  created_at: string
  updated_at: string
  turista?: Turista
  hotel?: Hotel
}

export interface TipoPaquete {
  id: number
  nombre: string
  descripcion: string
  paquetes?: Paquete[]
}

export interface Paquete {
  id: number
  id_tipo_paquete: number
  nombre: string
  descripcion: string
  precio: number
  duracion_dias: number
  disponible: boolean
  created_at: string
  updated_at: string
  tipo_paquete?: TipoPaquete
  servicios?: Servicio[]
  pagos?: Pago[]
}

export interface Servicio {
  id: number
  nombre: string
  descripcion: string
  id_categoria_servicio: number
  categoria?: CategoriaServicio
  tipos?: TipoServicio[]
  proveedores?: Proveedor[]
  paquetes?: Paquete[]
}

export interface CategoriaServicio {
  id: number
  nombre: string
  descripcion: string
  servicios?: Servicio[]
}

export interface TipoServicio {
  id: number
  nombre: string
  descripcion: string
}

export interface Proveedor {
  id: number
  nombre: string
  descripcion: string
  contacto: string
  servicios?: Servicio[]
}

export interface MetodoPago {
  id: number
  nombre: string
  descripcion: string
  pagos?: Pago[]
}

export interface Pago {
  id: number
  id_turista: number
  id_paquete: number
  fecha_pago: string
  monto: number
  estado: string
  referencia_pago: string
  id_metodo_pago: number
  turista?: Turista
  paquete?: Paquete
  metodo_pago?: MetodoPago
  factura?: Factura
  transacciones_externas?: TransaccionExterna[]
}

export interface Factura {
  id: number
  id_pago: number
  numero_factura: string
  rfc_cliente: string
  nombre_cliente: string
  direccion_cliente: string
  fecha_emision: string
  subtotal: number
  iva: number
  total: number
  pago?: Pago
}

export interface TransaccionExterna {
  id: number
  id_pago: number
  proveedor: string
  respuesta_raw: string
  pago?: Pago
}

// Clase para manejar errores de API
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

// Función base para realizar peticiones
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  // Obtener token de autenticación
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)

    // Si la respuesta no es exitosa
    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch {
        errorData = { message: "Error desconocido" }
      }

      // Si es error 401, limpiar token y redirigir
      if (response.status === 401 && typeof window !== "undefined") {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
        window.location.href = "/"
      }

      throw new ApiError(errorData.message || `Error ${response.status}`, response.status, errorData)
    }

    // Si la respuesta es 204 (No Content)
    if (response.status === 204) {
      return null as T
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError("Error de conexión", 0, error)
  }
}

// ============================================================================
// SERVICIOS DE AUTENTICACIÓN
// ============================================================================

export const authService = {
  async login(email: string, password: string): Promise<{ user: User; token: string; turista?: Turista }> {
    const response = await apiRequest<{ user: User; token: string; turista?: Turista }>("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    // Guardar token y datos del usuario
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", response.token)
      localStorage.setItem("user_data", JSON.stringify(response.user))
      if (response.turista) {
        localStorage.setItem("turista_data", JSON.stringify(response.turista))
      }
    }

    return response
  },

  async register(userData: {
    // Datos del usuario
    email: string
    password: string
    password_confirmation: string
    // Datos del turista
    nombre: string
    apellido: string
    nacionalidad: string
    edad: number
    telefono: string
  }): Promise<{ user: User; token: string; turista: Turista }> {
    const response = await apiRequest<{ user: User; token: string; turista: Turista }>("/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })

    // Guardar token y datos del usuario y turista
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", response.token)
      localStorage.setItem("user_data", JSON.stringify(response.user))
      localStorage.setItem("turista_data", JSON.stringify(response.turista))
    }

    return response
  },

  async logout(): Promise<void> {
    try {
      await apiRequest("/logout", { method: "POST" })
    } finally {
      // Limpiar datos locales independientemente del resultado
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
        localStorage.removeItem("turista_data")
      }
    }
  },

  async me(): Promise<{ user: User; turista?: Turista }> {
    return apiRequest<{ user: User; turista?: Turista }>("/me")
  },

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const userData = localStorage.getItem("user_data")
    return userData ? JSON.parse(userData) : null
  },

  getCurrentTurista(): Turista | null {
    if (typeof window === "undefined") return null
    const turistaData = localStorage.getItem("turista_data")
    return turistaData ? JSON.parse(turistaData) : null
  },

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false
    return localStorage.getItem("auth_token") !== null
  },
}

// ============================================================================
// SERVICIOS DE DESTINOS
// ============================================================================

export const destinosService = {
  async getAll(params?: {
    page?: number
    per_page?: number
    search?: string
    categoria_id?: number
  }): Promise<{ data: Destino[]; meta: any }> {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return apiRequest<{ data: Destino[]; meta: any }>(`/destinos${query ? `?${query}` : ""}`)
  },

  async getById(id: number): Promise<Destino> {
    return apiRequest<Destino>(`/destinos/${id}`)
  },

  async create(destino: {
    nombre: string
    descripcion: string
    eventos: string
    atractivos: string
  }): Promise<Destino> {
    return apiRequest<Destino>("/destinos", {
      method: "POST",
      body: JSON.stringify(destino),
    })
  },

  async update(id: number, destino: Partial<Destino>): Promise<Destino> {
    return apiRequest<Destino>(`/destinos/${id}`, {
      method: "PUT",
      body: JSON.stringify(destino),
    })
  },

  async delete(id: number): Promise<void> {
    return apiRequest<void>(`/destinos/${id}`, { method: "DELETE" })
  },

  // Obtener categorías de destinos
  async getCategorias(): Promise<CategoriaDestino[]> {
    return apiRequest<CategoriaDestino[]>("/categorias-destino")
  },

  // Obtener imágenes de un destino
  async getImagenes(destinoId: number): Promise<ImagenDestino[]> {
    return apiRequest<ImagenDestino[]>(`/imagenes-destino?destino_id=${destinoId}`)
  },
}

// ============================================================================
// SERVICIOS DE PAQUETES
// ============================================================================

export const paquetesService = {
  async getAll(params?: {
    page?: number
    per_page?: number
    search?: string
    tipo_paquete_id?: number
    precio_min?: number
    precio_max?: number
    disponible?: boolean
  }): Promise<{ data: Paquete[]; meta: any }> {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return apiRequest<{ data: Paquete[]; meta: any }>(`/paquetes${query ? `?${query}` : ""}`)
  },

  async getById(id: number): Promise<Paquete> {
    return apiRequest<Paquete>(`/paquetes/${id}`)
  },

  async create(paquete: {
    id_tipo_paquete: number
    nombre: string
    descripcion: string
    precio: number
    duracion_dias: number
    disponible: boolean
  }): Promise<Paquete> {
    return apiRequest<Paquete>("/paquetes", {
      method: "POST",
      body: JSON.stringify(paquete),
    })
  },

  async update(id: number, paquete: Partial<Paquete>): Promise<Paquete> {
    return apiRequest<Paquete>(`/paquetes/${id}`, {
      method: "PUT",
      body: JSON.stringify(paquete),
    })
  },

  async delete(id: number): Promise<void> {
    return apiRequest<void>(`/paquetes/${id}`, { method: "DELETE" })
  },

  // Obtener tipos de paquetes
  async getTipos(): Promise<TipoPaquete[]> {
    return apiRequest<TipoPaquete[]>("/tipos-paquete")
  },
}

// ============================================================================
// SERVICIOS DE TURISTAS
// ============================================================================

export const turistasService = {
  async getAll(params?: {
    page?: number
    per_page?: number
    search?: string
  }): Promise<{ data: Turista[]; meta: any }> {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return apiRequest<{ data: Turista[]; meta: any }>(`/turistas${query ? `?${query}` : ""}`)
  },

  async getById(id: number): Promise<Turista> {
    return apiRequest<Turista>(`/turistas/${id}`)
  },

  async create(turista: {
    nombre: string
    apellido: string
    nacionalidad: string
    edad: number
    telefono: string
    id_usuario: number
  }): Promise<Turista> {
    return apiRequest<Turista>("/turistas", {
      method: "POST",
      body: JSON.stringify(turista),
    })
  },

  async update(id: number, turista: Partial<Turista>): Promise<Turista> {
    return apiRequest<Turista>(`/turistas/${id}`, {
      method: "PUT",
      body: JSON.stringify(turista),
    })
  },

  async delete(id: number): Promise<void> {
    return apiRequest<void>(`/turistas/${id}`, { method: "DELETE" })
  },
}

// ============================================================================
// SERVICIOS DE RESERVAS
// ============================================================================

export const reservasService = {
  async getAll(params?: {
    page?: number
    per_page?: number
    id_turista?: number
    estado?: string
    fecha_entrada?: string
    fecha_salida?: string
  }): Promise<{ data: Reserva[]; meta: any }> {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return apiRequest<{ data: Reserva[]; meta: any }>(`/reservas${query ? `?${query}` : ""}`)
  },

  async getById(id: number): Promise<Reserva> {
    return apiRequest<Reserva>(`/reservas/${id}`)
  },

  async create(reserva: {
    id_turista: number
    id_hotel: number
    fecha_entrada: string
    fecha_salida: string
    numero_personas: number
    estado: string
  }): Promise<Reserva> {
    return apiRequest<Reserva>("/reservas", {
      method: "POST",
      body: JSON.stringify(reserva),
    })
  },

  async update(id: number, reserva: Partial<Reserva>): Promise<Reserva> {
    return apiRequest<Reserva>(`/reservas/${id}`, {
      method: "PUT",
      body: JSON.stringify(reserva),
    })
  },

  async cancel(id: number): Promise<Reserva> {
    return apiRequest<Reserva>(`/reservas/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ estado: "cancelada" }),
    })
  },

  async delete(id: number): Promise<void> {
    return apiRequest<void>(`/reservas/${id}`, { method: "DELETE" })
  },
}

// ============================================================================
// SERVICIOS DE HOTELES
// ============================================================================

export const hotelesService = {
  async getAll(params?: {
    page?: number
    per_page?: number
    search?: string
    id_destino?: number
  }): Promise<{ data: Hotel[]; meta: any }> {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return apiRequest<{ data: Hotel[]; meta: any }>(`/hoteles${query ? `?${query}` : ""}`)
  },

  async getById(id: number): Promise<Hotel> {
    return apiRequest<Hotel>(`/hoteles/${id}`)
  },

  async create(hotel: {
    nombre: string
    direccion: string
    telefono: string
    email: string
    id_destino: number
  }): Promise<Hotel> {
    return apiRequest<Hotel>("/hoteles", {
      method: "POST",
      body: JSON.stringify(hotel),
    })
  },

  async update(id: number, hotel: Partial<Hotel>): Promise<Hotel> {
    return apiRequest<Hotel>(`/hoteles/${id}`, {
      method: "PUT",
      body: JSON.stringify(hotel),
    })
  },

  async delete(id: number): Promise<void> {
    return apiRequest<void>(`/hoteles/${id}`, { method: "DELETE" })
  },
}

// ============================================================================
// SERVICIOS DE PAGOS
// ============================================================================

export const pagosService = {
  async getAll(params?: {
    page?: number
    per_page?: number
    id_turista?: number
    estado?: string
  }): Promise<{ data: Pago[]; meta: any }> {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return apiRequest<{ data: Pago[]; meta: any }>(`/pagos${query ? `?${query}` : ""}`)
  },

  async getById(id: number): Promise<Pago> {
    return apiRequest<Pago>(`/pagos/${id}`)
  },

  async create(pago: {
    id_turista: number
    id_paquete: number
    monto: number
    id_metodo_pago: number
    referencia_pago?: string
  }): Promise<Pago> {
    return apiRequest<Pago>("/pagos", {
      method: "POST",
      body: JSON.stringify(pago),
    })
  },

  // Métodos específicos para diferentes pasarelas de pago
  async createStripePaymentIntent(data: {
    amount: number
    currency: string
    id_pago: number
  }): Promise<{ client_secret: string }> {
    return apiRequest<{ client_secret: string }>("/pagos/stripe/payment-intent", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  async createMercadoPagoPreference(data: {
    items: Array<{
      title: string
      quantity: number
      unit_price: number
    }>
    id_pago: number
  }): Promise<{ preference_id: string; init_point: string }> {
    return apiRequest<{ preference_id: string; init_point: string }>("/pagos/mercadopago/preference", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  async createPayPalOrder(data: {
    amount: number
    currency: string
    id_pago: number
  }): Promise<{ order_id: string; approval_url: string }> {
    return apiRequest<{ order_id: string; approval_url: string }>("/pagos/paypal/order", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  async capturePayPalOrder(orderId: string): Promise<{ status: string; payment_id: string }> {
    return apiRequest<{ status: string; payment_id: string }>(`/pagos/paypal/order/${orderId}/capture`, {
      method: "POST",
    })
  },

  // Obtener métodos de pago disponibles
  async getMetodosPago(): Promise<MetodoPago[]> {
    return apiRequest<MetodoPago[]>("/metodos-pago")
  },
}

// ============================================================================
// SERVICIOS DE COMENTARIOS
// ============================================================================

export const comentariosService = {
  async getAll(params?: {
    page?: number
    per_page?: number
    id_destino?: number
    id_turista?: number
  }): Promise<{ data: Comentario[]; meta: any }> {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return apiRequest<{ data: Comentario[]; meta: any }>(`/comentarios${query ? `?${query}` : ""}`)
  },

  async create(comentario: {
    id_turista: number
    id_destino: number
    texto: string
    calificacion: number
  }): Promise<Comentario> {
    return apiRequest<Comentario>("/comentarios", {
      method: "POST",
      body: JSON.stringify(comentario),
    })
  },

  async update(id: number, comentario: Partial<Comentario>): Promise<Comentario> {
    return apiRequest<Comentario>(`/comentarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(comentario),
    })
  },

  async delete(id: number): Promise<void> {
    return apiRequest<void>(`/comentarios/${id}`, { method: "DELETE" })
  },
}

// ============================================================================
// SERVICIOS DE BÚSQUEDA
// ============================================================================

export const buscadorService = {
  async buscar(params: {
    destino?: string
    fecha_entrada?: string
    fecha_salida?: string
    numero_personas?: number
    precio_min?: number
    precio_max?: number
    tipo_paquete_id?: number
  }): Promise<{
    destinos: Destino[]
    paquetes: Paquete[]
    hoteles: Hotel[]
  }> {
    return apiRequest<{
      destinos: Destino[]
      paquetes: Paquete[]
      hoteles: Hotel[]
    }>("/buscador/buscar", {
      method: "POST",
      body: JSON.stringify(params),
    })
  },

  async personalizar(params: {
    id_turista: number
    preferencias: string[]
    presupuesto: number
    duracion_dias: number
    tipo_viaje: string
  }): Promise<{
    paquetes_recomendados: Paquete[]
    destinos_sugeridos: Destino[]
    hoteles_recomendados: Hotel[]
  }> {
    return apiRequest<{
      paquetes_recomendados: Paquete[]
      destinos_sugeridos: Destino[]
      hoteles_recomendados: Hotel[]
    }>("/buscador/personalizar", {
      method: "POST",
      body: JSON.stringify(params),
    })
  },
}

// ============================================================================
// SERVICIOS DE DASHBOARD
// ============================================================================

export const dashboardService = {
  async getStats(): Promise<{
    total_reservas: number
    total_turistas: number
    total_destinos: number
    total_paquetes: number
    ingresos_mes: number
    reservas_pendientes: number
    reservas_recientes: Reserva[]
    destinos_populares: Destino[]
    comentarios_recientes: Comentario[]
  }> {
    return apiRequest<{
      total_reservas: number
      total_turistas: number
      total_destinos: number
      total_paquetes: number
      ingresos_mes: number
      reservas_pendientes: number
      reservas_recientes: Reserva[]
      destinos_populares: Destino[]
      comentarios_recientes: Comentario[]
    }>("/dashboard")
  },
}

// ============================================================================
// SERVICIOS DE CONTACTO
// ============================================================================

export const contactoService = {
  async sendMessage(data: {
    nombre: string
    email: string
    telefono?: string
    asunto: string
    mensaje: string
  }): Promise<{ success: boolean; message: string }> {
    return apiRequest<{ success: boolean; message: string }>("/contacto/send-message", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}

// ============================================================================
// SERVICIOS DE APIS EXTERNAS
// ============================================================================

export const apiExternasService = {
  async buscarVuelos(params: {
    origen: string
    destino: string
    fecha_ida: string
    fecha_vuelta?: string
    pasajeros: number
  }): Promise<any[]> {
    return apiRequest<any[]>("/api/vuelos", {
      method: "POST",
      body: JSON.stringify(params),
    })
  },

  async buscarHoteles(params: {
    destino: string
    fecha_entrada: string
    fecha_salida: string
    huespedes: number
    habitaciones: number
  }): Promise<any[]> {
    return apiRequest<any[]>("/api/hoteles", {
      method: "POST",
      body: JSON.stringify(params),
    })
  },

  async buscarActividades(params: {
    destino: string
    fecha: string
    tipo?: string
  }): Promise<any[]> {
    return apiRequest<any[]>("/api/actividades", {
      method: "POST",
      body: JSON.stringify(params),
    })
  },

  async obtenerClima(params: {
    ciudad: string
    pais: string
  }): Promise<{
    temperatura: number
    descripcion: string
    humedad: number
    viento: number
    pronostico: any[]
  }> {
    const searchParams = new URLSearchParams(params)
    return apiRequest<{
      temperatura: number
      descripcion: string
      humedad: number
      viento: number
      pronostico: any[]
    }>(`/api/clima?${searchParams.toString()}`)
  },

  async crearPaquetePersonalizado(params: {
    destino: string
    fecha_inicio: string
    fecha_fin: string
    presupuesto: number
    preferencias: string[]
    numero_personas: number
  }): Promise<{
    paquete: any
    vuelos: any[]
    hoteles: any[]
    actividades: any[]
    precio_total: number
  }> {
    return apiRequest<{
      paquete: any
      vuelos: any[]
      hoteles: any[]
      actividades: any[]
      precio_total: number
    }>("/api/paquete-personalizado", {
      method: "POST",
      body: JSON.stringify(params),
    })
  },

  async obtenerTipoCambio(params: {
    from: string
    to: string
  }): Promise<{
    rate: number
    date: string
  }> {
    const searchParams = new URLSearchParams(params)
    return apiRequest<{
      rate: number
      date: string
    }>(`/api/tipo-cambio?${searchParams.toString()}`)
  },
}

// Exportar todo como default también para compatibilidad
export default {
  authService,
  destinosService,
  paquetesService,
  turistasService,
  reservasService,
  hotelesService,
  pagosService,
  buscadorService,
  comentariosService,
  dashboardService,
  contactoService,
  apiExternasService,
}
