/**
 * Archivo principal de JavaScript para GoPlan
 * Contiene funciones generales y de inicialización
 */

/**
 * Función para configurar el menú móvil
 */
function setupMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      // Cambiar icono
      const icon = mobileMenuButton.querySelector("i")
      if (mobileMenu.classList.contains("hidden")) {
        icon.setAttribute("data-lucide", "x")
      } else {
        icon.setAttribute("data-lucide", "menu")
      }

      // Mostrar/ocultar menú
      mobileMenu.classList.toggle("hidden")

      // Reinicializar iconos
      lucide.createIcons()
    })
  }
}

/**
 * Función para configurar formularios
 */
function setupForms() {
  // Formulario de búsqueda por presupuesto
  const searchBudgetForm = document.getElementById("search-budget-form")
  if (searchBudgetForm) {
    searchBudgetForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const budget = document.getElementById("budget").value
      const destination = document.getElementById("destination").value
      const travelers = document.getElementById("travelers").value

      // Redirigir a la página de planificador con los parámetros
      window.location.href = `planificador.html?budget=${budget}&destination=${encodeURIComponent(destination)}&travelers=${travelers}`
    })
  }

  // Formulario de búsqueda
  const searchForm = document.getElementById("search-form")
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const query = document.getElementById("search-query").value
      const type = document.getElementById("search-type").value

      // Redirigir a la página de resultados de búsqueda
      window.location.href = `destinos.html?q=${encodeURIComponent(query)}&type=${type}`
    })

    // Botones de búsqueda reciente
    const recentSearchButtons = document.querySelectorAll("[data-search]")
    recentSearchButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const searchQuery = button.getAttribute("data-search")
        const searchType = button.getAttribute("data-type") || "all"

        document.getElementById("search-query").value = searchQuery
        document.getElementById("search-type").value = searchType
      })
    })
  }

  // Botones CTA
  const ctaRegisterButton = document.getElementById("cta-register-button")
  if (ctaRegisterButton) {
    ctaRegisterButton.addEventListener("click", () => {
      const registerModal = document.getElementById("register-modal")
      if (registerModal) {
        registerModal.classList.remove("hidden")
      }
    })
  }

  const ctaLearnMoreButton = document.getElementById("cta-learn-more-button")
  if (ctaLearnMoreButton) {
    ctaLearnMoreButton.addEventListener("click", () => {
      window.location.href = "destinos.html"
    })
  }
}

/**
 * Función para manejar parámetros de URL
 * @returns {Object} - Objeto con los parámetros de la URL
 */
function getUrlParams() {
  const params = {}
  const queryString = window.location.search.substring(1)
  const pairs = queryString.split("&")

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split("=")
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "")
  }

  return params
}

/**
 * Función para formatear precios
 * @param {number} price - Precio a formatear
 * @returns {string} - Precio formateado
 */
function formatPrice(price) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(price\
