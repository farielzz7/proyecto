/**
 * Destinos Service para GoPlan
 * Este archivo contiene funciones para manejar los destinos
 */

// Datos simulados para destinos
const destinosData = {
  "chichén-itzá": {
    id: "chichén-itzá",
    title: "Chichén Itzá",
    location: "Yucatán, México",
    price: 1200,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2067&auto=format&fit=crop",
    description:
      "Chichén Itzá es uno de los sitios arqueológicos más importantes y reconocidos de la civilización maya. Declarado Patrimonio de la Humanidad por la UNESCO y una de las Nuevas Siete Maravillas del Mundo, este impresionante complejo arqueológico fue uno de los centros políticos y religiosos más importantes de la cultura maya.",
    highlights: [
      "Visita guiada al Templo de Kukulcán (El Castillo)",
      "Recorrido por el Observatorio Astronómico",
      "Exploración del Juego de Pelota más grande de Mesoamérica",
      "Visita al Cenote Sagrado y el Templo de los Guerreros",
      "Experiencia de luz y sonido al atardecer",
    ],
    includes: [
      "Transporte de ida y vuelta desde hoteles seleccionados",
      "Guía certificado bilingüe (español e inglés)",
      "Entrada al sitio arqueológico",
      "Almuerzo buffet de comida regional",
      "Tiempo libre para explorar por cuenta propia",
      "Seguro de viaje",
    ],
    duration: "10 horas",
    groupSize: "Máximo 15 personas",
    startTime: "8:00 AM",
    languages: ["Español", "Inglés"],
    reviews: 128,
    reviewScore: 4.8,
    category: "cultural",
  },
  tulum: {
    id: "tulum",
    title: "Tulum",
    location: "Quintana Roo, México",
    price: 950,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1504730030853-eff311f57d3c?q=80&w=2070&auto=format&fit=crop",
    description:
      "Tulum es un sitio arqueológico maya ubicado en la costa del Mar Caribe, en la Riviera Maya. Es uno de los destinos más fotogénicos de México, donde las ruinas mayas se alzan sobre acantilados frente al mar turquesa. Tulum fue una de las últimas ciudades construidas y habitadas por los mayas y funcionó como un importante centro comercial.",
    highlights: [
      "Visita guiada a las ruinas mayas frente al mar",
      "Tiempo para nadar en la playa paradisíaca bajo el sitio arqueológico",
      "Exploración del Templo de los Frescos y El Castillo",
      "Visita a cenotes cercanos para nadar en aguas cristalinas",
      "Tiempo libre en la zona hotelera de Tulum",
    ],
    includes: [
      "Transporte de ida y vuelta desde hoteles seleccionados",
      "Guía certificado bilingüe (español e inglés)",
      "Entrada al sitio arqueológico",
      "Visita a un cenote con tiempo para nadar",
      "Almuerzo ligero",
      "Seguro de viaje",
    ],
    duration: "8 horas",
    groupSize: "Máximo 12 personas",
    startTime: "9:00 AM",
    languages: ["Español", "Inglés", "Francés"],
    reviews: 96,
    reviewScore: 4.6,
    category: "beach",
  },
  tikal: {
    id: "tikal",
    title: "Tikal",
    location: "Petén, Guatemala",
    price: 1050,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1605217613423-0aea4fb9c518?q=80&w=2070&auto=format&fit=crop",
    description:
      "Tikal es uno de los mayores sitios arqueológicos de la civilización maya precolombina, ubicado en la región de Petén en Guatemala. Este impresionante complejo, declarado Patrimonio de la Humanidad por la UNESCO, se encuentra en medio de la selva tropical y alberga miles de estructuras antiguas, desde pequeñas plataformas hasta enormes templos y palacios.",
    highlights: [
      "Recorrido por la Gran Plaza y sus templos gemelos",
      "Visita al Templo IV, el más alto de Tikal (64 metros)",
      "Observación de fauna local en la selva del Parque Nacional",
      "Exploración de la Acrópolis Central y Norte",
      "Experiencia de amanecer o atardecer desde los templos (opcional)",
    ],
    includes: [
      "Transporte desde Flores o Ciudad de Guatemala",
      "Guía especializado en arqueología maya",
      "Entrada al Parque Nacional Tikal",
      "Almuerzo tipo picnic en la selva",
      "Tiempo para explorar por cuenta propia",
      "Seguro de viaje",
    ],
    duration: "1 día completo",
    groupSize: "Máximo 10 personas",
    startTime: "4:30 AM (amanecer) o 9:00 AM (regular)",
    languages: ["Español", "Inglés"],
    reviews: 84,
    reviewScore: 4.7,
    category: "nature",
  },
  copán: {
    id: "copán",
    title: "Copán",
    location: "Copán, Honduras",
    price: 850,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop",
    description:
      "Copán es un importante sitio arqueológico maya ubicado en el oeste de Honduras. Conocido por sus impresionantes estelas esculpidas y su escalinata jeroglífica, Copán fue un poderoso reino maya durante el período Clásico y es famoso por su arte distintivo.",
    highlights: [
      "Visita a la Gran Plaza y sus estelas esculpidas",
      "Recorrido por la Escalinata Jeroglífica, el 'texto maya' más largo conocido",
      "Exploración del Acrópolis y sus templos",
      "Visita al Museo de Escultura Maya",
      "Observación de guacamayas en el parque de aves",
    ],
    includes: [
      "Transporte desde San Pedro Sula o Guatemala",
      "Guía especializado en arqueología maya",
      "Entrada al Parque Arqueológico",
      "Visita al Museo de Escultura",
      "Almuerzo típico hondureño",
      "Seguro de viaje",
    ],
    duration: "8 horas",
    groupSize: "Máximo 12 personas",
    startTime: "8:00 AM",
    languages: ["Español", "Inglés"],
    reviews: 72,
    reviewScore: 4.5,
    category: "cultural",
  },
  palenque: {
    id: "palenque",
    title: "Palenque",
    location: "Chiapas, México",
    price: 780,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1533193773788-92826ee86674?q=80&w=2071&auto=format&fit=crop",
    description:
      "Palenque es un sitio arqueológico maya ubicado en el estado de Chiapas, México. Rodeado de exuberante selva tropical, este sitio es famoso por su arquitectura refinada y las numerosas inscripciones que han ayudado a los arqueólogos a entender la historia y mitología maya.",
    highlights: [
      "Visita al Templo de las Inscripciones y la tumba del rey Pakal",
      "Recorrido por el Palacio y su distintiva torre",
      "Exploración del Grupo de las Cruces",
      "Caminata por senderos en la selva tropical",
      "Visita a cascadas cercanas (opcional)",
    ],
    includes: [
      "Transporte desde San Cristóbal o Villahermosa",
      "Guía especializado en cultura maya",
      "Entrada al sitio arqueológico",
      "Almuerzo típico chiapaneco",
      "Tiempo libre para explorar",
      "Seguro de viaje",
    ],
    duration: "10 horas",
    groupSize: "Máximo 15 personas",
    startTime: "7:00 AM",
    languages: ["Español", "Inglés"],
    reviews: 68,
    reviewScore: 4.4,
    category: "nature",
  },
  default: {
    id: "default",
    title: "Destino Maya",
    location: "Mundo Maya",
    price: 1000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1562095241-8c6714fd4178?q=80&w=2076&auto=format&fit=crop",
    description:
      "Este destino maya ofrece una experiencia única para conocer la rica historia y cultura de esta fascinante civilización. Explora ruinas arqueológicas, aprende sobre tradiciones ancestrales y disfruta de la belleza natural de la región.",
    highlights: [
      "Visita guiada a sitios arqueológicos importantes",
      "Experiencias culturales auténticas",
      "Gastronomía local y tradicional",
      "Contacto con comunidades mayas actuales",
      "Actividades en entornos naturales únicos",
    ],
    includes: [
      "Transporte durante todo el recorrido",
      "Guía especializado bilingüe",
      "Entradas a sitios arqueológicos",
      "Comidas especificadas en el itinerario",
      "Actividades culturales",
      "Seguro de viaje",
    ],
    duration: "Variable",
    groupSize: "Grupos reducidos",
    startTime: "A confirmar",
    languages: ["Español", "Inglés"],
    reviews: 75,
    reviewScore: 4.5,
    category: "cultural",
  },
}

