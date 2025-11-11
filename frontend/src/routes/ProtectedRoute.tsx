import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/LoadingScreen";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuth, loading } = useAuth();

  // Mientras verifica la sesión persistente
  if (loading) {
    return <LoadingScreen />;
  }

  // Si no hay sesión activa → redirige a login
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // Usuario autenticado → renderiza la página protegida
  return <>{children}</>;
}
