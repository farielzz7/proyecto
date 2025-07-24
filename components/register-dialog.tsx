
"use client"

import React from "react"

import { useState, useMemo } from "react"
import { Eye, EyeOff, Facebook, ChevronDown, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface RegisterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Lista de países con sus banderas
const countries = [
  { code: "AD", name: "Andorra", flag: "🇦🇩" },
  { code: "AE", name: "Emiratos Árabes Unidos", flag: "🇦🇪" },
  { code: "AF", name: "Afganistán", flag: "🇦🇫" },
  { code: "AG", name: "Antigua y Barbuda", flag: "🇦🇬" },
  { code: "AI", name: "Anguilla", flag: "🇦🇮" },
  { code: "AL", name: "Albania", flag: "🇦🇱" },
  { code: "AM", name: "Armenia", flag: "🇦🇲" },
  { code: "AO", name: "Angola", flag: "🇦🇴" },
  { code: "AQ", name: "Antártida", flag: "🇦🇶" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "AS", name: "Samoa Americana", flag: "🇦🇸" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "AW", name: "Aruba", flag: "🇦🇼" },
  { code: "AX", name: "Islas Åland", flag: "🇦🇽" },
  { code: "AZ", name: "Azerbaiyán", flag: "🇦🇿" },
  { code: "BA", name: "Bosnia y Herzegovina", flag: "🇧🇦" },
  { code: "BB", name: "Barbados", flag: "🇧🇧" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩" },
  { code: "BE", name: "Bélgica", flag: "🇧🇪" },
  { code: "BF", name: "Burkina Faso", flag: "🇧🇫" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
  { code: "BH", name: "Baréin", flag: "🇧🇭" },
  { code: "BI", name: "Burundi", flag: "🇧🇮" },
  { code: "BJ", name: "Benín", flag: "🇧🇯" },
  { code: "BL", name: "San Bartolomé", flag: "🇧🇱" },
  { code: "BM", name: "Bermudas", flag: "🇧🇲" },
  { code: "BN", name: "Brunéi", flag: "🇧🇳" },
  { code: "BO", name: "Bolivia", flag: "🇧🇴" },
  { code: "BQ", name: "Bonaire", flag: "🇧🇶" },
  { code: "BR", name: "Brasil", flag: "🇧🇷" },
  { code: "BS", name: "Bahamas", flag: "🇧🇸" },
  { code: "BT", name: "Bután", flag: "🇧🇹" },
  { code: "BV", name: "Isla Bouvet", flag: "🇧🇻" },
  { code: "BW", name: "Botsuana", flag: "🇧🇼" },
  { code: "BY", name: "Bielorrusia", flag: "🇧🇾" },
  { code: "BZ", name: "Belice", flag: "🇧🇿" },
  { code: "CA", name: "Canadá", flag: "🇨🇦" },
  { code: "CC", name: "Islas Cocos", flag: "🇨🇨" },
  { code: "CD", name: "República Democrática del Congo", flag: "🇨🇩" },
  { code: "CF", name: "República Centroafricana", flag: "🇨🇫" },
  { code: "CG", name: "Congo", flag: "🇨🇬" },
  { code: "CH", name: "Suiza", flag: "🇨🇭" },
  { code: "CI", name: "Costa de Marfil", flag: "🇨🇮" },
  { code: "CK", name: "Islas Cook", flag: "🇨🇰" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "CM", name: "Camerún", flag: "🇨🇲" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷" },
  { code: "CU", name: "Cuba", flag: "🇨🇺" },
  { code: "CV", name: "Cabo Verde", flag: "🇨🇻" },
  { code: "CW", name: "Curazao", flag: "🇨🇼" },
  { code: "CX", name: "Isla de Navidad", flag: "🇨🇽" },
  { code: "CY", name: "Chipre", flag: "🇨🇾" },
  { code: "CZ", name: "República Checa", flag: "🇨🇿" },
  { code: "DE", name: "Alemania", flag: "🇩🇪" },
  { code: "DJ", name: "Yibuti", flag: "🇩🇯" },
  { code: "DK", name: "Dinamarca", flag: "🇩🇰" },
  { code: "DM", name: "Dominica", flag: "🇩🇲" },
  { code: "DO", name: "República Dominicana", flag: "🇩🇴" },
  { code: "DZ", name: "Argelia", flag: "🇩🇿" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨" },
  { code: "EE", name: "Estonia", flag: "🇪🇪" },
  { code: "EG", name: "Egipto", flag: "🇪🇬" },
  { code: "EH", name: "Sahara Occidental", flag: "🇪🇭" },
  { code: "ER", name: "Eritrea", flag: "🇪🇷" },
  { code: "ES", name: "España", flag: "🇪🇸" },
  { code: "ET", name: "Etiopía", flag: "🇪🇹" },
  { code: "FI", name: "Finlandia", flag: "🇫🇮" },
  { code: "FJ", name: "Fiyi", flag: "🇫🇯" },
  { code: "FK", name: "Islas Malvinas", flag: "🇫🇰" },
  { code: "FM", name: "Micronesia", flag: "🇫🇲" },
  { code: "FO", name: "Islas Feroe", flag: "🇫🇴" },
  { code: "FR", name: "Francia", flag: "🇫🇷" },
  { code: "GA", name: "Gabón", flag: "🇬🇦" },
  { code: "GB", name: "Reino Unido", flag: "🇬🇧" },
  { code: "GD", name: "Granada", flag: "🇬🇩" },
  { code: "GE", name: "Georgia", flag: "🇬🇪" },
  { code: "GF", name: "Guayana Francesa", flag: "🇬🇫" },
  { code: "GG", name: "Guernesey", flag: "🇬🇬" },
  { code: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "GI", name: "Gibraltar", flag: "🇬🇮" },
  { code: "GL", name: "Groenlandia", flag: "🇬🇱" },
  { code: "GM", name: "Gambia", flag: "🇬🇲" },
  { code: "GN", name: "Guinea", flag: "🇬🇳" },
  { code: "GP", name: "Guadalupe", flag: "🇬🇵" },
  { code: "GQ", name: "Guinea Ecuatorial", flag: "🇬🇶" },
  { code: "GR", name: "Grecia", flag: "🇬🇷" },
  { code: "GS", name: "Islas Georgias del Sur", flag: "🇬🇸" },
  { code: "GT", name: "Guatemala", flag: "🇬🇹" },
  { code: "GU", name: "Guam", flag: "🇬🇺" },
  { code: "GW", name: "Guinea-Bisáu", flag: "🇬🇼" },
  { code: "GY", name: "Guyana", flag: "🇬🇾" },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰" },
  { code: "HM", name: "Islas Heard y McDonald", flag: "🇭🇲" },
  { code: "HN", name: "Honduras", flag: "🇭🇳" },
  { code: "HR", name: "Croacia", flag: "🇭🇷" },
  { code: "HT", name: "Haití", flag: "🇭🇹" },
  { code: "HU", name: "Hungría", flag: "🇭🇺" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "IE", name: "Irlanda", flag: "🇮🇪" },
  { code: "IL", name: "Israel", flag: "🇮🇱" },
  { code: "IM", name: "Isla de Man", flag: "🇮🇲" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "IO", name: "Territorio Británico del Océano Índico", flag: "🇮🇴" },
  { code: "IQ", name: "Irak", flag: "🇮🇶" },
  { code: "IR", name: "Irán", flag: "🇮🇷" },
  { code: "IS", name: "Islandia", flag: "🇮🇸" },
  { code: "IT", name: "Italia", flag: "🇮🇹" },
  { code: "JE", name: "Jersey", flag: "🇯🇪" },
  { code: "JM", name: "Jamaica", flag: "🇯🇲" },
  { code: "JO", name: "Jordania", flag: "🇯🇴" },
  { code: "JP", name: "Japón", flag: "🇯🇵" },
  { code: "KE", name: "Kenia", flag: "🇰🇪" },
  { code: "KG", name: "Kirguistán", flag: "🇰🇬" },
  { code: "KH", name: "Camboya", flag: "🇰🇭" },
  { code: "KI", name: "Kiribati", flag: "🇰🇮" },
  { code: "KM", name: "Comoras", flag: "🇰🇲" },
  { code: "KN", name: "San Cristóbal y Nieves", flag: "🇰🇳" },
  { code: "KP", name: "Corea del Norte", flag: "🇰🇵" },
  { code: "KR", name: "Corea del Sur", flag: "🇰🇷" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼" },
  { code: "KY", name: "Islas Caimán", flag: "🇰🇾" },
  { code: "KZ", name: "Kazajistán", flag: "🇰🇿" },
  { code: "LA", name: "Laos", flag: "🇱🇦" },
  { code: "LB", name: "Líbano", flag: "🇱🇧" },
  { code: "LC", name: "Santa Lucía", flag: "🇱🇨" },
  { code: "LI", name: "Liechtenstein", flag: "🇱🇮" },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "LR", name: "Liberia", flag: "🇱🇷" },
  { code: "LS", name: "Lesoto", flag: "🇱🇸" },
  { code: "LT", name: "Lituania", flag: "🇱🇹" },
  { code: "LU", name: "Luxemburgo", flag: "🇱🇺" },
  { code: "LV", name: "Letonia", flag: "🇱🇻" },
  { code: "LY", name: "Libia", flag: "🇱🇾" },
  { code: "MA", name: "Marruecos", flag: "🇲🇦" },
  { code: "MC", name: "Mónaco", flag: "🇲🇨" },
  { code: "MD", name: "Moldavia", flag: "🇲🇩" },
  { code: "ME", name: "Montenegro", flag: "🇲🇪" },
  { code: "MF", name: "San Martín", flag: "🇲🇫" },
  { code: "MG", name: "Madagascar", flag: "🇲🇬" },
  { code: "MH", name: "Islas Marshall", flag: "🇲🇭" },
  { code: "MK", name: "Macedonia del Norte", flag: "🇲🇰" },
  { code: "ML", name: "Malí", flag: "🇲🇱" },
  { code: "MM", name: "Myanmar", flag: "🇲🇲" },
  { code: "MN", name: "Mongolia", flag: "🇲🇳" },
  { code: "MO", name: "Macao", flag: "🇲🇴" },
  { code: "MP", name: "Islas Marianas del Norte", flag: "🇲🇵" },
  { code: "MQ", name: "Martinica", flag: "🇲🇶" },
  { code: "MR", name: "Mauritania", flag: "🇲🇷" },
  { code: "MS", name: "Montserrat", flag: "🇲🇸" },
  { code: "MT", name: "Malta", flag: "🇲🇹" },
  { code: "MU", name: "Mauricio", flag: "🇲🇺" },
  { code: "MV", name: "Maldivas", flag: "🇲🇻" },
  { code: "MW", name: "Malaui", flag: "🇲🇼" },
  { code: "MX", name: "México", flag: "🇲🇽" },
  { code: "MY", name: "Malasia", flag: "🇲🇾" },
  { code: "MZ", name: "Mozambique", flag: "🇲🇿" },
  { code: "NA", name: "Namibia", flag: "🇳🇦" },
  { code: "NC", name: "Nueva Caledonia", flag: "🇳🇨" },
  { code: "NE", name: "Níger", flag: "🇳🇪" },
  { code: "NF", name: "Isla Norfolk", flag: "🇳🇫" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "NI", name: "Nicaragua", flag: "🇳🇮" },
  { code: "NL", name: "Países Bajos", flag: "🇳🇱" },
  { code: "NO", name: "Noruega", flag: "🇳🇴" },
  { code: "NP", name: "Nepal", flag: "🇳🇵" },
  { code: "NR", name: "Nauru", flag: "🇳🇷" },
  { code: "NU", name: "Niue", flag: "🇳🇺" },
  { code: "NZ", name: "Nueva Zelanda", flag: "🇳🇿" },
  { code: "OM", name: "Omán", flag: "🇴🇲" },
  { code: "PA", name: "Panamá", flag: "🇵🇦" },
  { code: "PE", name: "Perú", flag: "🇵🇪" },
  { code: "PF", name: "Polinesia Francesa", flag: "🇵🇫" },
  { code: "PG", name: "Papúa Nueva Guinea", flag: "🇵🇬" },
  { code: "PH", name: "Filipinas", flag: "🇵🇭" },
  { code: "PK", name: "Pakistán", flag: "🇵🇰" },
  { code: "PL", name: "Polonia", flag: "🇵🇱" },
  { code: "PM", name: "San Pedro y Miquelón", flag: "🇵🇲" },
  { code: "PN", name: "Islas Pitcairn", flag: "🇵🇳" },
  { code: "PR", name: "Puerto Rico", flag: "🇵🇷" },
  { code: "PS", name: "Palestina", flag: "🇵🇸" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "PW", name: "Palaos", flag: "🇵🇼" },
  { code: "PY", name: "Paraguay", flag: "🇵🇾" },
  { code: "QA", name: "Catar", flag: "🇶🇦" },
  { code: "RE", name: "Reunión", flag: "🇷🇪" },
  { code: "RO", name: "Rumania", flag: "🇷🇴" },
  { code: "RS", name: "Serbia", flag: "🇷🇸" },
  { code: "RU", name: "Rusia", flag: "🇷🇺" },
  { code: "RW", name: "Ruanda", flag: "🇷🇼" },
  { code: "SA", name: "Arabia Saudí", flag: "🇸🇦" },
  { code: "SB", name: "Islas Salomón", flag: "🇸🇧" },
  { code: "SC", name: "Seychelles", flag: "🇸🇨" },
  { code: "SD", name: "Sudán", flag: "🇸🇩" },
  { code: "SE", name: "Suecia", flag: "🇸🇪" },
  { code: "SG", name: "Singapur", flag: "🇸🇬" },
  { code: "SH", name: "Santa Elena", flag: "🇸🇭" },
  { code: "SI", name: "Eslovenia", flag: "🇸🇮" },
  { code: "SJ", name: "Svalbard y Jan Mayen", flag: "🇸🇯" },
  { code: "SK", name: "Eslovaquia", flag: "🇸🇰" },
  { code: "SL", name: "Sierra Leona", flag: "🇸🇱" },
  { code: "SM", name: "San Marino", flag: "🇸🇲" },
  { code: "SN", name: "Senegal", flag: "🇸🇳" },
  { code: "SO", name: "Somalia", flag: "🇸🇴" },
  { code: "SR", name: "Surinam", flag: "🇸🇷" },
  { code: "SS", name: "Sudán del Sur", flag: "🇸🇸" },
  { code: "ST", name: "Santo Tomé y Príncipe", flag: "🇸🇹" },
  { code: "SV", name: "El Salvador", flag: "🇸🇻" },
  { code: "SX", name: "Sint Maarten", flag: "🇸🇽" },
  { code: "SY", name: "Siria", flag: "🇸🇾" },
  { code: "SZ", name: "Esuatini", flag: "🇸🇿" },
  { code: "TC", name: "Islas Turcas y Caicos", flag: "🇹🇨" },
  { code: "TD", name: "Chad", flag: "🇹🇩" },
  { code: "TF", name: "Territorios Australes Franceses", flag: "🇹🇫" },
  { code: "TG", name: "Togo", flag: "🇹🇬" },
  { code: "TH", name: "Tailandia", flag: "🇹🇭" },
  { code: "TJ", name: "Tayikistán", flag: "🇹🇯" },
  { code: "TK", name: "Tokelau", flag: "🇹🇰" },
  { code: "TL", name: "Timor-Leste", flag: "🇹🇱" },
  { code: "TM", name: "Turkmenistán", flag: "🇹🇲" },
  { code: "TN", name: "Túnez", flag: "🇹🇳" },
  { code: "TO", name: "Tonga", flag: "🇹🇴" },
  { code: "TR", name: "Turquía", flag: "🇹🇷" },
  { code: "TT", name: "Trinidad y Tobago", flag: "🇹🇹" },
  { code: "TV", name: "Tuvalu", flag: "🇹🇻" },
  { code: "TW", name: "Taiwán", flag: "🇹🇼" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿" },
  { code: "UA", name: "Ucrania", flag: "🇺🇦" },
  { code: "UG", name: "Uganda", flag: "🇺🇬" },
  { code: "UM", name: "Islas Ultramarinas de Estados Unidos", flag: "🇺🇲" },
  { code: "US", name: "Estados Unidos", flag: "🇺🇸" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾" },
  { code: "UZ", name: "Uzbekistán", flag: "🇺🇿" },
  { code: "VA", name: "Vaticano", flag: "🇻🇦" },
  { code: "VC", name: "San Vicente y las Granadinas", flag: "🇻🇨" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪" },
  { code: "VG", name: "Islas Vírgenes Británicas", flag: "🇻🇬" },
  { code: "VI", name: "Islas Vírgenes de Estados Unidos", flag: "🇻🇮" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "VU", name: "Vanuatu", flag: "🇻🇺" },
  { code: "WF", name: "Wallis y Futuna", flag: "🇼🇫" },
  { code: "WS", name: "Samoa", flag: "🇼🇸" },
  { code: "YE", name: "Yemen", flag: "🇾🇪" },
  { code: "YT", name: "Mayotte", flag: "🇾🇹" },
  { code: "ZA", name: "Sudáfrica", flag: "🇿🇦" },
  { code: "ZM", name: "Zambia", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabue", flag: "🇿🇼" }
]

export function RegisterDialog({ open, onOpenChange }: RegisterDialogProps) {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [nacionalidad, setNacionalidad] = useState("")
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Calcular edad basada en fecha de nacimiento
  const edad = useMemo(() => {
    if (!birthDate) return 0
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }, [birthDate])

  // Generar arrays para los selectores de fecha
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
  const months = [
    { value: 0, name: "Enero" },
    { value: 1, name: "Febrero" },
    { value: 2, name: "Marzo" },
    { value: 3, name: "Abril" },
    { value: 4, name: "Mayo" },
    { value: 5, name: "Junio" },
    { value: 6, name: "Julio" },
    { value: 7, name: "Agosto" },
    { value: 8, name: "Septiembre" },
    { value: 9, name: "Octubre" },
    { value: 10, name: "Noviembre" },
    { value: 11, name: "Diciembre" }
  ]

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const handleDateChange = (type: 'day' | 'month' | 'year', value: number) => {
    const currentDate = birthDate || new Date()
    let newDate = new Date(currentDate)
    
    if (type === 'day') {
      newDate.setDate(value)
    } else if (type === 'month') {
      newDate.setMonth(value)
    } else if (type === 'year') {
      newDate.setFullYear(value)
    }
    
    setBirthDate(newDate)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!acceptTerms) {
      setError("Debes aceptar los términos y condiciones")
      return
    }

    if (password !== passwordConfirmation) {
      setError("Las contraseñas no coinciden")
      return
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          nacionalidad,
          edad: edad,
          telefono,
          email,
          password,
          password_confirmation: passwordConfirmation,
          acepta_terminos: acceptTerms,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(data.message || "Registro exitoso!")
        // Aquí podrías redirigir al usuario o cerrar el diálogo
        onOpenChange(false)
      } else {
        setError(data.message || "Error en el registro")
        if (data.errors) {
          // Puedes manejar errores de validación específicos aquí
          console.error("Errores de validación:", data.errors)
          const errorMessages = Object.values(data.errors).flat().join("\n")
          setError(errorMessages)
        }
      }
    } catch (err) {
      console.error("Error al enviar la solicitud:", err)
      setError("Error de conexión. Inténtalo de nuevo más tarde.")
    }
  }

  const handleSocialRegister = (provider: string) => {
    // En una implementación real, esto iniciaría el flujo de OAuth
    console.log(`Registro con ${provider}`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-2xl font-bold text-center">Crear Cuenta</DialogTitle>
          <DialogDescription className="text-center">
            Regístrate para comenzar a planificar tus viajes
          </DialogDescription>
        </DialogHeader>
        
        {error && <p className="text-red-500 text-center text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-center text-sm mb-2">{success}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="nombre" className="text-sm">Nombre</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="apellido" className="text-sm">Apellido</Label>
              <Input
                id="apellido"
                type="text"
                placeholder="Tu apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
                className="h-9"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-9"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="nacionalidad" className="text-sm">Nacionalidad</Label>
              <Select value={nacionalidad} onValueChange={setNacionalidad}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Selecciona tu país" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.name}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-sm">Fecha de Nacimiento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {birthDate ? (
                      `${birthDate.getDate()}/${birthDate.getMonth() + 1}/${birthDate.getFullYear()}`
                    ) : (
                      <span className="text-muted-foreground">Selecciona fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="start">
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">Día</Label>
                        <Select
                          value={birthDate?.getDate().toString()}
                          onValueChange={(value) => handleDateChange('day', parseInt(value))}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Día" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {Array.from({ length: birthDate ? getDaysInMonth(birthDate.getMonth(), birthDate.getFullYear()) : 31 }, (_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">Mes</Label>
                        <Select
                          value={birthDate?.getMonth().toString()}
                          onValueChange={(value) => handleDateChange('month', parseInt(value))}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Mes" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {months.map((month) => (
                              <SelectItem key={month.value} value={month.value.toString()}>
                                {month.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">Año</Label>
                        <Select
                          value={birthDate?.getFullYear().toString()}
                          onValueChange={(value) => handleDateChange('year', parseInt(value))}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Año" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {birthDate && (
                      <div className="text-center text-sm text-muted-foreground">
                        Edad: {edad} años
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="telefono" className="text-sm">Teléfono (opcional)</Label>
            <Input
              id="telefono"
              type="text"
              placeholder="Tu número de teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="h-9"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="password" className="text-sm">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-9 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-9 px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="passwordConfirmation" className="text-sm">Confirmar Contraseña</Label>
            <Input
              id="passwordConfirmation"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              className="h-9"
            />
          </div>
          
          <div className="flex items-center space-x-2 py-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Acepto los{" "}
              <Button variant="link" className="h-auto p-0 text-teal-700 text-sm">
                términos y condiciones
              </Button>
            </label>
          </div>
          
          <Button type="submit" className="w-full bg-teal-700 hover:bg-teal-800 h-10">
            Crear Cuenta
          </Button>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">O regístrate con</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" onClick={() => handleSocialRegister("Google")} className="w-full h-10">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button type="button" variant="outline" onClick={() => handleSocialRegister("Facebook")} className="w-full h-10">
              <Facebook className="mr-2 h-4 w-4 text-blue-600" />
              Facebook
            </Button>
          </div>
          
          <div className="text-center text-sm pt-2">
            ¿Ya tienes una cuenta?{" "}
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-teal-700 text-sm"
              onClick={() => {
                onOpenChange(false)
                // Aquí se abriría el diálogo de login
              }}
            >
              Inicia sesión
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}