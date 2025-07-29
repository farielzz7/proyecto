/**
 * Auth Service para GoPlan
 * Este archivo contiene funciones para la autenticación de usuarios
 */

/**
 * Función para iniciar sesión
 * @param {Object} credentials - Credenciales del usuario (email, password)
 * @returns {Promise<Object>} - Datos del usuario y token
 */
async function login(credentials) {
  try {
    // En una implementación real, esto haría una petición a la API
    // const response = await api.post('/login', credentials);

    // Simulación de respuesta
    const response = {
      user: {
        id: 1,
        name: "Usuario Demo",
        email: credentials.email,
      },
      token: "token_simulado_" + Math.random().toString(36).substring(2),
    }

    // Guardar token y datos del usuario
    localStorage.setItem("token", response.token)
    localStorage.setItem("user", JSON.stringify(response.user))

    return response
  } catch (error) {
    console.error("Error al iniciar sesión:", error)
    throw error
  }
}

/**
 * Función para registrar un nuevo usuario
 * @param {Object} userData - Datos del usuario (name, email, password)
 * @returns {Promise<Object>} - Datos del usuario y token
 */
async function register(userData) {
  try {
    // En una implementación real, esto haría una petición a la API
    // const response = await api.post('/register', userData);

    // Simulación de respuesta
    const response = {
      user: {
        id: 1,
        name: userData.name,
        email: userData.email,
      },
      token: "token_simulado_" + Math.random().toString(36).substring(2),
    }

    // Guardar token y datos del usuario
    localStorage.setItem("token", response.token)
    localStorage.setItem("user", JSON.stringify(response.user))

    return response
  } catch (error) {
    console.error("Error al registrar usuario:", error)
    throw error
  }
}

/**
 * Función para cerrar sesión
 * @returns {Promise<void>}
 */
async function logout() {
  try {
    // En una implementación real, esto haría una petición a la API
    // await api.post('/logout');

    // Eliminar token y datos del usuario
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
    // Eliminar token y datos del usuario incluso si hay error
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }
}

/**
 * Función para verificar si el usuario está autenticado
 * @returns {boolean} - true si el usuario está autenticado, false en caso contrario
 */
function isAuthenticated() {
  return localStorage.getItem("token") !== null
}

/**
 * Función para obtener los datos del usuario actual
 * @returns {Object|null} - Datos del usuario o null si no hay usuario autenticado
 */
function getCurrentUser() {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

/**
 * Función para configurar la UI según el estado de autenticación
 */
function setupAuthUI() {
  const isLoggedIn = isAuthenticated()

  // Elementos de la UI para usuarios autenticados y no autenticados
  const authButtons = document.getElementById("auth-buttons")
  const userMenu = document.getElementById("user-menu")

  if (authButtons && userMenu) {
    if (isLoggedIn) {
      authButtons.classList.add("hidden")
      userMenu.classList.remove("hidden")
    } else {
      authButtons.classList.remove("hidden")
      userMenu.classList.add("hidden")
    }
  }

  // Configurar botón de logout
  const logoutButton = document.getElementById("logout-button")
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      await logout()
      window.location.reload()
    })
  }
}

/**
 * Función para configurar los modales de autenticación
 */
