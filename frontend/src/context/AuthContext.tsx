import { createContext, useContext, useEffect, useState } from "react";
import { logout } from "../services/auth.service";
import type { Usuario, AuthContextType } from "../types";
import { jwtDecode } from "jwt-decode";

interface TokenData {
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

const Ctx = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean>(!!localStorage.getItem("authToken"));
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const setToken = (t: string, u: Usuario) => {
    localStorage.setItem("authToken", t);
    localStorage.setItem("usuario", JSON.stringify(u));
    setIsAuth(true);
    setUsuario(u);
  };

  const clear = () => {
    logout();
    localStorage.removeItem("authToken");
    localStorage.removeItem("usuario");
    setIsAuth(false);
    setUsuario(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("usuario");

    try {
      if (token && storedUser) {
        const decoded = jwtDecode<TokenData>(token);

        // Verifica expiración del token
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          console.warn("⏰ Token expirado. Cerrando sesión...");
          clear();
        } else {
          setIsAuth(true);
          setUsuario(JSON.parse(storedUser));
        }
      } else {
        setIsAuth(false);
        setUsuario(null);
      }
    } catch (err) {
      console.error("⚠️ Token inválido o corrupto:", err);
      clear(); // Si el token no se puede decodificar, se limpia
    }

    setLoading(false);
  }, []);

  return (
    <Ctx.Provider value={{ isAuth, usuario, setToken, clear, loading }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
