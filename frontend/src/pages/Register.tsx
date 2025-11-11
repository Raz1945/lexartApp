import { useState } from "react";
import { register as registerUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import type { AxiosError } from "axios";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      const res = await registerUser(nombre, email, password);
      setToken(res.token, res.usuario);
      navigate("/");
    } catch (err) {
      const axiosError = err as AxiosError<{ error?: string }>;
      const backendError = axiosError.response?.data?.error;
      setErr(backendError || axiosError.message || "Error al registrar usuario");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Crear cuenta en{" "}
          <span className="text-indigo-600">Lexart Store</span>
        </h1>

        {err && (
          <p className="text-red-600 text-sm text-center mb-4 bg-red-50 border border-red-100 rounded p-2">
            {err}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Registrarse
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-600">
          ¿Ya tenés cuenta?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
