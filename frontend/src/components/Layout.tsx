import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  User,
  Package,
  LogOut,
  MenuSquare,
} from 'lucide-react';
import { NavLink } from './NavLink';



export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, usuario, clear } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    clear();
    navigate('/login');
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      {/* NAV SUPERIOR */}
      <nav className='bg-white border-b shadow-sm sticky top-0 z-30'>
        <div className='px-6 py-3 flex items-center justify-between'>
          <Link
            to='/'
            className='text-lg font-semibold text-gray-800 hover:text-indigo-600 transition'
          >
            🛍️ Lexart Store
          </Link>

          <div className='flex items-center gap-5'>
            {isAuth ? (
              <>
                <span className='text-sm text-gray-700 capitalize'>
                  👋 {usuario?.nombre}
                </span>
                <button
                  onClick={handleLogout}
                  className='flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition'
                >
                  <LogOut size={16} />
                  <span>Cerrar sesión</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='text-sm text-gray-700 hover:text-indigo-600 transition'
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='text-sm text-gray-700 hover:text-indigo-600 transition'
                >
                  Registro
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div className='flex flex-1 relative'>
        {/* SIDEBAR */}
        {isAuth && (
          <aside
            className={`relative bg-white border-r shadow-sm transition-[width] duration-300 ease-in-out
              flex flex-col items-stretch
              ${isCollapsed ? 'w-16' : 'w-60'}`}
          >
            {/* HEADER DEL MENÚ */}
            <div className='border-b p-3'>
              <div className='flex items-center gap-3 px-3 text-gray-600'>
                <div className='w-5 h-5 flex items-center justify-center'>
                  <MenuSquare size={18} />
                </div>

                {/* Texto del header con la misma lógica de delay y fade */}
                <MenuHeaderText isCollapsed={isCollapsed} />
              </div>
            </div>

            {/* NAV PRINCIPAL */}
            <nav className='flex flex-col gap-1 p-3'>
              <NavLink
                to='/'
                label='Productos'
                icon={<Package size={18} />}
                active={location.pathname === '/'}
                collapsed={isCollapsed}
              />
              <NavLink
                to='/mis-productos'
                label='Mis Productos'
                icon={<User size={18} />}
                active={location.pathname === '/mis-productos'}
                collapsed={isCollapsed}
              />
              <NavLink
                to='/perfil'
                label='Perfil'
                icon={<Settings size={18} />}
                active={location.pathname === '/perfil'}
                collapsed={isCollapsed}
              />
            </nav>

            {/* BOTÓN DE COLAPSAR */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className='absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white border rounded-full shadow-md p-1 hover:bg-gray-100 transition z-20 flex items-center justify-center'
            >
              {isCollapsed ? (
                <ChevronRight size={18} className='text-gray-700' />
              ) : (
                <ChevronLeft size={18} className='text-gray-700' />
              )}
            </button>
          </aside>
        )}

        {/* CONTENIDO PRINCIPAL */}
        <main
          className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
            isAuth ? (isCollapsed ? 'ml-2' : 'ml-5') : 'ml-0'
          }`}
        >
          <Outlet />
        </main>
      </div>

      {/* FOOTER */}
      <footer className='bg-white border-t text-center py-3 text-xs text-gray-500'>
        © {new Date().getFullYear()} Lexart Store · Desarrollado por Gonzalo
        Sánchez
      </footer>
    </div>
  );
}


import { useEffect } from "react";


function MenuHeaderText({ isCollapsed }: { isCollapsed: boolean }) {
  const [show, setShow] = useState(!isCollapsed);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (!isCollapsed) {
      timeout = setTimeout(() => setShow(true), 200); // mismo delay que NavLink
    } else {
      setShow(false);
    }
    return () => clearTimeout(timeout);
  }, [isCollapsed]);

  return (
    show && (
      <h2
        className={`text-sm font-semibold uppercase tracking-wide select-none transition-opacity duration-200 ${
          isCollapsed ? "opacity-0" : "opacity-100"
        }`}
      >
        Menú
      </h2>
    )
  );
}
