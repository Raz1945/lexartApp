import { Outlet, Link, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="font-semibold">Productos</Link>
          {token && (
            <>
              <Link to="/create" className="text-sm">Agregar</Link>
            </>
          )}
          <Link to="/external" className="text-sm">APIs externas</Link>
          <div className="ml-auto flex items-center gap-3">
            {token ? (
              <button
                className="text-sm text-red-600"
                onClick={() => { localStorage.removeItem("authToken"); navigate("/login"); }}
              >
                Cerrar sesión
              </button>
            ) : (
              <>
                <Link to="/login" className="text-sm">Login</Link>
                <Link to="/register" className="text-sm">Registro</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
