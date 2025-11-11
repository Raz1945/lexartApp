import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function NavLink({
  to,
  label,
  icon,
  active,
  collapsed,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  collapsed?: boolean;
}) {
  const [showText, setShowText] = useState(!collapsed);

  // Controlamos el delay en el texto
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (!collapsed) {
      // Espera 200 ms antes de mostrar texto al expandir
      timeout = setTimeout(() => setShowText(true), 200);
    } else {
      // Oculta inmediatamente al colapsar
      setShowText(false);
    }
    return () => clearTimeout(timeout);
  }, [collapsed]);

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm
        ${
          active
            ? 'bg-indigo-100 text-indigo-700 font-medium'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }
        transition-colors`}
    >
      <div className="w-5 h-5 flex items-center justify-center">{icon}</div>

      {/* Texto con fade-in/out */}
      {showText && (
        <span
          className={`whitespace-nowrap transition-opacity duration-200 ${
            collapsed ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {label}
        </span>
      )}
    </Link>
  );
}
