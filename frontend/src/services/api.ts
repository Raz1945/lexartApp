import axios from "axios";

// Selecciona automáticamente la base URL según el entorno
const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_BASE_URL_PROD  // 👉 producción (Vercel)
  : import.meta.env.VITE_API_BASE_URL;      // 👉 local


// Crear instancia de Axios con configuración base
const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para incluir token de autenticación en cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
