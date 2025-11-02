import { createContext, useContext, useEffect, useState } from "react";
import { logout } from "../services/auth.service";

type AuthCtx = {
  isAuth: boolean;
  setToken: (t: string) => void;
  clear: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean>(!!localStorage.getItem("authToken"));

  const setToken = (t: string) => {
    localStorage.setItem("authToken", t);
    setIsAuth(true);
  };
  const clear = () => {
    logout();
    setIsAuth(false);
  };

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("authToken"));
  }, []);

  return <Ctx.Provider value={{ isAuth, setToken, clear }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
