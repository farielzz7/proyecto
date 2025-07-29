/**
 * API Service para GoPlan
 * Este archivo contiene funciones para interactuar con la API de Laravel
 */

// URL base de la API
const API_BASE_URL = "https://uni-djzy.onrender.com/api/"

// Headers por defecto para las peticiones
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
}

/**
 * Función para realizar peticiones a la API
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} options - Opciones de la petición
 * @returns {Promise<any>} - Respuesta de la API
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  // Agregar token de autenticación si existe
  const token = localStorage.getItem("token")
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  try {
    const response = await fetch(url, {
      headers: DEFAULT_HEADERS,
      ...options,
    })

    // Si la respuesta no es exitosa
    if (!response.ok) {
      // Si es un error 401, cerrar sesión
      if (response.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.href = "/login.html"
      }

      const error = await response.json()
      throw new Error(error.message || "Error en la petición")
    }

    // Si la respuesta es exitosa pero no tiene contenido
    if (response.status === 204) {
      return null
    }

    // Devolver la respuesta como JSON
    return await response.json()
  } catch (error) {
    console.error("Error en la petición:", error)
    throw error
  }
}

/**
 * Función para obtener datos de la API
 * @param {string} endpoint - Endpoint de la API
 * @returns {Promise<any>} - Respuesta de la API
 */
async function get(endpoint) {
  return apiRequest(endpoint, {
    method: "GET",
  })
}

/**
 * Función para enviar datos a la API
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} data - Datos a enviar
 * @returns {Promise<any>} - Respuesta de la API
 */
async function post(endpoint, data) {
  return apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

/**
 * Función para actualizar datos en la API
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<any>} - Respuesta de la API
 */
async function put(endpoint, data) {
  return apiRequest(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

/**
 * Función para eliminar datos de la API
 * @param {string} endpoint - Endpoint de la API
 * @returns {Promise<any>} - Respuesta de la API
 */
async function del(endpoint) {
  return apiRequest(endpoint, {
    method: "DELETE",
  })
}

// Exportar funciones
const api = {
  get,
  post,
  put,
  delete: del,
}
