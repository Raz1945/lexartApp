import { useState } from "react";
import { login as loginUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import type { AxiosError } from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      const res = await loginUser(email, password);
      setToken(res.token, res.usuario);
      navigate("/");
    } catch (err) {
      const axiosError = err as AxiosError<{ mensaje?: string }>;
      const backendMessage = axiosError.response?.data?.mensaje;
      setErr(backendMessage || axiosError.message || "Error al iniciar sesión");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Bienvenido a <span className="text-indigo-600">Lexart Store</span>
        </h1>

        {err && (
          <p className="text-red-600 text-sm text-center mb-4 bg-red-50 border border-red-100 rounded p-2">
            {err}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-600">
          ¿No tenés cuenta?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
