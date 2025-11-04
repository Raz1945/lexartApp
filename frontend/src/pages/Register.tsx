import { useState } from "react";
import { register as registerUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

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
      setToken(res.token);
      navigate("/");
    } catch (e: any) {
      setErr(e?.response?.data?.error || "Error al registrar usuario");
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">Crear cuenta</h1>
      {err && <p className="text-red-600 text-sm mb-3">{err}</p>}

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full border rounded p-2"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-black text-white rounded p-2 hover:bg-gray-800 transition">
          Registrarse
        </button>
      </form>

      <p className="text-sm mt-3 text-center">
        ¿Ya tenés cuenta?{" "}
        <Link className="underline text-blue-600" to="/login">
          Iniciá sesión
        </Link>
      </p>
    </div>
  );
}