/**
 * Función para obtener todos los destinos
 * @returns {Promise<Array>} - Lista de destinos
 */
async function getDestinos() {
  try {
    // En una implementación real, esto haría una petición a la API
    // const response = await api.get('/destinos');
    // return response.data;

    // Simulación de respuesta
    return Object.values(destinosData)
  } catch (error) {
    console.error("Error al obtener destinos:", error)
    throw error
  }
}

/**
 * Función para obtener un destino por su ID
 * @param {string} id - ID del destino
 * @returns {Promise<Object>} - Datos del destino
 */
async function getDestinoById(id) {
  try {
    // En una implementación real, esto haría una petición a la API
    // const response = await api.get(`/destinos/${id}`);
    // return response.data;

    // Simulación de respuesta
    return destinosData[id] || destinosData.default
  } catch (error) {
    console.error(`Error al obtener destino con ID ${id}:`, error)
    throw error
  }
}

/**
 * Función para cargar destinos recomendados en la página principal
 */
function loadRecommendedDestinations() {
  const container = document.getElementById("destinos-recomendados")
  if (!container) return

  // Obtener destinos recomendados (en este caso, los 3 primeros)
  const recomendados = [destinosData["chichén-itzá"], destinosData["tulum"], destinosData["tikal"]]

  // Limpiar contenedor
  container.innerHTML = ""

  // Agregar destinos al contenedor
  recomendados.forEach((destino) => {
    container.appendChild(createDestinoCard(destino))
  })
}

