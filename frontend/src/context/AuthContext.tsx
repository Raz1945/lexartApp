import { createContext, useContext, useEffect, useState } from "react";
import { logout } from "../services/auth.service";

type Usuario = {
  id: number;
  nombre: string;
  email: string;
};

type AuthCtx = {
  isAuth: boolean;
  usuario: Usuario | null;
  setToken: (t: string, u: Usuario) => void;
  clear: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean>(!!localStorage.getItem("authToken"));
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const setToken = (t: string, u: Usuario) => {
    localStorage.setItem("authToken", t);
    localStorage.setItem("usuario", JSON.stringify(u));
    setIsAuth(true);
    setUsuario(u);
  };

  const clear = () => {
    logout();
    setIsAuth(false);
    setUsuario(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("usuario");

    if (token && storedUser) {
      setIsAuth(true);
      setUsuario(JSON.parse(storedUser));
    } else {
      setIsAuth(false);
      setUsuario(null);
    }
  }, []);

  return (
    <Ctx.Provider value={{ isAuth, usuario, setToken, clear }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
