import axios from "axios";
import { logout } from "../services/auth.service";

// Selecciona automáticamente la base URL según el entorno
const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_BASE_URL_PROD
  : import.meta.env.VITE_API_BASE_URL;

// Crear instancia de Axios con configuración base
const api = axios.create({
  baseURL: BASE_URL,
});



// =======================================================
// 1️⃣ Interceptor de REQUEST — agrega el token si existe
// =======================================================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});



// =======================================================
// 2️⃣ Interceptor de RESPONSE — detecta errores de sesión
// =======================================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("🔒 Token inválido o expirado. Cerrando sesión...");

      // Limpieza local y redirección
      logout();
      localStorage.removeItem("usuario");
      localStorage.removeItem("authToken");

      // Redirige al login si no estamos ya en él
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