/**
 * Función para cargar todos los destinos en la página de destinos
 */
function loadAllDestinations() {
  const container = document.getElementById("destinos-grid")
  if (!container) return

  // Obtener todos los destinos
  const destinos = Object.values(destinosData)

  // Limpiar contenedor
  container.innerHTML = ""

  // Agregar destinos al contenedor
  destinos.forEach((destino) => {
    container.appendChild(createDestinoCard(destino))
  })
}

/**
 * Función para cargar destinos populares
 */
function loadPopularDestinations() {
  const container = document.getElementById("destinos-populares")
  if (!container) return

  // Si ya se cargaron los destinos, no hacer nada
  if (container.children.length > 0) return

  // Obtener destinos populares (en este caso, los que tienen rating > 4.6)
  const populares = Object.values(destinosData).filter((destino) => destino.rating > 4.6)

  // Limpiar contenedor
  container.innerHTML = ""

  // Agregar destinos al contenedor
  populares.forEach((destino) => {
    container.appendChild(createDestinoCard(destino))
  })
}

/**
 * Función para cargar destinos culturales
 */
function loadCulturalDestinations() {
  const container = document.getElementById("destinos-culturales")
  if (!container) return

  // Si ya se cargaron los destinos, no hacer nada
  if (container.children.length > 0) return

  // Obtener destinos culturales
  const culturales = Object.values(destinosData).filter((destino) => destino.category === "cultural")

  // Limpiar contenedor
  container.innerHTML = ""

  // Agregar destinos al contenedor
  culturales.forEach((destino) => {
    container.appendChild(createDestinoCard(destino))
  })
}

/**
 * Función para filtrar destinos según criterios
 * @param {string} region - Región del destino
 * @param {string} budget - Rango de presupuesto
 * @param {string} duration - Duración del viaje
 * @param {Array} tripTypes - Tipos de viaje
 */
function filterDestinations(region, budget, duration, tripTypes) {
  const container = document.getElementById("destinos-grid")
  if (!container) return

  // Obtener todos los destinos
  let destinos = Object.values(destinosData)

  // Filtrar por región
  if (region !== "all") {
    destinos = destinos.filter((destino) => {
      return destino.location.toLowerCase().includes(region.toLowerCase())
    })
  }

  // Filtrar por presupuesto
  if (budget !== "all") {
    destinos = destinos.filter((destino) => {
      if (budget === "economic") return destino.price < 500
      if (budget === "mid") return destino.price >= 500 && destino.price <= 1000
      if (budget === "premium") return destino.price > 1000 && destino.price <= 2000
      if (budget === "luxury") return destino.price > 2000
      return true
    })
  }

  // Filtrar por duración
  if (duration !== "all") {
    destinos = destinos.filter((destino) => {
      // Simplificación: solo verificamos si la duración contiene ciertas palabras clave
      if (duration === "weekend") return destino.duration.includes("hora") || destino.duration.includes("3 día")
      if (duration === "short") return destino.duration.includes("día") && !destino.duration.includes("completo")
      if (duration === "medium") return destino.duration.includes("completo")
      if (duration === "long") return destino.duration.includes("Variable")
      return true
    })
  }

  // Filtrar por tipo de viaje
  if (tripTypes.length > 0) {
    destinos = destinos.filter((destino) => {
      return tripTypes.includes(destino.category)
    })
  }

  // Limpiar contenedor
  container.innerHTML = ""

  // Agregar destinos filtrados al contenedor
  if (destinos.length === 0) {
    container.innerHTML =
      '<p class="col-span-3 text-center py-8 text-gray-500">No se encontraron destinos que coincidan con los filtros seleccionados.</p>'
  } else {
    destinos.forEach((destino) => {
      container.appendChild(createDestinoCard(destino))
    })
  }
}

