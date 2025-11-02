import { Navigate } from "react-router-dom";

// Verifica la autenticación del usuario
export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  if (!token) return <Navigate to="/login" replace />;
  return children;
}