function setupModals() {
  // Login modal
  const loginModal = document.getElementById("login-modal")
  const loginButton = document.getElementById("login-button")
  const mobileLoginButton = document.getElementById("mobile-login-button")
  const closeLoginModal = document.getElementById("close-login-modal")
  const switchToRegister = document.getElementById("switch-to-register")

  // Register modal
  const registerModal = document.getElementById("register-modal")
  const registerButton = document.getElementById("register-button")
  const mobileRegisterButton = document.getElementById("mobile-register-button")
  const closeRegisterModal = document.getElementById("close-register-modal")
  const switchToLogin = document.getElementById("switch-to-login")

  // Search modal
  const searchModal = document.getElementById("search-modal")
  const searchButton = document.getElementById("search-button")
  const mobileSearchButton = document.getElementById("mobile-search-button")
  const closeSearchModal = document.getElementById("close-search-modal")

  // Funciones para abrir y cerrar modales
  function openModal(modal) {
    if (modal) {
      modal.classList.remove("hidden")
      document.body.style.overflow = "hidden"
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.add("hidden")
      document.body.style.overflow = ""
    }
  }

  // Configurar eventos para login modal
  if (loginButton) loginButton.addEventListener("click", () => openModal(loginModal))
  if (mobileLoginButton) mobileLoginButton.addEventListener("click", () => openModal(loginModal))
  if (closeLoginModal) closeLoginModal.addEventListener("click", () => closeModal(loginModal))

  // Configurar eventos para register modal
  if (registerButton) registerButton.addEventListener("click", () => openModal(registerModal))
  if (mobileRegisterButton) mobileRegisterButton.addEventListener("click", () => openModal(registerModal))
  if (closeRegisterModal) closeRegisterModal.addEventListener("click", () => closeModal(registerModal))

  // Configurar eventos para search modal
  if (searchButton) searchButton.addEventListener("click", () => openModal(searchModal))
  if (mobileSearchButton) mobileSearchButton.addEventListener("click", () => openModal(searchModal))
  if (closeSearchModal) closeSearchModal.addEventListener("click", () => closeModal(searchModal))

  // Configurar eventos para cambiar entre modales
  if (switchToRegister) {
    switchToRegister.addEventListener("click", () => {
      closeModal(loginModal)
      openModal(registerModal)
    })
  }

  if (switchToLogin) {
    switchToLogin.addEventListener("click", () => {
      closeModal(registerModal)
      openModal(loginModal)
    })
  }

  // Cerrar modales al hacer clic fuera de ellos
  window.addEventListener("click", (e) => {
    if (loginModal && e.target === loginModal) closeModal(loginModal)
    if (registerModal && e.target === registerModal) closeModal(registerModal)
    if (searchModal && e.target === searchModal) closeModal(searchModal)
  })

  // Configurar formularios
  setupForms()
}

/**
 * Función para configurar los formularios de autenticación
 */
function setupForms() {
  // Login form
  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const email = document.getElementById("login-email").value
      const password = document.getElementById("login-password").value

      try {
        await login({ email, password })
        window.location.href = "dashboard.html"
      } catch (error) {
        alert("Error al iniciar sesión: " + error.message)
      }
    })
  }

  // Register form
  const registerForm = document.getElementById("register-form")
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const name = document.getElementById("register-name").value
      const email = document.getElementById("register-email").value
      const password = document.getElementById("register-password").value
      const terms = document.getElementById("terms").checked

      if (!terms) {
        alert("Debes aceptar los términos y condiciones")
        return
      }

      try {
        await register({ name, email, password })
        window.location.href = "dashboard.html"
      } catch (error) {
        alert("Error al registrar: " + error.message)
      }
    })
  }

  // Toggle password visibility
  const togglePassword = document.getElementById("toggle-password")
  if (togglePassword) {
    togglePassword.addEventListener("click", () => {
      const passwordInput = document.getElementById("login-password")
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
      passwordInput.setAttribute("type", type)

      // Cambiar icono
      const icon = togglePassword.querySelector("i")
      if (type === "text") {
        icon.setAttribute("data-lucide", "eye-off")
      } else {
        icon.setAttribute("data-lucide", "eye")
      }
      if (typeof lucide !== "undefined") {
        lucide.createIcons()
      }
    })
  }

  const toggleRegisterPassword = document.getElementById("toggle-register-password")
  if (toggleRegisterPassword) {
    toggleRegisterPassword.addEventListener("click", () => {
      const passwordInput = document.getElementById("register-password")
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
      passwordInput.setAttribute("type", type)

      // Cambiar icono
      const icon = toggleRegisterPassword.querySelector("i")
      if (type === "text") {
        icon.setAttribute("data-lucide", "eye-off")
      } else {
        icon.setAttribute("data-lucide", "eye")
      }
      if (typeof lucide !== "undefined") {
        lucide.createIcons()
      }
    })
  }
}