/**
 * Función para buscar destinos por término de búsqueda
 * @param {string} searchTerm - Término de búsqueda
 */
function searchDestinations(searchTerm) {
  const container = document.getElementById("destinos-grid")
  if (!container) return

  // Si el término de búsqueda está vacío, mostrar todos los destinos
  if (!searchTerm) {
    loadAllDestinations()
    return
  }

  // Obtener destinos que coincidan con el término de búsqueda
  const destinos = Object.values(destinosData).filter((destino) => {
    return (
      destino.title.toLowerCase().includes(searchTerm) ||
      destino.location.toLowerCase().includes(searchTerm) ||
      destino.description.toLowerCase().includes(searchTerm)
    )
  })

  // Limpiar contenedor
  container.innerHTML = ""

  // Agregar destinos filtrados al contenedor
  if (destinos.length === 0) {
    container.innerHTML =
      '<p class="col-span-3 text-center py-8 text-gray-500">No se encontraron destinos que coincidan con tu búsqueda.</p>'
  } else {
    destinos.forEach((destino) => {
      container.appendChild(createDestinoCard(destino))
    })
  }
}

/**
 * Función para cargar los detalles de un destino en la página de detalle
 * @param {string} id - ID del destino
 */
function loadDestinoDetails(id) {
  // Obtener el destino
  const destino = destinosData[id] || destinosData.default

  // Actualizar elementos de la página
  document.getElementById("destino-titulo").textContent = destino.title
  document.getElementById("destino-ubicacion").textContent = destino.location
  document.getElementById("destino-rating").textContent = destino.rating
  document.getElementById("destino-reviews").textContent = `(${destino.reviews} reseñas)`
  document.getElementById("destino-imagen").src = destino.image
  document.getElementById("destino-imagen").alt = destino.title
  document.getElementById("destino-descripcion").textContent = destino.description
  document.getElementById("destino-duracion").textContent = destino.duration
  document.getElementById("destino-grupo").textContent = destino.groupSize
  document.getElementById("destino-inicio").textContent = destino.startTime
  document.getElementById("destino-idiomas").textContent = destino.languages.join(", ")
  document.getElementById("destino-precio").textContent = `$${destino.price}`
  document.getElementById("destino-review-score").textContent = destino.reviewScore
  document.getElementById("destino-review-count").textContent = `(${destino.reviews} reseñas)`

  // Actualizar precios
  document.getElementById("precio-base").textContent = `$${destino.price * 2}` // Por defecto 2 personas
  document.getElementById("precio-impuestos").textContent = `$${Math.round(destino.price * 2 * 0.16)}`
  document.getElementById("precio-total").textContent = `$${destino.price * 2 + Math.round(destino.price * 2 * 0.16)}`

  // Actualizar URL del botón de reserva
  document.getElementById("reservar-button").href = `checkout.html?destino=${id}&precio=${destino.price}`

  // Actualizar destacados
  const destacadosContainer = document.getElementById("destino-destacados")
  destacadosContainer.innerHTML = ""
  destino.highlights.forEach((highlight, index) => {
    const li = document.createElement("li")
    li.className = "flex items-start"
    li.innerHTML = `
            <div class="bg-teal-100 text-teal-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                ${index + 1}
            </div>
            <span>${highlight}</span>
        `
    destacadosContainer.appendChild(li)
  })

  // Actualizar incluye
  const incluyeContainer = document.getElementById("destino-incluye")
  if (incluyeContainer) {
    incluyeContainer.innerHTML = ""
    destino.includes.forEach((item) => {
      const li = document.createElement("li")
      li.className = "flex items-center"
      li.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-teal-700 mr-2">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>${item}</span>
            `
      incluyeContainer.appendChild(li)
    })
  }
}

/**
 * Función para cargar las reseñas de un destino
 */
function loadDestinoReviews() {
  const container = document.getElementById("destino-reviews-container")
  if (!container) return

  // Reseñas simuladas
  const reviews = [
    {
      name: "María González",
      date: "Marzo 2025",
      rating: 4,
      comment:
        "Una experiencia increíble. El guía era muy conocedor y nos explicó la historia y significado de cada estructura. El sitio es impresionante y las vistas son espectaculares. Definitivamente vale la pena la visita.",
    },
    {
      name: "Carlos Ramírez",
      date: "Febrero 2025",
      rating: 5,
      comment:
        "Superó todas mis expectativas. La organización fue perfecta, desde la recogida en el hotel hasta el regreso. El almuerzo estaba delicioso y el guía era muy amable y conocedor. Recomiendo llevar protector solar y mucha agua.",
    },
    {
      name: "Laura Méndez",
      date: "Enero 2025",
      rating: 4,
      comment:
        "Muy buena experiencia en general. El sitio es impresionante y el guía era muy informativo. Lo único negativo fue que el grupo era un poco grande y a veces era difícil escuchar todas las explicaciones. Recomendaría llevar zapatos cómodos.",
    },
  ]

  // Limpiar contenedor
  container.innerHTML = ""

  // Agregar reseñas al contenedor
  reviews.forEach((review) => {
    const div = document.createElement("div")
    div.className = "border rounded-lg p-4"

    // Crear estrellas
    let stars = ""
    for (let i = 0; i < 5; i++) {
      if (i < review.rating) {
        stars += '<i data-lucide="star" class="h-4 w-4 text-amber-500" style="fill: #f59e0b"></i>'
      } else {
        stars += '<i data-lucide="star" class="h-4 w-4 text-gray-300"></i>'
      }
    }

    div.innerHTML = `
            <div class="flex justify-between mb-2">
                <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                    <div>
                        <p class="font-medium">${review.name}</p>
                        <p class="text-xs text-gray-600">Visitó en ${review.date}</p>
                    </div>
                </div>
                <div class="flex">
                    ${stars}
                </div>
            </div>
            <p class="text-sm mb-2">"${review.comment}"</p>
        `

    container.appendChild(div)
  })

  // Reinicializar iconos
  lucide.createIcons()
}

/**
 * Función para crear una tarjeta de destino
 * @param {Object} destino - Datos del destino
 * @returns {HTMLElement} - Elemento HTML de la tarjeta
 */
function createDestinoCard(destino) {
  const card = document.createElement("div")
  card.className =
    "bg-white rounded-lg border overflow-hidden transition-all duration-300 hover:shadow-lg destination-card"

  card.innerHTML = `
        <div class="relative h-48 w-full">
            <img src="${destino.image}" alt="${destino.title}" class="w-full h-full object-cover">
            <div class="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-medium flex items-center">
                <i data-lucide="star" class="h-4 w-4 text-amber-500 mr-1" style="fill: #f59e0b"></i>
                ${destino.rating}
            </div>
        </div>
        <div class="p-4">
            <h3 class="text-xl font-semibold mb-2">${destino.title}</h3>
            <div class="flex items-center text-gray-600 mb-4">
                <i data-lucide="map-pin" class="h-4 w-4 mr-1"></i>
                <span class="text-sm">${destino.location}</span>
            </div>
            <div class="flex justify-between items-center">
                <div>
                    <span class="text-sm text-gray-600">Desde</span>
                    <p class="text-lg font-bold text-teal-700">$${destino.price}</p>
                </div>
                <div class="text-sm text-gray-600">por persona</div>
            </div>
        </div>
        <div class="px-4 pb-4">
            <a href="destino-detalle.html?id=${destino.id}" class="block w-full text-center border border-teal-700 text-teal-700 py-2 rounded-md hover:bg-teal-50">
                Ver detalles
            </a>
        </div>
    `

  // Inicializar iconos dentro de la tarjeta
  setTimeout(() => {
    if (typeof lucide !== "undefined") {
      lucide.createIcons({
        icons: {
          Star: {},
          MapPin: {},
        },
        attrs: {
          class: ["my-icon-class"],
        },
        root: card,
      })
    }
  }, 0)

  return card
}
