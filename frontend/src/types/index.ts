// === AUTENTICACIÓN ===
export interface RegisterPayload {
  nombre: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  mensaje: string;
  token: string;
  usuario: {
    id: number;
    nombre: string;
    email: string;
  };
}

// === PRODUCTOS Y VARIANTES ===
export interface Variante {
  id?: number;
  color: string;
  price: number;
  productoId?: number;
}

export interface Product {
  id?: number;
  name: string;
  brand: string;
  model: string;
  usuarioId?: number;
  variantes?: Variante[];
  createdAt?: string;
  updatedAt?: string;
}

// === CONTEXTO DE AUTENTICACIÓN ===
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

export interface AuthContextType {
  isAuth: boolean;
  usuario: Usuario | null;
  setToken: (token: string, usuario: Usuario) => void;
  clear: () => void;
  loading: boolean; 
}
