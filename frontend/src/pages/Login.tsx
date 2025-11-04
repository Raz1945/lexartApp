import { useState } from "react";
import { login } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

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
      const res = await login(email, password);
      setToken(res.token);
      navigate("/");
    } catch (e: any) {
      setErr(e?.response?.data?.mensaje || "Error al iniciar sesión");
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">Iniciar sesión</h1>
      {err && <p className="text-red-600 text-sm mb-3">{err}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-black text-white rounded p-2">Entrar</button>
      </form>
      <p className="text-sm mt-3">¿No tenés cuenta? <Link className="underline" to="/register">Registrate</Link></p>
    </div>
  );
}
