export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">La página que buscás no existe.</p>
      <a href="/" className="text-indigo-600 hover:underline">
        Volver al inicio
      </a>
    </div>
  );
}
