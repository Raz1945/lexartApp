import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// todo mejorar diseño
// todo Agregar nomre de usuario loggeado
// todo Agregar menú lateral con más opciones - perfil, configuración, etc.
// todo Agregar Mis Productos

export default function Layout() {
  const navigate = useNavigate();
  const { isAuth, usuario, clear } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="font-semibold">Productos</Link>

          {isAuth && (
            <Link to="/#" className="text-sm">Mis Productos</Link>
          )}

          <div className="ml-auto flex items-center gap-3">
            {isAuth ? (
              <>
                <span className="text-sm text-gray-700 capitalize">
                  {usuario?.nombre}
                </span>
                <button
                  className="text-sm text-red-600"
                  onClick={() => { clear(); navigate("/login"); }}
                >
                  Cerrar sesión
                </button>
              </>
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
